<template>
  <div class="contest-container">
    <el-card shadow="hover" class="contest-card p-4">
      <el-row>
        <el-col :span="24">
          <h2 class="contest-title mb-3">{{ contest.title }}</h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <p class="contest-description mb-4">{{ contest.description }}</p>
        </el-col>
      </el-row>

      <div v-for="(question, index) in questionList" :key="index" class="question-container mb-4">
        <hr style="margin-bottom: 30px" /> <!-- 添加分割线 -->
        <h3 class="mb-2">{{ (index+1) + '. ' +getQuestionType(question.questionType) + ':' + question.content + ' ('+ question.questionScore + '分)' }}</h3>
        <div v-if="question.questionType === '1' || question.questionType === '3'">
          <el-radio-group v-model="answers[index]" class="mt-3">
            <el-radio v-for="(option, optionIndex) in question.options.split(' ')" :key="optionIndex" :label="option" class="mb-2 ml-2">{{ option }}</el-radio>
          </el-radio-group>
        </div>
        <div v-else-if="question.questionType === '2'">
          <el-checkbox-group v-model="answers[index]" class="mt-3">
            <el-checkbox v-for="(option, optionIndex) in question.options.split(' ')" :key="optionIndex" :label="option" class="mb-2 ml-2">{{ option }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div style="text-align: center;">
        <el-button type="primary" class="mb-2 ml-2" style="margin-top: 50px;" @click="submitResult">提交答案</el-button>
      </div>
    </el-card>
  </div>
</template>


<script>
import {getContest} from '@/api/system/contest'
import {addContest_rec} from '@/api/system/contest-rec'
import {mapGetters} from "vuex";

export default {
    data () {
        return {
            contest: {},
            quizActivityId: null,
            questionList: [],
            answers: [],
            elapsedTime: 0,
            // 表单参数
            form : {
                userId: null,
                quizActivityId: null,
                gotScores: null,
                startTime: null,
                endTime: null,
                activityState: null,
                isPassed: null
            }
        };
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    created () {
        setTimeout(() => {
            this.quizActivityId = this.$route.params.contest_id;
            this.form.startTime = new Date().getTime();
            this.getContestInfo(this.quizActivityId);
            this.timer = setInterval(this.checkTime, 1000);
        }, 500);
    },
    beforeDestroy () {
        // Clear the timer when the component is destroyed.
        clearInterval(this.timer);
    },
    methods: {
        /** 查询答题活动信息 */
        getContestInfo () {
            getContest(this.quizActivityId).then(response => {
                console.log(response)
                this.contest = response.data
                this.questionList = response.data.questionList
                // Initialize answers here, after questionList is populated
                this.answers = this.questionList.map(question =>
                    question.questionType === '2' ? [] : null
                );
            })
        },
        getQuestionType (type) {
            switch(type) {
                case '1':
                    return '单选题';
                case '2':
                    return '多选题';
                case '3':
                    return '判断题';
                default:
                    return '';
            }
        },
        checkTime () {
            let currentTime = new Date().getTime();
            // Update the elapsed time every second.
            this.elapsedTime = Math.floor((currentTime - this.form.startTime) / 1000);
            // Convert the time difference from milliseconds to minutes.
            let elapsedMinutes = this.elapsedTime / 60;
            if (elapsedMinutes >= this.contest.timeLimit) {
                this.submitResult();
                clearInterval(this.timer);
            }
        },
        submitResult (){
            let totalScore = 0;

            for (let i = 0; i < this.questionList.length; i++) {
                let question = this.questionList[i];
                let userAnswer = this.answers[i];

                // Initialize correctAnswer
                let correctAnswer;

                if (question.questionType == '2') {
                    // For multiple choice questions, split the correctAnswer string into an array
                    correctAnswer = question.correctAnswer.split(' ');
                } else {
                    // For single choice and true/false questions, keep correctAnswer as a string
                    correctAnswer = question.correctAnswer;
                }

                // Now, correctAnswer is in the same format as userAnswer
                // We can compare them directly using JSON.stringify
                if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
                    totalScore += question.questionScore;
                }
            }
            this.form.gotScores = totalScore;
            this.form.isPassed = totalScore >= this.contest.acceptanceLine;
            this.form.endTime = new Date().getTime();
            this.form.quizActivityId = this.quizActivityId;
            this.form.activityState = "completed";
            this.form.userId = this.userInfo.userId;
            console.log(this.form);
            addContest_rec(this.form);
            this.$router.push({ path: `/contestlist` });
        }
    }

};
</script>

<style>
.contest-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.contest-card {
  margin-bottom: 20px;
}

.contest-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

.contest-description {
  font-size: 16px;
  color: #666;
  margin: 10px 0;
}

.contest-image {
  width: 100%;
  height: auto;
  /* max-height: 300px; */
  object-fit: contain;
  margin: 10px 0;
}

.contest-content {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  margin: 10px 0;
}
.question-container {
    margin-bottom: 30px;
    margin-top: 30px;
}

.question-container h3 {
    font-size: 20px;
    color: #333;
}

.question-container p {
    font-size: 16px;
    color: #666;
}

.el-radio-group, .el-checkbox-group {
    margin-top: 10px;
}

.el-radio, .el-checkbox {
    display: block;
    margin-bottom: 5px;
}
.p-4 {
    padding: 1.5rem;
}

.mb-3 {
    margin-bottom: 1rem;
}

.mb-4 {
    margin-bottom: 1.5rem;
}

.mt-3 {
    margin-top: 1rem;
}

.mb-2 {
    margin-bottom: 0.5rem;
}

.ml-2 {
    margin-left: 0.5rem;
}
.hr {
    border: none;
    border-top: 1px solid #ccc;
    color: #333;
    background-color: #333;
    height: 1px;
    width: 100%;

}


</style>
