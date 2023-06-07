<template>
  <div class="card-container">
    <el-row :gutter="20">
      <el-col :span="24" class="header-section">
        <h1 class="page-title">答题竞赛</h1>
        <el-input v-model="search" placeholder="搜索答题竞赛标题" class="search-box"></el-input>
      </el-col>
      <el-col v-for="contest in filteredContestList" :key="contest.quizActivityId" :span="8">
        <el-card class="card" shadow="hover" @click.native="goToContestDetail(contest)">
          <img slot="header" :src="prepic_url" class="card-image-contest" />

          <el-row>
            <el-col :span="24">
              <h3 class="el-card__title">{{ contest.title }}</h3>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <p class="el-card__description">{{ contest.description }}</p>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-tag
                class="el-card__status"
                :type="contest.state === 'completed' ? 'success' : 'danger'"
              >
                {{ contest.state === 'completed' ? '已结束' : '进行中' }}
              </el-tag>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { listContest, getContest} from '@/api/system/contest'
export default {
    data () {
        return {
            search: '',
            prepic_url:"https://centripetal-oss.oss-cn-shanghai.aliyuncs.com/centripetal/img/cover/contest-cover.png",
            // 答题活动表格数据
            contestList: [],
            total: 0,
            // 题目表格数据
            questionList: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                creatorId: null,
                title: null,
                state: null,
                startTime: null,
                endTime: null
            }
            // contestList: [
            //     {
            //         quiz_activity_id: 1,
            //         title: "党史学习 1",
            //         description: "这是第一个党史答题活动",
            //         state: "ongoing",
            //     },
            //     {
            //         quiz_activity_id: 2,
            //         title: "党史学习 2",
            //         description: "这是第二个党史学习活动",
            //         state: "completed",
            //     },
            // ]
        };
    },
    computed: {
        filteredContestList () {
            return this.contestList.filter(contest => contest.title.includes(this.search));
        },
    },
    created () {
        this.getList()

    },
    methods: {
        goToContestDetail (contest) {
            this.$router.push({ path: `/contest/${contest.quizActivityId}` });
        },
        /** 查询答题活动列表 */
        getList() {
            this.loading = true
            listContest(this.queryParams).then(response => {
                this.contestList = response.rows
                // console.log(this.contestList)
                this.total = response.total
                this.loading = false
            })
        },
    },
};
</script>

<style>
.card-container {
    overflow-y: auto;
    max-height: 100vh;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.page-title {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
}

.search-box {
    margin-bottom: 20px;
}

.card {
    margin: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.card-image-contest {
    width: 100%;
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
/* Add this to your CSS */
.header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-box {
    width: 100%;
    max-width: 480px; /* or any value you prefer */
    /* Rest of your CSS properties */
}

</style>
