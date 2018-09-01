/*
使用axios和poromise封装的发ajax请求的函数模块
函数返回值是promise
*/
// 拼请求参数串
// data: {username: tom, password: 123}
// paramStr: username=tom&password=123
import axios from 'axios'
export default function ajax(url,data={},type='GET') {
  let promise;
  return new Promise((resolve,reject)=>{
    let paramStr = '';
    if(type === 'GET'){
    Object.keys(data).forEach(function (key) {
      paramStr+=key+'='+data[key]+'&';
    })
    if(paramStr){
      paramStr = paramStr.substring(0,paramStr.length-1);
      promise = axios.get(url+'?'+paramStr);
    }else if(!paramStr){
      promise = axios.get(url);
    }
  }else if(type==='POST'){
      promise = axios.post(url,data);
    }
    promise.then(response=> resolve(response.data))
           .catch(err=> reject(err))
  })

}
