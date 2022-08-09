//定义的一些常用原子样式类
//flex布局样式类
//基础定义，接收方向参数
@mixin flex($direction: row) {
    display: flex;
    flex-direction: $direction;
  }
  
  //水平flex布局
  .k-flex,
  .k-flex-row {
    @include flex;
  }
  
  // 垂直flex布局
  .k-flex-col {
    @include flex(column);
  }
  
  // 换行
  .k-flex-wrap {
    flex-wrap: wrap;
  }
  
  .k-flex-nowrap {
    flex-wrap: nowrap;
  }
  
  // 定义flex等分
  @for $i from 0 through 24 {
    .k-flex-#{$i} {
      flex: $i;
    }
  }
  
  // 主轴方向子元素排列
  .k-row-left {
    justify-content: flex-start;
  }
  
  .k-row-center {
    justify-content: center;
  }
  
  .k-row-right {
    justify-content: flex-end;
  }
  
  .k-row-between {
    justify-content: space-between;
  }
  
  .k-row-around {
    justify-content: space-around;
  }
  
  .k-row-evenly {
    justify-content: space-evenly;
  }
  
  // 侧轴方向子元素排列
  .k-col-top {
    align-items: flex-start;
  }
  
  .k-col-center {
    align-items: center;
  }
  
  .k-col-bottom {
    align-items: flex-end;
  }
  
  //定位样式类
  .k-relative,
  .k-rela {
    position: relative;
  }
  
  .k-absolute,
  .k-abso {
    position: absolute;
  }
  
  // overflow样式类
  .k-of-hidden {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .k-of-auto {
    overflow: auto;
  }
  
  //尺寸样式类
  //width宽度
  @for $i from 0 to 1000 {
    .k-w-#{$i} {
      width: $i + px;
    }
  }
  
  // height高度
  @for $i from 0 to 1000 {
    .k-h-#{$i} {
      height: $i + px;
    }
  }
  
  //font-weight
  @for $i from 1 to 9 {
    .k-fw-#{$i} {
      font-weight: $i * 100;
    }
  }
  
  .k-fw-bold {
    font-weight: bold;
  }
  
  .k-fw-bolder {
    font-weight: bolder;
  }
  
  // font-size
  @for $i from 12 to 50 {
    .k-fs-#{$i} {
      font-size: $i + px;
    }
  }
  
  // 文本水平对齐样式
  @each $type in left, center, right {
    .k-text-#{$type} {
      text-align: $type;
    }
  }
  
  //文本超出换行或隐藏，最多5行
  @for $i from 1 through 5 {
    .k-line-#{$i} {
      @if $i == '1' {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      } @else {
        display: -webkit-box !important;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-line-clamp: $i;
        -webkit-box-orient: vertical !important;
      }
    }
  }
  
  
  // 定义内外边距，历遍1-80
  @for $i from 0 through 80 {
    // 得出：u-margin-30或者u-m-30
    .k-margin-#{$i},
    .k-m-#{$i} {
      margin: $i + px !important;
    }
  
    // 得出：u-padding-30或者u-p-30
    .k-padding-#{$i},
    .k-p-#{$i} {
      padding: $i + px !important;
    }
  
    @each $short, $long in l left, t top, r right, b bottom {
      // 缩写版，结果如： u-m-l-30
      // 定义外边距
      .k-m-#{$short}-#{$i} {
        margin-#{$long}: $i + px !important;
      }
  
      // 定义内边距
      .k-p-#{$short}-#{$i} {
        padding-#{$long}: $i + px !important;
      }
  
      // 完整版，结果如：u-margin-left-30
      // 定义外边距
      .k-margin-#{$long}-#{$i} {
        margin-#{$long}: $i + px !important;
      }
  
      // 定义内边距
      .k-padding-#{$long}-#{$i} {
        padding-#{$long}: $i + px !important;
      }
    }
  }
  