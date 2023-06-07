<template>
    <div class="study-container">
        <el-card shadow="hover" class="study-card">
            <el-row>
                <el-col :span="20">
                    <h2 class="study-title">我的小组 : {{ this.groupName }}</h2>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" class="more-button" @click="editGroupMembers">编辑小组成员</el-button>
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
                    <el-button type="primary" class="more-button" @click="handleAdd">新增</el-button>
                    <el-button type="primary" class="more-button" @click="goToNoticePage">查看更多</el-button>
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
            <el-dialog title="通知详情" :visible.sync="detailVisible" class="notice-dialog" width="80%">
                <el-row>
                    <el-col :span="4">
                        <p class="notice-id">{{ currentNotice.noticeId }}</p>
                    </el-col>
                    <el-col :span="20">
                        <p class="notice-title">{{ currentNotice.title }}</p>
                    </el-col>
                </el-row>
                <hr class="separator" />
                <el-row>
                    <el-col :span="24">
                        <p class="notice-time">{{ currentNotice.publishTime }}</p>
                    </el-col>
                </el-row>
                <hr class="separator" />
                <el-row>
                    <el-col :span="24">
                        <div class="notice-content" v-html="contentHtml" />
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="detailVisible = false">关闭</el-button>
                </span>
            </el-dialog>

            <!-- 添加或修改组内通知对话框 -->
            <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="组长id" prop="userId">
                        <el-input v-model="form.userId" placeholder="请输入组长Id" disabled />
                    </el-form-item>
                    <el-form-item label="通知标题">
                        <el-input v-model="form.title" placeholder="请输入标题" />
                    </el-form-item>
                    <el-form-item label="通知内容">
                        <!-- <editor v-model="form.content" :min-height="192" /> -->
                        <rich-text-editor :min-height="192" @html-upload-complete="handleHtmlUploadComplete" />
                    </el-form-item>
                    <el-form-item label="发布时间" prop="publishTime">
                        <el-date-picker v-model="form.publishTime" clearable type="date" value-format="yyyy-MM-dd"
                            placeholder="请选择发布时间" />
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </el-dialog>

            <!-- 更新小组成员的弹窗 -->
            <el-dialog title="编辑小组成员" :visible.sync="editGroupVisible">
                <el-form :model="editGroupForm">
                    <el-form-item label="用户ID列表">
                        <el-input v-model="editGroupForm.userIdsStr" placeholder="请输入用户ID列表，用逗号分隔" />
                    </el-form-item>
                    <el-form-item label="小组ID">
                        <el-input v-model="editGroupForm.groupId" placeholder="请输入小组ID" />
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editGroupVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitEditGroupForm">确定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
  
<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import { listGroup, getGroup, delGroup, addGroup, updateGroup } from 'api/system/group.js';
import { listNotice, getNotice, addNotice } from 'api/system/notice.js'
import RichTextEditor from '@/components/OssUpload/RichTextEditor.vue'
import { updateUserGroupIds } from 'api/system/user.js'

export default {
    components: {
        RichTextEditor
    },
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
            // 添加、修改弹出层标题
            title: '',
            // 是否显示添加、修改弹出层
            open: false,
            // 表单参数
            form: {
                userId: null,
            },
            // 表单校验
            rules: {
                // userId: [
                //     { required: true, message: '组长id不能为空', trigger: 'blur' }
                // ],
                content: [
                    { required: true, message: '通知内容不能为空', trigger: 'blur' }
                ],
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ]
            },
            editGroupVisible: false, // 是否显示编辑小组成员的弹窗
            editGroupForm: { // 编辑小组成员的表单数据
                userIdsStr: '',
                groupId: null
            },
        };
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    created() {
        this.form.userId = this.userInfo.userId;
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
        // 显示通知详情
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
            this.queryParams.userId = this.groupCreatorId;
            listNotice(this.queryParams).then(response => {
                this.noticeList = response.rows
                this.total = response.total
                this.loading = false
            })
        },

        //点击查看更多跳转到notice页面
        goToNoticePage() {
            this.$router.push('/notice');
        },

        /** 新增按钮操作 */
        handleAdd() {
            this.reset()
            this.open = true
            this.title = '添加组内通知'
        },

        /** 提交按钮 */
        submitForm() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    addNotice(this.form).then(response => {
                        alert('新增成功')
                        this.open = false
                        this.getNoticeListData()
                    })
                }
            })
        },
        // 表单重置
        reset() {
            this.form = {
                noticeId: null,
                userId: this.userInfo.userId,
                title: null,
                content: null,
                publishTime: null
            }
            //this.resetForm('form')
        },
        // 取消按钮
        cancel() {
            this.open = false
            this.reset()
        },
        /** oss响应操作 */
        handleHtmlUploadComplete(fileUrl) {
            // 在这里处理上传完成后的文件地址
            console.log('上传完成，文件地址：', fileUrl)
            this.form.content = fileUrl
        },
        // 打开编辑小组成员的弹窗
        editGroupMembers () {
            this.editGroupVisible = true;
            this.editGroupForm.userIdStr = '';
            this.editGroupForm.groupId = null;
        },

        // 提交编辑小组成员的表单
        submitEditGroupForm() {
            // 复制表单数据，避免直接修改数据
            let formData = { ...this.editGroupForm };

            // 将用户ID字段从逗号分隔的字符串转换为列表
            formData.userIds = formData.userIdsStr.split(',').map(userId => parseInt(userId));

            updateUserGroupIds(formData).then(response => {
                alert('编辑小组成员成功')
                this.editGroupVisible = false;
            })
        }
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

/* Added styles */
.notice {
    margin-top: 30px;
}

.notice-dialog {
    max-width: none;
}

.notice-id {
    color: #ff7f7f;
    font-weight: bold;
    text-align: left;
}

.notice-title {
    color: black;
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
}

.notice-time {
    font-size: 1.2em;
    text-align: left;
}

.separator {
    width: 100%;
    border: 0;
    border-top: 1px solid #f2f2f2;
}

.dialog-footer {
    text-align: right;
}
</style>
