export const userAgent = {
  data() {
    return {
      isTigerApp: false
    }
  },
  methods: {
    getUserAgent() {
      const ua = navigator.userAgent;
      const browser = {
        Tiger: !!ua.match(/Tiger/)
      };

      if (browser.Tiger) {
        this.isTigerApp = true
      }
    },
    emitBridge(funName, params) {
      if (this.isTigerApp) {
        document.location =
          "__bridge__" +
          encodeURI(JSON.stringify({ funName, params }), "utf-8") +
          "__bridge__";
      } else {
        console.log('err in web')
        console.dir({ funName, params })
      }
    }
  },
  mounted() {
    this.getUserAgent()
  }
}
