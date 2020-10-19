<template>
    <div class="userMessage  content">
     <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style=" margin-top:62px; margin-left:18px; line-height: 50px;">
                <span class="el-icon-info"></span><span style="margin-left:10px">底部栏</span><span>&nbsp;&nbsp;/&nbsp;&nbsp;二维码</span>
         </div>
        </div>

    <!-- 搜索栏 -->
        <div class="top-search" style="display:none; text-align: center">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>

    <!-- 批量删除 -->
        <div  class="button-add" style=" display:flex;  justify-content: space-between; overflow: hidden; margin-top:35px; margin-left:2%;">
         <el-button  style=" margin-right:5%;margin-bottom:20px" type="primary"  @click="deletMost()">批量删除</el-button>  
        <el-button  style=" margin-right:2%;margin-bottom:20px" type="primary"  @click="addMost()">增加</el-button>  
        </div>

        

        <el-table
            ref="multipleTable"
            :data="tableList"
            tooltip-effect="dark"
            style="width: 96%;margin:0 auto"
            border
            :header-cell-style="{background:'#EEF1F6'}"
            size="small"
           
            @selection-change="handleSelectionChange">
            
            <el-table-column
            type="selection"
           >
            </el-table-column>
           <el-table-column
            type="index"
            >
            </el-table-column>

           




            <el-table-column
            style="position:relative"
            prop="url"
            label="显示图片"
            show-overflow-tooltip>
            <template    slot-scope="scope">            
                    
                    <div title="点击显示大图" >
                        <img :src="scope.row.url"    style="width:60px; height:20px" />
                        
                        <el-popover
                            placement="right"
                            
                            
                            trigger="click"
                           >
                            <img :src="scope.row.url"    style="max-height:400px" />
                            <i slot="reference"  class="el-icon-view" style="font-size:16px"></i>
                            <!-- <el-button slot="reference">click 激活</el-button> -->
                        </el-popover>
                        <!-- <div style="position: absolute;top: -80px;left:20px;    z-index: 1000000000" >
                            <img :src="scope.row.url"    style="width:250px; height:200px" />
                        </div> -->
                    </div>
            </template>  

            </el-table-column>


            <el-table-column
            prop="title"
            label="标题"
            >
            </el-table-column>


            <el-table-column
            prop="sort"
            label="排序"
            >
            </el-table-column>

            <el-table-column
            prop="updateTime"
            label="更新时间"
            >

                    <template slot-scope="scope">
                     {{scope.row.updateTime|date}}
                   </template>
            </el-table-column>


            <el-table-column
            fixed="right"
            label="操作"
            width="250">
            <template slot-scope="scope">
                <el-button
                @click.native.prevent="deleteRow(scope.$index, tableList)"
                type="text"
                size="small">
                删除
                </el-button>
                

                <el-button
                @click.native.prevent="changeRow(scope.$index, tableList)"
                type="text"
                size="small">
                修改
                </el-button>
            </template>
            </el-table-column>
        </el-table>


        <!-- 弹窗 -->
        <el-dialog
        :title="popTitle"
        :visible.sync="dialogVisible"
        width="60%"
        @close="closeDialog"
        :modal-append-to-body='false'
        :close-on-click-modal="false"
        center>

        <el-upload
                    ref="upload"
                    name="file"
                    :data="pppss"
                    class="avatar-uploader"
                    :action="upPictureUrl"
                    :show-file-list="true"
                    :file-list="upfileList"
                    :auto-upload="false"
                    list-type="picture"
                    :limit="1"
                     :on-change="imageChange"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    style="padding-bottom:20px">
                    
                    <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
                    <div>图片的尺寸为：120px * 120px</div>
               
        </el-upload>
        <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">



            <el-form-item             
            prop="title"
            >
                <el-input type="textarea" rows="4"  placeholder="请输入标题" v-model.number="ruleForm.title" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>
            
            <el-form-item             
            prop="sort"
            >
                <el-input type="text" rows="4"  placeholder="请输入排序" v-model.number="ruleForm.sort" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>




            <div style="width:100%;height:40px; ">
                <el-form-item style="width:300px; margin:0 auto">
                    <el-button style="width:300px"   type="primary" @click="submitForm('ruleForm',popTitle)" class="btn-submmit">{{submitType=="add" ? '确认' : '确认'}}</el-button>   
                </el-form-item>
            </div>
                 
            </el-form>
        
        </el-dialog>  


        
    </div>
</template>
<script>

import url from '../utils/url';
import {getCookie} from '../utils/utils';
import {postRequest} from '../utils/api';
import { setTimeout } from 'timers';
export default {
    data(){
// 表单验证


        var validateTitle = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('标题不能为空'));
        }else{
          callback();
        }

        };

        var validateSort = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('排序不能为空'));
        }else{
          callback();
        }

        };



    

        return{
            ifImgChange:false,
            upPictureUrl:"",
            search:"",
            popTitle:"",
            submitType:"",
            popsubName:"",
            changeIndex:"",
            currentPage: 1,
            navigatepageNums:[],
            selectTypeList:[],
            selectCityList:[],
            changeId:"",
            oldUrl:"",
            total:1,
            defaultType:"",//默认下拉框type 
            defaultCity:"",//默认下拉框city 
            defaultTypeV:"",//默认下拉框type 的value值
            defaultCityV:"",//默认下拉框city 的value值
            upfileList:[],
            pppss:{
                sort: '',
                title: '',

            },
            formInline: {
                cityV: '',
                typeV: ''
            },
            ruleForm: {
                sort: '',
                title: '',
            },
            rules: {

                    sort: [
                        { validator: validateTitle, trigger: 'blur' }
                    ],
                    title: [
                        { validator: validateSort, trigger: 'blur' }
                    ],


            },
            dialogVisible:false,
            tableList: [],
            multipleSelection: []
        }
    },
    methods:{






        handleSelectionChange(val) {
        this.multipleSelection = val;
        },
        

        // 头部form提交 点击搜索的时候

        onSubmitHead(formName) {
//  console.log("11111111111111111111111",this.defaultCityV,this.formInline.cityV)


        // return
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.initSelectAll({type:"1",pageNum:this.currentPage})   
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetFormHead(formName) {
         
        this.$refs['formInline'].resetFields();
      },

        // 点击弹窗的叉号
        closeDialog(){
            this.upfileList=[]
        },
// ------------------------------------------------------------弹窗图片处理-------------------------------------------------------------------------------------------------------------------
        // 弹窗内图片改变事件
        imageChange(res, file){
            // alert("改变事件触发了")
            if(this.submitType=="change"){ //判断如果只修改文字不修改图片
                this.ifImgChange=true
            }else{
                this.ifImgChange=false 
            }
           
            console.log(file,"``````````````````````````````````````````````")
        },
        // 弹窗出现 添加

        addMost(){
            this.dialogVisible=true;
            this.submitType="add";
            this.upPictureUrl=url.server+url.scInsertByPageFooting
            this.upfileList=[]
            this.ifImgChange=false

            this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields();
            });

        },

        //弹窗出现 修改
        changeRow(index, rows){
            this.ifImgChange=false
            this.dialogVisible=true;
            this.submitType="change";
            this.changeId=rows[index].id;
            this.oldUrl=rows[index].url.split("/").pop();
            // alert(this.oldUrl)

            this.$nextTick(() => {
            this.ruleForm={
                        sort:rows[index].sort,
                        title:rows[index].title,

                    }
            })

            
            
            this.upfileList=[{url:rows[index].url}]
            this.upPictureUrl=url.server+url.scUpdateByPageFooting
        },

        //  提交 添加 修改 图片******************************************************************************************************************************
        submitForm(formName) {



        this.$refs[formName].validate((valid) => {
             
          if (valid) {
            let currentUrl=""
            let pamas=""
            if(this.submitType=="add"){
                

                

                
                this.pppss.type='1'
                this.pppss.title=this.ruleForm.title
                this.pppss.sort=this.ruleForm.sort

                console.log("=========================================",this.pppss)
                // return
                this.$refs.upload.submit();
            }
            if(this.submitType=="change"){
                
                
                // alert(this.ruleForm.sort+"-----------"+this.changeId+"---------"+this.oldUrl)
                

                
                this.pppss.title=this.ruleForm.title
                this.pppss.sort=this.ruleForm.sort
                this.pppss.id=this.changeId
                this.pppss.urls=this.oldUrl
                // this.pppss={
                //     sort:this.ruleForm.sort,
                //     id:this.changeId,
                //     urls:this.oldUrl
                // }
                console.log("++++++++++++++++++++++++++++++++++++++++",this.pppss)
                // this.$refs.upload.submit();
                // return
                if(this.ifImgChange){     //图片修改

                    this.$refs.upload.submit();
                    
                }else{                    //图片没改  用ajax

                    postRequest(url.scUpdateByPageFooting,{
                        title:this.ruleForm.title,
                        sort:this.ruleForm.sort,

                        id:this.changeId,
                        file:""
                    }).then(data=> {
                        console.log("不穿图片直传sort和Id",data)
                        this.initSelectAll({type:"1",pageNum:this.currentPage})    
                        this.dialogVisible=false
                    });     
                }
                

                
            }  

          } else {

            return false;
          }
        });
       
      },   
        // 图片上传响应结果

        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
         console.log(res,"1111111111111111111111111111111111111111111111");
                    switch (res.status) {

                            case 200:

                            if(this.$refs.upload){
                                this.$refs.upload.clearFiles();
                            }
                            

                            // this.list=res.data.list 
                            this.$message({
                                    
                                    type: 'success',
                                    message: "上传成功"
                                    });
                           
                            this.initSelectAll({type:"1",pageNum:this.currentPage})                                    
                            break;   
                            case 555:
                                 console.log("_+_+++_+_+_+_+_+_+_+_+_+_+_+_+",res)
                           
                                 this.$message({
                                    
                                    type: 'warning',
                                    message: "超过最大增加个数"
                                });
                            

                                  
                            break;
                           
                    
                    }    
        this.dialogVisible=false   
      },
      beforeAvatarUpload(file) {
        //   alert("上传之前")
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },




    



       

      deleteRow(index, rows) {
        let deleUrl=rows[index].url.split("/").pop();
        console.log("1111",rows[index].id,"5655545454----",deleUrl)

        postRequest(url.scDeleteByPageFooting, {
                   ids:rows[index].id,
                   urls:deleUrl
                }).then(data=> {
                        console.log("删除后打印的数据",data)
                        
                        this.initSelectAll({type:"1",pageNum:this.currentPage})   
                    
        });    
        
        
      },
  

        deletMost(){
            console.log("查看表单内的选中的条数",this.multipleSelection)
            let chooseStrId="";
            let urlStr=""
            let chooseStrUrl=""
            let chooseStrPictures="";
            for(let i=0;i<this.multipleSelection.length;i++){
                urlStr += this.multipleSelection[i].url.split("/").pop()+","
                chooseStrId+=this.multipleSelection[i].id+","
            }
            chooseStrId = chooseStrId.substr(0, chooseStrId.length - 1);
            chooseStrUrl = urlStr.substr(0, urlStr.length - 1);
            console.log("删除的chooseStrId",chooseStrId,chooseStrUrl);
            postRequest(url.scDeleteByPageFooting, {
                   ids:chooseStrId,
                   urls:chooseStrUrl
                }).then(data=> {
                    console.log("删除后打印的数据",data)
                    this.initSelectAll({type:"1",pageNum:this.currentPage}) 
                    
            });    

        },   



         goSearch(){//搜索
                postRequest(url.scDeleteByPageFooting, {
                   keyword: this.search,
                }).then(data=> {
                        console.log("打印的数据",data.data.data)
                        let datas=data.data.data;
                        this.tableList=datas.list
                        this.total= datas.pages        
                        this.navigatepageNums=datas.navigatepageNums      
                        this.currentPage=datas.pageNum 
                         
                        
                });       

            },


         initSelectAll(pamas){
            postRequest(url.scSelectByPageFooting, pamas).then(data=> {
                        console.log("banner查询所有数据",data) 
                        this.tableList=data.data.data.list
                        
                        
                        this.tableList.map(function(value,index){
                            value.url=url.qiniuH+value.url
                        })



                        
                        
            });     
         }   
    },
    computed:{

    },
    created(){
        this.initSelectAll({type:"1",pageNum:"1"})
            
    }

    
}
</script>
<style scoped>
.formCity{
    position: absolute;
    top: -80px;
    right: 0
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 250px;
    height: 250px;
    line-height: 250px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


