import Vue from "vue"
import uploadImg from "./uploadImg"
let Components = {
    uploadImg
}
for( let i in Components){
    Vue.component(i,Components[i])
}