import Home from './components/home.vue'
import PersonCenter from './components/PersonCenter.vue'
import CFdetails from './components/cf_details.vue'
import TDactive  from './components/td_active.vue'
import accumulate from './components/accumulate.vue'
import accummore from './components/accummore.vue'
import ad_Administration from './components/ad_Administration.vue'
import address from './components/address.vue'
import logn  from './components/login/login.vue'
import register from './components/login/register.vue'
import rg_forget from './components/login/rg_forget.vue'
import TestDrive from './components/TestDrive.vue'
import waiting from './components/waiting.vue'
import cf_mine from './components/mine/cf_mine.vue'
import td_mine from './components/mine/td_mine.vue'
import pc_news from './components/mine/pc_news.vue'
import personal_data from './components/pc_personal_data.vue'
import zc_pay from './components/zc_pay.vue'
import update_adds from './components/update_adds.vue'

 

const routers = [
  {
    path: '/home',
    component: Home,
    
  }, 
  {
    path: '/TestDrive',
    component: TestDrive,
    
  },
  {
    path: '/waiting',
    component:waiting,
    
  }, 
   {
    path: '/mine/cf_mine',
    component:cf_mine,
    
  },
  {
    path: '/mine/td_mine',
    component:td_mine,
    
  }, 
  {
    path: '/mine/pc_news',
    component:pc_news ,
    
  }, 
    {
    path: '/zc_pay',
    component:zc_pay,
    
  }, 
   {
    path: '/login/register',
    component: register,
    
  }, 
  {
    path: '/login/login',
    component: logn,
    
  }, 
   {
    path: '/login/rg_forget',
    component:rg_forget,
    
  }, 
  {
    path: '/ad_Administration',
    component: ad_Administration,
    
  },
  {
    path: '/address',
    component: address,
    
  },
   {
    path: '/update_adds',
    component: update_adds,
    
  },
   {
    path: '/PersonCenter',
    component: PersonCenter,
    
  },
  {
    path: '/pc_personal_data',
    component: personal_data,
    
  },
  {
      path: '/CFdetails/:action_id' ,
      name: 'CFdetails',
      component: CFdetails
  },
  {
      path: '/TDactive/:action_id',
      name: 'TDactive',
      component: TDactive 
  },
  {
      path: '/accumulate',
      name: 'accumulate',
      component: accumulate 
  },
  {
      path: '/accummore/:',
      name: 'accummore',
      component: accummore 
  },
 
]

export default routers
