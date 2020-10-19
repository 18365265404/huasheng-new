<template>
    <div class="home">
        <!-- tiitle栏 -->
        <div style="padding-bottom:30px" >
     
         <div class="top-title" style="background: #66B1ff; line-height: 50px;">
                <span class="el-icon-info"></span><span>华盛官网管理系统</span>
         </div>
        <input type="button" value="+" @click="jia"/>
        <input type="button" value="-" @click="jian(2)"/>
        <p>{{count}}</p>
         <div>
            <p class="yuan" v-drag>Verson 1.0</p>
         </div>   
        </div>
        <div style="line-height:50px;text-align: center; font-size:26px; font-style: italic">欢迎使用~</div>
    </div>
    
</template>

<script>


import {mapActions,mapGetters} from 'vuex';
import { create } from 'domain';

export default {
    data(){
        return{

        }
    },
    methods:{
        ...mapActions([
            'jia','jian'
        ])
    },
    directives:{
        drag(el,binding){
                el.onmousedown=function(ev){
                       let disX=ev.clientX-el.offsetLeft;
                       let disY=ev.clientY-el.offsetTop;
                       document.onmousemove=function(ev){
                           el.style.left=ev.clientX-disX+"px"
                           el.style.top=ev.clientY-disY+"px"
                       } 
                       document.onmouseup=function(){
                        document.onmousemove=document.onmouseup=null;
                       }
                        return false;
                }
        }
    },
  computed:mapGetters([
    'count'
  ]),
 created(){
     console.log("homehomehomehomehomehome")
     this.$store.dispatch('SHOW_FOOT');
 }

}
</script>


<style scoped>
.home{
    flex: 1
    }
.yuan{
    position: absolute;
    left: 48%;
   
    top:300px;
    bottom:0;
    margin: auto;
    background: rgb(0, 255, 234);
    margin: 0 auto;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    text-align: center;
    line-height: 200px;
    border: 1px solid #cccccc;
}

</style>

