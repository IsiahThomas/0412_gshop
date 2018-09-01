import Mock from 'mockjs'
import data from './data.json'

//暴露出goods接口数据
Mock.mock('/goods',{code: 0,data: data.goods})
//暴露出ratings数据
Mock.mock('/rating',{code: 0,data: data.ratings})
//暴露出info数据
Mock.mock('/info',{code: 0,data: data.info})

//对于mock的数据，不需要使用export default暴露，只需要在入口文件中import一下这个文件即可使用
