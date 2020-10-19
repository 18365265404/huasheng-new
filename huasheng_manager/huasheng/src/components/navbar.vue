<template>
<div>

    <header class="headers" @click="show3=false">
        <div class="name-vaerson" @click="goHome()">华盛官网管理系统v1.0</div>
        <div class='small-pop'>

          <div  @click.stop="show3 = !show3" class="userTitle">
            <span>欢迎：</span><span>{{username}}&nbsp;</span><i class="el-icon-arrow-down"></i>
          </div>
          <div style="position:relative">
            <el-collapse-transition>
              <ul class="user-operation" v-show="show3" style="">
              <li style="line-height:40px;display:none" @click="showChange">修改密码</li>
              <li style="line-height:40px" @click="loginOut">退出</li>
            </ul>
          </el-collapse-transition>
          </div>
         
        </div>

      </header>

          <!-- 弹窗 -->
        <el-dialog
       
        :visible.sync="dialogVisible"
        width="40%"
        :modal-append-to-body='false'
        center>
        <el-form :model="ruleForm"  :rules="rules"  ref="ruleForm"  size='medium'    class="demo-ruleForm">

            <el-form-item             
            prop="oldPw"
          >
                <el-input type="text" placeholder="请输入原密码" v-model.number="ruleForm.oldPw" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="NewPwd"
          >
                <el-input type="text" placeholder="请输入原密码" v-model.number="ruleForm.NewPwd" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>


            <el-form-item             
            prop="againPw"
            >
                <el-input type="text"  placeholder="请再次输入新密码" v-model.number="ruleForm.againPw" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="btn-submmit">确定修改密码</el-button>
                            
                </el-form-item>
                 
            </el-form>
        
        </el-dialog> 

 
</div>       
</template>


<script>
import url from '../utils/url';
import {postRequest} from '../utils/api';
import {getCookie,delCookie} from '../utils/utils';
import bus from '../utils/eventBus';

import {mapActions,mapGetters} from 'vuex';
// import { constants } from 'http2';
export default {
  props: {
          showValue:Boolean,
          required: true
            
      },
      
  data(){
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('旧密码不能为空'));
        }else{
          callback();
        }

      };
      var validateNewPass = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('新密码不能为空'));
        }else if (value == this.ruleForm.oldPw) {
          callback(new Error('新密码不能和旧密码相同'));
        }else{
          callback();
        }

      };
      var validateAgainPass = (rule, value, callback) => {
        console.log("55555",value)
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.NewPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
   
    return{
      username:"",
      show3: false,
      dialogVisible:false,
      ruleForm:{
        oldPw: '',
        NewPwd:"",
        againPw:"",
      },
      rules: {
          oldPw: [
            { validator: validateOldPass, trigger: 'blur' }
          ],
          NewPwd: [
            { validator: validateNewPass, trigger: 'blur' }
          ],
          againPw: [
            { validator: validateAgainPass, trigger: 'blur' }
          ],

        }
    }
  },
   created:function(){
     this.username=getCookie('username')
        
        
  },

  mounted(){
        let that=this
        bus.$on("username",function(msg){
          console.log("传过来的list显示",msg)
          that.username=msg
        })
  },

  methods:{
        
    say(){
      // console.log("11111111111",this.showValue)
          this.show3=this.showValue
        },

    showChange(){
       this.dialogVisible=true
    },

    submitForm(formName) {
      
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let formV=this.$refs[formName].$options.propsData.model;
            postRequest(url.userUpdatePassword, {
                    id: getCookie('userId'),
                    password: formV.oldPw,
                    newPassword: formV.NewPwd,
                    
                }).then(data=> {
                        console.log("新数据",data.data)
                        if(data.data.status==200){
                          this.$refs['ruleForm'].resetFields();
                          
                          this.dialogVisible=false
                          this.$router.push({ path: '/login' })
                        }
                        this.$notify({
                            title: '修改状态',
                            message: data.data.msg,
                            type: `${data.data.status==200 ?"success" : "error"}`
                          });
                     

                })
          

          } else {
            
            return false;
          }
        });
      },
// 退出登陆
      loginOut(){
         postRequest(url.scLogout, {

                    
                }).then(data=> {
                        this.$store.dispatch('init'); 
                        // return
                        delCookie("username")
                        this.$router.push({ path: '/login' })
                        console.log("新数据",data.data)
                        if(data.data.status==200){
                         
                          

                          delCookie("username")
                          
                        }
                        this.$notify({
                            title: '退出状态',
                            message: data.data.msg,
                            type: `${data.data.status==200 ?"success" : "error"}`
                          });
                     

                })
      },
      goHome(){
        this.$router.push({ path: '/home' })
      }

  },

    watch:{
    // // data的数据名(){数据变化，函数就会调用}
    // $route:function(newValue,oldValue){
    //   let path = newValue.path;


    //   if(path!="/login"){
     
    //     console.log("发生变化了",path)
    //    var username=getCookie("username");
    //       if(username){
    //           this.userData.username=username;
    //           this.userNameS=true
    //       }else{
    //         this.userNameS=false;

    //       }
    //   }else{
    //       this.userNameS=false;
    //   }


    // }
  },


}
</script>


<style scoped>

.headers{
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;

  background: #242F42;
   color: white;
}
.name-vaerson:hover{
  cursor: pointer;
}
.name-vaerson{
 
  line-height: 50px;
  margin-left: 10px;
}
.userTitle{
  line-height: 50px;
  margin-right: 20px;
  border: none;
}
.user-operation{
  width:100px;
  border:1px solid  #cccccc; 
  text-align: center;  
  border-radius: 5px; 
  background:white; 
  color:#666666; 
  position:absolute;
  top:5px;
  right:10px;

}
.small-pop:hover{
  cursor: pointer;
}
.user-operation li:hover{
    cursor: pointer;
    background: #cccccc;
}
</style>