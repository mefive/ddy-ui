# 目录结构
+ `components` 组件目录
+ `common` 公共组件、抽象类
+ `utils` 工具函数目录
+ `style` 公共样式

# 组件结构
每个组件目录下包含
+ `.jsx` 组件文件
+ `style` 组件样式目录

# 组件要求与编码风格
组件需要遵循 [airbnb] (https://github.com/airbnb/javascript)编码风格  

组件的 props 需由详尽的 `propTypes` 描述, 复杂类型需要用 `ArrayOf` 与 `shape` 描述。必传字段需要用 `.isRequired` 加以限制，并在 `defaultProps` 中给出默认值。  

组件函数需按以下次序排列
+ React 生命周期函数
+ `onXXXEvent` 事件处理函数
+ `getter setter`
+ 其他函数
+ `renderXXX` 局部渲染函数
+ `render` 函数
