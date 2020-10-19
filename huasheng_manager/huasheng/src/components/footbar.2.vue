<template>
  <div class="foot-btn"   style="position:relative;">

    
    <el-menu
    :id="showId"
    :unique-opened="true"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
     
      text-color="#48576A"
      active-text-color="#4DB3FF">
      <el-submenu v-for="(item,index) of list" :key="item.id"  :index="item.id">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group  v-show="item.status" :index="item.id" v-for="item of item.menus" :key="item.id">
          
              <router-link style="display:block; width:100%" active-class="home1" class="name-text" tag="span" :to="item.expres" >
                <el-menu-item style="margin-top:-15px"  :index="item.id">
                  <i :class="item.iconTwo"></i><span>{{item.name}}</span>
                </el-menu-item>
              </router-link>


        </el-menu-item-group>
        
      </el-submenu>


    </el-menu>
    <div class="btn-scale-box">

      <button type="button" @click="scale()" class="btn-scale el-button el-button--primary el-button--small" style="margin-bottom: 10px;"><i class="el-icon-menu"></i></button>
    </div>
  </div>
</template>

<script>
import {getCookie} from '../utils/utils';

export default {
    data(){
      return{
        //  isCollapse: true,
        showId:"",
        router:true,
        isShow:true,
        list:[
              {
              "status":true, 
              "id": "1",
              "name": "门店管理",
              "menus": [

                        { "id": "1-1","status":true, "name": "城市管理","expres":"userMessage"},
                       
                      ]
              },
 
              {

              "status":true, 
              "id": "2", 
              "name": "文件管理",
              "menus": [
                        { "id": "2-1","status":true, "name": "轮播图管理","expres":"qBaby"},
                        { "id": "2-2","status":true, "name": "首页素材管理","expres":"qActivity"},

                    ]
              },

              {

              "status":true, 
              "id": "3", 
              "name": "底部栏",
              "menus": [
                        { "id": "3-1","status":true, "name": "二维码","expres":"qBaby"},
                        { "id": "3-2","status":true, "name": "友情链接","expres":"qActivity"},
                        { "id": "3-3","status":true, "name": "Coperight","expres":"qBusiness"},
                        { "id": "3-4","status":true, "name": "IPC备案信息","expres":"qWedding"},
                    ]
              },

              {

              "status":true, 
              "id": "4", 
              "name": "套系管理",
              "menus": [
                        { "id": "4-1","status":true, "name": "套系管理","expres":"qBaby"},
                        
                    ]
              },

              {

              "status":true, 
              "id": "5", 
              "name": "婚礼案例",
              "menus": [
                        { "id": "5-1","status":true, "name": "婚礼案例","expres":"qBaby"},

                    ]
              },

              {

              "status":true, 
              "id": "6", 
              "name": "婚礼菜系",
              "menus": [
                        { "id": "6-1","status":true, "name": "婚礼菜系","expres":"qBaby"},

                    ]
              },

              {

              "status":true, 
              "id": "7", 
              "name": "其它宴",
              "menus": [
                        { "id": "7-1","status":true, "name": "其它宴","expres":"qBaby"},

                    ]
              },

              {

              "status":true, 
              "id": "8", 
              "name": "在线看店",
              "menus": [
                        { "id": "8-1","status":true, "name": "在线看店","expres":"qBaby"},

                    ]
              },

              {

              "status":true, 
              "id": "9", 
              "name": "关于我们",
              "menus": [
                        { "id": "9-1","status":true, "name": "公司简介","expres":"qBaby"},
                        { "id": "9-2","status":true, "name": "服务团队","expres":"qActivity"},
                        { "id": "9-3","status":true, "name": "联系我们","expres":"qBusiness"},
                    ]
              },


           ]



      };
    },
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
       }else{
         this.showId="scaleB"
       }
       
          
      }
      
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
top:60px;
}
.btn-scale i{
  margin-left: -8px;
  margin-top: -3px;
  text-align: center;
  font-size: 16px;
}
.el-menu-vertical-demo{
  width: 185px;
  overflow: hidden;
  overflow-y: scroll
}
#scaleB{


  width: 0px;
  transition: width .5s;

}
#scaleS{


  width: 185px;
  transition: width .5s;

}
.home1{

  color: #66B1FF;
  /* background: #ECF5FF */
}
.home1 span{
  color: #66B1FF;
}
</style>
