import {get,post} from "./http"

//菜单管理接口
//添加
export const reqmenuadd = (params) => post("/api/menuadd", params)
//列表
export const reqmenulist = (params) => get("/api/menulist", params)
//一条
export const reqmenuinfo = (params) => get("/api/menuinfo", params)
//修改
export const reqmenuedit = (params) => post("/api/menuedit", params)
//删除
export const reqmenudelete = (params) => post("/api/menudelete", params)


//角色管理接口
//添加
export const reqroleadd = (params) => post("/api/roleadd", params)
//列表
export const reqrolelist = (params) => get("/api/rolelist", params)
//一条
export const reqroleinfo = (params) => get("/api/roleinfo", params)
//修改
export const reqroleedit = (params) => post("/api/roleedit", params)
//删除
export const reqroledelete = (params) => post("/api/roledelete", params)

//管理远接口
//添加
export const requseradd = (params) => post("/api/useradd", params)
//列表
export const requserlist = (params) => get("/api/userlist", params)
//一条
export const requserinfo = (params) => get("/api/userinfo", params)
//修改
export const requseredit = (params) => post("/api/useredit", params)
//删除
export const requserdelete = (params) => post("/api/userdelete", params)

//总数
export const requsercount = () => get("/api/usercount")

//登录
export const requserlogin= (params) => post("/api/userlogin", params)






//分类管理接口
//添加
export const reqcateadd = (params) => post("/api/cateadd", params,true)
//列表
export const reqcatelist = (params) => get("/api/catelist", params)
//一条
export const reqcateinfo = (params) => get("/api/cateinfo", params)
//修改
export const reqcateedit = (params) => post("/api/cateedit", params,true)
//删除
export const reqcatedelete = (params) => post("/api/catedelete", params)


//规格管理接口
//添加
export const reqspecsadd = (params) => post("/api/specsadd", params)
//列表
export const reqspecslist = (params) => get("/api/specslist",params)
//一条
export const reqspecsinfo = (params) => get("/api/specsinfo", params)
//修改
export const reqspecsedit = (params) => post("/api/specsedit", params)
//删除
export const reqspecsdelete = (params) => post("/api/specsdelete", params)

//总数
export const reqspecscount = () => get("/api/specscount")



//会员管理接口
//添加

//列表
export const reqmemberlist = (params) => get("/api/memberlist",params)
//一条
export const reqmemberinfo = (params) => get("/api/memberinfo", params)
//修改
export const reqmemberedit = (params) => post("/api/memberedit", params)


//轮播图接口
//添加
export const reqbanneradd = (params) => post("/api/banneradd", params,true)
//列表
export const reqbannerlist = (params) => get("/api/bannerlist",params)
//一条
export const reqbannerinfo = (params) => get("/api/bannerinfo", params)
//修改
export const reqbanneredit = (params) => post("/api/banneredit", params,true)
//删除
export const reqbannerdelete = (params) => post("/api/bannerdelete", params)



//商品管理接口
//添加
export const reqgoodsadd = (params) => post("/api/goodsadd", params,true)
//列表
export const reqgoodslist = (params) => get("/api/goodslist",params)
//一条
export const reqgoodsinfo = (params) => get("/api/goodsinfo", params)
//修改
export const reqgoodsedit = (params) => post("/api/goodsedit", params,true)
//删除
export const reqgoodsdelete = (params) => post("/api/goodsdelete", params)

//总数
export const reqgoodscount = () => get("/api/goodscount")




//秒杀活动接口
//添加
export const reqspeckadd = (params) => post("/api/seckadd", params)
//列表
export const reqspecklist = (params) => get("/api/secklist",params)
//一条
export const reqspeckinfo = (params) => get("/api/seckinfo", params)
//修改
export const reqspeckedit = (params) => post("/api/seckedit", params)
//删除
export const reqspeckdelete = (params) => post("/api/seckdelete", params)