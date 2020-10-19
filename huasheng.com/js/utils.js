

//获取元素距离底部的高度
	function distance(chooseArr){
		return $(window).height()-[$(chooseArr).offset().top-$(document).scrollTop()]-$(chooseArr).height()
	}
//递归循环动画	
	function anifadeInUp(chooseArr,start,length){
		
		let index=start;
			 		digui()
			 		function digui(){
			 			index++
			 			setTimeout(function(){
			 			if(index==length){
			 				
			 				return
			 			}else{
//			 				$(chooseArr).eq(index-1).stop().animate();
			 				$(chooseArr).eq(index).animate({opacity:"1"},1000);
			 				$(chooseArr).eq(index).addClass("animated fadeInUp")
			 				digui()
			 			}
						
						 		
						},200)
			 		}
	}
	


//遍历城市
	function cityCode(cityName){
		let rCode=""
		let  cityArr=[
					{cityCode: "110100", cityName: "北京市"},
					{cityCode: "310100", cityName: "上海市"},
					{cityCode: "330200", cityName: "宁波市"},
					{cityCode: "330300", cityName: "温州市"},
					{cityCode: "330500", cityName: "湖州市"},
					{cityCode: "330600", cityName: "绍兴市"},
					{cityCode: "350200", cityName: "厦门市"},
					{cityCode: "440600", cityName: "佛山市"},

					]
		for(let i=0;i<cityArr.length;i++){
			if(cityName==cityArr[i].cityName){
				rCode=cityArr[i].cityCode
			}
		}
		return rCode
	}
	
	
//轮播图banner
	function swiperMove(list){
		
		if(list){
			console.log("================================",list.length)
		    if(list.length>1){
		      	
		      	var swiper = new Swiper('.swiper-container',{
		      	pagination: {
			       el: '.swiper-pagination',
			       clickable: true,
			    },
				loop: true,//图片无限转动
		        setWrapperSize :true,//自动轮播
		        autoplay: true, //轮播的时间
			    });
				
				
				
		
		
		
				$('.swiper-slide').mouseenter(function(){ 
				   swiper.autoplay.start(); 
				})
				$('.swiper-slide').mouseleave(function(){ 
				   swiper.autoplay.start(); 
				})
		      	
		    }
		}
		
	}
	
//确定当前的城市
	function makeCity(){
			var  pamasCitys=""
			var seeionCitys=sessionStorage.getItem('hsgw_cityName')  //缓存城市
			var posCitys=returnCitySN["cname"];  //真实定位地址
//			var posCitys="上海市"  //模拟定位地址
			if(seeionCitys){//有缓存
				pamasCitys=seeionCitys
			}else{//无缓存--初次打开网页
				
				if(cityCode(posCitys)){ //有门店
//					alert('有门店--'+posCitys);
					pamasCitys=posCitys
				}else{ //没门店
//					alert('无门店--'+"上海市");
					pamasCitys="上海市"
				}
				
				
				
			}
			pamasCitys=cityCode(pamasCitys)
			return pamasCitys
	}
	
