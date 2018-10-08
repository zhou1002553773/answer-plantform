const routers = [
  {
    path: '/',
    name: 'home',
    component (resolve) {
      require.ensure(['./main.vue'], () => {
        resolve(require('./main.vue'))
      })
    },
    children: [
      {
        // 错误页
        path: 'errorCheck',
        name: 'errorCheck',
        component (resolve) {
          require.ensure(['./errorCheck.vue'], () => {
            resolve(require('./errorCheck.vue'))
          })
        },
        meta: {
          title: '错误页', // 页面标题
          checkLogin: 0, // 是否验证登录
          checkWork: 0, // 是否验证在职
          lookType: '' // 查看限制
        }
      },
      
    
  
      {
        // 订单管理
        path: 'order',
        component (resolve) {
          require.ensure(['./order/main.vue'], () => {
            resolve(require('./order/main.vue'))
          })
        },
        children: [
          {
            path: '',
            name: 'order',
            component (resolve) {
              require.ensure(['./order/orderList.vue'], () => {
                resolve(require('./order/orderList.vue'))
              })
            },
            meta: {
              title: '订单管理',
              checkLogin: 1,
              checkWork: 0,
              lookType: ''
            }
          },
          {
            path: 'orderDetail',
            name: 'order-detail',
            component (resolve) {
              require.ensure(['./order/orderDetail.vue'], () => {
                resolve(require('./order/orderDetail.vue'))
              })
            },
            meta: {
              title: '订单管理',
              checkLogin: 1,
              checkWork: 0,
              lookType: ''
            }
          }
        ]
      },
      
      
     
    ]
  },
  {
    // 登录页
    path: '/login',
    name: 'login',
    component (resolve) {
      require.ensure(['./login.vue'], () => {
        resolve(require('./login.vue'))
      })
    },
    meta: {
      title: '登录页',
      checkLogin: 0,
      checkWork: 0,
      lookType: ''
    }
  }
]

export default routers
