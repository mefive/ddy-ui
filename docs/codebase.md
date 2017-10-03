# 目录结构
+ `components` 组件目录
+ `common` 公共的抽象与样式
+ `utils` 工具函数目录

# 组件结构
将组件的 `.jsx` 与 `.scss` 置于同一目录下  

# 组件要求与编码风格
props需由详尽的 `propTypes` 描述, 复杂类型需要用 `ArrayOf` 与 `shape` 描述。必传字段需要用 `.isRequired` 加以限制，并在 `defaultProps` 中给出默认值。