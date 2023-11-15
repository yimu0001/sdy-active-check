<template>
  <div class="login-form-area">
    <div icon="log-in" :bordered="false" class="login-con-card">
      <Tabs value="name1" @on-click="clickTabs">
        <TabPane label="账户密码登录" name="name1">
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
              <FormItem prop="userName">
                <Input v-model="form.userName" placeholder="请输入用户名（手机号）">
                  <span slot="prepend">
                    <Icon :size="16" type="ios-person"></Icon>
                  </span>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码">
                  <span slot="prepend">
                    <Icon :size="14" type="md-lock"></Icon>
                  </span>
                </Input>
              </FormItem>
              <FormItem prop="verificationCode">
                <Row>
                  <Col span="11" class="verification-img-box">
                    <img :src="codeImg" alt="" class="verificationImg" @click="reimg()" />
                  </Col>
                  <Col span="11" offset="2">
                    <Input v-model="form.verificationCode" placeholder="请输入验证码"></Input>
                  </Col>
                </Row>
              </FormItem>
              <Button
                @click="handleSubmit"
                type="primary"
                long
                :disabled="login_btn_name != '登录'"
                >{{ login_btn_name }}</Button
              >
            </Form>
            <p class="login-tip">{{ message }}</p>
          </div>
        </TabPane>
        <TabPane label="扫码登录" name="name2">
          <img class="login-code" :src="coverImg" @click="reImg()" />
          <p>请使用App扫描登录</p>
          <p>{{ statusWord }}</p>
          <!-- <Button @click="reImg()">点击刷新</Button> -->
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button, Row, Col, Icon, Tabs, TabPane, Card } from 'view-design'

import 'view-design/dist/styles/iview.css'
export default {
  name: 'LoginForm',
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Row,
    Col,
    Icon,
    Tabs,
    TabPane,
    Card,
  },
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '账号不能为空', trigger: 'blur' }]
      },
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
    },
    verificationCodeRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      },
    },
    pwdForgetShow: {
      type: String | Number,
      default: '1',
    },
    codeKey: '',
    message: '',
    codeKey: '',
    coverImg: '/auth/qrcode',
    tabsName: '',
    statusWord: '等待扫码',
    im: undefined,
    entryType: undefined,
    templateTitle: undefined,
    qrcodeShow: undefined,
    pwdForgetShow: undefined,
    backgroundImg: '',
    loginLogoUrl: '', //logo地址
  },
  data() {
    return {
      form: {
        userName: '',
        password: '',
        verificationCode: '',
      },
      codeImg: '',
      oldCodeImg: '/common/captcha',
      mycodeKey: '',
      login_btn_name: '登录',
      pwdForgetShowValue: this.pwdForgetShow, //忘记密码
      usernameDisabled: false,
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        verificationCode: this.verificationCodeRules,
      }
    },
  },
  methods: {
    setName(userName) {
      if (userName) {
        this.form.userName = userName
        this.usernameDisabled = true
      } else {
        this.form.userName = userName
        this.usernameDisabled = false
      }
      if (process.env.NODE_ENV === 'development') {
        this.oldCodeImg = '/api/common/captcha'
      }
      this.reimg()
    },
    reimg() {
      this.codeImg = this.oldCodeImg + '?' + Math.random()
      this.login_btn_name = '登录'
    },
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login_btn_name = '登录中...'
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            code: this.form.verificationCode,
          })
        }
      })
    },
    clickTabs(name) {
      this.tabsName = name
      this.checkLogin()
    },
    checkLogin() {
      // let code = Cookies.get("code");
      // let item = {
      //   code: code
      // };
    },
    //刷新图片
    reImg() {
      this.coverImg = this.coverImg + '?' + Math.random()
      this.statusWord = '等待扫码'
    },
  },
}
</script>

<style lang="less" scoped>
.login-form-area {
  text-align: center;
}

.login-header {
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  padding: 30px 0;
}
.form-con {
  padding: 10px 0 0;
}
.login-tip {
  font-size: 10px;
  text-align: center;
  color: #c3c3c3;
}
.login-code {
  width: 60%;
}
.ivu-tabs-tabpane {
  text-align: center;
}
.ivu-tabs-bar {
  border: none;
}
.ivu-tabs-nav .ivu-tabs-tab {
  margin-right: 0;
  width: 50%;
  text-align: center;
}
.ivu-tabs-nav {
  width: 100%;
}
.ivu-tabs-ink-bar {
  width: 50%;
}
.ivu-input-group-prepend {
  background: none;
}
.checkBox {
  height: 34px;
  line-height: 34px;
  display: inline-block;
  margin-bottom: 10px;
  cursor: pointer;
}
input[type='checkbox'] {
  width: 20px;
  height: 20px;
  background-color: #fff;
  -webkit-appearance: none;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  outline: none;
  vertical-align: middle;
  margin-right: 5px;
  cursor: pointer;
}
.checkBox input[type='checkbox']:checked {
  // background: url('../../assets/images/checkbox_icon.png') no-repeat center;
  background-size: 100%;
}
.router-link-active {
  float: right;
  height: 34px;
  line-height: 34px;
}
form {
  text-align: left;
}
.forget-link {
  float: right;
  height: 34px;
  line-height: 34px;
}
.login-logo {
  text-align: center;
  margin-bottom: 50px;
}
</style>
