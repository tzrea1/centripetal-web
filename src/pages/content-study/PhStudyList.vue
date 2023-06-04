<template>
  <div class="card-container">
    <el-row :gutter="20">
      <el-col :span="8" v-for="study in studies" :key="study.ph_study_id">
        <el-card class="card" shadow="hover" @click.native="goToStudyDetail(study)">
          <img :src="study.prepic_url" class="card-image" slot="header" />

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
                {{ study.state === 'completed' ? '已结束' : '进行中' }}
              </el-tag>
            </el-col>
          </el-row>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>  
export default {  
  data() {  
    return {  
      studies: [
        {  
          ph_study_id: 1,  
          title: "党史学习 1",  
          description: "这是第一个党史学习活动",  
          state: "ongoing",  
          prepic_url: "https://centripetal-oss.oss-cn-shanghai.aliyuncs.com/centripetal/files/20230510/%E5%85%B1%E6%8C%AF%E7%BB%93%E6%9E%9Cno.1.jpg",
        },  
        {  
          ph_study_id: 2,  
          title: "党史学习 2",  
          description: "这是第二个党史学习活动",  
          state: "completed",  
          prepic_url: "https://centripetal-oss.oss-cn-shanghai.aliyuncs.com/centripetal/files/20230510/%E5%85%B1%E6%8C%AF%E7%BB%93%E6%9E%9Cno.1.jpg",  
        },  
        // 添加更多党史内容学习数据...  
      ] 
    };  
  },  
  methods: {  
    goToStudyDetail(study) {  
      this.$router.push({ path: `/study/${study.ph_study_id}` });  
    },  
  },
};  
</script>

<style>
.card-container {
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
</style>