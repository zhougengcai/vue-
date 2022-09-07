export const state = {
    // 刷新，将本地存储赋值到vuex 

    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export const getters={
    userInfo(state){
        return state.userInfo
    }
}
export const mutations={
    changeUserInfo(state,userInfo){
        state.userInfo=userInfo
    }
}