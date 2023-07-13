/**
 * 路径编辑器
 */

let points = [];
let timer = null;

/**
 * 位置与视角
 */
class Point {
  constructor() {
    this.position = gCamera.position.clone();
    this.quaternion = gCamera.quaternion.clone();
  }

  go() {
    gCamera.position.copy(this.position.clone());
    gCamera.quaternion.copy(this.quaternion.clone());
  }
}

/**
 * 开关录制
 */
function ToggleRecord() {
  if (timer !== null) {
    StopRecord();
  } else {
    StartRecord();
  }
}

/**
 * 开始录制
 */
function StartRecord() {
  clearInterval(timer);
  points = [];

  timer = setInterval(() => {
    points.push(new Point());
  }, 100);

  window._title = document.title;
  document.title = document.title + "🔥";
}

/**
 * 停止录制
 */
function StopRecord() {
  clearInterval(timer);
  timer = null;

  document.title = window._title || document.title;

  console.log("请保存此数据到变量中，不用每次都录入：", JSON.stringify(points));
}

/**
 * 点击记录
 */
function AddPoint(event) {
  points.push(new Point());
}

async function ExcutePoint() {
  if (timer) {
    StopRecord();
  }

  if (!points.length) {
    return;
  }

  for (let i = 0; i < points.length; i++) {
    await (function () {
      return new Promise((resolve) => {
        points[i].go();
        setTimeout(resolve, 100);
      });
    })();
  }

  console.log("结束");

  // 循环漫游
  ExcutePoint();
}
