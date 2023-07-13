(function(e,k){typeof exports=="object"&&typeof module<"u"?module.exports=k(require("vue")):typeof define=="function"&&define.amd?define(["vue"],k):(e=typeof globalThis<"u"?globalThis:e||self,e.Gui=k(e.Vue))})(this,function(e){"use strict";const k="";function L(t,n="px"){return t?typeof t=="string"?t:`${t}${n}`:""}let r={},N="../assets";const G=(t,n)=>{console.log(t,n),r&&(r=t),n&&(N=n)},$=(t,n,a)=>{let l={offsetX:0,offsetY:0};const o=s=>{const d=s.clientX,m=s.clientY,{offsetX:g,offsetY:p}=l,f=t.value.getBoundingClientRect(),u=f.left,w=f.top,_=f.width,S=f.height,E=document.documentElement.clientWidth,B=document.documentElement.clientHeight,h=-u+g,Te=-w+p,Ie=E-u-_+g,Pe=B-w-S+p,P=D=>{const F=Math.min(Math.max(g+D.clientX-d,h),Ie),X=Math.min(Math.max(p+D.clientY-m,Te),Pe);l={offsetX:F,offsetY:X},t.value.style.transform=`translate(${L(F)}, ${L(X)})`},M=()=>{document.removeEventListener("mousemove",P),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",P),document.addEventListener("mouseup",M)},c=()=>{n.value&&t.value&&n.value.addEventListener("mousedown",o)},i=()=>{n.value&&t.value&&n.value.removeEventListener("mousedown",o)};e.onMounted(()=>{e.watchEffect(()=>{a.value?c():i()})}),e.onBeforeUnmount(()=>{i()})},Me="",A=["src"],V={__name:"index",props:{imgName:String,isShow:{type:Boolean,default:!1},width:{type:Number,default:34},height:{type:Number,default:34}},emits:["update:isShow"],setup(t,{emit:n}){const a=t,l=e.ref(""),o=s=>{const d=`${N}/img/${a.imgName}`;return s?`${d}_on.png`:`${d}.png`};l.value=o(a.isShow);const c=e.computed({get(){return a.isShow},set(s){n("update:isShow",s)}}),i=()=>{c.value=!c.value};return e.watch(c,s=>{l.value=o(s)}),(s,d)=>(e.openBlock(),e.createElementBlock("div",{onClick:i,class:"g-btn",style:e.normalizeStyle({width:t.width+"px"})},[e.createElementVNode("img",{src:l.value},null,8,A)],4))}},De="",W={class:"el-btn"},z={class:"text"},C={__name:"el-btn",props:{imgName:String,titleName:String,labelList:{type:Array,default:()=>[]},isSelected:{type:Boolean,default:!1},isAlone:{type:Boolean,default:!0},arrowSelect:{type:Boolean,default:!1}},emits:["change","update:isSelected","update:arrowSelect"],setup(t,{emit:n}){const a=t,l=e.computed({get(){return a.isSelected},set(c){a.isAlone&&a.labelList.forEach(i=>i.isSelected=!1),n("update:isSelected",c),n("change",{title:a.titleName,status:c})}}),o=e.computed({get(){return a.arrowSelect},set(c){a.labelList.forEach(i=>i.arrowSelect=!1),n("update:arrowSelect",c)}});return(c,i)=>(e.openBlock(),e.createElementBlock(e.Fragment,null,[e.createElementVNode("div",W,[e.createVNode(V,{isShow:e.unref(l),"onUpdate:isShow":i[0]||(i[0]=s=>e.isRef(l)?l.value=s:null),imgName:a.imgName},null,8,["isShow","imgName"]),e.createVNode(V,{isShow:e.unref(o),"onUpdate:isShow":i[1]||(i[1]=s=>e.isRef(o)?o.value=s:null),width:9,imgName:"tree_arrow"},null,8,["isShow"])]),e.createElementVNode("div",z,e.toDisplayString(a.titleName.length===2?`\xA0 ${a.titleName}`:a.titleName),1)],64))}},Fe="",H={class:"opt-content"},Y={__name:"opt-panel",props:{isSelected:{type:Boolean,default:!1}},emits:["update:isSelected"],setup(t,{emit:n}){const a=t,l=e.ref(null),o=e.ref(null),c=e.computed({get(){return a.isSelected},set(i){n("update:isSelected",i)}});return $(l,o,c),(i,s)=>e.unref(c)?(e.openBlock(),e.createElementBlock("div",{key:0,ref_key:"optRef",ref:l,class:"opt-panel"},[e.createElementVNode("div",{ref_key:"optHeaderRef",ref:o,class:"opt-header"},[e.renderSlot(i.$slots,"header")],512),e.createElementVNode("div",H,[e.renderSlot(i.$slots,"default")])],512)):e.createCommentVNode("",!0)}},Xe="",O={class:"g-input"},j={class:"dot"},y={__name:"index",props:{modelValue:{type:[String,Number],default:""},unit:{type:String,default:""}},emits:["update:modelValue"],setup(t,{emit:n}){const a=t,l=e.computed({get(){return a.modelValue},set(o){console.log(o),n("update:modelValue",o)}});return(o,c)=>(e.openBlock(),e.createElementBlock("div",O,[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":c[0]||(c[0]=i=>e.isRef(l)?l.value=i:null),class:"gui-btn"},null,512),[[e.vModelText,e.unref(l)]]),e.createElementVNode("div",j,e.toDisplayString(a.unit),1)]))}};function q(){x({destination:{longitude:107.5,latitude:38,height:85117358e-1},orientation:{heading:0,pitch:-90,roll:0},duration:1})}function x({destination:t,orientation:n,duration:a}){const{longitude:l,latitude:o,height:c}=t,{heading:i,pitch:s,roll:d}=n;console.log(l,o,c,i,s,d,a),r.viewer.camera.flyTo({destination:Cesium.Cartesian3.fromDegrees(l,o,c),orientation:{heading:Cesium.Math.toRadians(i),pitch:Cesium.Math.toRadians(s),roll:d},duration:a})}function R(){x({destination:{longitude:120.5,latitude:28.891179,height:22191651},orientation:{heading:0,pitch:-90,roll:0},duration:1})}const J=(t,n,a,l,o,c,i,s=!1,d=100)=>{t.value.addEventListener("mousedown",m=>{const g=a.value.getBoundingClientRect(),p=m.pageX,f=p-g.x,u=a.value.offsetWidth;let w=0,_=0;const S=E=>{const B=E.pageX;_=f+B-p,console.log("right",_),console.log("left",w);let h=(_-w)/u;return _>=u&&(h=1),_<=0&&(h=0),h=h.toFixed(d.toString().length-1),c.value.innerHTML=(h*d).toFixed(0),console.log("precent",h),n.value.style.left=h*100+"%",l.value.style.width=h*100+"%",h*d};document.addEventListener("mousemove",S),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",S)})})},K=(t,n,a,l,o,c,i=100)=>{n.value.addEventListener("click",s=>{const d=n.value.getBoundingClientRect(),m=s.pageX,g=m-d.x,p=n.value.offsetWidth;let f=(g/p).toFixed(2);m<=d.x&&(f=0),m-d.x>=p&&(f=1),o.value.innerHTML=(f*i).toFixed(0),t.value.style.left=f*100+"%",a.value.style.width=f*100+"%"})},Ge="",U=(t,n)=>{const a=t.__vccOpts||t;for(const[l,o]of n)a[l]=o;return a},Q=U({__name:"index",props:{buttonPosition:{type:String,default:"0%"},sliderWidth:{type:Number},handlerFunction:{type:Function,default:()=>{}}},setup(t){const n=t,a=e.computed(()=>({left:n.buttonPosition})),l=e.computed(()=>({width:n.sliderWidth})),o=e.ref(null),c=e.ref(null),i=e.ref(null),s=e.ref(null),d=e.ref(0),m=e.ref(null);return e.onMounted(()=>{J(o,c,i,s,d,m,handlerFunction),K(c,i,s,d,m,handlerFunction)}),(g,p)=>(e.openBlock(),e.createElementBlock("div",{class:"slider-container",style:e.normalizeStyle(e.unref(l))},[e.createElementVNode("div",{class:"slider-runway",ref_key:"runwayRef",ref:i},[e.createElementVNode("div",{class:"slider-bar",ref_key:"barRef",ref:s},null,512),e.createElementVNode("div",{class:"slider-button",ref_key:"buttonRef",ref:c,style:e.normalizeStyle(e.unref(a))},[e.createElementVNode("div",{class:"slider-button-inner",ref_key:"buttonInnerRef",ref:o},null,512)],4),e.createElementVNode("span",{class:"info",ref_key:"infoRef",ref:m},"0",512)],512)],4))}},[["__scopeId","data-v-e1cf5790"]]),We="",Z={class:"detail-btn"},v={class:"angle-view-head"},ee=e.createElementVNode("button",{class:"gui-btn gui-button mg-r"}," \u6062\u590D\u9ED8\u8BA4 ",-1),te=e.createElementVNode("button",{class:"gui-btn gui-button mg-r"}," \u5F53\u524D\u76F8\u673A ",-1),ne={class:"panel-div"},oe=e.createElementVNode("div",{class:"panel-div-1"},"\u98DE\u884C\u65F6\u95F4\uFF1A",-1),ae={class:"panel-div"},le=e.createElementVNode("div",{class:"panel-div-1"},"\u4F4D\u7F6E\uFF1A",-1),ie={class:"panel-div"},se=e.createElementVNode("div",{class:"panel-div-1"},"\u671D\u5411\uFF1A",-1),T={__name:"index",props:{labelList:{type:Array,default:()=>[]}},setup(t){const n=t,a=e.reactive({destination:{longitude:107.5,latitude:38,height:85117358e-1},orientation:{heading:0,pitch:-90,roll:0},duration:1}),{destination:l,orientation:o,duration:c}=e.toRefs(a),i=()=>{console.log(a),x(a)},s=m=>{switch(m.title){case"\u4E2D\u56FD":q();break;case"\u5168\u7403":R();break;case"\u81EA\u5B9A\u4E49":R();break}},d=m=>{console.log(c.value),c.value=m};return(m,g)=>(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.labelList,(p,f)=>(e.openBlock(),e.createElementBlock("div",{class:"type-1-c-btn",key:f+"label"},[e.createElementVNode("div",Z,[e.createVNode(C,{titleName:p.name,labelList:n.labelList,onChange:s,isSelected:p.isSelected,"onUpdate:isSelected":u=>p.isSelected=u,arrowSelect:p.arrowSelect,"onUpdate:arrowSelect":u=>p.arrowSelect=u,imgName:p.img},null,8,["titleName","labelList","isSelected","onUpdate:isSelected","arrowSelect","onUpdate:arrowSelect","imgName"]),e.createVNode(Y,{isSelected:p.arrowSelect,"onUpdate:isSelected":u=>p.arrowSelect=u},{header:e.withCtx(()=>[e.createElementVNode("div",v,[e.createTextVNode(e.toDisplayString(p.name)+" ",1),e.createVNode(V,{onClick:()=>p.arrowSelect=!1,width:12,imgName:"model_close"},null,8,["onClick"])])]),default:e.withCtx(()=>[e.createElementVNode("div",null,[e.createElementVNode("div",{class:"panel-div"},[ee,te,e.createElementVNode("button",{class:"gui-btn gui-button mg-r",onClick:i}," \u5E94\u7528\u67E5\u770B ")])]),e.createElementVNode("div",ne,[oe,e.createVNode(Q,{getInfoTxt:d})]),e.createElementVNode("div",ae,[le,e.createVNode(y,{modelValue:e.unref(l).longitude,"onUpdate:modelValue":g[0]||(g[0]=u=>e.unref(l).longitude=u),unit:"\xB0"},null,8,["modelValue"]),e.createVNode(y,{modelValue:e.unref(l).latitude,"onUpdate:modelValue":g[1]||(g[1]=u=>e.unref(l).latitude=u),unit:"\xB0"},null,8,["modelValue"]),e.createVNode(y,{modelValue:e.unref(l).height,"onUpdate:modelValue":g[2]||(g[2]=u=>e.unref(l).height=u),unit:"m"},null,8,["modelValue"])]),e.createElementVNode("div",ie,[se,e.createVNode(y,{modelValue:e.unref(o).heading,"onUpdate:modelValue":g[3]||(g[3]=u=>e.unref(o).heading=u),unit:"\xB0"},null,8,["modelValue"]),e.createVNode(y,{modelValue:e.unref(o).pitch,"onUpdate:modelValue":g[4]||(g[4]=u=>e.unref(o).pitch=u),unit:"\xB0"},null,8,["modelValue"]),e.createVNode(y,{modelValue:e.unref(o).roll,"onUpdate:modelValue":g[5]||(g[5]=u=>e.unref(o).roll=u),unit:"\xB0"},null,8,["modelValue"])])]),_:2},1032,["isSelected","onUpdate:isSelected"])])]))),128))}};e.markRaw(T);const I=[{title:"\u6F2B\u6E38",isSelected:!0,content:[{typeName:"\u573A\u666F",labelList:[{name:"\u4FDD\u5B58",img:"savecj"}]},{typeName:"\u89C6\u89D2",component:e.markRaw(T),labelList:[{name:"\u5168\u7403",img:"global"},{name:"\u4E2D\u56FD",img:"china"},{name:"\u81EA\u5B9A\u4E49",img:"view"}]},{typeName:"\u641C\u7D22\u5B9A\u4F4D",labelList:[{type:"input",name:"\u641C\u7D22",img:"china"}]},{typeName:"\u81EA\u52A8\u98DE\u884C",labelList:[{name:"\u5168\u7403\u65CB\u8F6C",img:"globalrotation"},{name:"\u4E2D\u5FC3\u65CB\u8F6C",img:"centerrotation"},{name:"\u7ED1\u5B9A\u76F8\u673A",img:"cameraattach"}]}]},{title:"\u89C6\u56FE",content:[{typeName:"\u63A7\u4EF6",labelList:[{name:"\u56FE\u5C42\u7BA1\u7406",img:"layer"},{name:"\u5BFC\u822A\u63A7\u4EF6",img:"nav"},{name:"\u6BD4\u4F8B\u5C3A",img:"scale"},{name:"\u72B6\u6001\u680F",img:"state"},{name:"\u65F6\u95F4\u7EBF",img:"time"},{name:"\u74E6\u7247\u6D4B\u8BD5",img:"test"}]},{typeName:"\u5206\u5C4F",labelList:[{name:"\u5355\u89C6\u53E3",img:"singleviewport"}]},{typeName:"\u8C03\u8BD5",labelList:[{name:"\u5730\u5F62\u8C03\u8BD5",img:"terrain"},{name:"\u74E6\u7247\u8C03\u8BD5",img:"3Dtiles"},{name:"\u573A\u666F\u622A\u56FE",img:"layer"},{name:"\u5730\u7403\u989C\u8272",img:"global"},{name:"Token",img:"token"}]}]},{title:"\u5F71\u50CF",content:[{typeName:"\u6570\u636E\u6E90",labelList:[{name:"\u5168\u7403",img:"global"},{name:"\u4E2D\u56FD",img:"china"},{name:"\u81EA\u5B9A\u4E49",img:"view"}]}]},{title:"\u74E6\u7247",content:[{typeName:"\u6570\u636E\u6E90",labelList:[{name:"\u5168\u7403",img:"global"},{name:"\u4E2D\u56FD",img:"china"},{name:"\u81EA\u5B9A\u4E49",img:"view"}]}]},{title:"\u5730\u5F62",content:[{typeName:"\u6570\u636E\u6E90",labelList:[{name:"\u5168\u7403",img:"global"},{name:"\u4E2D\u56FD",img:"china"},{name:"\u81EA\u5B9A\u4E49",img:"view"}]}]},{title:"\u5206\u6790",content:[{typeName:"\u53EF\u89C6\u5316",labelList:[{name:"\u5168\u7403",img:"global"},{name:"\u4E2D\u56FD",img:"china"},{name:"\u81EA\u5B9A\u4E49",img:"view"}]}]},{title:"\u6548\u679C",content:[{typeName:"\u5929\u6C14",labelList:[{name:"\u592A\u9633",img:"sun"},{name:"\u6708\u4EAE",img:"moon"},{name:"\u5927\u6C14",img:"atmosphere"},{name:"\u4E91",img:"cloud"},{name:"\u96E8",img:"rain"},{name:"\u96EA",img:"snow"},{name:"\u96FE",img:"fog"},{name:"\u5168\u5C4F\u96FE\u6548",img:"fogpostprocess"},{name:"\u661F\u7A7A",img:"starrysky"},{name:"\u5929\u7A7A\u76D2",img:"skybox"}]}]},{title:"\u6807\u7ED8",content:[{typeName:"\u6807\u7ED8\u5E93",labelList:[{name:"\u5168\u7403",img:"global"},{name:"\u4E2D\u56FD",img:"china"},{name:"\u81EA\u5B9A\u4E49",img:"view"}]}]},{title:"\u5176\u4ED6",content:[{typeName:"\u6570\u636E\u6E90",labelList:[{name:"\u5168\u7403",img:"global"},{name:"\u4E2D\u56FD",img:"china"},{name:"\u81EA\u5B9A\u4E49",img:"view"}]}]}],ze="",ce={class:"g-tabs"},re=["onClick"],de={__name:"tabs",emits:["changeTab"],setup(t,{emit:n}){const a=I.map(s=>({title:s.title,isSelected:!!s.isSelected})),l=e.reactive(a);let o=l.find(s=>s.isSelected);const c=s=>{o.isSelected=!1,s.isSelected=!0,o=s,i(o)},i=s=>{const d=I.find(m=>m.title===s.title);n("changeTab",d)};return e.onMounted(()=>{console.log(o),i(o)}),(s,d)=>(e.openBlock(),e.createElementBlock("div",ce,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(l,(m,g)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["g-tabs-item",{"is-selected":m.isSelected}]),onClick:p=>c(m),key:g+"tab"},e.toDisplayString(m.title),11,re))),128))]))}};function me(t){let n=t.status;switch(t.title){case"\u5BFC\u822A\u63A7\u4EF6":ge(n);break;case"\u6BD4\u4F8B\u5C3A":ue(n);break;case"\u5730\u5F62\u8C03\u8BD5":pe(n);break;case"\u74E6\u7247\u8C03\u8BD5":fe(n);break}}function ge(t){r.camera.navigator.showCompass=t}function ue(t){r.camera.navigator.showDistanceLegend=t}function pe(t){r.misc.debug.cesiumInspectorVisibility=t}function fe(t){r.misc.debug.tilesetInspectorVisibility=t}const b=t=>`${N}/skyboxes/sky1/${t}.jpg`;function he(t,n=1){if(t){var a=r.czm.viewer,l=r.weather.sunPosition;r.weather.sun.enabled=t,r.weather.sun.glowFactor=n,a.camera.flyTo({destination:new Cesium.Cartesian3(-l.x/1e3,-l.y/1e3,-l.z/2e3),orientation:{heading:0,pitch:Cesium.Math.toRadians(-90),roll:0}})}else r.camera.flyTo([2.1031217486531673,.5041647748838838,2102141583325694e-8],0,[6.283185307179586,-1.5705982258639,0])}function _e(t){if(t){var n=r.czm.viewer,a=r.weather.moonPosition;r.weather.moon.enabled=t,n.camera.flyTo({destination:new Cesium.Cartesian3(a.x/1.2,a.y/1.2,a.z/1.2),orientation:{heading:0,pitch:Cesium.Math.toRadians(90),roll:0}})}else r.camera.flyTo([2.1031217486531673,.5041647748838838,2102141583325694e-8],0,[6.283185307179586,-1.5705982258639,0])}function ye(t){r.weather.atmosphere.enabled=t,r.weather.atmosphere.brightnessShift=.5,r.weather.atmosphere.hueShift=0,r.weather.atmosphere.saturationShift=.5}function be(t){r.enableCloud=t}function we(t){r.weather.rainPostProcess.enabled=t}function ke(t){r.weather.snowPostProcess.enabled=t}function Se(t){r.weather.fog.enabled=t,r.weather.fog.density=.002,r.weather.fog.minimumBrightness=1}function Ne(t){r.weather.skyBox.enabled=t,r.weather.skyBox.topSkyBoxOnGroundImageUri=b("top"),r.weather.skyBox.bottomSkyBoxOnGroundImageUri=b("bottom"),r.weather.skyBox.eastSkyBoxOnGroundImageUri=b("east"),r.weather.skyBox.southSkyBoxOnGroundImageUri=b("south"),r.weather.skyBox.westSkyBoxOnGroundImageUri=b("west"),r.weather.skyBox.northSkyBoxOnGroundImageUri=b("north")}function Ve(t){const n=document.getElementsByTagName("body")[0];n.onload=()=>{options.skyBox.show=t}}function xe(t){r.weather.fogPostProcess.enabled=t}const Ee={class:"detail-btn"},Be={__name:"index",props:{labelList:{type:Array,default:()=>[]}},setup(t){const n=t,a=l=>{console.log("\u6211\u662F\u516C\u7528\u7684\u7EC4\u4EF6"),me(l);let o=l.status;switch(l.title){case"\u592A\u9633":he(o);break;case"\u6708\u4EAE":_e(o);break;case"\u5927\u6C14":ye(o);break;case"\u4E91":be(o);break;case"\u96E8":we(o);break;case"\u96EA":ke(o);break;case"\u96FE":Se(o);break;case"\u661F\u7A7A":Ne(o);break;case"\u5929\u7A7A\u76D2":Ve(o);break;case"\u5168\u5C4F\u96FE\u6548":xe(o);break}};return(l,o)=>(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.labelList,(c,i)=>(e.openBlock(),e.createElementBlock("div",{class:"type-1-c-btn",key:i+"label"},[e.createElementVNode("div",Ee,[e.createVNode(C,{titleName:c.name,labelList:n.labelList,onChange:a,isSelected:c.isSelected,"onUpdate:isSelected":s=>c.isSelected=s,imgName:c.img},null,8,["titleName","labelList","isSelected","onUpdate:isSelected","imgName"])])]))),128))}},He="",Ye="",Le={class:"g-dialog-content"},$e={class:"type-1-t"},Ce={class:"type-1-c"},Re=U({__name:"App",setup(t){const n=e.ref(null),a=e.ref(null),l=e.ref(!0);let o=e.reactive({list:[]});$(n,a,l);const c=i=>{o.list=i&&i.content||[]};return(i,s)=>(e.openBlock(),e.createElementBlock("div",{class:"g-dialog",ref_key:"dialogRef",ref:n},[e.createElementVNode("div",{ref_key:"headerRef",ref:a,class:"g-dialog-header"},[e.createVNode(de,{onChangeTab:c})],512),e.createElementVNode("div",Le,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(o).list,(d,m)=>(e.openBlock(),e.createElementBlock("div",{class:"type-1",key:m+"type"},[e.createElementVNode("div",$e,e.toDisplayString(d.typeName),1),e.createElementVNode("div",Ce,[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(d.component?d.component:Be),{labelList:d.labelList},null,8,["labelList"]))])]))),128))])],512))}},[["__scopeId","data-v-9c1a1b14"]]);function Ue(t="app",n,a){return G(n,a),document.getElementById(t)?n?Re:(console.error("\u672A\u68C0\u67E5\u5230GvolEngine\u5B9E\u4F8B"),!1):(console.error("\u8BF7\u5148\u521B\u5EFAgvol\u7236\u7EA7dom"),!1)}return(t,n,a="gui")=>{const l=Ue("app",t,n);return e.createApp(l).mount(`#${a}`)}});
