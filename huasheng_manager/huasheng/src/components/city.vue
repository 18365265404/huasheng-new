<template>
    <div class="userMessage  content">
     <!-- tiitle栏 -->
        <div style="padding-bottom:30px">
     
         <div class="top-title" style=" margin-top:62px; margin-left:18px; line-height: 50px;">
                <span class="el-icon-info"></span><span style="margin-left:10px">门店管理</span><span>&nbsp;&nbsp;/&nbsp;&nbsp;城市管理</span>
         </div>
        </div>

    <!-- 搜索栏 -->
        <div class="top-search"  style="text-align: center; display:none">
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
            prop="cityName"
            label="城市名称"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="cityCode"
            label="城市编码"
            show-overflow-tooltip>
            </el-table-column>
           
            <el-table-column
            prop="sort"
            label="排序"
            width="50px"
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
            prop="cityName"
            >
                <el-input type="text" placeholder="请输入城市名" v-model.number="ruleForm.cityName" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="cityCode"
            >
                <el-input type="text"  placeholder="请输入城市码" v-model.number="ruleForm.cityCode" autocomplete="off">
                 <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>

            <el-form-item             
            prop="sort"
            >
                <el-input type="text"  placeholder="请输入城市排序" v-model.number="ruleForm.sort" autocomplete="off">
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
      var validateCityName = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('城市名称不能为空'));
        }else{
          callback();
        }

      };

        var validateCityCode = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('城市码不能为空'));
        }else{
          callback();
        }

      };

        var validateSort = (rule, value, callback) => {
         if (value === '') {
          callback(new Error('排序号不能为空'));
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
                cityName: '',
                cityCode: '',
                sort:'',
            },
            rules: {
                    cityName: [
                        { validator: validateCityName, trigger: 'blur' }
                    ],
                    cityCode: [
                        { validator: validateCityCode, trigger: 'blur' }
                    ],
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
        
        // 点击弹窗的叉号
        closeDialog(){
        this.$refs['ruleForm'].resetFields();
        },
        

        // 添加城市出现

        addMost(){
            this.dialogVisible=true;
            this.submitType="add"
        },
        //  提交  修改 || 添加城市
        submitForm(formName) {



        this.$refs[formName].validate((valid) => {
             
          if (valid) {
            let currentUrl=""
            let pamas=""
            if(this.submitType=="add"){
                currentUrl=url.scInsertByCity
                pamas={
                    cityName: this.ruleForm.cityName,
                    cityCode: this.ruleForm.cityCode,
                    sort:this.ruleForm.sort,
                }
            }
            if(this.submitType=="change"){
                currentUrl=url.scUpdateByCity
                pamas={
                    id:this.changeId,
                    cityName: this.ruleForm.cityName,
                    cityCode: this.ruleForm.cityCode,
                    sort:this.ruleForm.sort,
                }
            }  

             postRequest(currentUrl,pamas ).then(data=> {
                        this.$refs['ruleForm'].resetFields();
                        this.dialogVisible=false
                        this.initSelectAll({pageNum:this.currentPage}) //查询所有
                     
                       
                                      

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
                cityName: rows[index].cityName,
                cityCode: rows[index].cityCode,
                sort:rows[index].sort,
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
            postRequest(url.scDeleteByCity, {
                   ids:chooseStrId,
                }).then(data=> {
                    console.log("删除后打印的数据",data)
                    this.initSelectAll({pageNum:this.currentPage}) //查询所有
                    
            });    

        }, 

       

      deleteRow(index, rows) {
        
        console.log("1111",rows[index].id)
        postRequest(url.scDeleteByCity, {
                   ids:rows[index].id,
                }).then(data=> {
                        console.log("删除后打印的数据",data)
                        this.initSelectAll({pageNum:this.currentPage}) //查询所有
                    
        });    
        
        
      },
// f分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.initSelectAll({pageNum:val})
      },


         goSearch(){//搜索
                this.initSelectAll({pageNum:this.currentPage}) 

            },


         initSelectAll(pamas){
             postRequest(url.scSelectByCity, pamas).then(data=> {


                        console.log("打印的数据11111111",data)
                        let datas=data.data.data;
                        this.tableList=datas.list
                        this.total= datas.pages        
                        this.navigatepageNums=datas.navigatepageNums      
                        this.currentPage=datas.pageNum 
                        
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
            this.initSelectAll({pageNum:this.currentPage})
        
    }

    
}
</script>

