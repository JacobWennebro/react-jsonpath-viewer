# React JPV

This project aims to provide an updated version of [react-jsonpath-editor](https://www.npmjs.com/package/react-jsonpath-editor), originally by [jwatenbe](https://www.npmjs.com/package/react-jsonpath-editor).

### Usage

Simply `import JsonPathViewer from 'react-jsonpath-viewer'`.

| Prop name      | Description                                |   Type    |  Default  | Optional |
| -------------- | ------------------------------------------ | :-------: | :-------: | -------- |
| json           | JSON object to query                       |  object   |     -     | ❌       |
| highlightColor | Color to highlight queried json            |  string   |     -     | ❌       |
| rootChar       | JSON path prefix character(s)              |  string   |     $     | ✅       |
| component      | Allows the use of a custom input component | component | `<input>` | ✅       |

### Styling

| ⚠️ **Note:** The JPV component is designed to be headless by default meaning it is not opionated about its own styling. To apply a basic structure to the component a style.css file can be imported as such:

```js
import 'react-jsonpath-viewer/style.css';
```

![img](https://i.imgur.com/jIz1L9f.png)

For more advanced styling JPV adopts a [BEM](https://getbem.com/) hierarchy of classes that can be utilized.
