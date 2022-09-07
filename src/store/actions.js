export default {
    changeUserInfo(context,userInfo){
        //vuex存数据
        context.commit("changeUserInfo",userInfo)

        if(userInfo.token){
            sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
        }else{
            sessionStorage.removeItem("userInfo")
        }
    }
}