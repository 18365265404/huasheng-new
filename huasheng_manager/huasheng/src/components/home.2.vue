<template>
    <div class="">

        <!-- 条件搜索 -->
        <div>
            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">

            <el-form-item  label="城市选择：" prop="chooseTime">
                <el-time-picker placeholder="选择时间" v-model="formInline.chooseTime" style="width: 100%;"></el-time-picker>
            </el-form-item>
            
            <el-form-item>
                <el-button  type="primary" @click="onSubmitHead('formInline')">查询</el-button>
                <el-button @click="resetFormHead('formInline')">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div id="myChart"></div>
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
        }
    },
    methods:{
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
        // 头部form提交 点击搜索的时候

        onSubmitHead(formName) {
//  console.log("11111111111111111111111",this.defaultCityV,this.formInline.cityV)
       this.updateSelct()
       
        // return
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.initData({'endTime':this.formInline.chooseTime})
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
        initData(pamas){
            console.log("参数",pamas)
            postRequest(url.scSelectByBrokenLine,pamas).then(data=> {
                        console.log("折线图数据",data)
                        this.drawLine(data.data.data);

                     

                })
        },
        transtime(time){
		    var d=new Date();
			d.setTime(time);
				  	
			function fillzeros(n){
                    n=n<10?'0'+n:''+n;
                    return n
		        }
			    return `${d.getFullYear()}-${fillzeros(d.getMonth()+1)}-${fillzeros(d.getDate())}`;
		        	
		    }
    },

    mounted(){

        this.initData({'endTime':''})
       
        
    }

    
}
</script>

