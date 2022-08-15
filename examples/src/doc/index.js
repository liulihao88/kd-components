import guideMd from "./guide.md";
import gStyleMd from "./gStyle.md"
import directiveMd from "./directive.md"
import mixinMd from "./mixin.md"

export default {
    guideMd,
    gStyleMd,
    directiveMd,
    mixinMd
}

export const docMd = {
    guide: guideMd,
    gStyle: gStyleMd,
    directive: directiveMd,
    mixin: mixinMd
}

export const docName = {
    guide: "快速使用",
    gStyle: "全局CSS",
    directive: "全局指令",
    mixin: "全局mixins"
}
