<template>
    <div class="userMessage  content">
     <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style=" margin-top:62px; margin-left:18px; line-height: 50px;">
                <span class="el-icon-info"></span><span style="margin-left:10px">底部栏</span><span>&nbsp;&nbsp;/&nbsp;&nbsp;友情链接</span>
         </div>
        </div>

    <!-- 搜索栏 -->
        <div class="top-search" style="text-align: center; display:none">
            <el-input style="margin: 0 auto; width:50%;" placeholder="请输入内容"   v-model="search" class="input-with-select">
                
                <el-button slot="append" @click="goSearch()" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    <!-- 批量删除 -->
        <div  class="button-add" style=" display:flex;  justify-content: space-between; overflow: hidden; margin-top:20px; margin-left:2%;">
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
            prop="title"
            label="标题"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="url"
            label="链接地址"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="sort"
            label="排序"
            show-overflow-tooltip>
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
        <el-form :model="ruleForm" :rules="rules"   ref="ruleForm"  size='medium'    class="demo-ruleForm">

            <el-form-item             
            prop="title"
            >
                <el-input type="text" placeholder="请输入标题" v-model.number="ruleForm.title" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>


            <el-form-item             
            prop="url"
            >
                <el-input type="text"  placeholder="请输入链接地址" v-model.number="ruleForm.url" autocomplete="off">
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



            <el-form-item style="width:300px; margin:0 auto">
                <el-button style="width:300px"  type="primary" @click="submitForm('ruleForm',popTitle)" class="btn-submmit">{{submitType=="add" ? '确认' : '确认'}}</el-button>
                    
                </el-form-item>
                 
            </el-form>
        
        </el-dialog>  


        
    </div>
</template>
<script>

import url from '../utils/url';
import {getCookie} from '../utils/utils';
import {postRequest} from '../utils/api';
export default {
    data(){
// 表单验证
      var validateTitle = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('标题不能为空不能为空'));
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

        var validateUrl = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('排序不能为空'));
        }else{
          callback();
        }

      };




    

        return{
            search:"",
            popTitle:"",
            submitType:"",
            popsubName:"",
            changeIndex:"",
            currentPage: 1,
            navigatepageNums:[],

            changeId:"",
            total:1,
            

            ruleForm: {
                title: '',
                sort: '',
                url:"",
            },
            rules: {
                    title: [
                        { validator: validateTitle, trigger: 'blur' }
                    ],
                    sort: [
                        { validator: validateSort, trigger: 'blur' }
                    ],

                    url: [
                        { validator: validateUrl, trigger: 'blur' }
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
        
        // 点击弹窗的叉号
        closeDialog(){
        this.$refs['ruleForm'].resetFields();
        },
        

        // 添加城市出现

        addMost(){
            this.dialogVisible=true;
            this.submitType="add"

            this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields();
            });
        },
        //  提交  修改 || 添加城市
        submitForm(formName) {



        this.$refs[formName].validate((valid) => {
             
          if (valid) {
            let currentUrl=""
            let pamas=""
            if(this.submitType=="add"){
                currentUrl=url.scInsertByPageFooting
                pamas={
                    sort: this.ruleForm.sort,
                    title: this.ruleForm.title,
                    url:this.ruleForm.url,
                    type:"2"

                }
            }
            if(this.submitType=="change"){
                currentUrl=url.scUpdateByPageFooting
                pamas={
                    id:this.changeId,
                    sort: this.ruleForm.sort,
                    title: this.ruleForm.title,
                    url:this.ruleForm.url,
                   
                }
            }  

             postRequest(currentUrl,pamas ).then(data=> {
                        this.$refs['ruleForm'].resetFields();
                        this.dialogVisible=false
                        this.initSelectAll({type:"2",pageNum:this.currentPage})
                     
                       
                                      

                })
          } else {

            return false;
          }
        });
       
      },   



// 修改
        changeRow(index, rows){
            this.dialogVisible=true;
            this.submitType="change";
            this.changeId=rows[index].id;

            this.ruleForm={
                title: rows[index].title,
                sort: rows[index].sort,
                url:rows[index].url,
            }
        },
    

        deletMost(){
            console.log("查看表单内的选中的条数",this.multipleSelection)
            let chooseStrId="";
            let chooseStrPictures="";
            for(let i=0;i<this.multipleSelection.length;i++){

                chooseStrId+=this.multipleSelection[i].id+","
            }
            chooseStrId = chooseStrId.substr(0, chooseStrId.length - 1);
            console.log("删除的chooseStrId",chooseStrId);
            postRequest(url.scDeleteByPageFooting, {
                   ids:chooseStrId,
                }).then(data=> {
                    console.log("删除后打印的数据",data)
                    this.initSelectAll({type:"2",pageNum:this.currentPage})
                    
            });    

        }, 

       

      deleteRow(index, rows) {
        
        console.log("1111",rows[index].id)
        postRequest(url.scDeleteByPageFooting, {
                   ids:rows[index].id,
                }).then(data=> {
                        console.log("删除后打印的数据",data)
                        this.initSelectAll({type:"2",pageNum:this.currentPage})
                    
        });    
        
        
      },
// f分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.initSelectAll({type:"2",pageNum:this.currentPage})
      },


         goSearch(){//搜索
                this.initSelectAll({type:"2",pageNum:this.currentPage})

            },


        initSelectAll(pamas){


        postRequest(url.scSelectByPageFooting, pamas).then(data=> {
                        console.log("banner查询所有数据",data) 
                        this.tableList=data.data.data.list
                        
                        
                        // this.tableList.map(function(value,index){
                        //     value.url=url.qiniuH+value.url
                        // })


                        
                        
            });     

  
         }   
    },
    computed:{
        formData(){
            return {

            }
        }
    },
    created(){
            this.initSelectAll({type:"2",pageNum:this.currentPage})
        
    }

    
}
</script>

