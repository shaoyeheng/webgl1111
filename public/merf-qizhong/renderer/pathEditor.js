/**
 * 路径编辑器
 */

let points = [];

/**
 * 此处添加gui便于测试和演示接口
 */
// const gui = new lil.GUI();
// const options = {
//   name: "自动漫游",
// };

// gui.add(options, "name").disable().name("");

// 录制按钮
let recordBtn = null;
// 是否正在录制
let isRecording = false;
// 当前正在的点组
let pointFolder = null;
let addBtn = null;
let previewBtn = null;
let storeFolder = null;
let cancelBtn = null;
let roam = null;

function isZero(num) {
  return Math.abs(num) < 0.2;
}

/**
 * 位置与视角
 */
class Point {
  constructor(data) {
    this.index = points.length;

    this.position = gCamera.position.clone();
    this.rotation = gCamera.rotation.clone();

    if (data) {
      this.fromJSON(data);
    }

    this.setGUI();
  }

  go = () => {
    gCamera.position.copy(this.position.clone());
    gCamera.rotation.copy(this.rotation.clone());
  };

  /**
   * 设置GUI
   */
  setGUI() {
    this.gui = pointFolder.addFolder(`点： ${this.index}`);
    const coord = this.gui.addFolder("位置与视角");
    coord.add(this.position, "x").name("位置: X").step(0.001).onChange(this.go);
    coord.add(this.position, "y").name("位置: Y").step(0.001).onChange(this.go);
    coord.add(this.position, "z").name("位置: Z").step(0.001).onChange(this.go);
    coord.add(this.rotation, "x").name("旋转: X").step(0.001).onChange(this.go);
    coord.add(this.rotation, "y").name("旋转: Y").step(0.001).onChange(this.go);
    coord.add(this.rotation, "z").name("旋转: Z").step(0.001).onChange(this.go);
    coord.close();

    this.gui.add({ preview: this.go }, "preview").name("移动此视角");
    this.gui
      .add(
        {
          delete: () => {
            this.dispose();

            points.splice(this.index, 1);
          },
        },
        "delete"
      )
      .name("删除此位置");

    this.gui.close();
  }

  fromJSON(data) {
    this.position.fromArray(data.p);
    this.rotation.fromArray(data.r);

    return this;
  }

  toJSON() {
    return {
      p: this.position.toArray(),
      r: this.rotation.toArray(),
    };
  }

  // 销毁
  dispose = () => {
    this.gui.destroy();

    delete this.position;
    delete this.rotation;
    delete this.gui;
  };
}

class Roam {
  constructor(data) {
    this.data = data;
    this.speed = 0.005
    this.rSpeed = this.speed

    this.index = 0;
    this.posEnd = new THREE.Vector3();
    this.rotEnd = new THREE.Euler();

    this.VA = new THREE.Vector3();

    this.start();
  }

  get pos() {
    return gCamera.position;
  }

  get rotation() {
    return gCamera.rotation;
  }

  updateEnd() {
    if (this.index > this.data.length - 1) {
      this.index = 0;
    }
    const item = this.data[this.index];

    this.posEnd.fromArray(item.p);

    const r = item.r;
    this.rotEnd.set(r[0], r[1], r[2]);
  }

  /**
   * 开始
   */
  start() {
    this.updateEnd();

    this.animate();
  }

  /**
   * 动画
   */
  animate = () => {
    this.rid = requestAnimationFrame(this.animate);

    const deltaP = this.VA.subVectors(this.posEnd, this.pos);
    const isSameP = isZero(deltaP.x) && isZero(deltaP.y) && isZero(deltaP.z);

    if (!isSameP) {
      gCamera.position.add(deltaP.multiplyScalar(this.speed));
    }

    const currentQ = new THREE.Quaternion().setFromEuler(this.rotation);
    const targetQ = new THREE.Quaternion().setFromEuler(this.rotEnd);
    const newQ = currentQ.slerp(targetQ, this.rSpeed);

    this.rotation.setFromQuaternion(newQ);
    const isSameR = Math.abs(currentQ.angleTo(targetQ)) < 0.2

    if (isSameP && isSameR) {
      this.index++;
      this.updateEnd();
    }
  };

  dispose() {
    delete this.data;
    cancelAnimationFrame(this.rid);

    delete this.data;
  }
}

/**
 * 清除所有数据
 */
function clearData() {
  for (let i = 0; i < points.length; i++) {
    points[i].dispose();
  }
  points = [];
}

/**
 * 使用某条数据
 */
function useData(data) {
  for (let i = 0; i < data.length; i++) {
    points.push(new Point(data[i]));
  }
}

/**
 * 预览效果
 */
function preview(data) {
  console.log("%c data", "color:pink;", data);
  if (roam) {
    return;
  }

  gCamera.position.set(data[0].p[0], data[0].p[1], data[0].p[2])
  gCamera.rotation.set(data[0].r[0], data[0].r[1], data[0].r[2])

  // 其他两个组隐藏下
  if (storeFolder) {
    storeFolder.hide();
  }
  if (pointFolder) {
    pointFolder.hide();
  }
  if (cancelBtn) {
    cancelBtn.hide();
  }
  if (addBtn) {
    addBtn.hide();
  }
  if (previewBtn) {
    previewBtn.hide();
  }
  recordBtn.hide();

  roam = new Roam(data);

  const stopBtn = gui
    .add(
      {
        stopPreview: () => {
          stopBtn.destroy();
          if (storeFolder) {
            storeFolder.show();
          }
          if (pointFolder) {
            pointFolder.show();
          }
          if (cancelBtn) {
            cancelBtn.show();
          }
          if (addBtn) {
            addBtn.show();
          }
          if (previewBtn) {
            previewBtn.show();
          }
          recordBtn.show();

          roam.dispose();
          roam = null;
        },
      },
      "stopPreview"
    )
    .name("停止预览");
}

/**
 * 开始录制
 */
function startRecord() {
  if (isRecording) {
    return;
  }
  // 先停止录制
  cancelReocord();

  // 清除数据
  clearData();

  isRecording = true;
  recordBtn.name("停止录制并生成数据");

  cancelBtn = gui
    .add({ cancel: () => cancelReocord() }, "cancel")
    .name("取消录制");

  pointFolder = gui.addFolder("关键点组");
  // 默认先添加当前位置为第一个点
  points.push(new Point());

  // 预览按钮
  previewBtn = gui
    .add(
      { preview: () => preview(points.map((item) => item.toJSON())) },
      "preview"
    )
    .name("预览效果");

  // 添加一个新增点的按钮
  addBtn = gui
    .add(
      {
        add: function () {
          points.push(new Point());
        },
      },
      "add"
    )
    .name("新增一个点");
}

/**
 * 取消录制
 */
function cancelReocord() {
  isRecording = false;
  // 销毁当前正在进行的
  if (pointFolder) {
    pointFolder.destroy();
    pointFolder = null;
  }
  if (addBtn) {
    addBtn.destroy();
    addBtn = null;
  }
  if (previewBtn) {
    previewBtn.destroy();
    previewBtn = null;
  }
  if (cancelBtn) {
    cancelBtn.destroy();
    cancelBtn = null;
  }

  recordBtn.name("开始录制");
  return;
}

/**
 * 停止录制
 */
function stopRecord() {
  if (!isRecording) {
    return;
  }
  cancelReocord();

  // 保存数据
  const data = JSON.stringify(points.map((item) => item.toJSON()));
  const key = `${window.dirurl_key || "default"}@roam@${Date.now()}`;
  localStorage.setItem(key, data);

  // 重载保存GUI
  storeFolder.children.forEach((item) => {
    item.destroy();
  });
  loadStoreList();

  alert(`此路径已保存为 ${key}`);
}

/**
 * 加载数据列表
 */
function loadStoreList() {
  const list = Object.keys(localStorage)
    .filter((item) => /@roam/.test(item))
    .map((key) => ({ key, data: JSON.parse(localStorage[key]) }));
  storeFolder = storeFolder || gui.addFolder("此模型已保存的路径");

  if (list.length) {
    for (let i = list.length - 1; i >= 0; i--) {
      const item = storeFolder.addFolder(
        `第 ${i + 1} 个路径： ${new Date(
          Number(list[i].key.replace(/.*@roam@/, ""))
        ).toLocaleString()}`
      );
      // 编辑
      item
        .add(
          {
            edit: () => {
              // 开始录制
              startRecord();

              // 清除所有数据
              clearData();

              // 使用当前数据
              useData(list[i].data);
            },
          },
          "edit"
        )
        .name("编辑");

      // 预览效果
      item
        .add({ preview: () => preview(list[i].data) }, "preview")
        .name("预览效果");

      // 删除
      item
        .add(
          {
            delete: () => {
              localStorage.removeItem(list[i].key);

              // 删除gui中的此条数据
              item.destroy();
            },
          },
          "delete"
        )
        .name("删除");
      item.close();
    }
    storeFolder.close();
  }
}

/**
 * 初始化自动漫游UI
 */
function initUI() {
  // 读取预设的路径
  loadStoreList();

  // 录制按钮
  recordBtn = gui
    .add(
      {
        startRecord: () => {
          if (isRecording) {
            stopRecord();
          } else {
            startRecord();
          }
        },
      },
      "startRecord"
    )
    .name("开始录制");
}
