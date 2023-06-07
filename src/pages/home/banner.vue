<template>
  <ul class="course-banner">
    <li v-for="(item,index) in banner" :key="index" class="banner-item">
      <span class="icon" />
      <p class="title">
        {{ item.title }}
      </p>
      <p class="desc">
        {{ item.desc }}
      </p>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      banner: []
    }
  },
  created () {
    this.banner = [
      { id: 1, title: 'VR场景学习', desc: '安装手机APP，获取沉浸式体验' },
      { id: 2, title: '党史内容学习', desc: '党史学习内容，每周必刷' },
      { id: 3, title: '小组管理', desc: '党史学习小组、学习通知' },
      { id: 4, title: '在线答题竞赛', desc: '检验党史学习成果' },
    ]
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .course-banner
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 18px;
    height: 128px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom-right-radius: 8px;
    &::after
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 68px;
      height: 68px;
    .banner-item
      flex: 1;
      height: 100%;
      cursor: pointer;
      &:hover
        .icon
          margin-top: 18px;
      .icon
        display: block;
        margin: 22px auto 5px;
        width: 36px;
        height: 36px;
        background: url('https://www.imooc.com/static/img/index/new/path-2019.png')
        background-size: 100%;
        transition: all 0.1s;
      &:nth-child(1)
        .icon
          background-position: center 0;
      &:nth-child(2)
        .icon
          background-position: center -36px;
      &:nth-child(3)
        .icon
          background-position: center -72px;
      &:nth-child(4)
        .icon
          background-position: center -108px;
      &:nth-child(5)
        .icon
          background-position: center -144px;
      &:nth-child(6)
        .icon
          background-position: center -182px;
      & > p
        text-align: center;
      .title
        margin-bottom: 2px;
        color: $font-first-color;
        font-size: 14px;
      .desc
        line-height: 24px;
        font-size: 12px;
        color: $font-four-color;
</style>
