import guideMd from "./guide.md";
import addComponentsMd from "./addComponents.md"
import gStyleMd from "./gStyle.md"
import directiveMd from "./directive.md"
import mixinMd from "./mixin.md"
import FAQSMd from "./FAQS.md"

export default {
    guideMd,
    gStyleMd,
    directiveMd,
    mixinMd,
    addComponentsMd,
    FAQSMd
}

export const docMd = {
    guide: guideMd,
    gStyle: gStyleMd,
    directive: directiveMd,
    mixin: mixinMd,
    addComponents: addComponentsMd,
    faq: FAQSMd
}

export const docName = {
    guide: "快速使用",
    addComponents: '组件扩展说明',
    gStyle: "全局CSS",
    directive: "全局指令",
    mixin: "全局mixins",
    faq: "常见问题汇总"
}
