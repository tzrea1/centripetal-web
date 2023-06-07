<template>
  <div class="study-container">
    <el-card shadow="hover" class="study-card">
      <el-row>
        <el-col :span="24">
          <h2 class="study-title">{{ study.title }}</h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <p class="study-description">{{ study.description }}</p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-image
            class="study-image"
            :src="study.prepicUrl"
            :preview-src-list="[study.prepicUrl]"
          ></el-image>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div v-html="studyContent" class="study-content"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { getContent } from "@/api/system/content.js";

export default {
  data() {
    return {
      study: {},
      studyContent: "",
    };
  },
  methods: {
    async loadStudyDetail() {
      const ph_study_id = this.$route.params.ph_study_id; // 从路由参数中获取当前学习活动的id
      const studyDetail = await getContent(ph_study_id); // 调用API方法获取数据
      this.study = studyDetail.data;
      console.log(this.study);
      // Fetch the content of the HTML file
      axios.get(this.study.contentUrl).then((response) => {
        this.studyContent = response.data;
      });
    },
  },
  created() {
    this.loadStudyDetail();
  },
};
</script>

<style>
.study-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.study-card {
  margin-bottom: 20px;
}

.study-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

.study-description {
  font-size: 16px;
  color: #666;
  margin: 10px 0;
}

.study-image {
  width: 100%;
  height: auto;
  /* max-height: 300px; */
  object-fit: contain;
  margin: 10px 0;
}

.study-content {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  margin: 10px 0;
}
</style>
