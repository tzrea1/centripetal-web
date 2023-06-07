<template>
  <div class="card-container">
    <el-card>
      <el-row>
        <el-col :span="12">
          <h2 class="content-title">内容学习</h2>
        </el-col>
        <el-col :span="12">
          <el-input
            class="search-input"
            placeholder="搜索活动标题"
            v-model="searchText"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" v-for="study in filteredStudies" :key="study.ph_study_id">
          <el-card
            class="card"
            shadow="hover"
            @click.native="goToStudyDetail(study)"
          >
            <img :src="study.prepicUrl" class="card-image" slot="header" />

            <el-row>
              <el-col :span="24">
                <h3 class="el-card__title">{{ study.title }}</h3>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <p class="el-card__description">{{ study.description }}</p>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-tag
                  class="el-card__status"
                  :type="study.state === 'completed' ? 'success' : 'danger'"
                >
                  {{ study.state === "completed" ? "已结束" : "进行中" }}
                </el-tag>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <div class="pagination-container">
        <el-pagination
          background
          class="pagination"
          :current-page="pageNum"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next, jumper"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>


<script>
import { listContent } from "@/api/system/content.js";

export default {
  data() {
    return {
      // 存储搜索框中的文本
      searchText: '',

      studies: [],
      total: 0, // 存储总的数据条数
      pageNum: 1, // 当前页
      pageSize: 9, // 每页的数据条数
    };
  },
  computed: {
    filteredStudies() {
      if (!this.searchText) {
        return this.studies;
      }
      return this.studies.filter(study =>
        study.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    goToStudyDetail(study) {
      this.$router.push({ path: `/study/${study.phStudyId}` });
    },
    async getStudies(page) {
      const data = await listContent({
        pageNum: page,
        pageSize: this.pageSize,
      }); // 分页参数传入接口
      this.studies = data.rows; // 将获取到的数据赋值给studies
      this.total = data.total; // 更新数据总条数
      console.log(data);
      console.log(this.studies);
    },
    handlePageChange(page) {
      this.pageNum = page; // 更新当前页数
      this.getStudies(page); // 根据新的页数获取数据
    },
  },
  created() {
    this.getStudies(this.pageNum); // 在组件被创建后立即调用getStudies方法
  },
};
</script>



<style>

.content-title {
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
  margin-left: 20px;
}

.search-input {
  float: right;
  margin: 20px 0;
}

.card-container {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 100vh;
}

.card {
  margin: 20px;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.el-card__title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

.el-card__description {
  font-size: 14px;
  color: #666;
  margin: 10px 0;
}

.el-card__status {
  margin-top: 10px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>