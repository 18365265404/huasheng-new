<template>
    <div class="userMessage  content">
     <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style=" margin-top:62px; margin-left:18px; line-height: 50px;">
                <span class="el-icon-info"></span><span style="margin-left:10px">关于我们
                    </span><span>&nbsp;&nbsp;/&nbsp;&nbsp;服务团队</span>
         </div>
        </div>

    <!-- 搜索栏 -->
        <div class="top-search" style="display:none; text-align: center">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    <!-- 条件搜索 -->
        <div style="position:relative">
            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">

            <el-form-item class="formCity" label="城市选择：" prop="cityV">
                <el-select v-model="formInline.cityV" placeholder="城市选择">
                   <el-option
                    v-for="item in selectCityList"
                    :key="item.cityCode"
                    :label="item.cityName"
                    :value="item.cityCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="类型：" style="margin-left:20px;display:none;" prop="typeV">
                  <el-select v-model="formInline.typeV" placeholder="请选择">
                    <el-option
                    v-for="item in selectTypeList"
                    :key="item.dicValue"
                    :label="item.dicConent"
                    :value="item.dicValue">
                    </el-option>
                 </el-select>
            </el-form-item>
            
            <el-form-item style="float:right; margin-top:-30px">
                <el-button  type="primary" @click="onSubmitHead('formInline')">查询</el-button>
                <el-button @click="resetFormHead('formInline')">重置</el-button>
            </el-form-item>
            </el-form>
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
<!-- 分页 -->
          <div class="block" style="overflow:hidden">

                <el-pagination
                style="float:right; margin-right:10%"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="navigatepageNums"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>

        <!-- 弹窗 -->
        <el-dialog
        :title="popTitle"
        :visible.sync="dialogVisible"
        width="40%"
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
                    <div>图片的尺寸为：1230px * 650px</div>
               
        </el-upload>
        <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">


            <el-form-item       
            style="display:none"      
            prop="description"
            >
                <el-input type="text"  placeholder="请输入描述" v-model.number="ruleForm.description" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="sort"
            >
                <el-input type="text"  placeholder="请输入排序" v-model.number="ruleForm.sort" autocomplete="off">
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


        var validateSort = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('排序号不能为空'));
        }else{
          callback();
        }

        };

        // var validateDescription = (rule, value, callback) => {
        //  if (value === '') {
        //   callback(new Error('描述不能为空'));
        // }else{
        //   callback();
        // }

        // };


    

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
                cityCode :'',
                type:'',
                description:'',
                sort:''
            },
            formInline: {
                cityV: '',
                typeV: ''
            },
            ruleForm: {
                description:"",
                sort:'',
            },
            rules: {

                    // description: [
                    //     { validator: validateDescription, trigger: 'blur' }
                    // ],
                    
                    sort: [
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
       this.updateSelct()
        console.log("11111111111111111111111",this.tableData)
        // return
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.initSelectAll(this.tableData)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetFormHead(formName) {
         
        this.$refs['formInline'].resetFields();
        this.formInline.cityV=this.defaultCityV

      },

        // 点击弹窗的叉号
        closeDialog(){
        this.$refs['ruleForm'].resetFields();
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
            this.upPictureUrl=url.server+url.scInsertByServiceTeam
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
                description:rows[index].description,
                sort:rows[index].sort,
            }
            });
            
            
            this.upfileList=[{url:rows[index].url}]
            this.upPictureUrl=url.server+url.scUpdateByServiceTeam
        },

        //  提交 添加 修改 图片******************************************************************************************************************************
        submitForm(formName) {



        this.$refs[formName].validate((valid) => {
             
          if (valid) {
            let currentUrl=""
            let pamas=""
            if(this.submitType=="add"){
                

                

                this.updateSelct()
               
                this.pppss.type=this.tableData.type
                this.pppss.cityCode=this.tableData.cityCode
                this.pppss.description=this.ruleForm.description
                this.pppss.sort=this.ruleForm.sort 
                console.log("============================================",this.pppss)
                this.$refs.upload.submit();
            }
            if(this.submitType=="change"){
                
                
                // alert(this.ruleForm.sort+"-----------"+this.changeId+"---------"+this.oldUrl)
                

                this.updateSelct()
                this.pppss.description=this.ruleForm.description
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

                    postRequest(url.scUpdateByServiceTeam,{
                        description:this.ruleForm.description,
                        sort:this.ruleForm.sort,
                        id:this.changeId,
                        file:""
                    }).then(data=> {
                        console.log("不穿图片直传sort和Id",data)
                        this.initSelectAll(this.tableData)  
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
                            this.initSelectAll(this.tableData)                                    
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
            postRequest(url.scDeleteByServiceTeam, {
                   ids:chooseStrId,
                   urls:chooseStrUrl
                }).then(data=> {
                    console.log("删除后打印的数据",data)
                    this.updateSelct()
                    this.initSelectAll(this.tableData) //查询所有
                    
            });    

        }, 

       

      deleteRow(index, rows) {
        let deleUrl=rows[index].url.split("/").pop();
        console.log("1111",rows[index].id,"5655545454----",deleUrl)

        postRequest(url.scDeleteByServiceTeam, {
                   ids:rows[index].id,
                   urls:deleUrl
                }).then(data=> {
                        console.log("删除后打印的数据",data)
                        this.updateSelct()
                        this.initSelectAll(this.tableData) //查询所有
                    
        });    
        
        
      },
    // 修改select汉字

    updateSelct(){
        
        if(this.formInline.cityV==this.defaultCity){ //记录的值和下拉框默认的值相同时，把tableDatali参数变成码
            this.tableData.cityCode=this.defaultCityV

        }    
        if(this.formInline.typeV==this.defaultType){
            this.tableData.type=this.defaultTypeV

        } 
    },      
// f分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.updateSelct()
        // alert(val)
        this.tableData.pageNum=val
        console.log(this.tableData,"```````````````````````````````````````````")
        this.initSelectAll(this.tableData)
      },


         goSearch(){//搜索
                postRequest(url.bfaFindAll, {
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
             postRequest(url.scSelectByServiceTeam, pamas).then(data=> {
                        console.log("团队服务查询所有数据",data)
                        if(data.data==""){
                            this.tableList=[]
                            return
                        }
                        let datas=data.data.data;
                        
                        
                        datas.list.map(function(value,index){
                            value.url=url.qiniuH+value.url
                        })
                        console.log('pppppppppppppppppppppppppp',data.data.data.list)
                        this.tableList=data.data.data.list
                        this.total= datas.pages;        
                        this.navigatepageNums=datas.navigatepageNums      
                        this.currentPage=datas.pageNum 
                        
                        
            });     
         }   
    },
    computed:{
        tableData(){
                return {
                    "pageNum":this.currentPage,
                    "type": this.formInline.typeV,
                    "cityCode":this.formInline.cityV,
                    }
            },
    },
    created(){
       

            // 获取下拉框数据 轮播图
             postRequest(url.scSelectByDictionary, 
                {
                    dicName:'LUNBOTU_TYPE'
                }
             ).then(data=> {
                        console.log("banner字典11111111",data)
                       this.selectTypeList=data.data.data
                       this.formInline.typeV=data.data.data[0].dicConent  //默认字典type下拉框显示值
                       this.defaultTypeV=data.data.data[0].dicValue  //默认字典type下拉框显示值
                       this.defaultType=data.data.data[0].dicConent



                 // 获取下拉框数据 轮播图
                postRequest(url.scSelectAllCity, 
                    {
                    
                    }
                ).then(data=> {
                            console.log("城市11111111",data.data)
                            this.selectCityList=data.data.data
                            this.formInline.cityV=data.data.data[0].cityName  //默认城市下拉框显示值
                            this.defaultCityV=data.data.data[0].cityCode  //
                            this.defaultCity=data.data.data[0].cityName  //默认城市下拉框显示值
                    console.log(this.defaultTypeV,this.defaultCityV,"sdfsdfsdffffffffffffffffffffffffffff")    
                    
                    this.initSelectAll({
                    "pageNum":this.currentPage,
                    "type":this.defaultTypeV,
                    "cityCode":this.defaultCityV,
                    })
                });           
            });     

            

             
            
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


