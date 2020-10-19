
$(function(){
//			<!--获取首页城市数据-->

			var pamasCity= makeCity()
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
		        console.log("首页数据111city--------------------",data)
		        data.data.CHENSHIJI.map(function(value,key){
		        	cityStr+=`<li onclick="chooseCity('${value.cityName}市','${value.cityCode}')"><a>${value.cityName}市</a></li>`
		        	return cityStr
		        })
				
		        $("#head-menue").html(cityStr)
		    
		    /****************************首页特效文字******************************************/
		    	let textStr=""
		        console.log("首页数据1111111111111111111",data.data.ZHUDATUJI[1])
		        if(data.data.ZHUDATUJI[1]!=undefined){
		        	
		        
		        	
		        	textStr+=`
		        			<li class="home-picture-left-img"><img src="${QiNiu}${data.data.ZHUDATUJI[0].url}" /></li>
							<li class="home-picture-left-text1">${data.data.ZHUDATUJI[0].copywritingOne}</li>
							<li class="home-picture-left-text2">${data.data.ZHUDATUJI[0].copywritingTwo}</li>
		        	`
		        	
		        
				
		        $(".home-picture-left").html(textStr)
		        
		        let textPicStr=""

		        	
		        	textPicStr+=`
		        			<img src="${QiNiu}${data.data.ZHUDATUJI[1].url}"/>
		        	`

		        
				
		        $(".home-picture-right").html(textPicStr)
		     
		     }
		    /****************************首页头城市沉浸图数据******************************************/ 
		        let picList=data.data.CHENJINTUJI;
		        console.log("首页数据沉浸图",picList)
		        if(picList.length!=0){
		        	
		        
		        let picStr="";
		       
		       	picStr+=`
		       			<div class="home-picture2-box1">
							<div class="fixed-box1">
								<img src="${QiNiu}${picList[0].url}">
								<img src="${QiNiu}${picList[1].url}">
								<img src="${QiNiu}${picList[2].url}"/>
								<img src="${QiNiu}${picList[3].url}"/>
							</div>
						</div>
						
						<div class="fixed-box2">
							<div class="fixed-box2-text1 fixed-box2-text">
								<p><span>${picList[0].copywritingOne},</span><span>${picList[0].copywritingTwo}</span></p>
								<p>${picList[0].copywritingThree}</p>
								<p>${picList[0].copywritingFour}</p>
							</div>
							<div class="fixed-box2-text1 fixed-box2-text">
								<p><span>${picList[1].copywritingOne},</span><span>${picList[1].copywritingTwo}</span></p>
								<p>${picList[1].copywritingThree}</p>
								<p>${picList[1].copywritingFour}</p>
							</div>
							<div class="fixed-box2-text1 fixed-box2-text">
								<p><span>${picList[2].copywritingOne},</span><span>${picList[2].copywritingTwo}</span></p>
								<p>${picList[2].copywritingThree}</p>
								<p>${picList[2].copywritingFour}</p>
							</div>
							<div class="fixed-box2-text4 fixed-box2-text">
								<p><span>${picList[3].copywritingOne},</span><span>${picList[3].copywritingTwo}</span></p>
								<p>${picList[3].copywritingThree}</p>
								<p>${picList[3].copywritingFour}</p>
								<img src="${QiNiu}${picList[3].url}">
							</div>
						</div>
		       	`
		        
		        $(".home-picture2").html(picStr)
		        
		        }
		    /****************************首页banner******************************************/    
		    let bannerList=data.data.LUNBOTUJI;   
		    
		    console.log("首页数据轮播图list",bannerList)
		    let bannerStr=""
		    for(let i=0;i<bannerList.length;i++){
		    	bannerStr+=`
		    				<div class="swiper-slide" style=" background: url(${QiNiu}${bannerList[i].url}); background-position:center center ; background-size:100% 100% ;"></div>
		    				`
		    				
		    }
		    $(".swiper-wrapper").html(bannerStr)
//		    swiper-wrapper
		    swiperMove(bannerList)
		    },
		    error: function() {
		        //请求出错处理
		    	}
			});
			
			
			
			
			
			
//*************************************************************首页婚礼案例******************************************************************
			
			$.ajax({
		    type:"post",    //请求方式
		    url:myServer+"PcApi/selByInit2",
		    dataType:"json",
			data:{
//		    	"cityCode":Pcity
				"cityCode":pamasCity
		    	},    //请求参数		
		    success: function(data) {
		    	
				if(data.status=='503'){
					window.location.href='error.html'
				}
		    	let caseStr=""
		        console.log("首页婚礼案例",data.data)
		        
		        data.data.map(function(value,key){
		        	caseStr+=`
					<li class="home-article1-li">
						<div class="img-box" onclick="(window.location.href='case.html?id=${value.id}')"> 
							<img class="img_article1" src="${QiNiu}${value.url}">
						</div>
						<p>${value.title}</p>
					</li>
		        	`
		        	return caseStr
		        })

		        $(".home-article1-list").html(caseStr)

		    },
		    error: function() {
		        //请求出错处理
		    	}
			});
			
//*************************************************************首页婚礼菜系******************************************************************
			
			$.ajax({
		    type:"post",    //请求方式
		    url:myServer+"PcApi/selByInit3",
		    dataType:"json",
			data:{
//		    	"cityCode":Pcity
				"cityCode":pamasCity
		    	},    //请求参数		
		    success: function(data) {
		    	if(data.status=='503'){
					window.location.href='error.html'
				}
			/****************************首页菜系tab切换******************************************/
		    	let cookieTabStr=""
		        console.log("首页数据3",data.data)
		        
		        data.data.map(function(value,key){
		        	cookieTabStr+=`
					<li class="stage">
						<div class="stage-box">
					        <p>${value.sesmName}</p>
					        <p>${value.price}</p>
					    </div>
					</li >
		        	`
		        	return cookieTabStr
		        })

		        $(".home-article2-menue").html(cookieTabStr)
		        
		        //执行选项卡切换js
		        tabControl(data.data)
		        
			/****************************首页头菜系列表******************************************/		        
				let cookieListStr=""
		        console.log("首页数据套系=====================",data.data[0])
		        
		        if(data.data.length!=0){ //判断如果没数据
		        	
		        var cookieListTx=data.data[0].list.slice(0,8)
		        
		        cookieListTx.map(function(value,key){
		        	cookieListStr+=`

					<li class="home-article2-list-li">
						<div class="home-article2-box">

							<img class="img_article2" src="${QiNiu}${value.url}">
						</div>
						<p>${value.title}</p>
					</li>
		        	`
		        	return cookieListStr
		        })

		        $(".home-article2-list").html(cookieListStr)
		        
				}
		    },
		    error: function() {
		        //请求出错处理
		    	}
			});			


//*************************************************************首页宝宝宴，商务宴，年会******************************************************************
			
			$.ajax({
		    type:"post",    //请求方式
		    url:myServer+"PcApi/selByInit4",
		    dataType:"json",
		    async: false,
			data:{
//		    	"cityCode":Pcity
				"cityCode":pamasCity
		    	},    //请求参数		
		    success: function(data) {
		    	if(data.status=='503'){
					window.location.href='error.html'
				}
//		    	return
		    	
			/****************************首页两宴一会******************************************/
		    	let otherStr=""
		        console.log("首页数据4444",data.data)
		        if(data.data.QITAYANJI.length!=0){
		        	
		        
		        let otherList=data.data.QITAYANJI
		        
		        	otherStr+=`
						<li style="-webkit-backface-visibility: hidden;" class="home-article5-list-li"><div onclick="(window.location.href='baby.html?id=${otherList[0].id}')" class="home-article5-box"><img class="img-article5" src="${QiNiu}${otherList[0].url}"/></div> <p>${otherList[0].title}</p></li>
						<li style="-webkit-backface-visibility: hidden;" class="home-article5-list-li"><div onclick="(window.location.href='business.html?id=${otherList[1].id}')" class="home-article5-box"><img class="img-article5" src="${QiNiu}${otherList[1].url}"/></div> <p>${otherList[1].title}</p></li>
						<li style="-webkit-backface-visibility: hidden;" class="home-article5-list-li"><div onclick="(window.location.href='business.html?id=${otherList[1].id}')" class="home-article5-box"><img class="img-article5" src="${QiNiu}${otherList[2].url}"/></div> <p>${otherList[2].title}</p></li>
				
						
		        	`		
		        	
		       
		        
		        								  	   
		        
		       
		        $(".home-article5-list").html(otherStr)
		       
				}
			/****************************首页底部菜单导航 案例 菜系 看店 关于我们******************************************/
			
			if(data.data.DAOHANGTUJI.length!=0){
		    	let navStr=""
		        console.log("首页数据4444",data.data)
		        navStr+=`
					<li class="home-article7-list-li"><div onclick="anchor()" class="home-article7-box"><img class="img-article7" src="${QiNiu}${data.data.DAOHANGTUJI[0].url}"/></div> <p>婚礼案例</p></li>
		        `
		        data.data.DAOHANGTUJI.splice(0,1)
//		        console.log(888888,navArr)
				let footNavList=data.data.DAOHANGTUJI
		        
		        	navStr+=`

		        <li class="home-article7-list-li"><div onclick="(window.location.href='cooking.html')" class="home-article7-box"><img class="img-article7" src="${QiNiu}${footNavList[0].url}"/></div> <p>婚礼菜系</p></li>
				<li class="home-article7-list-li"><div onclick="(window.location.href='shop.html')" class="home-article7-box"><img class="img-article7" src="${QiNiu}${footNavList[1].url}"/></div> <p>在线看店</p></li>
				<li class="home-article7-list-li"><div onclick="window.location.href='aboutUs.html'" class="home-article7-box"><img class="img-article7" src="${QiNiu}${footNavList[2].url}"/></div> <p>关于我们</p></li>

		        	
		        	`


		       
		        $(".home-article7-list").html(navStr)

			}
				/****************************首页视频******************************************/
		    	let videoStr=""
		        console.log("首页数据视频pppppppppp",data.data.SHIPIN)
		        
		        if(data.data.SHIPIN!=undefined){ //如果有数据
		        	
		        
		        
		        videoStr+=`
					<video id="video1" onclick="playPause()" src="${QiNiu}${data.data.SHIPIN.url}" controls ></video>	
					
					<script>
						var myVideo = document.getElementById("video1");
						function playPause(){
				
							if(myVideo.paused){
								myVideo.play();
							}else{
								myVideo.pause();
							}
							
						}
					</script>
					`

		        $(".home-article4").html(videoStr)

				}
		    },
		    error: function() {
		        //请求出错处理
		    	}
			});	
})
