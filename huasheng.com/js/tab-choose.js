

function tabControl(data){
	
	var tagIndex=0
	hoverTabs(data)
	checkTabs(data)   
		    



function checkTabs(data){
	
		$(".stage-box").eq(0).addClass("stage-box-click")
		$('.home-article2-menue li').click(function(){ 
			$('.stage-box').removeClass("stage-box-click")
			console.log($(this).find(".stage-box").attr("class"))
			if($(this).find(".stage-box").attr("class").indexOf("click")!=-1){
				
				$(this).find(".stage-box").removeClass("stage-box-click")
			}else{
				$(this).find(".stage-box").addClass("stage-box-click")
			}
		   
		   console.log($(this).index())
		   tagIndex=$(this).index()
		   cookieList(data,$(this).index())
		})
		
}

function hoverTabs(data){
	
		$(".stage-box").eq(0).addClass("stage-box-click")
		$('.home-article2-menue li').hover(function(){ 

			cookieList(data,$(this).index())
		},function(){
			cookieList(data,tagIndex)
		})
	
}


		function cookieList(data,index){
			
			let cookieListStr=""
		        console.log("首页数据3",data.data)
		        var cookieListTb=data[index].list.slice(0,8)
		        cookieListTb.map(function(value,key){
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
		}
}		