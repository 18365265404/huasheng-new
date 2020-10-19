<template>
    <div class="login">

        <div>
            <vue-particles
                color="#dedede"
                :particleOpacity="0.7"
                :particlesNumber="80"
                shapeType="circle"
                :particleSize="4"
                linesColor="#dedede"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
            >
            </vue-particles>
        </div>


                <div class="login-table">

                    <div class="login-title">
                        <h5>后台管理系统</h5>
                        <h2>华盛官网后台</h2>
                    </div>
                    <el-form :model="ruleForm2"   ref="ruleForm2"  size='medium'    class="demo-ruleForm">

                        <el-form-item
                            
                            prop="name"
                            :rules="[
                            { required: true, message: '用户名不能为空'},
                            
                            ]"
                        >
                            <el-input type="text" v-model.number="ruleForm2.name" autocomplete="off">

                                <template slot="prepend"><i class="el-icon-edit"></i></template>
                            </el-input>
                        </el-form-item>


                        <el-form-item
                            
                            prop="pass"
                            :rules="[
                            { required: true, message: '密码不能为空'},
                           
                            ]"
                        >
                            <el-input type="password" v-model.number="ruleForm2.pass" autocomplete="off">

                                <template slot="prepend"><i class="el-icon-edit-outline"></i></template>
                            </el-input>
                        </el-form-item>



                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')" class="btn-submmit">登录</el-button>
                           
                            
                        </el-form-item>
                        <p style="font-size:12px">华盛技术团队开发</p>
                        </el-form>
                </div>

    </div>
</template>

<script>

import {postRequest} from '../utils/api';
import url from '../utils/url';
import {setCookie,getCookie,delCookie} from '../utils/utils';
import bus from '../utils/eventBus';
import {mapActions,mapGetters} from 'vuex';
export default {
    data(){


        return{
        ruleForm2: {
          name: '',
          pass:''
        }
        }
    },


    methods: {

    resetForm(formName) {
        this.$refs['ruleForm2'].resetFields();
      },

      submitForm(formName) {
        console.log("4444444",this.$refs[formName])
        this.$refs[formName].validate((valid) => {
        
          if (valid) {
              let formV=this.$refs[formName].$options.propsData.model;
            console.log("444444444444444",formV)
             postRequest(url.scLogin, {
                    username: formV.name,
                    password: formV.pass
                }).then(data=> {
                        console.log("login成功数据",data.data.data)
                        
                        if(data.data.status==200){
                        //登陆成功后改变用户名
                        bus.$emit("username",data.data.data)
                        setCookie('username',data.data.data,100000); 
                        this.$router.push({ path: '/home' })
                        this.$store.dispatch('initF');
                        }
                        
                        
                            
                            
                            const h = this.$createElement;
                            this.$notify({
                            title: '登录状态',
                            message: h('i', { style: 'color: teal'},data.data.msg)
                            });
                })
          } else {
            console.log('error submit!!');
            console.log("6666666666666666",valid)
            return false;
          }
        });
       
      },

    },
    
    created(){
        console.log('loginloginloginloginloginloginloginloginlogin')
        // this.$store.dispatch('HIDE_FOOT');
    }
}
</script>

<style scoped>
.login{
    z-index: 10000;
    position: absolute;
    top: 0;
    left:0;
    background:url('../../static/img/bg.jpg');
    background-size: 100% 100%;
    height: 100%;
    width:100%;
}
.login-table{

    position: absolute;
    left: 0; 
    right: 0;
    
    margin: auto;
    top:250px;
}
.demo-ruleForm{
    width: 400px;
    margin: 30px auto
}
.box-b{
    height: 100%;
    width: 100%;

}
.box-s{
    height: 100%;
}
.box-s1{
    background: url('../../static/img/loginBg.png');

}
.login-title{
    
   color: #4786FF;
    text-align: center;
}
.login-title h5{
letter-spacing:3px;
 font-size: 28px;
}
.login-title h2{
 letter-spacing:7px;
 font-size: 18px;
}

.btn-submmit{
    width:400px
}
</style>
