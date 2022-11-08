import guideMd from './guide.md';
import addComponentsMd from './addComponents.md';
import gStyleMd from './gStyle.md';
import directiveMd from './directive.md';
import mixinMd from './mixin.md';
import FAQSMd from './FAQS.md';
import updateCom from './updateCom.md';

export default {
  guideMd,
  gStyleMd,
  directiveMd,
  mixinMd,
  addComponentsMd,
  FAQSMd,
  updateCom,
};

export const docMd = {
  guide: guideMd,
  gStyle: gStyleMd,
  directive: directiveMd,
  mixin: mixinMd,
  addComponents: addComponentsMd,
  faq: FAQSMd,
  updateCpt: updateCom,
};

export const docName = {
  guide: '快速使用',
  addComponents: '组件扩展说明',
  gStyle: '全局CSS',
  directive: '全局指令',
  mixin: '全局mixins',
  faq: '常见问题汇总',
  updateCpt: '组件前缀kj迁移为kd',
};
