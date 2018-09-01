import ajax from "./ajax";
export const reqAddress =(geohash)=> ajax(`/api/position/${geohash}`);
//获取食品分类列表
export const reqCategory = ()=> ajax(`/api/index_category`);
//根据经纬度商家列表
export const reqShopStore = (latitude,longitude)=> ajax(`/api/shops`,{latitude,longitude});
//根据关键字和经纬度获取商铺列表
export const reqShopList = (keyword,geohash)=> ajax(`/api/search_shops`,{keyword,geohash});
//获取一次性验证码
export const reqCaptcha = () =>ajax(`/api/captcha`);
//用户名密码登陆post
export const reqLogin = (name,pwd,captcha)=>ajax(`/api/login_pwd`,{name,pwd,captcha},'POST');
//发送短信验证码
export const reqPhone = (phone)=>ajax(`/api/sendcode`,{phone});
//手机号验证码登陆
export const reqPhoneMsg = (phone,code)=>ajax(`/api/login_sms`,{phone,code},'POST');
//根据会话获取用户信息
export const reqUsersInfo = ()=>ajax(`/api/userinfo`);
//用户登出
export const reqLogout = ()=>ajax(`/api/logout`);

//请求商家详情，因为是mock的数据，所以不需要代理api
export const reqShopInfo = ()=>ajax('/info');
//请求商品列表
export const reqShopGoods = ()=>ajax('/goods');
//请求商家评价
export const reqShopRatings = ()=>ajax('/ratings');
