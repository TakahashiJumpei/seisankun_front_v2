import axios from 'axios'

const SeisankunApi = {
  install (Vue) {
    const seisankunApi = axios.create({
      baseURL: process.env.VUE_APP_SEISANKUN_API_BASE_URL,
      timeout: 10000,
      auth: {
        username: process.env.VUE_APP_BASIC_AUTH_API_USER_NAME,
        password: process.env.VUE_APP_BASIC_AUTH_API_PASSWORD
      }
    })
    seisankunApi.interceptors.request.use((config) => {
      config.headers.common = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      return config
    })
    Vue.prototype.$seisankunApi = seisankunApi
  }
}

export default SeisankunApi
