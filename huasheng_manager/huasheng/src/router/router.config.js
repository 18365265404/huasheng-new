import home from '../components/home.vue';
import city from '../components/city.vue';
import banner from '../components/banner.vue';
import fodder from '../components/fodder.vue';
import taoxi from '../components/taoxi.vue';
import cases from '../components/cases.vue';
import otherCookie from '../components/otherCookie.vue';
import shop from '../components/shop.vue';
import intro from '../components/intro.vue';
import team from '../components/team.vue';
import cookie from '../components/cookie.vue';

import contactUs from '../components/contactUs.vue';
import erCode from '../components/erCode.vue';
import links from '../components/links.vue';
import copeRight from '../components/copeRight.vue';
import icp from '../components/icp.vue';



import login from '../components/login.vue';








import error from '../components/error.vue';












let routes=[
  {path:'/home',name:"home",component:home},

  {path:'/city',name:"city",component:city},
  {path:'/banner',name:"banner",component:banner},
  {path:'/fodder',name:"fodder",component:fodder},
  {path:'/taoxi',name:"taoxi",component:taoxi},
  {path:'/cases',name:"cases",component:cases},
  {path:'/otherCookie',name:"otherCookie",component:otherCookie},
  {path:'/shop',name:"shop",component:shop},
  {path:'/intro',name:"intro",component:intro},
  {path:'/team',name:"team",component:team},
  {path:'/cookie',name:"cookie",component:cookie},
  {path:'/contactUs',name:"contactUs",component:contactUs},
  {path:'/erCode',name:"erCode",component:erCode},
  {path:'/links',name:"links",component:links},
  {path:'/copeRight',name:"copeRight",component:copeRight},
  {path:'/icp',name:"icp",component:icp},
  
  
  {path:'/login',name:"login",component:login},

  {path:'/error',component:error},


  
  
  
  
  {path:'/',redirect: '/login'},
  {path:'*',component:error}
]



// export default routes;
export default {routes}