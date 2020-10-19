    //创建和初始化地图函数：
    
    
    //各个城市地址和信息
    var chooseCityMsg=[];
    var choosePos=[];
    var cityMsgAll= [
    			[
	    			[121.500665,31.236419,"上海市黄浦区中山东二路22号 ","上海外滩瑰丽婚礼艺术中心"],
					
				],
				[
	    			[116.564647,40.03906,"北京市朝阳区康营中街9号","北京财富店"],
					[116.530228,39.878231,"北京市朝阳区高碑店路99号","北京CBD店"],
					[116.225206,39.951869,"北京市海淀区四季青巨山路21号","北京燕西台店"]
				],
				[
	    			[113.143474,23.061298,"佛山市南海区海五路6号柏丽酒店","佛山华盛宴会中心旗舰店"],
				],
				[
	    			[120.113575,30.958864,"湖州南太湖旅游度假区通湖路158号星湖广场","湖州华盛宴会中心旗舰店"],

				],
				[
	    			[121.577765,29.89311,"宁波鄞州区甬江大道601号","宁波华盛宴会中心旗舰店"],

				],
				[
	    			[118.204191,24.501605,"厦门市思明区环岛东路观音山商业街19号（梦幻水世界对面）","厦门华盛宴会中心旗舰店"],

				],
				[
	    			[120.626563,30.000484,"绍兴市人民东路1051号","绍兴华盛宴会中心旗舰店"],
				],
				[
	    			[120.719559,28.025217,"温州市鹿城区瓯江路5号","温州华盛宴会中心旗舰店"],
				],
    ]
    
    
    
    
	var  pamasCityN=""
	var seeionCityN=sessionStorage.getItem('hsgw_cityName')  //缓存城市
	var posCityN=returnCitySN["cname"];  //真实定位地址
//	var posCityN='北京市';  //模拟定位地址
	if(seeionCityN){//有缓存
		pamasCityN=seeionCityN
	}else{//无缓存--初次打开网页
				
		if(cityCode(posCityN)){ //有门店
//			alert('有门店--'+posCityN);
			pamasCityN=posCityN
		}else{ //没门店
//			alert('无门店--'+"上海市");
			pamasCityN="上海市"
		}
				
				
				
	}
	
	
	
	switch (pamasCityN){
		case '上海市':
			chooseCityMsg=cityMsgAll[0]
			
			break;
		
		case '北京市':
			chooseCityMsg=cityMsgAll[1]
			break;
			
		case '佛山市':
			chooseCityMsg=cityMsgAll[2]
			break;
			
		case '湖州市':
			chooseCityMsg=cityMsgAll[3]
			break;
			
		case '宁波市':
			chooseCityMsg=cityMsgAll[4]
			break;
			
		case '厦门市':
			chooseCityMsg=cityMsgAll[5]
			break;
			
		case '绍兴市':
			chooseCityMsg=cityMsgAll[6]
			break;
			
		case '温州市':
			chooseCityMsg=cityMsgAll[7]
			break;

		default:
			break;
	}
	choosePos=chooseCityMsg[0]
	console.log("---------------------------------------",choosePos[0],choosePos[1])

	
	function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
    }
    
    //创建地图函数：
    function createMap(){
	// 百度地图API功能	
	
		map = new BMap.Map("allmap",{minZoom:1,maxZoom:15});
		map.centerAndZoom(new BMap.Point(choosePos[0],choosePos[1]), 11);	
	    var data_info = chooseCityMsg
	
		var opts = {
					width : 250,     // 信息窗口宽度
					height: 80,     // 信息窗口高度
					title : "地址：" , // 信息窗口标题
					enableMessage:true//设置允许信息窗发送短息
				   };
		for(var i=0;i<data_info.length;i++){
			var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
			var content = data_info[i][2];

			
			
			map.addOverlay(marker);               // 将标注添加到地图中
			marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
			addClickHandler(content,marker);
			
			var label = new BMap.Label(""+data_info[i][3],{offset:new BMap.Size(20,-10)});
			marker.setLabel(label);
			var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象 
			      
			marker.openInfoWindow(infoWindow); //开启信息窗口
		}
		
		
		function addClickHandler(content,marker){
		marker.addEventListener("click",function(e){
				openInfo(content,e)}
			);
		}
		function openInfo(content,e){
			var p = e.target;
			var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
			var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
			map.openInfoWindow(infoWindow,point); //开启信息窗口
		}
		
	    window.map = map;//将map变量存储在全局
    }
    
    //地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }
    
    //地图控件添加函数：
    function addMapControl(){
        //向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);
    }
    
    
    initMap();//创建和初始化地图
	
	
