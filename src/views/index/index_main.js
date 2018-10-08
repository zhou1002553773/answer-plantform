import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHtml5Editor from 'vue-html5-editor'
import jsCookie from 'js-cookie'
import routes from './router'
import Element from 'element-ui'
import store from '../../vuex/store'
import util from '../../assets/common/util'
import components from '../../assets/common/components'
import $ from 'Jquery'
import 'element-ui/lib/theme-chalk/index.css'
import '../../assets/scss/common.scss'
import './scss/index.scss'
import '../../../static/iconfonts/iconfont.css'
import '../../../static/icomoon/style.css'
import '../../../static/loginIconfonts/iconfont.css'
Vue.use(VueHtml5Editor, {
    showModuleName: true,
    language: "zh-cn",
    image: {
        sizeLimit: 512 * 1024,
        compress: true,
        width: 320,
        height: 300,
        quality: 80,
    },
    modules: [{
        name: "bold",
        icon: "fa fa-bold",
        i18n: "加粗",
        title: "加粗",
        show: true,
        handler: function (editor) {
            editor.execCommand("bold");
        }
    }],
    visibleModules: [
        "bold",
        "color",
        "font",
        "align",
        "list",
    ]
})

Vue.use(VueRouter)
Vue.use(Element)
Vue.use(components)

// 实例化VueRouter
const router = new VueRouter({
  mode: 'history',
  routes
})

// 验证登录
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    // 滚动置顶
    window.scrollTo && window.scrollTo(0, 0)

    // 登陆状态
    var e2Token = jsCookie.get('socialmarketing_cloud_user')
    if (!e2Token && to.name !== 'login') {
        window.location.href = '/login'
    }

    // // 域名默认访问页面
    // if (to.name == 'home') {
    //     next('/article/')
    //     return
    // }

    // 进入不需要验证页面
    if (!to.meta.checkLogin) {
        next()
        return
    }

    // 获取用户信息
    // if (!store.state.userInfo.userInfo) {
    //     util.request({
    //         method: 'get',
    //         interface: 'getUserInfo',
    //         data: {}
    //     }).then(res => {
    //         if (res.result.success == '1') {
    //             var datas = res.result.result

                
                
    //         } else {
    //           alert(res.result.message)
    //         }
    //     })
    // } else {
        
    // }
})

new Vue({
    el: '#app',
    store,
    router
})
