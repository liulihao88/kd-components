
##### 一、 新增组件依赖组件库内的其它组件或utils,引入方式统一为如下格式

- 新组件依赖组件库其它组件,引入方式如下
```js
// 组件引入 import XXX from "@kd/components/XXX/src/index.vue"
import DragDialog from "@kd/components/Dialog/src/index.vue";

```

-  组件内使用utils
```js
// 例如 import {debounce} from "@kd/utils/XXX.js
import {debounce} from "@kd/utils/index.js";

```


