<template>  
  <div>  
    <div v-for="(study, index) in studies" :key="study.ph_study_id">  
      <el-card class="card">  
        <img :src="study.prepic_url" class="card-image" />  
        <div class="card-content">  
          <h3>{{ study.title }}</h3>  
          <p>{{ study.description }}</p>  
          <p>  
            {{ study.state }}  
            <span v-if="study.state === 'completed'">已结束</span>  
            <span v-else-if="study.state === 'ongoing'">进行中</span>  
          </p>  
        </div>  
        <div class="card-actions">  
          <button @click="goToStudyDetail(study)">查看详情</button>  
        </div>  
      </el-card>  
    </div>  
  </div>  
</template>
<script>  
export default {  
  data() {  
    return {  
      studies: [], // 存放从后端获取的党史内容学习数据  
    };  
  },  
  methods: {  
    goToStudyDetail(study) {  
      // 导航到党史学习活动详情页面，可以使用 Vue Router 进行路由导航  
      this.$router.push({ path: `/study/${study.ph_study_id}` });  
    },  
  },  
  created() {  
    // 模拟从后端获取党史内容学习数据的过程  
    // 这里使用 setTimeout 来模拟异步请求的延迟  
    setTimeout(() => {  
      this.studies = [  
        {  
          ph_study_id: 1,  
          creator_id: 1,  
          title: "党史学习 1",  
          description: "这是第一个党史学习活动",  
          state: "ongoing",  
          prepic_url: "https://example.com/image1.jpg",  
          content_url: "https://example.com/content1.html",  
        },  
        {  
          ph_study_id: 2,  
          creator_id: 2,  
          title: "党史学习 2",  
          description: "这是第二个党史学习活动",  
          state: "completed",  
          prepic_url: "https://example.com/image2.jpg",  
          content_url: "https://example.com/content2.html",  
        },  
        // 添加更多党史内容学习数据...  
      ];  
    }, 500); // 延迟 500 毫秒模拟异步请求  
  },  
};  
</script>
<style>  
.card {  
  width: 300px;  
  margin: 20px;  
  display: flex;  
  flex-wrap: wrap;  
}

.card-image {  
  width: 100%;  
  height: 200px;  
  object-fit: cover;  
}

.card-content {  
  padding: 20px;  
  max-width: 80%;  
}

.card-actions {  
  margin-top: 10px;  
}

.completed {  
  color: green;  
}

.ongoing {  
  color: red;  
}
</style>