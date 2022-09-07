import axios from "axios"
import Vue from "vue"
import qs from "querystring"
import store from "../store"
import { errorAlert } from "../utils/alert"
import router from "../router"

//1.环境
if(process.env.NODE_ENV==="development"){
    Vue.prototype.$pre="http://localhost:3000"
}else{
    Vue.prototype.$pre=""

}
//2.请求拦截
axios.interceptors.request.use(req=>{
if(req.url!="/api/userlogin"){
    req.headers.authorization=store.getters.userInfo.token
}
//每次请求做的罗技
    return req;

})

//3.响应拦截
axios.interceptors.response.use(res=>{
    console.group("本次球球地址"+res.config.url)
    console.log(res);
    console.groupEnd()
    if(res.data.code!==200){
        errorAlert(res.data.msg)
    }
    if(res.data.msg=="登录已过期或访问权限受限"){
        //清空userInfo changUserInfo
        store.dispatch("changeUserInfo",{})
        //跳转页面
         router.replace("/login")
    }
    return res
})
/**
 * 
 * @param {*} url :请求地址
 * @param {*} params ：请求参数：默认是{}
 * @returns axios
 * @eg :const reLogin=(user)=>get("/login",user)
 */
export const get  = (url,params = {})=>{
    return axios({
        url,
        method:"get",
        params
    })
}

export const post = (url,data={},isFile=false)=>{
    let params=null;
    if(isFile){
        //有文件
        params=new FormData()               
        for(let key in data){
            params.append(key,data[key])
        }
    }else{
        //无文件
        params=qs.stringify(data)
    }
    return axios({
        url,
        method:"post",
        data:params
    })
}