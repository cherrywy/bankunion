<template>
    <div id="TestDrive" class="container">
       
        <div class="sy_box">
		 <comp-header :header="header"></comp-header>
			<!--尽请期待-->
			<div class="watting">
				<img src="../../src/assets/images/watting.jpg" alt="" />
			</div>
			
		</div>
		</div>
    </div>
</template>

<script>
    import CompHeader from './header.vue'
    export default {
        name: 'TestDrive',
        data() {
            return {
               
                header: {
                    title: "分期特惠",
                    login: "../../src/assets/images/ct_icon.png",
                    back: true
                }
            }
        },
        components: {
            CompHeader,
        },
      
        methods: {
             
           
        }
    }

</script>


<style>
#app{
    background-color: #f2f2f2;
    padding-bottom: 0.5rem;
}
.watting{
	width:10rem;
	height:10rem;
	margin:0 auto;
	margin-top:4rem;
	border-radius: 50%;
	overflow: hidden;
}
.watting img{
	width:10rem;
	height:10rem;	
}
</style>