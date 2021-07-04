
import Cookies from 'js-cookie'
import {userKey} from "@/config/index.js"

function isLogin(){
  if(Cookies.get(userKey)){
    return true
  }
  return false
}
function login(val){
  Cookies.set(userKey,val)
}
function loginOut(){
  Cookies.remove(userKey)
}


export {isLogin,login,loginOut}
