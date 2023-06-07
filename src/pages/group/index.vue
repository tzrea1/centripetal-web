<template>
    <div class="study-container">
        <el-card shadow="hover" class="study-card">
            <el-row>
                <el-col :span="24">
                    <h2 class="study-title">我的小组 : {{ this.groupName }}</h2>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <p class="study-description">{{ this.groupDescription }}</p>
                </el-col>
            </el-row>

            <el-row>
                <div class="title-container">
                    <h3 class="notice-list-title">通知列表</h3>
                    <button class="more-button" @click="goToNoticePage">查看更多</button>
                </div>
                <ul v-if="noticeList.length">
                    <li v-for="(item, index) in noticeList.slice(0, 5)" :key="index" ref="NoticeList" class="list-item"
                        :class="{ ready: item.isRead }">
                        <div class="item-icon">
                            {{ item.publishTime }}
                        </div>
                        <div class="item-content">
                            <p class="title" @click="handleNoticeClick(item)">
                                {{ item.title }}
                            </p>
                        </div>
                    </li>
                </ul>
            </el-row>

            <!-- dialog -->
            <el-dialog title="通知详情" :visible.sync="detailVisible">
                <p>Content: {{ currentNotice.content }}</p>
                <p>Notice ID: {{ currentNotice.noticeId }}</p>
                <p>Publish Time: {{ currentNotice.publishTime }}</p>
                <p>Title: {{ currentNotice.title }}</p>
                <el-row>
                    <el-col :span="24">
                        <div class="notice-content" v-html="contentHtml" />
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="detailVisible = false">关闭</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
  
<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import { listGroup, getGroup, delGroup, addGroup, updateGroup } from 'api/system/group.js';
import { listNotice, getNotice } from 'api/system/notice.js'

export default {
    data() {
        return {
            total: 0,
            groupDescription: "",
            groupCreatorId: "",
            groupId: "",
            groupName: "",
            noticeList: [],       // 消息中心列表
            detailVisible: false,  // 详情弹窗是否可见
            currentNotice: {},    // 当前的通知，用于在详情弹窗中显示
            contentHtml: '',          // 窗口中显示的通知HTML内容
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                noticeId: null,
                userId: null,
                publishTime: null
            },
        };
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    created() {
        getGroup(this.userInfo.groupId).then(res => {
            console.log(res.data);
            this.groupDescription = res.data.description;
            this.groupCreatorId = res.data.creatorId;
            this.groupId = res.data.groupId;
            this.groupName = res.data.groupname;
            this.getNoticeListData();
        })
    },
    // mounted() {
    //     this.getNoticeListData()
    // },
    methods: {
        // 单个通知已读
        handleNoticeClick(item) {
            getNotice(item.noticeId).then(res => {
                // 保存当前通知的数据，以在详情弹窗中显示
                this.currentNotice = res.data;
                //每次等待url发回响应时，先将contentHtml设置为空，再重新接收，防止错误显示
                this.contentHtml = '';
                axios.get(this.currentNotice.content).then(response => {
                    this.contentHtml = response.data
                })
                // 打开详情弹窗
                this.detailVisible = true;

            })
        },

        // 获取通知列表数据
        getNoticeListData() {
            this.queryParams.userId=this.groupCreatorId;
            listNotice(this.queryParams).then(response => {
                this.noticeList = response.rows
                console.log(this.noticeList)
                this.total = response.total
                this.loading = false
            })
        },

        //点击查看更多跳转到notice页面
        goToNoticePage() {
        this.$router.push('/notice');
    },
    }
};
</script>
  
<style scoped>
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
    margin: 10px 0;
}

.list-item {
    padding: 20px 10px;
    display: flex;
    align-items: flex-start;
    height: 90px;
    border-bottom: 1px solid #DDDDDD;
    box-sizing: border-box;
    transition: all 0.3s linear;
    opacity: 1;
}

.ready {
    border: 1px solid #DDDDDD;
    background-color: #fff;
    color: #999999;
}

.item-icon {
    margin-right: 20px;
    padding: 10px;
    border: 1px solid #FF0000;
    background-color: #fde7e5;
    color: #FF0000;
    font-size: 14px;
}

.item-content {
    flex: 1;
    position: relative;
}

.item-content:hover {
    color: #333333;
}

.item-content>p {
    line-height: 24px;
}

.title {
    font-size: 16px;
    font-weight: 700;
    color: #777777;
    cursor: pointer;
}

.title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border: 2px solid #FF4500;
}

.notice-list-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.more-button {
    background-color: #FF4500;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
</style>