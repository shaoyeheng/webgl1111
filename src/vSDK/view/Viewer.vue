<template>
	<div class="viewer-main">
		<div class="navi-box-main" v-show="showNaviGroup">
			<NaviBox @onSend="receiveBtnHandle" />
		</div>
		<div class="WebRTCVideo">
			<video id="localVideo" autoplay playsInline muted ref="video" controls
				style="width: 100%;height: 99%;object-fit: fill" class="WebRTCVideo-video"></video>
		</div>
		<div class="canvas-container-main" id="canvas" ref="canvas" />
	</div>
</template>

<script>
	import * as THREE from 'three'
	import CameraControls from 'camera-controls'
	import {
		OrbitControls
	} from 'three/examples/jsm/controls/OrbitControls.js'
	import {
		CSS2DRenderer
	} from 'three/examples/jsm/renderers/CSS2DRenderer';
	import {
		TransformControls
	} from 'three/examples/jsm/controls/TransformControls';
	//import msgpack from 'msgpack-lite'
	import NaviBox from './NaviBox.vue'
	import emitter from "../utils/bus";

	import io from 'socket.io-client';
	export default {
		name: "viewer",
		props: {
			sceneX: String,
			cameraPosition: Object,
			cameraLookAt: Object,
			serverIp: String,
			serverPort: Number,
			onSceneInited: Function,
			callback: Function,
			showNavi: Boolean,
		},
		components: {
			NaviBox,
		},
		data() {
			return {
				contentData: {
					roams: null,
					meshs: null,
					sprites: null,
					cameraState: null
				},
				objects: [],
				roaming: false,
				progress:0,
				roamOptions: {
					roamPoints: [],
					tension: 0,
					offsetAngle: 0.2,
					lineName: "roamLiner0",
					lineColor: "0xff5733",
					lineStep: 100,
					speedRate:0.00005,
					cmd: "start",
					tripWay: "backToOrigin",
					originPosition: new THREE.Vector3(0,0,0),
					originTarget: new THREE.Vector3(0,0,0),
					temporaryPosition: new THREE.Vector3(0,0,0),
					temporaryTarget: new THREE.Vector3(0,0,0),
					
				},
				
				mouse: new THREE.Vector2(),
				rayCaster: new THREE.Raycaster(),
				
				showNaviGroup: false,
				port: "Viewer: ",
				msessionId: "",
				msocket: null,
				camera: null,
				scene: null,
				renderer: null,
				mesh: null,

				controls: null,
				camera_controls: null,
				clock: null,
				mx: 0,
				my: 0,
				mz: 0,
				mzoom: 1,
				keyMap: [],
				moveSpeed: 0.02,
				timerBtn: null,

				configuration: {
					iceServers: [{
							"urls": "stun:47.111.16.106"
						},
						{
							'urls': 'turn:47.111.16.106:3478?transport=udp',
							'username': 'name',
							'credential': 'pass'
						}
					],
				},

				mpc: null,
				offerOptions: {
					offerToReceiveAudio: -1,
					offerToReceiveVideo: -1,
				},
			}
		},
		methods: {
			receiveBtnHandle(data) {
				console.log(data)
				if (this.camera_controls === null) {
					console.log("camera_controls not inited!")
					return;
				}
				switch (data) {
					case "zoomback":
						clearInterval(this.timerBtn)
						this.camera_controls.reset(true)
						break;
					case "moveUp":
						this.timerBtn = setInterval(() => {
							this.camera_controls.forward(this.moveSpeed * 10, true)
						}, 300)
						break;
					case "moveDown":
						this.timerBtn = setInterval(() => {
							this.camera_controls.forward(-this.moveSpeed * 10, true)
						}, 300)
						break;
					case "moveLeft":
						this.timerBtn = setInterval(() => {
							this.camera_controls.truck(-this.moveSpeed * 10, 0, true);
						}, 300)
						break;
					case "moveRight":
						this.timerBtn = setInterval(() => {
							this.camera_controls.truck(this.moveSpeed * 10, 0, true);
						}, 300)
						break;
					case "zoomIn":
						this.timerBtn = setInterval(() => {
							this.camera_controls.dolly(0.05, true);
						}, 100)
						break;
					case "zoomOut":
						this.timerBtn = setInterval(() => {
							this.camera_controls.dolly(-0.05, true);
						}, 100)
						break;
					case "moveEnd":
						clearInterval(this.timerBtn)
						break;
					default:
						console.log(data)
						break;
				}
			},
			socketSendRead() {
				const cmd = 'read';
				const path = 'renderingState/camera';
				let data_packet = {
					object: {
						timestamp: new Date(),
					}
				};

				//data_packet.object.timestamp = +new Date();
				const data = {
					type: cmd,
					path,
					data: data_packet,
					sessionId: this.msessionId,
				};
				//const message = msgpack.encode(data);
				//this.msocket.send(data);
				this.msoket.emit("camera",data)
				console.log("send----")
				console.log(data)
			},
			
			msocketOnOpen() {
				console.log("[websocket] connect open");
				this.sendOffer();
			},
			msocketOnSdp(sdp){
				console.log("[webRTC]Receive sdp: ", sdp);
				this.mpc.setRemoteDescription(sdp.data);
			},
			msocketOnMessage(msg) {
				//const cmd = msgpack.decode(new Uint8Array(msg.data));
				const cmd = msg.data
				console.log("[websocket msg] type:" + cmd.type + " path:" + cmd.path);
				if (cmd.path === '/webrtc/answer') {
					console.log('[webrtc] received answer');
					const answer = cmd.data;
					// console.log(answer);
					if (answer !== null) {
						try {
							this.mpc.setRemoteDescription(answer);
							console.log(`[setRemoteDesc] complete`);
						} catch (e) {
							console.error(`[setRemoteDesc] error ${e.toString()}`);
						}
					}
				}
			},
			initPC() {
				this.mpc = new RTCPeerConnection({
				            iceServers: [
				                {
				                    "urls": "stun:47.111.16.106"
				                },
				                {
				                    'urls': 'turn:47.111.16.106:3478?transport=udp',
				                    'username': 'name',
				                    'credential': 'pass'
				                }
				            ],
				        });
				
				        // connect video
				        this.mpc.addEventListener('track', (evt) => {
				            if (evt.track.kind === 'video') {
								const mvideo = this.$refs.video;
				                console.log('[webrtc] new video track');
				                if (mvideo != null)
				                    mvideo.srcObject = evt.streams[0];
				            }
				        });
				
				        this.mpc.addTransceiver('video', { direction: 'recvonly' });
				        // for updating the status of the peer connection
				        this.mpc.oniceconnectionstatechange = () => {
				            console.log(`[webrtc] connectionState: ${this.mpc.connectionState}`);
				            if (
				                this.mpc.connectionState === 'connecting' ||
				                this.mpc.connectionState === 'connected'
				            ) {
				                console.log('[webrtc] connected');
				            }
				    };  
				      
				    this.mpc.onclose = () => {
				            console.log(`[webrtc] close`);
				    };
				
			},
			sendOffer() {
			        this.initPC();
			        this.mpc
			        .createOffer()
			        .then((offer) => {
			            console.log('[webrtc] created offer');
			            console.log(offer);
			            return this.mpc.setLocalDescription(offer);
			        })
			        .then(() => {
			            // wait for ICE gathering to complete
			            console.log('[webrtc] set local description');
			            return new Promise((resolve) => {
			            if (this.mpc.iceGatheringState === 'complete') {
			                console.log('[webrtc] ICE gathering complete');
			                resolve();
			            } else {
			                const checkState = () => {
			                console.log(
			                    `[webrtc] iceGatheringState: ${this.mpc.iceGatheringState}`,
			                );
			                if (this.mpc.iceGatheringState === 'complete') {
			                    this.mpc.removeEventListener(
			                    'icegatheringstatechange',
			                    checkState,
			                    );
			                    resolve();
			                }
			                };
			                console.log(
			                '[webrtc] adding listener for `icegatheringstatechange`',
			                );
			                this.mpc.addEventListener(
			                'icegatheringstatechange',
			                checkState,
			                );
			            }
			            });
			        })
			        .then(() => {
			            // send the offer
			            console.log('[webrtc] sending offer');
			            const offer = this.mpc.localDescription;
			            const cmd = 'write';
			            const path = 'webrtc/offer';
			            const data = {
			                type: cmd,
			                path,
			                data: {
			                    sdp: offer.sdp,
			                    type: offer.type,
			                },
			                sessionId: this.msessionId,
			            };
			            // const message = msgpack.encode(data);
						console.log(data)
			            this.msocket.emit('sdp', data);
			        });
			},
			
			sceneInit() {
				let container = document.getElementById('canvas');
				let width = container.clientWidth;
				let height = container.clientHeight;
				let k = width / height;
				let s = 3; 
				//( fov, aspect, near, far )
				//this.camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 0.25, 1000);
				this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
				//camera = new THREE.PerspectiveCamera(-s * k, s * k, s, -s, 0.01, 10);
				//camera.position.set(200, 300, 200); 
				this.camera.position.x = this.cameraPosition.x  // 0.5
				this.camera.position.y = this.cameraPosition.y  //2
				this.camera.position.z = this.cameraPosition.z  //0.5
				//camera.up.x = 0;
				//camera.up.y = 0;
				//camera.up.z = 1;
				const rot = this.camera.rotation;
				const unitY = new THREE.Vector3(0, 0, 1);
				const upVec = unitY.applyEuler(rot);
				this.camera.up.set(upVec.x, upVec.y, upVec.z)

				const pos = new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z);
				this.camera.getWorldPosition(pos);
				this.camera.lookAt(pos.x, pos.y, pos.z, this.cameraLookAt.x, this.cameraLookAt.y, this.cameraLookAt.z);
				 
				//camera.position.z = 1
				this.scene = new THREE.Scene()
				//const sceneTree = new SceneNode(scene);
				//scene.background = new THREE.Color( 0xFF0000 );
				let geometry = new THREE.BoxGeometry(1, 1, 1);

				let material = new THREE.MeshNormalMaterial({
					opacity: 0.5,
					transparent: true
				});

				this.mesh = new THREE.Mesh(geometry, material);
				//this.scene.add(this.mesh);
				//this.$store.state.meshMap.add(this.mesh);

				let guiParams = {
					"rotationSpeed": 0.02,
					"radius": 16,
					"widthSegments": 10,
					"heightSegments": 10,
					"phiStart": 0,
					"phiLength": 4.2,
					"thetaStart": 0,
					"thetaLength": 1.9
				};

				//var box3=new THREE.CylinderGeometry(0.1,0.1,0.1,0.1);
				let box4 = new THREE.CylinderBufferGeometry(0.3, 0.3, 0.5, 5);
				//var boxMesh = scene.add(new THREE.Mesh(box1,material));

				let boxHelper = new THREE.BoxHelper(this.mesh, 0xff0000);
				let box3d = new THREE.Box3().setFromObject(this.mesh);
				//this.scene.add(boxHelper);
				//this.$store.state.meshMap.add(boxHelper);
				let axesHelperLineLength = 15; //5000
				let axes = new THREE.AxesHelper(axesHelperLineLength);
				axes.name = "sysAxes";
				this.scene.add(axes);
				let gridHelper = new THREE.GridHelper(12000, 20, 0x888888, 0x444444);
				gridHelper.position.y = -50;
				gridHelper.name = "sysGrid";
				this.scene.add(gridHelper);
				//this.$store.state.meshMap.add(gridHelper);
				/**
				 * 光源设置
				 */
				//点光源
				//  let point = new THREE.PointLight("red");
				//  point.position.set(100, 100, 100); //点光源位置 xyz
				//  scene.add(point); //点光源添加到场景中
				// // //环境光
				//  let ambient = new THREE.AmbientLight("black");
				//  scene.add(ambient);
				// console.log(scene)
				// console.log(scene.children)


				this.renderer = new THREE.WebGLRenderer({
					antialias: true,
					alpha: true
				});
				this.renderer.setClearColor(0xffff00, 0);
				this.renderer.setSize(container.clientWidth, container.clientHeight);
				container.appendChild(this.renderer.domElement);
				container.addEventListener('click',this.ray,true);
				
				this.clock = new THREE.Clock();
				CameraControls.install({
					THREE: THREE
				});
				this.camera_controls = new CameraControls(this.camera, this.renderer.domElement);
				//this.camera_controls.setLookAt(0.5, 2, 0.5, 0, 0, 0);
				this.camera_controls.azimuthRotateSpeed = 0.3;
				this.camera_controls.polarRotateSpeed = 0.3;
				this.camera_controls.minDistance = 0.3;
				this.camera_controls.maxDistance = 20;

				this.camera_controls.dollySpeed = 0.1;
				this.camera_controls.saveState();
				this.camera_controls.addEventListener()
				const transform_controls = new TransformControls(
					this.camera,
					this.renderer.domElement,
				);
				this.scene.add(transform_controls)
				//sceneTree.set_object_from_path(['Transform Controls'], transform_controls);
				transform_controls.addEventListener('dragging-changed', (event) => {
					// turn off the camera controls while transforming an object
					this.camera_controls.enabled = !event.value;
				});
				console.log(this.$store.state.meshMap)
				//this.scene.add(this.$store.state.meshMap)
				
				this.onSceneInited && this.onSceneInited(this.scene, this.camera)
				
				this.mouse = new THREE.Vector2()
				this.rayCaster = new THREE.Raycaster()
				this.renderer.render(this.scene, this.camera)
			},
			animate() {
				this.moveCamera();
				if (this.mx != this.camera.position.x || this.my != this.camera.position.y || this.mz != this.camera
					.position.z || this.mzoom != this.camera.zoom) {
					this.mzoom = this.camera.zoom
					console.log(this.mzoom + " | " + this.camera.zoom)

					this.mx = this.camera.position.x
					this.my = this.camera.position.y
					this.mz = this.camera.position.z
					//console.log(camera)
					//this.socketApi.sendSock(camera, null);
					//if (this.msocket.readyState === WebSocket.OPEN) {
					if(this.msocket!=null && this.msocket.connected){
						const cmd = 'write';
						const path = 'renderingState/camera';
						const data_packet = this.camera.toJSON();
						//data_packet.object.timestamp = +new Date();
						const data = {
							type: cmd,
							path,
							data: data_packet,
							sessionId: this.msessionId,
						};
						//const message = msgpack.encode(data);
						//this.msocket.send(data)
						this.msocket.emit('camera',data)
					}
				}
				const delta = this.clock.getDelta();
				const hasControlsUpdated = this.camera_controls.update(delta);
				requestAnimationFrame(this.animate);
				this.roamCamera()
				if (hasControlsUpdated) {
					this.renderer.render(this.scene, this.camera);
				}
			},
			roamCamera(){
				if(this.roaming){
					if (this.progress <= 1 - this.roamOptions.speedRate * this.roamOptions.lineStep){
						 
						//let line = this.scene.getObjectByName(this.roamLinerName)
						console.log(this.roamOptions.lineName)
						if (this.scene.getObjectByName(this.roamOptions.lineName)) {
							this.scene.remove(this.scene.getObjectByName(this.roamOptions.lineName));
						}
						let curve = new THREE.CatmullRomCurve3(this.roamOptions.roamPoints);
						curve.curveType = "catmullrom"; //chordal
						curve.closed = false;//设置是否闭环
						curve.offsetAngle = this.roamOptions.offsetAngle
						curve.tension = this.roamOptions.tension
						
						let lineGeometry = new THREE.BufferGeometry();
						let lineMaterial = new THREE.LineBasicMaterial({color: Number(this.roamOptions.lineColor)});
						lineGeometry.setFromPoints(curve.getPoints(this.roamOptions.lineStep));
						let line = new THREE.Line(lineGeometry, lineMaterial);
						line.name = this.roamOptions.lineName;
						this.scene.add(line);
						
						
						const point = curve.getPointAt(this.progress) //获取样条曲线指定点坐标，作为相机的位置
						const pointBox = curve.getPointAt(this.progress + this.roamOptions.speedRate * this.roamOptions.lineStep) //this.curve获取样条曲线指定点坐标
						//this.camera.position.set(point.x, point.y + 5, point.z)
						//this.camera.lookAt(pointBox.x, pointBox.y + 5, pointBox.z)
						//this.camera_controls.position.set(point.x, point.y + 5, point.z) //非必要，场景有控件时才加上
						//this.camera_controls.target.set(pointBox.x, pointBox.y + 5, pointBox.z) //非必要，场景有控件时才加上
				
						this.camera_controls.setLookAt(point.x, point.y + 5, point.z,pointBox.x, pointBox.y + 5, pointBox.z,true)
						this.progress += this.roamOptions.speedRate
					} else {
						this.progress = 0
						this.roaming = false
						if(this.roamOptions.tripWay === "backToOrigin"){
							this.camera_controls.setLookAt(this.roamOptions.originPosition.x,this.roamOptions.originPosition.y,this.roamOptions.originPosition.z,this.roamOptions.originTarget.x,this.roamOptions.originTarget.y,this.roamOptions.originTarget.z,true)
						}
					}
				}
			},
			ray(e) {
					//this.mouse.x = (e.clientX / document.body.clientWidth) * 2 - 1 +0.15
					//this.mouse.y = -(e.clientY / document.body.clientHeight) * 2 + 1 -0.15
					this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1 +0.15
					this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1 -0.15
					this.rayCaster.setFromCamera(this.mouse, this.camera) 
					console.log(this.mouse.x + " " + this.mouse.y)
					let intersects = this.rayCaster.intersectObjects(this.scene.children) 
					var worldPosition = new THREE.Vector3();
					console.log(intersects.length)
					
					if (intersects.length > 0) {
						//console.log("intersects obj:",intersects[0].object)
						 //intersects[0].object.getWorldPosition(worldPosition);
						// if(intersects[0].object.func != undefined){
							//eval(func)
							// var a = intersects[0].object.funcParam1
							// var b = intersects[0].object.funcParam2
							// eval(intersects[0].object.func+'(a,b)')
							this.callback && this.callback({
								type: "conf",
								func: intersects[0].object.func,
								funcParameter: intersects[0].object.funcParameter,
								mouse: this.mouse,
								object: intersects[0].object
							});


						// }
					}
					
			},
			moveCamera() {
				if (this.keyMap.ArrowLeft === true) {
					this.camera_controls.rotate(-0.02, 0, true);
				}
				if (this.keyMap.ArrowRight === true) {
					this.camera_controls.rotate(0.02, 0, true);
				}
				if (this.keyMap.ArrowUp === true) {
					this.camera_controls.rotate(0, -0.01, true);
				}
				if (this.keyMap.ArrowDown === true) {
					this.camera_controls.rotate(0, 0.01, true);
				}
				if (this.keyMap.KeyD === true) {
					this.camera_controls.truck(this.moveSpeed, 0, true);
				}
				if (this.keyMap.KeyA === true) {
					this.camera_controls.truck(-this.moveSpeed, 0, true);
				}
				if (this.keyMap.KeyW === true) {
					this.camera_controls.forward(this.moveSpeed, true);
				}
				if (this.keyMap.KeyS === true) {
					this.camera_controls.forward(-this.moveSpeed, true);
				}
				if (this.keyMap.KeyQ === true) {
					this.camera_controls.truck(0, this.moveSpeed, true);
				}
				if (this.keyMap.KeyE === true) {
					this.camera_controls.truck(0, -this.moveSpeed, true);
				}
			},
			onKeyUp(e) {
				const keyCode = e.code;
				console.log(keyCode);
				this.keyMap[keyCode] = false;
			},
			onKeyDown(e) {
				const keyCode = e.code;
				console.log(keyCode);
				this.keyMap[keyCode] = true;
			},
			initModel(ws, sid) {
				let wsUrl = "ws://" + this.serverIp + ":" + ws;
				this.msocket = io(wsUrl);
				this.msocket.on('connect', () => {
						console.log("[websocket] connect open");
				        this.sendOffer();
				});
				this.msocket.on('sdp', (sdp) => {
				        console.log("[websocket] Receive sdp: ", sdp);
				        this.mpc.setRemoteDescription(sdp.data);
				    });

				// setTimeout(() => {
				// 	this.sceneInit();
				// 	this.animate();

				// }, 2000);

				setInterval(() => {
					this.keepAlive(sid);
				}, 10000);
			},
			keepAlive(sid) {
				//console.log("keep alive:" + sid);
				this.$axios.put("http://"+this.serverIp+":"+this.serverPort+ "/api/scene", {
					sid: sid
				}).then(res => {
					//console.log("Update scene");
				}).catch(e => {
					console.log(e)
				});
			},
			loadModel(model) {
				console.log(model)
				console.log("http://"+this.serverIp+":"+this.serverPort + "/api/scene")
				this.$axios.post("http://"+this.serverIp+":"+this.serverPort + "/api/scene", {
					model: model
				}).then(res => {
					if (res.data.code === -1) {
						this.$message = "请求异常，请重试！"
						return;
					}
					//console.log(res);
					this.msessionId = res.data.sid
					console.log(res, "response sessionId: " + this.msessionId);
					console.log(res, "response port: " + res.data.ws);
					//this.msgx2 = res.data.ws
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					setTimeout(() => {
						loading.close();
						this.initModel(res.data.ws, res.data.sid)
					}, 1000);

				}).catch(error => {
					console.log(error, "error msg.")
					this.msgx2 = error.message
				})
			},
			loadData(){

				this.$axios.get("http://"+this.serverIp+":"+this.serverPort +"/api/modelContent?model="+this.sceneX).then(res => {
				
				if(res.data["content"]){
					let data = JSON.parse(res.data["content"]);
					console.log(data)
					if(data.cameraState!=null){
						this.contentData.cameraState = data.cameraState
						this.camera_controls.fromJSON(this.contentData.cameraState,true)
					}
					let loader = new THREE.ObjectLoader()
					if(data.meshs != null ){
						this.contentData.meshs = new Map(Object.entries(data.meshs))
						for (let val of this.contentData.meshs.values()) {
							let ms = loader.parse(val)
							this.scene.add(ms )
							console.log(ms.name)
							// this.objects.push(ms)
							// this.createDragControls();
						}
					}
					if(data.sprites != null){
						this.contentData.sprites = new Map(Object.entries(data.sprites))
						for (let val of this.contentData.sprites.values()) {
							let sp = loader.parse(val)
							this.scene.add(sp )
							// this.objects.push(sp)
							// this.createDragControls();
						}
					}
					if(data.roams != null ){
						this.contentData.roams = new Map(Object.entries(data.roams))
					}
					
					this.renderer.render(this.scene, this.camera);
				}
				
				}).catch(error=>{
					console.log(error.message)
				})
			},
			setCameraRoam(){
				if(this.roamOptions.cmd =="start"){
					this.roaming = true;
					
					this.camera_controls.getPosition(this.roamOptions.originPosition) 
					this.camera_controls.getTarget(this.roamOptions.originTarget) 
				} else if(this.roamOptions.cmd =="suspend"){
					this.roaming = false;
					this.camera_controls.getPosition(this.roamOptions.temporaryPosition)
					this.camera_controls.getTarget(this.roamOptions.temporaryTarget) 
				}else if(this.roamOptions.cmd =="resume"){
					this.camera_controls.setLookAt(this.roamOptions.temporaryPosition.x,this.roamOptions.temporaryPosition.y,this.roamOptions.temporaryPosition.z,this.roamOptions.temporaryTarget.x,this.roamOptions.temporaryTarget.y,this.roamOptions.temporaryTarget.z,true)
					
					this.roaming = true;
					 
				}else{
					this.roaming = false;
					if(this.roamOptions.tripWay === "backToOrigin"){
						this.camera_controls.setLookAt(this.roamOptions.originPosition.x,this.roamOptions.originPosition.y,this.roamOptions.originPosition.z,this.roamOptions.originTarget.x,this.roamOptions.originTarget.y,this.roamOptions.originTarget.z,true)
					}
				}
				
			},
		},
		created() {
			window.addEventListener('keydown', this.onKeyDown, true);
			window.addEventListener('keyup', this.onKeyUp, true);
			window.addEventListener('keydown', (event) => {
				if (event.code === 'Space') {
					this.camera_controls.setLookAt(0.7, -0.7, 0.3, 0, 0, 0);
				}
			});
			//window.addEventListener('click',this.ray,true);

		},
		mounted() {
			//this.port = this.$route.query.model;
			if (this.sceneX) {
				this.loadModel(this.sceneX)
			} else {
				this.loadModel(this.$route.query.model)
			}
			this.sceneInit();
			this.animate();
			this.loadData()
			
			emitter.on("getCameraPose",callFunc=>{
				console.log(this.camera.position)
				var vector = new THREE.Vector3( 0, 0, -1 );
				vector.applyQuaternion( this.camera.quaternion );
				callFunc && callFunc({
					position: this.camera.position,
					lookAt: vector
				});
			})
			emitter.on("setVisible",data=>{
				if(this.scene!=null){
					let g001 = this.scene.getObjectByName(data.meshName);
					g001.visible = data.visible
					this.renderer.render(this.scene, this.camera)
				}
			})
			this.showNaviGroup = this.showNavi
			emitter.on("setNaviBtnShow",data=>{
				this.$emit('update:showNavi',data.visible)
				console.log(this.showNavi)
				this.showNaviGroup = data.visible
			})
			emitter.on("setLayers",data=>{
				if(this.camera!=null){
					 switch(data.opType){
					 	case 'toggle':
					 		this.camera.layers.toggle(data.layer);
					 	break;
					 	case 'enable':
					 		this.camera.layers.enable(data.layer);
					 	break;
					 	case 'disable':
					 		this.camera.layers.disable(data.layer);
					 	break;
					 	case 'set':
					 		this.camera.layers.set(data.layer);
					 	break;
					 	case 'enableAll':
					 		this.camera.layers.enableAll();
					 	break;
					 	case 'disableAll':
					 		this.camera.layers.disableAll();
					 	break;
					 }
					this.renderer.render(this.scene, this.camera)
				}
			})
			
			emitter.on("setCameraPosition",data=>{
				if(this.camera_controls!=null){
					console.log(data.position)
				   // this.camera_controls.moveTo(data.position.x,data.position.y,data.position.z,true)
					this.camera_controls.setLookAt(data.position.x,data.position.y,data.position.z,data.lookAt.x,data.lookAt.y,data.lookAt.z,true)
				}
			})
			//loadType,tripWay, lineName, speed, callFunc
			emitter.on("setCameraRoam",data => {
				console.log(data)
				let optData = this.contentData.roams.get(data.lineName)
				if(optData == null){
					data.callFunc&& data.callFunc({
						code: 105,
						msg: '漫游路线不存在'
					})
					return;
				}
				
				this.roamOptions.cmd = data.cmd
				this.roamOptions.tripWay = data.tripWay
				
				
				this.roamOptions.lineName = data.lineName
				
				
				this.roamOptions.roamPoints = optData.roamPoints
				this.roamOptions.lineColor  = optData.lineColor
				if(!isNaN(parseFloat(data.lineStep)) && isFinite(data.lineStep)){
					this.roamOptions.lineStep = data.lineStep
				}else{
					this.roamOptions.lineStep  = optData.lineStep
				}
				if(!isNaN(parseFloat(data.speedRate)) && isFinite(data.speedRate)){
					this.roamOptions.speedRate = data.speedRate
				}else{
					this.roamOptions.speedRate  = optData.speedRate
				}
				
				this.roamOptions.tension  = optData.tension
				this.roamOptions.offsetAngle  = optData.offsetAngle
				this.setCameraRoam()
			})
			

		}
	}
</script>

<style>
	.canvas-container-main,
	.WebRTCVideo,
	.ViewerWindow-render-crop-container {
		position: absolute;
		top: 0px;
		right: 0;
		bottom: 0px;
		left: 0px;
	}

	.viewer-main {
		width: 100%;
		height: 100%;
	}

	.navi-box-main {
		position: absolute;
		z-index: 4;
		right: 0;
		bottom: 20px;
	}

	.canvas-container-main {
		z-index: 3;
	}

	.ViewerWindow-render-crop-container {
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.WebRTCVideo-video {
		width: 100%;
		height: 100%;
		object-fit: fill;
	}
</style>
