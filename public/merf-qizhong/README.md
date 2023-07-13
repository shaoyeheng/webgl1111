## 说明

目前实现了键盘控制: 加速(shift)、前进（W）、后退(S)、左移(A)、右移(D)、左右倾斜(Q|E)、原地上升(R)、原地下降(F)。

要实现UI按钮控制以上行为，需要先实现按钮的`mousedown`和`mouseup`功能。


#### 这是接口函数
```js
/**
 * 通过UI按钮控制视角和移动
 * w: 前进
 * s: 后退
 * a: 左移
 * d: 右移
 * r: 上升
 * f: 下降
 * @param {"w"|"s"|"a"|"d"|"r"|"f"} key 需要执行的动作
 * @param isInAction 是否执行
 */
function FlyByUI(key, isInAction = false) void

```

#### 调用方式
```html
<button onmousedown="FlyByUI('r', true)" onmouseup="FlyByUI('r', false)" >上升</button>

...以此内推
```