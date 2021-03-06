import axios  from "axios";
import { message } from "element-ui";
let url = process.env.NODE_ENV=="production"?window.env.baseUrl:window.location.orgin

export  const server =axios.create({baseURL:url})
server.interceptors.request.use((config)=>{
  return config
})
server.interceptors.response.use((response)=>{
  if(response.status === 200){
    if(response.data.State){
      try {
        return JSON.parse(response.data.DataJSON)
      } catch (error) {
        console.log("json错误",error)
      }
    }else{
      message.error({
        type:"error",
        text:response.data.message||"服务繁忙请重试"
      })
    }

  }else{
    message.error({
      type:"error",
      text:response.data.message||"服务繁忙请重试"
    })
  }
})

