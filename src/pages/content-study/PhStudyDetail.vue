<template>
  <div>
    <h1>{{ study.title }}</h1>
    <p>{{ study.description }}</p>
    <img :src="study.prepic_url" alt="Study Image" class="study-image" />
    <div v-html="studyContent" class="study-content"></div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      study: {}, // 存放从后端获取的党史内容学习数据
      studyContent: "", // 存放从后端获取的党史内容学习的具体内容
    };
  },
  created() {
    // 模拟从后端获取党史内容学习数据和具体内容的过程
    // 这里使用setTimeout来模拟异步请求的延迟
    setTimeout(() => {
      this.study = {
        ph_study_id: 1,
        creator_id: 1,
        title: "党史学习1",
        description: "这是第一个党史学习活动",
        state: "ongoing",
        prepic_url: "https://example.com/image1.jpg",
        content_url: "https://example.com/content1.html",
      };

      // 模拟从后端获取党史内容学习的具体内容
      this.studyContent = "<p>这里是党史内容学习的具体内容...</p>";
    }, 500); // 延迟500毫秒模拟异步请求
  },
};
</script>
  
  <style>
.study-image {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
}

.study-content {
  margin-top: 20px;
}
</style>
  