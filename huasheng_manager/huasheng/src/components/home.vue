<template>
    <div class="content">

        <!-- 条件搜索 -->
        <div style="width:400px;margin:80px auto">
            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">

            <el-form-item   prop="chooseTime">
                <el-date-picker value-format="timestamp" 
                :picker-options="pickerOptions"  
                type="date" placeholder="选择时间" 
                v-model="formInline.chooseTime" 
                style="width: 100%;">

                </el-date-picker>
            </el-form-item>
            
            <!-- <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
            </el-date-picker> -->

            <el-form-item>
                <el-button  type="primary" @click="onSubmitHead('formInline')">查询</el-button>
                <el-button @click="resetFormHead('formInline')">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div style="display:flex">
            <div style="margin-left:8%">
                <div id="myChart" :style="{width: '700px', height: '550px'}"></div>
            </div>
            
            <div style="width:350px; height:200px;background:#FFFFFF; margin-left:8%;margin-top:40px;border:1px solid #333333">
                <div style="display:flex;  justify-content: space-between;margin-top:12px">
                    <i class="el-icon-more-outline" style="color:#86939E;margin-left:30px;font-size:26px;"></i> <p @click="reFreshTime()" class="refresh">刷新</p>
                </div>
                <div style="font-size:16px;text-align: center;margin-top:12px;color:#86939E">
                    今日最新访问量：
                </div>
                <div style="font-size:60px;text-align: center;margin-top:1px;color:#86939E">
                    {{todayTime}}
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>

import url from '../utils/url';
import {getCookie} from '../utils/utils';
import {postRequest} from '../utils/api';
export default {
    data(){
        return{
            formInline: {
                chooseTime: '',
            },
            todayTime:"",
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6
                }
            },  
        }
    },
    methods:{
        

        // 刷新当前访问的量：
        reFreshTime(){
            this.initData2()
        },



        // scope.row.updateTime|date

         drawLine(data){
             let timeList=[]
             for(let i=1;i<8;i++){
                
                timeList.unshift(this.transtime(data.systemTimeStamp-86400000*i))
             }
             
             console.log("-=-=-=--=-=-=-=-=-=-=-=-=--=-=--",timeList)
             
             
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: {
                text: '官网访问量折线统计图：'
            },
            tooltip: {
                trigger: 'axis'
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: timeList
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: data.list,
                type: 'line'
            }]
        });

        },



// 查询
        onSubmitHead(formName) {

        

        this.$refs[formName].validate((valid) => {
          if (valid) {
           
           if(this.formInline.chooseTime==null){
               alert(this.formInline.chooseTime)
               this.initData({'endTime':''})
           }else{
               this.initData({'endTime':this.formInline.chooseTime})
           }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        
        // 重置表单
        resetFormHead(formName) {
         
        this.$refs['formInline'].resetFields();
        this.formInline.cityV=this.defaultCityV

        },


        // 时间格式转化
        transtime(time){
		    var d=new Date();
			d.setTime(time);
				  	
			function fillzeros(n){
                    n=n<10?'0'+n:''+n;
                    return n
		        }
			    return `${fillzeros(d.getMonth()+1)}-${fillzeros(d.getDate())}`;
		        	
		},


        // 折线图的数据初始化
        initData(pamas){
            postRequest(url.scSelectByBrokenLine, pamas).then(data=> {
                        console.log("折线图数据",data)
                        this.drawLine(data.data.data);

                     

                })
        },
        // 今日数据的初始化
        initData2(){
            postRequest(url.scSelectByBrokenLine2, {}).then(data=> {
                        console.log("今日数据",data.data.data)
                        this.todayTime=data.data.data
                       

                     

                })
        },
        
    },

    mounted(){

       this.initData({'endTime':''})
       this.initData2()
       
        
    }

    
}
</script>

<style scoped>
.sdf{
    text-align: center
}
.refresh{
    width: 40px;
    height: 20px;
    margin-right: 20px;
    border-radius: 10px;
    color: white;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    background: #ED5564;
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
}
.refresh:hover{
    cursor: pointer;
}
</style>
