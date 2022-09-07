import Vue from "vue"
let Filters = {

}
for( let i in Filters){
    Vue.component(i,Filters[i])
}