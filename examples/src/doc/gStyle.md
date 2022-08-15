##  gStyle是全局公共样式文件。提供了最常用的css样式属性， 下面是对属性的介绍, 最常用的放在最前边。
> 绝大部分属性100以内奇数和偶数都可设置。 100-1000之间的只能是偶数和5的倍数。 超过1000的均不支持。


## 1. margin外边距
+ m => margin: 8px; `此种写法后期废弃, 少用`
+ mr => margin-right: 8px;
+ m-lr-8 => margin: 0 8px;
+ m-t-24 => margin-top: 24px;
## 2. padding内边距
+ p => padding: 8px;
+ pr2 => padding-right: 16px; `此种写法后期废弃, 少用`
+ p-tb-16=> padding: 16px 0;
+ p-8 => padding: 8px;
## 3. width宽度
+ w-20 => width: 20px;
+ w-20% => width: 20%;
+ w-block => width: 100%;
## 4. height高度
+ h-20 => height: 20px;
+ h-20% => height: 20%;
+ h-block => height: 100%;
## 5. flex布局
+ f => display: flex; align-items: center;
+ f-i => display: inline-flex; align-items: center;
+ f-wrap, f-w => flex-wrap: wrap;
+ f-c => flex-direction: column;
+ f-bt => display: flex; align-items: center; justify-content: space-between;
+ f-ar =>  display: flex; align-items: center; justify-content: space-around;
+ f-ct =>  display: flex; align-items: center; justify-content: center;
+ f-fe => display: flex; align-items: center; justify-content: flex-end;
## 6. line-height行高
+ l-h-24 => line-height: 24px;
+ l-h-30% => line-height: 30%;
## 7. min-height最小高度
+ m-h-24 => min-height: 24px;
+ m-h-30% => min-height: 30%;
## 8. min-width最小宽度
+ m-w-24 => min-width: 24px;
+ m-w-30% => min-width: 30%;
## 9. position布局
+ po-r => position: relative;
+ po-a => position: absolute;
+ po-f => position: fixed;
+ po-s => position: static;
## 10. 上右下左定位
+ t-10 => top: 10px;
+ t-10% => top: 10%;
+ r-10 => right: 10px;
+ r-10% => right: 10%;
+ b-10 => bottom: 10px;
+ b-10% => bottom: 10%;
+ l-10 => left: 10px;
+ l-10% => left: 10%;
## 11. font-size字体大小
+ ft-23 => font-size: 23px;
+ ft-44 => font-size: 44px;
## 12. border-radius圆角
> border-radius最大到100
+ br-40 => border-radius: 40px;
+ br-40% => border-radius: 40%;
## 13. border边框
> border最大到100
+ bd-1 => border: 1px solid var(--line-color);
+ bd-l-1 => border-left: 1px solid var(--line-color);
+ bd-b-1 => border-bottom: 1px solid var(--line-color);
## 14. opacity透明度 和 overflow
+ o-1 => opacity: 0.1
+ o-h => overflow: hidden
+ o-v => overflow: visible
+ o-s => overflow: scroll
+ o-a => overflow: auto
## 15. display显示相关
+ d-b => display: block;
+ d-n => display: none;
+ d-i => display: inline;
+ d-ib => display: inline-block;
+ d-f => display: flex;
## 16. font-weight字体粗细
+ fw => font-weight: 900;
+ fw-100 => font-weight: 100;
+ fw-900 => font-weight: 900;
## 17 文本对齐方式text-align
+ tl => text-align: left;
+ tc => text-align: center;
+ tr => text-align: right;
## 18 字体对齐方式vertical-align
+ vt => vertical-align: top;
+ vb => vertical-align: bottom;
+ vm => vertical-align: middle;
+ vbl => vertical-align: baseline;
+ vsb => vertical-align: sub;
+ vsp => vertical-align: super;
## 19. box-sizing盒模型
+ bs => box-sizing: border-box;
## 20. 鼠标移入成小手
+ cp => cursor: pointer;
## 21. 文本超出换行或隐藏， 最多5行
+ line-1 => 1行, 超出显示... overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
+ line-4 => 4行, 超出显示...  display: -webkit-box !important;overflow: hidden;text-overflow: ellipsis;word-break: break-all;-webkit-line-clamp: $i;-webkit-box-orient: vertical !important;
## 22. 居中对齐
ma => margin: 0 auto;
## 23. shadow
sd => box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
## 24. list选中的文本active
ac => color: var(--primary-color);
## 25. 链接文本
link => cursor: pointer; color: var(--primary-color);
## 26. z-index层级
z-100 => z-index: 100;
z-800 => z-index: 800;
