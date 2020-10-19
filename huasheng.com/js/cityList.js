$(function(){
	
	//			<!--获取首页城市数据-->
			var  pamasCity=""
			let seeionCity=sessionStorage.getItem('hsgw_cityName')  //缓存城市
			let posCity=returnCitySN["cname"];  //真实定位地址
			if(seeionCity){
				pamasCity=seeionCity
			}else{
				pamasCity=posCity
			}
			pamasCity=cityCode(pamasCity)
//			alert(pamasCity)
			$.ajax({
		    type:"post",    //请求方式
		    url:myServer+"PcApi/selByInit",
		    dataType:"json",
			data:{
//		    	"cityCode":Pcity
				"cityCode":pamasCity
		    	},    //请求参数		
		    success: function(data) {
		    	if(data.status=='503'){
					window.location.href='error.html'
				}
		    /****************************首页头城市切换******************************************/
		    	let cityStr=""
		        console.log("首页数据111",data.data)
		        data.data.CHENSHIJI.map(function(value,key){
		        	cityStr+=`<li onclick="chooseCity('${value.cityName}市','${value.cityCode}')"><a>${value.cityName}市</a></li>`
		        	return cityStr
		        })
				
		        $("#head-menue").html(cityStr)
		    

		    },
		    error: function() {
		        //请求出错处理
		    	}
			});
			
})
