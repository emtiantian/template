

import axios  from "axios";
import { message } from "element-ui";

export const serve =axios.create({baseURL:window.env.baseURL})

axios.interceptors.request.use((config)=>{
  return config
})
axios.interceptors.response.use((response)=>{
  if(response.status === 200){
    return response.data
  }else{
    message({
      type:"error",
      text:response.data.error||"服务繁忙请重试"
    })
  }
})
