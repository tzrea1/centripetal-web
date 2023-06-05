<template>
  <div class="login-way">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input

          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item v-if="captchaEnabled" prop="code">
        <el-input
          id="input"
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" class="login-code-img" @click="getCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div v-if="register" style="float: right;">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--    <el-form ref="loginForm" :model="loginForm" :rules="rules">-->
    <!--      <el-form-item prop="username">-->
    <!--        <el-input ref="username" v-model.trim="loginForm.username" placeholder="请输入用户名" clearable />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item prop="password">-->
    <!--        <el-input ref="passowrd" v-model.trim="loginForm.password" placeholder="请输入密码" show-password />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item v-if="index === 1" prop="ckpassword">-->
    <!--        <el-input v-model.trim="loginForm.ckpassword" placeholder="请再次输入密码" show-password />-->
    <!--      </el-form-item>-->
    <!--      <el-form-item v-if="captchaEnabled" prop="code">-->
    <!--        <el-input-->
    <!--          id="input"-->
    <!--          v-model="loginForm.code"-->
    <!--          auto-complete="off"-->
    <!--          placeholder="验证码"-->
    <!--          @keyup.enter.native="handleLogin"-->
    <!--        >-->
    <!--          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />-->
    <!--        </el-input>-->
    <!--        <div class="login-code">-->
    <!--          <img :src="codeUrl" class="login-code-img" @click="getCode">-->
    <!--        </div>-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->
    <!--    <button-->
    <!--      class="login-btn"-->
    <!--      :class="{'is-loading': isLoading || (index == 1 && !loginForm.argement)}"-->
    <!--      @click="handleValidateForm"-->
    <!--    >-->
    <!--      {{ btnText }}-->
    <!--    </button>-->
  </div>
</template>
<script>

import {mapMutations} from 'vuex'
import {getCodeImg, logout, getInfo} from '@/api/login'
import Cookies from 'js-cookie'
import {encrypt, decrypt} from '@/utils/jsencrypt'

export default {
    name: 'Login',
    data () {
        return {
            codeUrl: '',
            loginForm: {
                username: 'admin',
                password: 'admin',
                rememberMe: false,
                code: '',
                uuid: ''
            },
            loginRules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入您的账号' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入您的密码' }
                ],
                code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
            },
            loading: false,
            // 验证码开关
            captchaEnabled: true,
            // 注册开关
            register: false,
            redirect: undefined
        }
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    created () {
        logout()
        this.getCode()
        this.getCookie()
    },
    methods: {
        getCode () {
            getCodeImg().then(res => {
                this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
                if (this.captchaEnabled) {
                    this.codeUrl = 'data:image/gif;base64,' + res.img
                    this.loginForm.uuid = res.uuid
                }
            })
        },
        getCookie () {
            const username = Cookies.get('username')
            const password = Cookies.get('password')
            const rememberMe = Cookies.get('rememberMe')
            this.loginForm = {
                username: username === undefined ? this.loginForm.username : username,
                password: password === undefined ? this.loginForm.password : decrypt(password),
                rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
            }
        },
        handleLogin () {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    if (this.loginForm.rememberMe) {
                        Cookies.set('username', this.loginForm.username, { expires: 30 })
                        Cookies.set('password', encrypt(this.loginForm.password), { expires: 30 })
                        Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 })
                    } else {
                        Cookies.remove('username')
                        Cookies.remove('password')
                        Cookies.remove('rememberMe')
                    }
                    this.$store.dispatch('Login', this.loginForm).then(() => {
                        getInfo().then(res => {
                            console.log(res.user)
                            this.setUserInfo(res.user)
                        })
                        this.setShowLogin(false)
                    }).catch(() => {
                        this.loading = false
                        if (this.captchaEnabled) {
                            this.getCode()
                        }
                    })
                }
            })
        },
        //vuex
        ...mapMutations('login', {
            'setUserInfo': 'SET_USER_INFO',
            'setShowLogin': 'SET_SHOW_LOGIN'
        })
    }
}
// export default {
//     props: {
//         index: Number
//     },
//     data () {
//         const checkPassword = (rule, value, callback) => {
//             if (!value) {
//                 callback(new Error('请再次输入密码'))
//             } else if (value !== this.loginForm.password) {
//                 callback(new Error('两次输入的密码不一致'))
//             } else {
//                 callback()
//             }
//         }
//         const rules = {
//             username: [
//                 {required: true, message: '请输入用户名', trigger: 'blur'}
//             ],
//             password: [
//                 {required: true, message: '请输入密码', trigger: 'blur'}
//             ],
//             ckpassword: [
//                 {required: true, message: '请再次输入密码', trigger: 'blur'},
//                 {validator: checkPassword, trigger: 'blur'}
//             ]
//         }
//         return {
//             isLoading: false,
//             rules: rules,
//             // 验证码开关
//             captchaEnabled: true,
//             loginForm: {
//                 username: '',
//                 password: '',
//                 ckpassword: '',
//                 auto: true,
//                 argement: false
//             }
//         }
//     },
//     mounted () {
//         // 自动聚焦
//         const usernameRef = this.$refs.username
//         const passwordRef = this.$refs.password
//         if (!this.loginForm.username) {
//             usernameRef.focus()
//         } else if (!this.loginForm.password) {
//             passwordRef.focus()
//         }
//         // 监听enter事件
//         window.addEventListener('keyup', this.handleListenKeyup)
//     },
//     methods: {
//         // 表单校验
//         handleValidateForm () {
//             if (this.isLoading || (this.index === 1 && !this.loginForm.argement)) {
//                 return false
//             }
//             this.$refs['loginForm'].validate((valid) => {
//                 if (valid) {
//                     this.handleBtnClick()
//                 }
//             })
//         },
//         // 按钮点击
//         handleBtnClick () {
//             const params = {
//                 username: this.loginForm.username,
//                 // password: crypto.MD5(this.loginForm.password).toString()
//                 password: this.loginForm.password
//             }
//             // 判断是登陆还是注册
//             const func = this.index === 0 ? userLogin : userRegister
//             const tips = this.index === 0 ? '登录' : '注册'
//             this.isLoading = true
//             func(params).then(res => {
//                 this.isLoading = false
//                 let {code, data, msg} = res
//                 if (code !== ERR_OK) {
//                     this.loginForm.password = ''
//                     this.loginForm.ckpassword = ''
//                     this.loginForm.argement = false
//                     this.$message.error(msg)
//                     return false
//                 }
//                 this.$message.success(`${tips}成功`)
//                 this.loginForm = {}
//                 // 缓存用户数据
//                 this.setUserInfo(data)
//                 // 关闭弹窗
//                 this.setShowLogin(false)
//             }).catch(() => {
//                 this.isLoading = false
//                 this.$message.error('服务器异常')
//             })
//         },
//         // 监听页面enter事件
//         handleListenKeyup (e) {
//             if (e.keyCode === 13) {
//                 this.handleValidateForm()
//             }
//         },
//         // vuex
//         ...mapMutations('login', {
//             'setUserInfo': 'SET_USER_INFO',
//             'setShowLogin': 'SET_SHOW_LOGIN'
//         })
//     },
//     watch: {
//         index () {
//             this.$refs.loginForm.resetFields()
//         }
//     },
//     computed: {
//         btnText () {
//             let text = ''
//             if (this.index === 0) {
//                 text = this.isLoading ? '登录中...' : '登录'
//             } else {
//                 text = this.isLoading ? '注册中...' : '注册'
//             }
//             return text
//         }
//     },
//     beforeDestroy () {
//         window.removeEventListener('keyup', this.handleListenKeyup)
//     }
// }
</script>


<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 80%;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
