<template>
  <div class="foot-btn" >
   <div class="navigation-left">
     
      <el-menu   class="title-list" :unique-opened="true"  >

        <el-submenu  v-show="item.status"  :index="item.id" @click="showToggle(item,index)" v-for="(item,index) of list" :key="item.index">
          <template slot="title" class="one-menue-title" style="width:185px">
            <i :class="item.iconfont" style="font-size:18px;line-height:18px;"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item-group class="two-page-box" style="width:185px;overflow: hidden" >  
               <el-menu-item id="two-menue-li" style="overflow: hidden;" v-show="item.status" :index="item.id" v-for="item of item.menus" :key="item.id" >
                 <router-link active-class="home1" class="name-text" tag="span" :to="item.expres" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i :class="item.iconTwo">&nbsp;&nbsp;</i>{{item.name}}</router-link>
               </el-menu-item>

          </el-menu-item-group>
        </el-submenu>
        
       
      </el-menu>
  </div>
  </div>
</template>

<script>
import {getCookie} from '../utils/utils';

export default {
    data(){
      return{
        //  isCollapse: true,
        router:true,
        list:[
              {
              "status":true, 
              "id": "1",
              "name": "系统管理",
              "menus": [

                        { "id": "01","status":true, "name": "后台用户信息","expres":"userMessage"},
                       
                      ]
              },
 
              {

              "status":true, 
              "id": "2", 
              "name": "问卷调查",
              "menus": [
                        { "id": "01","status":true, "name": "宝宝宴会报价表","expres":"qBaby"},
                        { "id": "02","status":true, "name": "活动互动调查问卷","expres":"qActivity"},
                        { "id": "03","status":true, "name": "商务宴会调查问卷","expres":"qBusiness"},
                        { "id": "04","status":true, "name": "华盛婚礼会馆问卷","expres":"qWedding"},
                    ]
              },
           ]



      };
    },
     methods: {

          showToggle:function(item){ 

          }



    },
    created(){
      //用来管理浏览器刷新，保存路由状态
       var  path = window.location.href
       var newPath = path.split('/#/')[1];

  
      if(newPath=="userMessage"||newPath=="wUserMessage"||newPath=="roleManage"){
      
        this.openeds=["1"]
      }
      if(newPath=="wHotel"){
      
        this.openeds=["2"]
      }
      if(newPath=="wScheme"){
      
        this.openeds=["3"]
      }
      if(newPath=="wPicture"){
      
        this.openeds=["4"]
      }
      if(newPath=="wFlower"){
      
        this.openeds=["5"]
      }
      if(newPath=="wBanner"){
      
        this.openeds=["6"]
      }
      if(newPath=="wCity" || newPath=="wCity2"){
      
        this.openeds=["7"]
      }
      if(newPath=="weiXin" || newPath=="wLookHall"){
      
        this.openeds=["8"]
      }
      if(newPath=="wType" || newPath=="wStyle"){
      
        this.openeds=["9"]
      }
      if(newPath=="questionnaire" || newPath=="recommend"){
      
        this.openeds=["10"]
      }
    
      // // 不同用户显示不同类容
      // var username=getCookie("username");
      // if(username=="系统管理员"){
      //       this.list[0].status=true;

      //   }else{
      //         this.list[0].status=false;
      //   }
    },

      watch:{
    // data的数据名(){数据变化，函数就会调用}
    $route:function(newValue,oldValue){
      let path = newValue.path;
            var username=getCookie("username");
          
      // if(!/login|cPassWord/.test(path) && username!=null){

      //   if(username=="系统管理员"){
      //       this.list[0].status=true;

      //   }else{
      //         this.list[0].status=false;
      //   }
      //     console.log("进入这页面了")
      // }

    }
  },

  };
  


</script>

<style scoped>
.one-menue-title{
  width: 40px;
  background: red
}
.name-text{
  color: #333;
  background: white;
  width:185px;
  overflow: hidden;
 
  
  
}
.name-text:hover{
  background: #ECF5FF;
}
.home1{

  color: #66B1FF;
  background: #ECF5FF
}
.home1 i{
  color: #66B1FF;
}
.foot-btn{
    float: left;
    
    
    width: 185px;
    

   overflow: hidden;

}

.navigation-left{
  position: fixed;
  width:185px; 
  height: 95%;
  border-right: 1px  solid #cccccc;
  overflow-x: hidden;;
  overflow-y: scroll;
}
.two-page-box{
  margin-top: -13px;
  
 
}
/* #two-menue-li{

  overflow: hidden;
   padding-right: 0;
  padding-left: 0;
} */
.title-list{
  
  border-right: none;
  margin-right: 2px;
   
}
.name-text{
  position: absolute;
  left: 0;
 
  display: block;
 
  
  
  
}

</style>
