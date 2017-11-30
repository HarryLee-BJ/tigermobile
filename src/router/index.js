import Vue from 'vue'
import Router from 'vue-router'

// SWQ
// webpack拆分

// 公众号
const report = r => require.ensure([], () => r(require('@/view/report')), 'GRP_ZZH')
const examination = r => require.ensure([], () => r(require('@/view/examination')), 'GRP_ZZH')
const myclass = r => require.ensure([], () => r(require('@/view/myclass')), 'GRP_ZZH')
const mycoach = r => require.ensure([], () => r(require('@/view/mycoach')), 'GRP_ZZH')
const schedule = r => require.ensure([], () => r(require('@/view/schedule')), 'GRP_ZZH')

// 老虎运动 App 分享页
const ClockInShare = r => require.ensure([], () => r(require('@/view/share/clockInShare.vue')), 'GRP_SHARE')
const trainingStatistics = r => require.ensure([], () => r(require('@/view/share/trainingStatistics.vue')), 'GRP_SHARE')
const personalPage = r => require.ensure([], () => r(require('@/view/share/personalPage/index.vue')), 'GRP_SHARE')
const groupRank = r => require.ensure([], () => r(require('@/view/share/groupRank.vue')), 'GRP_SHARE') // 新的排行页面

const clockinRank = r => require.ensure([], () => r(require('@/view/share/clockinRank/clockinRank.vue')), 'SINGLE_clockinRank')
// 挑战活动
const challengerStep = r => require.ensure([], () => r(require('@/view/challenger/step.vue')), 'GRP_challenger')
const challengerIndex = r => require.ensure([], () => r(require('@/view/challenger/index.vue')), 'GRP_challenger')
const challengerPoster = r => require.ensure([], () => r(require('@/view/challenger/poster.vue')), 'SINGLE_challenger_poster') // 邀请好友
const challengerJoin = r => require.ensure([], () => r(require('@/view/challenger/join.vue')), 'SINGLE_challenger_join') // 分享挑战 + 右上角
// 官方号
const offAccIndex = r => require.ensure([], () => r(require('@/view/offAcc/index.vue')), 'GRP_offAcc')
const offAccArticalInfo = r => require.ensure([], () => r(require('@/view/offAcc/articleInfo.vue')), 'GRP_offAcc')
// 教练分享页
const coachCareer = r => require.ensure([], () => r(require('@/view/coach/career.vue')), 'GRP_coach')

// Harry Lee
// 公众号
const ProfileEdit = r => require.ensure([], () => r(require('@/view/profileEdit.vue')), 'GRP_ZZH')
const BodyTestReportList = r => require.ensure([], () => r(require('@/view/bodyTestReportList.vue')), 'GRP_ZZH')

// 错误页面
const notFound = r => require.ensure([], () => r(require('@/view/404.vue')), 'SINGLE_404')

Vue.use(Router);

export default new Router({

  routes: [
    // SWQ
    {
      path: '/myclass',
      name: 'myclass',
      component: myclass,
      meta: {
        keep: true
      }
    },
    {
      path: '/report/:id',
      name: 'report',
      component: report
    },
    {
      path: '/examination/:id',
      name: 'examination',
      component: examination
    },

    {
      path: '/mycoach',
      name: 'mycoach',
      component: mycoach,
      meta: {
        keep: true
      }
    },
    {
      path: '/schedule/:id',
      name: 'schedule',
      component: schedule
    },

    {
      path: '/cS', // 安卓 iOS 不同步 !!!
      name: 'clockInShare',
      component: ClockInShare
    },
    {
      path: '/clockInShare', // 安卓 iOS 不同步 !!!
      name: 'clockInShare',
      component: ClockInShare
    },
    {
      path: '/trainingStatistics',
      name: 'trainingStatistics',
      component: trainingStatistics
    },
    {
      path: '/cR',
      name: 'clockinRank', // 改需求 做成了集合
      component: clockinRank,
      meta: {
        keep: true
      }
    },
    {
      path: '/userInfoShare', // 更新 删 userInfoShare.vue 使用 personalPage.vue  与APP分享关联 => 地址不能变
      name: 'personalPage',
      component: personalPage,
      meta: {
        keep: true
      }
    },
    {
      path: '/groupRank',
      name: 'groupRank',
      component: groupRank,
      meta: {
        keep: true
      }
    },

    {
      path: '/chlstep',
      name: 'chlstep',
      component: challengerStep
    },
    {
      path: '/chlsidx',
      name: 'chlsidx',
      component: challengerIndex
    },
    {
      path: '/chlPos',
      name: 'chlPos',
      component: challengerPoster
    },
    {
      path: '/chlJoin',
      name: 'chlJoin',
      component: challengerJoin
    },
    // 官方号
    {
      path: '/off/acc/:id',
      name: 'offAccIndex',
      component: offAccIndex
    },
    {
      path: '/off/article/:id',
      name: 'offAccArticalInfo',
      component: offAccArticalInfo
    },
    // 教练分享页
    {
      path: '/coach/career/:id',
      name: 'coachCareer',
      component: coachCareer
    },
    // HarryLee
    {
      path: '/profileEdit',
      name: 'profileEdit',
      component: ProfileEdit
    },
    {
      path: '/bodyTestReportList',
      name: 'bodyTestReportList',
      component: BodyTestReportList,
      meta: {
        keep: true
      }
    },

    // 404

    {
      path: '*',
      name: 'notFound',
      component: notFound
    }

  ]
})

