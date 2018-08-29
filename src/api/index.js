import ajax from "./ajax";
export const reqAddress =(geohash)=> ajax(`/api/position/${geohash}`);

export const reqCategory = ()=> ajax(`/api/index_category`);
//根据经纬度商家列表
export const reqShopStore = (latitude,longitude)=> ajax(`/api/shops`,{latitude,longitude});
//根据关键字和经纬度获取商铺列表
export const reqShopList = (keyword,geohash)=> ajax(`/api/search_shops`,{keyword,geohash});

export const reqCaptcha = ()=>ajax(`/api/captcha`);

export const reqLogin = (name,pwd)=>ajax(`/api/login_pwd`,{name,pwd},'POST');

export const reqPhone = (phone)=>ajax(`/api/sendcode`,{phone});

export const reqPhoneMsg = (phone,code)=>ajax(`/api/login_sms`,{phone,code},'POST');

export const reqUsersinfo = ()=>ajax(`/api/userinfo`);

export const reqLogout = ()=>ajax(`/api/logout`);
