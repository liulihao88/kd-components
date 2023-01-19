### gStyle 是全局公共样式文件。提供了最常用css样式属性， 下面是对公共属性的介绍。维护人: 刘力豪
> 新增负数使用, -1000至1000之间为可选值. 其中-100-1000和100-1000之间,只能是偶数和5的倍数. example: `t--50% => top: -50%; m-l--20 => margin-left: 20px;`;
#### 0. 公共颜色
> 一般后边有2的都是浅色, 不带2的都是常用normal色. 已跟ui确认色值,可覆盖大部分常用颜色
class中使用`class="cl-85 bg-blue"`, 
style中使用` <div style="background: var(--blue2); color: var(--red); fontSize: 40px">测试字体色</div>`
scoped中使用 `.test-text {
  color: var(--white);
  background: var(--gray);
  border: 1px solid var(--line);
}`


--blue: #365edf; // 主题蓝色
--blue2: #ecf2fe; // 浅蓝色
--85: rgba(39, 48, 75, 0.85); // 主要字体色85
--65: rgba(39, 48, 75, 0.65); // 次要字体色65
--45: rgba(39, 48, 75, 0.45);
--black: #000;
--white: #ffffff;
--red: #e34d95; // 主要红色
--red2: #fdecee;
--yellow: #ffb51f; // 主要黄色
--yellow2: #fef3e6;
--green: #00a870; // 主要绿色
--green2: #e8f8f2;
--gray: #ebedf0; // 主要灰色
--gray2: #f7f8fa;
--line: #e3e6eb; // 分割线颜色


> 绝大部分属性 100 以内奇数和偶数都可设置。 100-1000 之间的只能是偶数和 5 的倍数。 超过 1000 的均不支持。


#### 1. margin 外边距(方向要以上右下左为准)
> 遵循上右下左的顺序. 
- m => margin: 8px;
- mr => margin-right: 8px;
- mlr => margin: 0 8px;
- mtb2 => margin: 16px 0;
- m-lr-8 => margin: 0 8px;
- m-t-24 => margin-top: 24px;
- m-tb-24 => margin: 24px 0;
- m--24 => margin: -24px;

#### 2. padding 内边距

- p => padding: 8px;
- pr2 => padding-right: 16px;
- p-tb-16=> padding: 16px 0;
- p-8 => padding: 8px;
- p--8 => padding: -8px;

#### 3. width 宽度

- w-20 => width: 20px;
- w-20% => width: 20%;
- w-block => width: 100%;

#### 4. height 高度

- h-20 => height: 20px;
- h-20% => height: 20%;
- h-block => height: 100%;

#### 5. flex 布局

- f => display: flex; align-items: center;
- f-i => display: inline-flex; align-items: center;
- f-wrap, f-w => flex-wrap: wrap;
- f-c => flex-direction: column;
- f-bt => display: flex; align-items: center; justify-content: space-between;
- f-ar => display: flex; align-items: center; justify-content: space-around;
- f-ct => display: flex; align-items: center; justify-content: center;
- f-fe => display: flex; align-items: center; justify-content: flex-end;

#### 6. line-height 行高

- l-h-24 => line-height: 24px;
- l-h-30% => line-height: 30%;

#### 7. min-height 最小高度

- m-h-24 => min-height: 24px;
- m-h-30% => min-height: 30%;

#### 8. min-width 最小宽度

- m-w-24 => min-width: 24px;
- m-w-30% => min-width: 30%;

#### 9. position 布局

- po-r => position: relative;
- po-a => position: absolute;
- po-f => position: fixed;
- po-s => position: static;

#### 10. 上右下左定位

- t-10 => top: 10px;
- t-10% => top: 10%;
- r-10 => right: 10px;
- r-10% => right: 10%;
- b-10 => bottom: 10px;
- b-10% => bottom: 10%;
- l-10 => left: 10px;
- l-10% => left: 10%;

#### 11. font-size 字体大小

- ft-23 => font-size: 23px;
- ft-44 => font-size: 44px;

#### 12. border-radius 圆角

> border-radius 最大到 100

- br-40 => border-radius: 40px;
- br-40% => border-radius: 40%;

#### 13. border 边框

> border 最大到 100

- bd-1 => border: 1px solid var(--line-color);
- bd-l-1 => border-left: 1px solid var(--line-color);
- bd-b-1 => border-bottom: 1px solid var(--line-color);

#### 14. opacity 透明度 和 overflow

- o-1 => opacity: 0.1
- o-h => overflow: hidden
- o-v => overflow: visible
- o-s => overflow: scroll
- o-a => overflow: auto

#### 15. display 显示相关

- d-b => display: block;
- d-n => display: none;
- d-i => display: inline;
- d-ib => display: inline-block;
- d-f => display: flex;

#### 16. font-weight 字体粗细

- fw => font-weight: 900;
- fw-100 => font-weight: 100;
- fw-900 => font-weight: 900;

#### 17 文本对齐方式 text-align

- tl => text-align: left;
- tc => text-align: center;
- tr => text-align: right;

#### 18 字体对齐方式 vertical-align

- vt => vertical-align: top;
- vb => vertical-align: bottom;
- vm => vertical-align: middle;
- vbl => vertical-align: baseline;
- vsb => vertical-align: sub;
- vsp => vertical-align: super;

#### 19. box-sizing 盒模型

- bs => box-sizing: border-box;

#### 20. 鼠标移入成小手

- cp => cursor: pointer;

#### 21. 文本超出换行或隐藏， 最多 5 行

- line-1 => 1 行, 超出显示... overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
- line-4 => 4 行, 超出显示... display: -webkit-box !important;overflow: hidden;text-overflow: ellipsis;word-break: break-all;-webkit-line-clamp: $i;-webkit-box-orient: vertical !important;

#### 22. 居中对齐

ma => margin: 0 auto;

#### 23. shadow

sd => box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);

#### 24. list 选中的文本 active

ac => color: var(--primary-color);

#### 25. 链接文本

link => cursor: pointer; color: var(--primary-color);

#### 26. z-index 层级

z-100 => z-index: 100;
z-800 => z-index: 800;
