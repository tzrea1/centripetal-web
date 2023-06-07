<template>
  <div class="home">
    <!-- 背景阴影 -->
    <div class="bg-mask" :style="getBackgroundImage" />

    <!-- 导航和轮播 -->
    <div class="home-container m-center">
      <mooc-carousel :height="316" trigger="click" @change="handelCarouselChange">
        <mooc-carousel-item v-for="(item,index) in swiperList" :key="index">
          <img :src="item.img" class="swiper-img">
        </mooc-carousel-item>
      </mooc-carousel>
      <Banner />
    </div>

    <!-- 答题活动 -->
    <Contest :contestList="contestList" />
    <!-- VR场景展示 -->
    <Scene />
  </div>
</template>
<script>
import Banner from './banner.vue'
import Scene from './scene.vue'
import Contest from './contest.vue'
import { getSliderList, getArticle, getTeacher} from 'api/mock/home.js'
import { listContest} from "api/system/contest";
import { ERR_OK } from 'api/mock/config.js'
export default {
  name: 'Home',
  data () {
    return {
      swiperList: [],
      contestList: [],
      teacherList: [],
      articleList: {},
      currentSwiper: '',
      lessonData: {
        recommend: [],
        new: [],
        easy: [],
        improve: [],
        advanced: []
      }
    }
  },
  created () {
    this.getBanner()
    this.getArticleList()
    this.getTeacherList()
    this.getContestListList()
  },
  methods: {
    // 滚动轮播滚动完毕事件
    handelCarouselChange (index) {
      this.currentSwiper = this.swiperList[index].img
    },
    // 首页轮播信息
    getBanner () {
      getSliderList().then((res) => {
        let { code, data, msg } = res
        if (code === ERR_OK) {
          this.swiperList = data
          if (this.swiperList.length > 0) {
            this.currentSwiper = this.swiperList[0].img
          }
        } else {
          this.$message.error(msg)
          this.swiperList = []
          this.currentSwiper = ''
        }
      }).catch(() => {
        this.swiperList = []
        this.currentSwiper = ''
      })
    },
    // 获取课程信息
    // 获取猿问和手记
    getArticleList () {
      getArticle().then((res) => {
        let { code, data } = res
        if (code === ERR_OK) {
          this.articleList = data
        }
      }).catch(() => {
        this.articleList = []
      })
    },
    // 获取精英讲师信息
    getTeacherList () {
      getTeacher().then(res => {
        let { code, data, msg} = res
        if (code === ERR_OK) {
          this.teacherList = data
        } else {
          this.teacherList = []
          this.$message.error(msg)
        }
      }).catch(() => {
        this.teacherList = []
      })
    },
    // 获取答题信息
    getContestListList () {
        let queryParams;
        queryParams = {
            pageNum: 1,
                pageSize: 10,
                creatorId: null,
                title: null,
                state: null,
                startTime: null,
                endTime: null
        }
        listContest(queryParams).then(response => {
            this.contestList = response.rows
            // console.log(this.contestList)
        })
    }
  },
  computed: {
    getBackgroundImage () {
      return {
        'background-image': `url(${this.currentSwiper})`
      }
    }
  },
  components: {
    Scene,
    Banner,
    Contest
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .home
    margin-top: 32px;
    min-height: 750px;
    .bg-mask
      position: absolute;
      top: 0;
      background-size: cover;
      transition: all 0.3s;
      width: 100%;
      height: 180px;
      opacity: 0.3;
      filter: blur(100px);
    .home-container
      position: relative;
      box-shadow: 0 12px 24px 0 $shadow;
      border-radius: 8px;
      height: 444px;
      .mooc-carousel
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        >>> .mooc-carousel-indicators
          left: initial;
          right: 20px;
          transform: none;
        .swiper-img
          display: block;
          width: 100%;
          height: 316px;
          border-top-right-radius: 8px;
</style>
