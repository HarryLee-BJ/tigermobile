/**
 * Created by HarryLee on 2017/7/5.
 */
export default {
  install(Vue) {
    // Vue.prototype.$getApi = 'https://t.socap1.com'
    // Vue.prototype.$getApi = 'http://q.socap1.com:4000'
    Vue.prototype.$getApi = process.env.NODE_ENV === 'development' ? 'http://q.socap1.com:4000' : 'https://t.socap1.com'
  }
}
