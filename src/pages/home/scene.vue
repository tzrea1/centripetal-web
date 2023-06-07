<template>
  <div class="waterfull-container">
    <div class="waterfull m-center">
      <h2 class="home-title">
        <i class="title-icon left-icon" />
        V／R／场／景／展／示
        <i class="title-icon right-icon" />
      </h2>

      <div class="scene-container">
        <div v-for="(item,index) in scene" :key="index" class="scene-item">
          <div class="topic-wrapper">
            <div class="topic-item">
              <div class="topic-header-wrapper">
                <div class="topic-title-wrapper">
                  <p class="topic-title">
                    {{ item.title }}
                  </p>
                </div>
                <img :src="item.img" class="topic-img" alt="">
              </div>
              <p class="topic-desc">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            scene: [
                {title:"一大会址 - 内部", desc:"中共一大会址——内部", img:"https://centripetal-oss.oss-cn-shanghai.aliyuncs.com/centripetal/img/scene/scene-site-inside.png"},
                {title:"一大会址 - 外部", desc:"中共一大会址——外部", img:"https://centripetal-oss.oss-cn-shanghai.aliyuncs.com/centripetal/img/scene/scene-site-outside.png"},
                {title:"南湖红船 ", desc:"南湖红船场景", img:"https://centripetal-oss.oss-cn-shanghai.aliyuncs.com/centripetal/img/scene/scene-boat.png"},
                {title:"党史馆", desc:"党史馆内部", img:"https://centripetal-oss.oss-cn-shanghai.aliyuncs.com/centripetal/img/scene/scene-museum.png"},
            ]
        }
    }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  @import '~assets/stylus/mixin.styl';
  .waterfull-container
    width: 100%;
    background-color: #f7f9fb;
  .waterfull
    .home-title
      padding: 36px 0 48px;
      .left-icon
        background-position: center -360px;
      .right-icon
        background-position: center -396px;
    .scene-container
      width: 100%;
      padding-bottom: 30px;
      column-count: 2;
      column-gap: 18px;
      .scene-item
        margin-bottom: 20px;
        padding: 24px 32px 32px 32px;
        break-inside: avoid;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(7,17,27,0.1);
        cursor: pointer;
        &:hover
          box-shadow: 0 4px 8px 2px rgba(7,17,27,0.15);
        .topic-wrapper
          .topic-item
            .topic-flag
              display: inline-block;
              margin-bottom: 8px;
              padding: 5px 12px;
              background-color: $theme-green-color;
              border-radius: 12px;
              color: #fff;
              font-size: 12px;
            .post-header
              display: flex;
              align-items: center;
              margin-bottom: 15px;
              .post-header-title
                margin-right: 12px;
                font-size: 12px;
                color: $font-four-color;
              .post-header-title-line
                flex: 1;
                height: 1px;
                background-color: $border-second-color;
            .topic-header-wrapper
              display: flex;
              flex-direction: column; //修改此处，使其成为一个列布局
              align-items: center;
              margin-bottom: 12px;
              &.post-topic
                transition: all 0.2s;
                &:hover
                  .topic-title-wrapper
                    color: rgba(0, 180, 60, 0.6);
                .topic-title-wrapper
                  color: $font-second-color;
                  font-size: 14px;
              .topic-title-wrapper
                flex: 1;
                line-height: 100%;
                font-size: 20px;
                order:1;
                .topic-title
                  color: black; // 这行改变标题颜色为红色
                  text-align: center; // 这行使标题居中
                  white-space: nowrap; // 这行使文本在一行中显示
                  overflow: hidden; // 这行隐藏超出一行的文本
                  text-overflow: ellipsis; // 这行使超出部分显示为省略号
              .topic-img

                width: 420px;
                height: 270px;
                border-radius: 8px;
                order:2;
                margin-top: 20px;
            .topic-desc
              text-align: center;
              font-size: 16px;
              color: $font-second-color;
              line-height: 24px;
              multline-ellipsis(6);
            .topic-look-detail
              margin: 10px 0 15px;
              text-align: right;
              font-size: 12px;
              color: rgba(0, 180, 60, 0.6);
              cursor: pointer;
              line-height: 24px;
        .scene-wrapper
          .scene-flag
            line-height: 24px;
            font-size: 12px;
            color: rgba(0, 140, 200, 0.6);
            & > span
              display: inline-block;
              vertical-align: top;
              margin-left: 3px;
          .scene-title-box
            display: flex;
            align-items: flex-start;
            margin: 8px 0;
            .scene-title
              flex: 1;
              font-size: 16px;
              color: $font-first-color;
              line-height: 24px;
              transition: all 0.2s;
              &:hover
                color: rgba(0, 140, 200, 0.6);
          .scene-desc
            margin-bottom: 20px;
            font-size: 12px;
            color: $font-second-color;
            line-height: 24px;
            multline-ellipsis(8);
</style>


