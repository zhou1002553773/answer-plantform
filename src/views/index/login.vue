<template>
    <div class="wrap">
        <div class="bg-img-box">
            <img :src="bgPath">
        </div>
        <div class="loginBox transparent"></div>
        <div class="loginBox">
            <div class="form-box">
                <div class="login-title">
                    <img src="../../assets/images/logo.png">
                </div>
                <div class="login-box">
                    <section class="login-item">
                        <span>
                            <i class="iconfont iconhead"
                                    :class="userNameActive ? 'active' : ''"></i>
                        </span>
                        <el-input class="login-input" v-model="userLoginAccount" placeholder="用户名／手机" @focus="checkLabel('userName')" @blur="checkLabel('')"></el-input>
                    </section>

                    <section class="login-item">
                        <span>
                            <i class="iconfont iconlock"
                                    :class="passwordActive ? 'active' : ''"></i>
                        </span>
                        <el-input class="login-input" v-model="userLoginPassword" type="password" placeholder="密码" @focus="checkLabel('password')" @blur="checkLabel('')"></el-input>
                    </section>
                </div>
                <el-button class="login-btn" type="primary" @click="subBtn">登录</el-button>
                <div class="forget-box">
                    <div @click="forgetPassword">忘记密码</div>
                </div>
            </div>
        </div>
        <el-dialog
            title="忘记密码"
            :visible.sync="dialogVisible"
            size="tiny">
          
            <div class="form-b">
                <section>
                    <span>手机</span>
                    <el-input class="input-box" placeholder="请输入内容" v-model="forgetData.tel" @input="checkTel"></el-input>
                </section>
                <section>
                    <span>验证码</span>
                    <el-input placeholder="请输入内容" class="input-box" v-model="codeInput">
                        <template v-if="timer" slot="append">
                            <span class="secondBox">剩余<i>{{seconds}}</i>秒</span>
                        </template>
                        <template v-else slot="append">
                            <span class="codeBox" :class="{clickBox: isClick}" @click="getCode(forgetData.tel)">获取验证码</span>
                        </template>
                    </el-input>
                </section>
                <section>
                    <span>新密码</span>
                    <el-input class="input-box" placeholder="请输入内容" type="password" v-model="forgetData.password"></el-input>
                </section>
                <section>
                    <span>确认密码</span>
                    <el-input class="input-box" placeholder="请输入内容" type="password" v-model="enterPassword"></el-input>
                </section>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" class="el-button-reset" size="small">取 消</el-button>
                <el-button type="primary" @click="updaetPassword" size="small">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="个人注册"
            :visible.sync="dialogUser"
            size="tiny">
          
            <div class="form-b">
                <section>
                    <span>手机</span>
                    <el-input class="input-box" placeholder="请输入内容" v-model="userData.userMobile" @input="checkTel"></el-input>
                </section>
                <section>
                    <span>验证码</span>
                    <el-input class="input-box" placeholder="请输入内容" v-model="codeInput">
                        <template v-if="timer" slot="append">
                            <span class="secondBox">剩余<i>{{seconds}}</i>秒</span>
                        </template>
                        <template v-else slot="append">
                            <span class="codeBox" :class="{clickBox: isClick}" @click="getCode(userData.userMobile)">获取验证码</span>
                        </template>
                    </el-input>
                </section>
                <section>
                    <span>企业邮箱</span>
                    <el-input class="input-box"
                                placeholder="eg：zhangsan"
                                v-model="userEmail"></el-input>
                </section>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogUser = false" class="el-button-reset" size="small">取 消</el-button>
                <el-button type="primary" @click="initUser" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import util from '../../assets/common/util'
import $ from 'Jquery'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'index',
    data() {
        return {
            userLoginAccount: '',
            userLoginPassword: '',
            dialogVisible: false,
            forgetData: {
                tel: '',
                password: ''
            },
            dialogUser: false,
            userEmail: '',
            userData: {
                userMobile: '',
                userEmail: ''
            },
            codeInput: '',
            timer: null,
            seconds: 90,
            enterPassword: '',
            isClick: false,
            bgPath: '/static/images/login-bg.jpg',
            loginMess: '',
            initStep: '',
            userNameActive: false,
            passwordActive: false
        }
    },
    mounted() {
        setTimeout(() => {
            $('.wrap').height($(document).height())
            var userAgent = navigator.userAgent
            var isWebkit = userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Safari") > -1

            if (!isWebkit) {
                this.$message({
                    message: '更好的体验，请您移驾Chrome或Safari浏览器！',
                    type: 'warning'
                })
            }
        }, 0)
    },
    methods: {
        checkLabel (type) {
            if (!type) {
                this.passwordActive = false
                this.userNameActive = false
            } else if (type === 'userName') {
                this.passwordActive = false
                this.userNameActive = true
            } else if (type === 'password') {
                this.passwordActive = true
                this.userNameActive = false
            }
        },
        forgetPassword () {
            this.forgetData = {
                tel: '',
                password: ''
            }

            this.isClick = false
            this.codeInput = ''

            if (this.timer) {
                clearInterval(this.timer)
                this.seconds = 90
                this.timer = null
            }

            this.dialogVisible = true
        },
        regestorUser () {
            this.userData = {
                code: '',
                userMobile: ''
            }

            this.isClick = false
            this.codeInput = ''

            if (this.timer) {
                clearInterval(this.timer)
                this.seconds = 90
                this.timer = null
            }

            this.dialogUser = true
        },
        checkTel (value) {
            if (value == '' || !(/^1[0-9]{10}$/).test(value.trim())) {
                this.isClick = false
            } else {
                this.isClick = true
            }
        },
        getCode (tel) {
            if (!this.isClick) {
                return
            }

            util.request({
                method: 'get',
                interface: 'getValidateCode',
                data: {
                    mobile: tel
                }
            }).then((res) => {
                if (res.result.success == '1') {
                    this.timer = setInterval(() => {
                        this.seconds--
                        if (this.seconds === 0) {
                            clearInterval(this.timer)
                            this.seconds = 90
                            this.timer = null
                        }
                    }, 1000)
                } else {
                    this.$message.error(res.result.message)
                }
            })
            
        },
        initUser () {
            if (this.userData.userMobile == '' || !(/^1[0-9]{10}$/).test(this.userData.userMobile.trim())) {
                this.$message.error('请输入11位注册手机号')
                return
            }

            if (this.codeInput == '') {
                this.$message.error('请输入验证码')
                return
            }

            if (!this.userEmail || this.userEmail.indexOf('@') > -1) {
                this.$message({
                    message: '请填写eg样例形式的名称！',
                    type: 'warning'
                })

                return false
            }

            util.request({
                method: 'post',
                interface: 'userInit',
                data: {
                    userEmail: this.userEmail + '@chinavisionary.com',
                    userMobile: this.userData.userMobile,
                    code: this.codeInput
                }
            }).then((res) => {
                if (res.result.success == '1') {
                    this.dialogUser = false
                    this.$message({
                      message: '恭喜你，注册成功',
                      type: 'success'
                    })

                    var pathUrl = {
                        name: 'login-detail',
                        query: {
                            userCode: res.result.result
                        }
                    }

                    this.$router.replace(pathUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        updaetPassword () {
            if (this.forgetData.tel == '' || !(/^1[0-9]{10}$/).test(this.forgetData.tel.trim())) {
                this.$message.error('请输入11位注册手机号')
                return
            }

            if (this.codeInput == '') {
                this.$message.error('请输入验证码')
                return
            }

            if (this.forgetData.password == '') {
                this.$message.error('请输入新密码')
                return
            }

            if (this.enterPassword == '') {
                this.$message.error('请确认新密码')
                return
            }

            if (this.enterPassword != this.forgetData.password) {
                this.$message.error('前后密码不一致')
                return
            }
            util.request({
                method: 'post',
                interface: 'resetPassword',
                data: {
                    mobile: this.forgetData.tel,
                    password: this.forgetData.password,
                    code: this.codeInput
                }
            }).then((res) => {
                if (res.result.success == '1') {
                    this.dialogVisible = false
                    this.$message({
                      message: '恭喜你，密码修改成功',
                      type: 'success'
                    })
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getUserInfo () {
            util.request({
                method: 'get',
                interface: 'getUserInfo',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    var datas = res.result.result
                    // todo
                    
                } else {
                  this.$message.error(res.result.message)
                }
            })
        },
        subBtn() {
            if (this.userLoginAccount == '') {
                this.$message.error('请输入用户名');
                return;
            }
            if (this.userLoginPassword == '') {
                this.$message.error('请输入密码');
                return;
            }

            var data = {
                userLoginAccount: this.userLoginAccount,
                userLoginPassword: this.userLoginPassword,
                loginType: 'platform'
            }

            util.request({
                method: 'post',
                interface: 'selectByAccount',
                data: data
            }).then((res) => {
                if (res.result.success != '0') {
                    var datas = res.result.result

                    console.log(res.result.result)
                } else {
                    this.$message({
                        message: res.result.message,
                        type: 'error'
                    })
                }
            });
        }
    }
}
</script>
<style lang="scss">
.wrap {
    background: #000000;
    overflow: hidden;
    position: relative;

    .form-b {
        margin-top: 0;
    }

    .bg-img-box {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            min-height: 100%;
        }
    }

    .message-box {
        position: absolute;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        margin-top: -80px;
        width: 380px;

        .mess-title {
            font-size: 26px;
            color: #FFFFFF;
            line-height: 36px;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .mess-content {
            padding-top: 10px;
            box-sizing: border-box;
            font-size: 16px;
            color: #FFFFFF;
            line-height: 30px;

            span {
                margin-right: 15px;
            }
        }
    }
    
    .transparent {
        background-color: #000;
        opacity: 0.15;
    }

    .loginBox {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 36%;
        transition: width 0.3s ease-out;

        .form-box {
            width: 66%;
            left: 17%;
            top: 30%;
            position: absolute;

            .login-title {
                display: block;

                img {
                    display: block;
                    width: 160px;
                    margin: 0 0 40px 56px;
                }
            }

            .login-mess {
                font-size: 14px;
                color: #73777A;
                line-height: 24px;
                margin-top: 20px;
            }

            .login-box {
                position: relative;
                border: 1px solid #fff;
                border-radius: 3px;

                .arrow {
                    position: absolute;
                    left: 21px;
                    top: -7px;
                    border-right: 7px solid transparent;
                    border-left: 7px solid transparent;
                    border-bottom: 7px solid #fff;
                    display: inline-block;
                    transition: left 0.5s ease;
                }

                .login-item {
                    display: flex;
                    background: #fff;
                    opacity: 0.9;
                    border-bottom: 1px solid #e3e4e5;
                    height: 44px;
                    line-height: 44px;
                    text-align: center;
                    
                    span {
                        width: 45px;
                        
                        i {
                            color: #ccc;
                            font-size: 18px;
                            transition: color ease-in 0.3s;
                        }

                        .active {
                            color: #555;
                        }
                    }

                    .login-input {
                        flex: 1;
                        
                        input {
                            text-align: left;
                            border: none;
                            border-radius: 0;
                            padding: 0;
                        }
                    }

                    &:last-child {
                        border-bottom: none !important;
                    }
                }
            }

            .forget-box {
                display: flex;
                height: 44px;
                align-items: center;
                justify-content: flex-end;

                div {
                    font-size: 14px;
                    color: #fff;
                    cursor: pointer;

                    &:last-child {
                        margin-left: 10px;
                    }
                }
            }

            .login-btn {
                margin-top: 20px;
                width: 100%;
                border-radius: 0;
                font-size: 14px;
                height: 44px;
                font-weight: bold;
                background-color: #188bce;
                border-color: #057ab8;
                border-radius: 2px;
            }
        }
        
    }
}
</style>
