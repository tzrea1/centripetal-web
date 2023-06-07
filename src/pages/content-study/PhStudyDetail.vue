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
      <el-row>
        <el-col :span="24">
          <h3 class="study-attachments-title">附件</h3>
          <el-table :data="study.phStudyFileList" stripe border>
            <el-table-column
              property="fileName"
              label="文件名"
            ></el-table-column>
            <el-table-column
              property="fileType"
              label="文件类型"
            ></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="downloadFile(scope.row)"
                  >下载</el-button
                >
              </template>
            </el-table-column>
          </el-table>
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
    downloadFile(file) {
      window.open(file.fileUrl);
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
  padding: 20px;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.study-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 20px 0;
  text-align: center;
}

.study-description {
  font-size: 18px;
  color: #666;
  margin: 20px 0;
  padding: 10px;
  border-left: 3px solid #666;
  background-color: #f0f0f0;
}

.study-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  margin: 30px 0;
}

.study-content {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  margin: 30px 0;
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
}

.study-attachments-title {
  margin: 30px 0;
  font-size: 20px;
  font-weight: bold;
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
}

</style>

