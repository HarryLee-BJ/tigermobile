import { Indicator, Toast } from 'mint-ui'
import errMsg from '../unit/apiErr.js'

export const pageInit = {
  data() {
    return {
      isAJAX: false, // 是否通信过了 => loading  没有重新设为 true 只显示一次 loading
      showDataView: false, // 通信过了且有数据
      showNoView: false // 通信过了且没数据 showView 不能用同一个变量 会闪
    }
  },
  created() {
    Indicator.open({
      spinnerType: 'fading-circle'
    })
  },
  watch: {
    isAJAX(now) {
      if (!now) {
        Indicator.open({
          spinnerType: 'fading-circle'
        })
      } else {
        Indicator.close()
      }
    }
  },
  methods: {
    isTrue(httpResponse) {
      return new Promise(function (resolve, reject) {
        const {
          body: { success, data, message }
        } = httpResponse

        if (success) {
          this.showDataView = true
          resolve(data)
        } else {
          this.showNoView = true
          Toast(errMsg(parseInt(message)))
          reject(message)
        }
      }.bind(this))
    }
  }
}

