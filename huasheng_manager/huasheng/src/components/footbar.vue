<template>
  <div class="foot-btn"   style="position:relative;">

    
    
    <el-menu
      :default-openeds="openeds"
      :id="showId"
      :unique-opened="true"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#FAFAFA"
      text-color="#48576A"
      active-text-color="#4DB3FF">
      <el-submenu v-for="(item,index) of list" :key="item.id"  :index="item.id">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span style="margin-left:30px">{{item.name}}</span>
        </template>
          <el-menu-item-group class="two-page-box" style="margin-top:-15px" >  
               <el-menu-item id="two-menue-li"  v-show="item.status" :index="item.id" v-for="item of item.menus" :key="item.id" >
                 <router-link active-class="home1" class="name-text" tag="span" :to="item.expres" ><span style="display:block;margin-left:30px" :class="item.iconTwo">{{item.name}}</span></router-link>
               </el-menu-item>
          </el-menu-item-group>


        
      </el-submenu>


    </el-menu>
    <div class="btn-scale-box">

      <button type="button" @click="scale()" class="btn-scale el-button el-button--primary el-button--small" style="margin-bottom: 10px;"><i class="el-icon-menu"></i></button>
    </div>
  </div>
</template>

<script>
// import {getCookie} from '../utils/utils';
import {mapActions,mapGetters} from 'vuex';
import {setCookie,getCookie,delCookie} from '../utils/utils';
export default {
    data(){
      return{
        //  isCollapse: true,
        showId:"scale",
        router:true,
        isShow:true,
        openeds:["0"],//默认打开的
        list:[],


      };
    },

    watch:{
        initFoot:function(val){
          if(val){

            this.openeds=["0"]

            
          }

        },

    $route:function(newValue,oldValue){
      let path = newValue.path;


      if(/login|cPassWord/.test(path)){
        // this.initFoot=false
      }




    }


    },
    computed :{
      ...mapGetters([
        "initFoot"
      ]),


    } ,
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      scale(){
       if(this.showId=="scaleB"){
          this.showId="scaleS"
          setCookie('footer-Scale','scaleS'); 
          
       }else{
         this.showId="scaleB"
         setCookie('footer-Scale','scaleB'); 
       }
       
          
      }
      
    },

    created(){
     
      this.showId= getCookie('footer-Scale');

var routers = this.$router.options.routes; // 获取路由对象

console.log("111111111111111111111111111140290000000000000000",routers)



      //用来管理浏览器刷新，保存路由状态
       var  path = window.location.href
       var newPath = path.split('/#/')[1];


      // alert(newPath)

      if(newPath=="city"){
        
        this.openeds=["1"]
      }
      if(newPath=="banner" || newPath=="fodder"){
        
        this.openeds=["2"]
      }
      if(newPath=="taoxi"){
      
        this.openeds=["3"]
      }
      if(newPath=="cases"){
      
        this.openeds=["4"]
      }
      if(newPath=="cookie"){
      
        this.openeds=["5"]
      }
      if(newPath=="otherCookie"){
      
        this.openeds=["6"]
      }
      if(newPath=="shop"){
      
        this.openeds=["7"]
      }
      if(newPath=="intro" || newPath=="team" || newPath=="contactUs"){
      
        this.openeds=["8"]
      }
      if(newPath=="erCode" || newPath=="links" || newPath=="copeRight" || newPath=="icp"){
      
        this.openeds=["9"]
      }



      this.list=[
              {
              "status":true, 
              "id": "1",
              "name": "门店管理",
              "menus": [

                        { "id": "1-1","status":true, "name": "城市管理","expres":"city"},
                       
                      ]
              },
 
              {

              "status":true, 
              "id": "2", 
              "name": "文件管理",
              "menus": [
                        { "id": "2-1","status":true, "name": "轮播图管理","expres":"banner"},
                        { "id": "2-2","status":true, "name": "首页素材管理","expres":"fodder"},

                    ]
              },
              {

              "status":true, 
              "id": "3", 
              "name": "套系管理",
              "menus": [
                        { "id": "3-1","status":true, "name": "套系管理","expres":"taoxi"},
                        
                    ]
              },

              {

              "status":true, 
              "id": "4", 
              "name": "婚礼案例",
              "menus": [
                        { "id": "4-1","status":true, "name": "婚礼案例","expres":"cases"},

                    ]
              },

              {

              "status":true, 
              "id": "5", 
              "name": "婚礼菜系",
              "menus": [
                        { "id": "5-1","status":true, "name": "婚礼菜系","expres":"cookie"},

                    ]
              },

              {

              "status":true, 
              "id": "6", 
              "name": "其它宴",
              "menus": [
                        { "id": "6-1","status":true, "name": "其它宴","expres":"otherCookie"},

                    ]
              },

              {

              "status":true, 
              "id": "7", 
              "name": "在线看店",
              "menus": [
                        { "id": "7-1","status":true, "name": "在线看店","expres":"shop"},

                    ]
              },

              
              {

              "status":true, 
              "id": "8", 
              "name": "关于我们",
              "menus": [
                        { "id": "8-1","status":true, "name": "公司简介","expres":"intro"},
                        { "id": "8-2","status":true, "name": "服务团队","expres":"team"},
                        { "id": "8-3","status":true, "name": "联系我们","expres":"contactUs"},
                    ]
              },

              {

              "status":true, 
              "id": "9", 
              "name": "底部栏",
              "menus": [
                        { "id": "9-1","status":true, "name": "二维码","expres":"erCode"},
                        { "id": "9-2","status":true, "name": "友情链接","expres":"links"},
                        { "id": "9-3","status":true, "name": "Coperight","expres":"copeRight"},
                        { "id": "9-4","status":true, "name": "ICP备案信息","expres":"icp"},
                    ]
              },
           ]
    

    },
    


  };
  


</script>

<style scoped>
.el-menu-item-group__title{}
.btn-scale-box{
  position: relative;
}
.foot-btn{
  /* width: 185px; */
display: flex;
}
.btn-scale{
position: absolute;
left: 20px;
width: 30px;
text-align: center;
height: 30px;
top:20px;
}

.el-menu-vertical-demo{
  width: 225px;
  overflow: hidden;
  overflow-y: scroll
}
#scaleB{


  width: 0px;
  transition: width .5s;

}

#scale{


  width: 225px;


}
#scaleS{


  width: 225px;
  transition: width .5s;

}
.btn-scale i{
  margin-left: -8px;
  margin-top: -3px;
  text-align: center;
  font-size: 16px;
}
.name-text:hover{
  background: #c8c8c8;
}
.home1{

  color: #66B1FF;
  background: #ECF5FF
}
.home1 span{
  color: #66B1FF;
}
.name-text{
  color: #333;
  background: #fafafa;
  width:185px;
  overflow: hidden;
 
  
  
}
  .el-menu--vertical .el-menu--popup .el-submenu__title {
    display: none
  }
</style>
