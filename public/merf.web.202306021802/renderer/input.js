/**
 * @fileoverview Input event handling.
 */

// With PointerLockControls we have to track key states ourselves.
/** @type {boolean} */
let gKeyW = false;
/** @type {boolean} */
let gKeyA = false;
/** @type {boolean} */
let gKeyS = false;
/** @type {boolean} */
let gKeyD = false;
/** @type {boolean} */
let gKeyQ = false;
/** @type {boolean} */
let gKeyE = false;
/** @type {boolean} */
let gKeyShift = false;

/**
 * Keeps track of frame times for smooth camera motion.
 * @type {!THREE.Clock}
 */
const gClock = new THREE.Clock();

/**
 * Adds event listeners to UI.
 */
function addHandlers() {
  document.addEventListener("keypress", function (e) {
    if (e.keyCode === 32 || e.key === " " || e.key === "Spacebar") {
      if (gDisplayMode == DisplayModeType.DISPLAY_NORMAL) {
        gDisplayMode = DisplayModeType.DISPLAY_DIFFUSE;
      } else if (gDisplayMode == DisplayModeType.DISPLAY_DIFFUSE) {
        gDisplayMode = DisplayModeType.DISPLAY_FEATURES;
      } else if (gDisplayMode == DisplayModeType.DISPLAY_FEATURES) {
        gDisplayMode = DisplayModeType.DISPLAY_VIEW_DEPENDENT;
      } else if (gDisplayMode == DisplayModeType.DISPLAY_VIEW_DEPENDENT) {
        gDisplayMode = DisplayModeType.DISPLAY_COARSE_GRID;
      } /* gDisplayModeType == DisplayModeType.DISPLAY_COARSE_GRID */ else {
        gDisplayMode = DisplayModeType.DISPLAY_NORMAL;
      }
      e.preventDefault();
    }
    if (e.key === "i") {
      gStepMult += 1;
      console.log("num samples per voxel:", gStepMult);
      e.preventDefault();
    }
    if (e.key === "o") {
      gStepMult -= 1;
      console.log("num samples per voxel:", gStepMult);
      e.preventDefault();
    }
  });
  document.addEventListener("keydown", function (e) {
    let key = e.key.toLowerCase();
    if (key === "w") {
      gKeyW = true;
      e.preventDefault();
    }
    if (key === "a") {
      gKeyA = true;
    }
    if (key === "s") {
      gKeyS = true;
      e.preventDefault();
    }
    if (key === "d") {
      gKeyD = true;
      e.preventDefault();
    }
    if (key === "q") {
      gKeyQ = true;
      e.preventDefault();
    }
    if (key === "e") {
      gKeyE = true;
      e.preventDefault();
    }
    if (e.key === "Shift") {
      gKeyShift = true;
      e.preventDefault();
    }
  });
  document.addEventListener("keyup", function (e) {
    let key = e.key.toLowerCase();
    if (key === "w") {
      gKeyW = false;
      e.preventDefault();
    }
    if (key === "a") {
      gKeyA = false;
    }
    if (key === "s") {
      gKeyS = false;
      e.preventDefault();
    }
    if (key === "d") {
      gKeyD = false;
      e.preventDefault();
    }
    if (key === "q") {
      gKeyQ = false;
      e.preventDefault();
    }
    if (key === "e") {
      gKeyE = false;
      e.preventDefault();
    }
    if (e.key === "Shift") {
      gKeyShift = false;
      e.preventDefault();
    }
    if (e.key === "l") {
      ToggleRecord()
    }

    if (e.key === "m") {
      ExcutePoint()
    }
  });
}

/**
 * 通过UI按钮控制视角和移动
 * @param {"w"|"s"|"a"|"d"|"r"|"f"} key 需要执行的动作
 * @param isInAction 是否执行
 */
function FlyByUI(key, isInAction = false) {
  switch (key) {
    case "w":
      gFlyControls.moveState.forward = isInAction ? 1 : 0;
      break;
    case "s":
      gFlyControls.moveState.back = isInAction ? 1 : 0;
      break;

    case "a":
      gFlyControls.moveState.left = isInAction ? 1 : 0;
      break;
    case "d":
      gFlyControls.moveState.right = isInAction ? 1 : 0;
      break;

    case "r":
      gFlyControls.moveState.up = isInAction ? 1 : 0;
      break;
    case "f":
      gFlyControls.moveState.down = isInAction ? 1 : 0;
      break;

    case "q":
      gFlyControls.moveState.rollLeft = isInAction ? 1 : 0;
      break;
    case "e":
      gFlyControls.moveState.rollRight = isInAction ? 1 : 0;
      break;

    case "up":
      gFlyControls.moveState.pitchUp = isInAction ? 1 : 0;
      break;
    case "do":
      gFlyControls.moveState.pitchDown = isInAction ? 1 : 0;
      break;
    case "le":
      gFlyControls.moveState.yawLeft = isInAction ? 1 : 0;
      break;
    case "ri":
      gFlyControls.moveState.yawRight = isInAction ? 1 : 0;
      break;
  }

  gFlyControls.updateMovementVector()
  gFlyControls.updateRotationVector()
}

/**
 * Sets up the camera controls.
 */
function setupCameraControls(mouseMode, view) {
  gFlyControls = new THREE.FlyControls(gCamera, view);
}

/**
 * Updates the camera based on user input.
 */
function updateCameraControls() {
  const elapsed = gClock.getDelta();
  gFlyControls.update(elapsed);
  gCamera.updateProjectionMatrix();
  gCamera.updateMatrixWorld();
}
