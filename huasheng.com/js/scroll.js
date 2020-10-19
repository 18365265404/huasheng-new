		window.onscroll = function(){
			setTimeout(function(){
				 var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//兼容

//			 div距离底部高度+$("div").height()+[$("div").offset().top-$(document).scrollTop()]=$(window).height()
			 
//			  if(scrollTop>0){
//					$(".head1").addClass("animated fadeOut")
//			  }else{
//			  	$(".head1").addClass("animated fadeInUp")
//			  }
			 
			 //特效字效果，轮播图过后出现
			 if(distance('.swiper-container')>315){
				
				$(".home-picture-left-img").addClass("animated fadeInUp")
				
			 }
			 if(distance('.swiper-container')>375){
				
				$(".home-picture-left-text1").addClass("animated fadeInUp")
				
				
			 }
			 if(distance('.swiper-container')>770){
				
				$(".home-picture-left-text2").addClass("animated fadeInUp")
				
				
			 }
			 //婚礼案例特效 第一排
			 if(distance('.home-picture-right')>380){
			 	$(".home-article1-li").eq(0).animate({opacity:"1"},1000);
			 	$(".home-article1-li").eq(0).addClass("animated fadeInUp")
			 		
			 		
			 	anifadeInUp(".home-article1-li",0,3)	
			 		
			 }
			 
			 //婚礼案例特效 第二排
			 if(distance('.home-picture-right')>840){
			 	$(".home-article1-li").eq(3).addClass("animated fadeInUp")
			 	anifadeInUp(".home-article1-li",3,7)	
			 		
			 	
			 		
			 }
			 
			 //婚礼菜系特效 第一排
			 if(distance('.home-article2-menue')>70){
			 	$(".home-article2-list-li").eq(0).addClass("animated fadeInUp")
			 		
			 	anifadeInUp(".home-article2-list-li",0,4)	
			 		
			 }
			 
			 //婚礼菜系特效 第二排
			 if(distance('.home-article2-menue')>530){
			 	$(".home-article2-list-li").eq(4).addClass("animated fadeInUp")
			 		
			 	anifadeInUp(".home-article2-list-li",4,4)	
			 		
			 }
			 //视频控件后面的list图片 
			 if(distance('.home-article4')>100){
			 	$(".home-article5-list-li").eq(0).addClass("animated fadeInUp")
			 		
			 	anifadeInUp(".home-article5-list-li",0,3)	
			 		
			 }
			 //地图控件后面的list图片
			 if(distance('.home-article6')>100){
			 	$(".home-article7-list-li").eq(0).addClass("animated fadeInUp")
			 		
			 	anifadeInUp(".home-article7-list-li",0,4)	
			 		
			 }

			 
			
			if($(document).scrollTop()>620){
//			  	$(".home-picture-left-text1").animate({top:'445px'},800);
			  }
			if($(document).scrollTop()>630){
//			  	$(".home-picture-left-text2").animate({top:'737px'},800);
			  }
			
			
			
			
//			console.log(distance('.home-picture2-before'),$(".fixed-box1 img").eq(0).css("opacity"),$(".fixed-box1 img").eq(1).css("opacity"),$(".fixed-box1 img").eq(2).css("opacity"))
			 //大图特效字效果
			 if(distance('.home-picture2-before')<0){
			 	
			 
			 }else if(distance('.home-picture2-before')>0 && distance('.home-picture2-before')<=1080){
					$(".fixed-box1 img").eq(0).css("z-index",1006);
					$(".fixed-box1 img").eq(1).css("z-index",1002);
					$(".fixed-box1 img").eq(2).css("z-index",1001);
					$(".fixed-box1 img").eq(3).css("z-index",1000);
					$(".fixed-box1 img").eq(0).css({"display":"block"});
					$(".fixed-box1 img").eq(1).css({"display":"none"});
					$(".fixed-box1 img").eq(2).css({"display":"none"});
					$(".fixed-box1 img").eq(3).css({"display":"none"});
					$(".fixed-box1 img").eq(0).addClass("animated fadeIn")
					$(".fixed-box1").removeClass("fixed-box1-fixed");
						

			 }else if(distance('.home-picture2-before')>1080 && distance('.home-picture2-before')<=7880){
				$(".fixed-box1").addClass("fixed-box1-fixed");
				$(".fixed-box2-text4 img").css({"opacity":"0"})
				
				if(distance('.home-picture2-before')>1080 && distance('.home-picture2-before')<=2780){
					$(".fixed-box1 img").eq(0).css("z-index",1006);
					$(".fixed-box1 img").eq(1).css("z-index",1002);
					$(".fixed-box1 img").eq(2).css("z-index",1001);
					$(".fixed-box1 img").eq(3).css("z-index",1000);
					$(".fixed-box1 img").eq(0).css({"display":"block"});
					$(".fixed-box1 img").eq(1).css({"display":"none"});
					$(".fixed-box1 img").eq(2).css({"display":"none"});
					$(".fixed-box1 img").eq(3).css({"display":"none"});
					$(".fixed-box1 img").eq(0).addClass("animated fadeIn")
					
				}else if(distance('.home-picture2-before')>2780 && distance('.home-picture2-before')<=4480){
					$(".fixed-box1 img").eq(0).css("z-index",1003);
					$(".fixed-box1 img").eq(1).css("z-index",1006);
					$(".fixed-box1 img").eq(2).css("z-index",1001);
					$(".fixed-box1 img").eq(3).css("z-index",1000);
					$(".fixed-box1 img").eq(0).css({"display":"none"});
					$(".fixed-box1 img").eq(1).css({"display":"block"});
					$(".fixed-box1 img").eq(2).css({"display":"none"});
					$(".fixed-box1 img").eq(3).css({"display":"none"});
					
					$(".fixed-box1 img").eq(1).addClass("animated fadeIn")

				}else if(distance('.home-picture2-before')>4480 && distance('.home-picture2-before')<=6180){
					$(".fixed-box1 img").eq(0).css("z-index",1003);
					$(".fixed-box1 img").eq(1).css("z-index",1001);
					$(".fixed-box1 img").eq(2).css("z-index",1006);
					$(".fixed-box1 img").eq(3).css("z-index",1000);
					$(".fixed-box1 img").eq(0).css({"display":"none"});
					$(".fixed-box1 img").eq(1).css({"display":"none"});
					$(".fixed-box1 img").eq(2).css({"display":"block"});
					$(".fixed-box1 img").eq(3).css({"display":"none"});
					$(".fixed-box1 img").eq(2).addClass("animated fadeIn")
				}else if(distance('.home-picture2-before')>6180 && distance('.home-picture2-before')<=7880){
					$(".fixed-box1 img").eq(0).css("z-index",1003);
					$(".fixed-box1 img").eq(1).css("z-index",1002);
					$(".fixed-box1 img").eq(2).css("z-index",1001);
					$(".fixed-box1 img").eq(3).css("z-index",1006);
					$(".fixed-box1 img").eq(0).css({"display":"none"});
					$(".fixed-box1 img").eq(1).css({"display":"none"});
					$(".fixed-box1 img").eq(2).css({"display":"none"});
					$(".fixed-box1 img").eq(3).css({"display":"block"});
					$(".fixed-box1 img").eq(3).addClass("animated fadeIn")
				}		
				
				
			 }else{
			 	
			 	if(distance('.home-picture2-before')>7880){
			 			$(".fixed-box1").removeClass("fixed-box1-fixed");
					 	$(".fixed-box1 img").eq(0).css({"display":"none"});
						$(".fixed-box1 img").eq(1).css({"display":"none"});
						$(".fixed-box1 img").eq(2).css({"display":"none"});
						$(".fixed-box1 img").eq(3).css({"display":"none"});

						$(".fixed-box1 img").eq(2).css({"display":"none"});
					 	$(".fixed-box2-text4 img").css({"opacity":"1"})

				}
			 
			 }
			
			
			},100)
			
			
		}