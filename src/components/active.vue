<template>
  <Modal
    v-model="isShow"
    title="解锁"
    footer-hide
    :closable="false"
    :mask-closable="false"
    width="400"
  >
    <login-form
      ref="loginform"
      v-if="isShow"
      btnText="解锁"
      :loading="loading"
      @on-success-valid="handleSubmit"
    ></login-form>
  </Modal>
</template>

<script>
import LoginForm from './login-form'
import 'view-design/dist/styles/iview.css'
// import { Encrypt } from '@/libs/tool/crypto'
// import { setCookie, getCookie } from '@/libs/tool/storage'
import { debounce } from 'lodash'
// import { homeHeart } from '@/api/base/user'
import { on, off } from '../libs/common'
import { Modal } from 'view-design'

export default {
  name: 'SdyActiveCheck',
  props: {
    username: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      isShow: false,
      quitTime: null,
      lastTime: new Date().getTime(), // 上次时间
      currentTime: new Date().getTime(), // 当前时间
      timeOut: 0.1 * 60 * 1000, // 超时时间  60min
      testTime: 0.05 * 60 * 1000, // 检测时间   5min
    }
  },
  components: {
    LoginForm,
    Modal,
  },
  computed: {
    isSuper() {
      return this.$store.getters.isSuper
    },
    isOrgAdmin() {
      return this.$store.getters.isOrgAdmin
    },
  },
  mounted() {
    this.isActive()
    on(window, 'beforeunload', this.beforeunloadFn)
  },
  destroyed() {
    this.removeTestActive()
    off(window, 'beforeunload', this.beforeunloadFn)
  },
  methods: {
    beforeunloadFn() {
      if (this.isShow) {
        this.handleLogOut().then(() => {
          this.$router.push({
            name: 'login',
          })
        })
      }
    },
    handleSubmit({ userName, password, code }) {
      userName = userName.trim()
      code = code.trim()
      // password = Encrypt(password)
      this.loading = true
      this.handleLogin({ userName, password, code })
        .then((n) => {
          // setCookie('needInit', n.is_init)
          // 创建img标签
          let img = document.createElement('img')
          img.setAttribute('style', 'width:0px;height:0px')
          img.setAttribute('src', n.preview_url)
          document.getElementsByTagName('body')[0].appendChild(img)
          // 创建心跳
          this.localHeart = setInterval(() => {
            homeHeart().then(() => {
              // if (!getCookie('token')) {
              //   clearInterval(this.localHeart)
              // }
            })
          }, 30 * 1000)
          this.isShow = false
          this.isActive()
          this.loading = false
          if (this.isOrgAdmin || this.isSuper) {
            // this.$Notice.success({
            //   title: '您当前已解锁，即将刷新页面'
            // })
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          }
        })
        .catch((fail) => {
          // console.log('fail', fail)
          this.$refs.loginform.reimg()
          this.$Message.warning(fail)
          this.loading = false
        })
    },
    isOverTime() {
      this.currentTime = new Date().getTime()
      // console.log('is over and update', this.currentTime)
      // 超时弹窗
      if (this.currentTime - this.lastTime > this.timeOut) {
        console.log('overtime')
        this.isShow = true
        this.$nextTick(() => {
          this.$refs.loginform.setName(this.username)
          this.removeTestActive()
        })
      }
    },
    initLastTime: debounce(function () {
      // console.log('move')
      this.lastTime = new Date().getTime()
    }, 2000),
    isActive() {
      // console.log('init')
      on(document, 'mousemove', this.initLastTime)
      on(document, 'keydown', this.initLastTime)
      this.quitTime = window.setInterval(this.isOverTime, this.testTime)
    },
    removeTestActive() {
      // console.log('remove')
      off(document, 'mousemove', this.initLastTime)
      off(document, 'mousemove', this.initLastTime)
      window.clearInterval(this.quitTime)
    },
  },
}
</script>
