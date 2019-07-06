import Axios from "axios"

const axios = Axios.create({
  baseURL: 'https://conduit.productionready.io/api',
  validateStatus: function (status) {
    return true
  }
})

axios.interceptors.request.use(req => {
  console.log("Request:", req)
  return req
})

axios.interceptors.response.use(res => {
  console.log("Response:", res)
  return res
})

export default axios