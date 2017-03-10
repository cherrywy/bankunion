<template>

    <div class="header">
        <span>{{header.title}}</span>
        <img class="share_icon2" :src="header.login" v-show="header.login!=null" @click="goPersonCenter" >
        <i class="back_icon" v-show="header.back" onclick="javascript:window.history.back(); return false"></i>
    </div>

</template>
<script>
  export default {
    data() {
      return {
     
      }
    },
     props:{
         header:{
          type:Object
        }
      },
      methods:{
          goPersonCenter:function(){
              var api_token=window.localStorage.getItem('api_token');
        
			if(!api_token||api_token=="undefined"||api_token=="null"){
	
                const path = '/login/login/'
                this.$router.push({path: path})
			}else{
                  this.$router.push({path:"/PersonCenter"})
            }
            
          }
      }
  }

</script>
<style>
.header {
    width: 100%;
    height: 2.15rem;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fdfdfd;
    text-align: center;
    line-height: 2.15rem;
    font-size: 0.65rem;
    color: #494949;
    border-bottom: 1px solid #d9d9d9;
    z-index: 99;
}
.share_icon2 {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    background-repeat: no-repeat;
    background-size: contain;
    top: 0.325rem;
    right: 0.325rem;
}
.back_icon {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(http://home.iwocar.com/images/back_icon.png);
    background-repeat: no-repeat;
    background-size: contain;
    top: 0.325rem;
    left: 0.325rem;
}

</style>