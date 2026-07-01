version:
v1.0.0
1.能否做到。如果PageA使用了组件A。我们组件A修改内容后。PageA再打开可以自动更新内容。

version：
v1.0.1
1.自定义组件设置了图片和图片地址。组件A引用时候图片加载错误。
   → 已解决：组件保存时剥离 <body> 包裹，只存 body.innerHTML

version
v1.0.2
检查目前方案对于图片block的保存。是否有将组件中的图片样式进行save。

version
v1.0.3
1.对于component类型编辑时。去除同步引用功能。 → 已解决
2.对于component类型编辑时。隐藏导出HTML功能。 → 已解决
3.如果我们的component save数据之后在page中引用。page在save 时候只保存占位id。回显的时候通过对应关系查询所有使用的component数据并进行替换。这种方式是否合理。评估一下。
   → 已评估：方案可行。Edit流程通过 injectLatestComponents 每次拉取最新组件内容；Save流程通过 getHtml() 从编辑器模型抓取含组件内容的完整HTML。唯一阻塞点(component content_html 含 body 包裹)已修复。

version
v1.0.4
在page save 中。   