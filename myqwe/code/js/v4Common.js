
var api = "api";
var cookie = "";
var userid = "";
var shopid = 0;
var subscribe="";
var myHost="v3";
var isapp = "N";
var other_shopid ="";
var myshopid = "";
var recommended = '';
var actMissing = false; //控制活动消失与否的状态

var include_css = function(path){     
	var fileref=document.createElement("link")   
	fileref.rel = "stylesheet";  
	fileref.type = "text/css";  
	fileref.href = path;
	$("head").append(fileref);
} 
var include_js = function(){
	var fileref = document.createElement("script");
	fileref.type = "text/javascript";
	if(arguments.length==2){
		fileref.src = arguments[0];
		$("head").append(fileref);
	}else{
		fileref.src = arguments[0];
		$("#afui").append(fileref);
	}
}

// 获取随机数组
var getRndArray = function(arr0){     
	var arr1=new Array(); 
	var len=arr0.length; 
	for(var i=0;i<len;i++){ 
		var rnd=Math.floor(Math.random()*arr0.length); 
		arr1[i]=arr0[rnd]; 
		arr0.splice(rnd,1) 
	} 
	return arr1; 
}

// 菊花加载图
var insertLoadingPic = function(){
	$("#afui").append('<div id="loadingPic"><div class="loadingNowPic"></div><div class="mesTips"></div></div>');
	$('.loadingNowPic').addClass('loading');
}
var loadingNow = function(){
	
	$(document).bind('touchmove',function(){
		return false;
	});
	if(arguments.length==0){
		$('.mesTips').html('');
	}
	if(arguments.length==1){
		$('.mesTips').html(arguments[0]);
	}
	$("#loadingPic").css("display","block");
	$("#loadingPic").find(".loadingNowPic").addClass("loading");
	
}
var loadedNow = function(){
	$(document).unbind('touchmove')
	if(api=="api-test"){
		$("#loadingPic").css("display","none");
		$("#loadingPic").find(".loadingNowPic").removeClass("loading");
	}else{
		$("#loadingPic").css("display","none");
		$("#loadingPic").find(".loadingNowPic").removeClass("loading");
	}
}



var showMenu = function(){
	if(location.href.indexOf('UserManual.html')!=-1){

	}else{
		$("#afui").append('<div id="newFooter"><a href="#" id="myHomes"><img src="http://v3.cf123.com.cn/images/myHome.png"><span>微店</span></a><a href="#settings" id="myShop"><img src="http://v3.cf123.com.cn/images/fixed.png"><span>装修</span></a><a href="#" id="proManage"><img src="http://v3.cf123.com.cn/images/proManage.png"><span>商品管理</span></a><a href="#" id="university"><img src="http://v3.cf123.com.cn/images/university.png"><span>千微大学</span></a><a href="#" id="aboutMe"><img src="http://v3.cf123.com.cn/images/aboutMe.png"><span>我</span></a></div>');
	}

	$("#myHomes").click(function(){
		window.location.href= setRandom("http://"+myHost+".cf123.com.cn/myHomes.html?shopid="+shopid);
	});
	$("#myShop").click(function(){
		window.location.href= setRandom("http://"+myHost+".cf123.com.cn/QW4.0/decoration/decoration.html");
	});
	$("#university").click(function(){
		window.location.href= setRandom("http://"+myHost+".cf123.com.cn/UserManual.html");
	});
	$("#proManage").click(function(){
		window.location.href= setRandom("http://"+myHost+".cf123.com.cn/QW4.0/icloud/CommodityManagements.html");
	});
	$("#aboutMe").click(function(){
		window.location.href= setRandom("http://"+myHost+".cf123.com.cn/mes.html");
	});
}

// 主菜单显示隐藏
var initMenu = function(){

	$('#afui').append('<div id="mainMenu"><ul><li id="menuHome">商城主页</li><li id="menuShop">商城首页</li><li id="menuDecoration">装修商城</li><li id="menuCommondity">商品管理</li><li id="menuCloud">商城云库</li><li id="menuBranches">我的分店</li><li id="menuMe">关于我</li><li id="menuSchool">千微大学</li><li id="menuPlay">边玩边赚</li><li id="menuOrder">订单管理</li><li id="menuActivity">天天特卖</li><div id="toShowMenu"></div></ul></div>');

	// 初始化起始坐标
	var startX = 0,endX = 0;
	var domStartX = 0;
	var mainMenu = document.getElementById('mainMenu');

	// // 获取触摸的开始位置坐标
	// var touchstartFunc = function(evt){
	// 	var touch = evt.touches[0]; //获取第一个触点
	// 	var x = Number(touch.pageX); //页面触点X坐标
	// 	startX = x;
	// 	mainMenu.addEventListener('touchmove',touchmoveFunc,false);
	// 	evt.preventDefault();
	// };
	// var touchmoveFunc = function(evt){
	// 	var touch = evt.touches[0]; //获取第一个触点
	// 	var x = Number(touch.pageX); //页面触点X坐标
	// 	endX = x;
	// };
	// var touchendFunc = function(evt){
	// 	console.info(startX+'---'+endX);
	// 	if(startX+10 < endX){
	// 		$('#mainMenu').find('li').css({'margin':'5px 0px 5px 30px','width':'60px'});
	// 		$('#mainMenu').animate({'right':'-60px','background':'rgba(0,0,0,0)'},100,function(){
	// 			$(this).css('background','rgba(0,0,0,0)')
	// 		});
	// 	}else if(startX > endX+10){
	// 		$('#mainMenu').find('li').css({'margin':'5px auto','width':'80px'});
	// 		$('#mainMenu').animate({'right':'0px','background':'rgba(0,0,0,0.7)'},100,function(){
	// 			$(this).css('background','rgba(0,0,0,0.7)')
	// 		});
	// 	}else{
			
	// 	}
	// }
	// mainMenu.addEventListener('touchstart',touchstartFunc,false);
	// document.addEventListener('touchend',touchendFunc,false);


	document.getElementById('toShowMenu').addEventListener('click',function(evt){
		if($('#mainMenu').css('right')=='-90px'){
			$('#mainMenu').animate({'right':'0px','background':'rgba(0,0,0,0.7)'},100,function(){
				$(this).css('background','rgba(0,0,0,0.7)')
			});
		}else{	
			$('#mainMenu').animate({'right':'-90px','background':'rgba(0,0,0,0.7)'},100,function(){
				$(this).css('background','rgba(0,0,0,0.7)')
			});
		}
		
	},false);

	document.getElementById("menuHome").addEventListener('click',function(evt){
		window.location.href = setRandom('http://'+myHost+'.cf123.com.cn/QW4.0/Index/qwIndex.html');
	},false);
	document.getElementById("menuShop").addEventListener('click',function(){
		window.location.href = setRandom('http://'+myHost+'.cf123.com.cn/myHomes.html?shopid='+shopid);
	},false);
	document.getElementById("menuDecoration").addEventListener('click',function(){
		window.location.href = setRandom('http://'+myHost+'.cf123.com.cn/QW4.0/decoration/decoration.html');
	},false);
	document.getElementById("menuCommondity").addEventListener('click',function(){
		window.location.href = setRandom('http://'+myHost+'.cf123.com.cn/QW4.0/icloud/CommodityManagements.html');
	},false);
	document.getElementById("menuCloud").addEventListener('click',function(){
		window.location.href = setRandom('http://'+myHost+'.cf123.com.cn/QW4.0/icloud/CloudClassification.html');
	},false);
	document.getElementById("menuBranches").addEventListener('click',function(){
		window.location.href = setRandom('http://'+myHost+'.cf123.com.cn/QW4.0/branches/myBranches.html');
	},false);
	document.getElementById("menuMe").addEventListener('click',function(){
		window.location.href = setRandom('http://'+myHost+'.cf123.com.cn/mes.html');
	},false);
	document.getElementById("menuSchool").addEventListener('click',function(){
		window.location.href = setRandom('http://'+myHost+'.cf123.com.cn/UserManual.html');
	},false);
	document.getElementById("menuPlay").addEventListener('click',function(){
		window.location.href = setRandom('http://'+myHost+'.cf123.com.cn/QW4.0/quizhim/playAndEarn.html');
	},false);
	document.getElementById("menuOrder").addEventListener('click',function(){
		window.location.href = 'http://'+myHost+'.cf123.com.cn/QW4.0/Me/myOrderManage.html#managepanel';
	},false);
	document.getElementById("menuActivity").addEventListener('click',function(){
		// window.location.href = setRandom('http://'+myHost+'.cf123.com.cn/QW4.0/');
		myAlertEvent('暂未开通',function(){}),false;;
	})
}

// 手机横屏查看
var checkOrientationChange = function(){
	if(api=="api-test"){

	}else{
		if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))){
			var flag = 0;
			$("#afui").append('<div class="orientationchange"><div class="orientmain"><img src="images/phonechage.png" alt=""></div><p>请将设备竖向浏览</p></div>');
			if(window.orientation==0){  
				// alert("竖屏")
			}else{  
				// alert("横屏");
				$(document).bind('touchstart',function(e){
					e.stopPropagation();
					e.preventDefault();
					return false;
				});
				flag = 1;
				$(".orientationchange").css("display","block");
			} 

			 window.onorientationchange=function(){
				// alert(2);
				 if(window.orientation==0){  
					// alert("竖屏");
					$(".orientationchange").css("display","none;");
					// if(flag==1){
						window.location.reload();
					// }

				 }else{  
					// alert("横屏");
					$(document).bind('touchstart',function(e){
						e.stopPropagation();
						e.preventDefault();
						return false;
					});
					$(".orientationchange").css("display","block");
				 }  
			}
		}
	}
}

// ajax_post方法
var ajax_post = function(api,url,isJson,func){
	if(isJson){
		$.ajax({
			type:"post",
			dataType:"json",
			cache:false,
			url:"/"+api+"/",
			data:url,
			success:function(data){
				loadedNow();
				if(data.errmsg!=undefined){
					alert(data.errmsg);
				}else{
					func(data);
				}
			}
		});
	}else{
		$.ajax({
			type:"post",
			cache:false,
			url:"/"+api+"/",
			data:url,
			success:function(data){
				loadedNow();
				if(data.errmsg!=undefined){
					alert(data.errmsg);
				}else{
					func(data);
				}
			}
		});
	}
}
// ajax_get方法
var ajax_get = function(url,func,errFunc){
	$.ajax({
		dataType:"jsonp",
		cache:false,
		url:url,
		success:function(data){
			if(data.errmsg!=undefined){
				loadedNow();
				if(errFunc!=null){
					errFunc(data);
				}else{
					alert(data.errmsg);
				}
			}else{
				// loadedNow();
				func(data);
			}
		}
	});
}

// 登陆验证
var checkCookie = function(){
	var cookeis = null;
	if(api == 'api'){
		cookies = getCookie("QWV3");
	}else{
		cookies = getCookie("QWV3TEST");
	}
	shopid = Request("shopid");
	if(shopid != 0){
		ajax_get('http://'+api+'.cf123.com.cn/shop/info/?shopid='+shopid,function(data){
			recommended = data.data[0].uid;
			// 判断cookie是否存在
			if(cookies == "undefined"||cookies == undefined||cookies == null ||cookies==""){
			
				// 未登陆过，通过回调获取自身cookie
				if(isapp=="Y"){
					// alert("ok");
				}else{
					window.location.href = "http://"+api+".cf123.com.cn/user/getwx/?recommended="+recommended+"&backpage="+encodeURIComponent(window.location.href);
				}
			}else{
				cookie = Request("key",cookies);
				userid = Request("uid",cookies);
				subscribe = Request("subscribe",cookies);
				myshopid = Request("shopid",cookies);
				if(cookie == ""){
					if(isapp=="Y"){
						console.info("is app");
					}else{
						window.location.href = "http://"+api+".cf123.com.cn/user/getwx/?recommended="+recommended+"&backpage="+encodeURIComponent(window.location.href);
					}
				}
				if(shopid == "undefined"||shopid == undefined||shopid == null ||shopid==""||shopid==0){
					shopid = Request("shopid",cookies);
				}else{
					// 分享进来的
					if(shopid!=myshopid){
						if(subscribe==0){
							var url = window.location.href;
							userid = Request("uid");
							ajax_get("http://"+api+".cf123.com.cn/user/referer/?uid="+userid+"&url="+url,function(data){

							},null)
						}
						window.localStorage.setItem("other_shopid",shopid);
					}

				}
				// 通过本地cookie再去登陆
				ajax_get('http://'+api+'.cf123.com.cn/user/chk/?key='+cookie,function(data){
					Index.main(api,data.key,data.userid,data.shopid,data.subscribe);
				},function(data){
					if (isapp!="Y"){
						window.location.href = "http://"+api+".cf123.com.cn/user/getwx/?recommended="+recommended+"&backpage="+encodeURIComponent(window.location.href);
					}else{
						window.location.href = setRandom("http://"+myHost+".cf123.com.cn/app/login.html");
					}
				});
				console.info(123);
			}
		},null);
	}else{
		// 判断cookie是否存在
		if(cookies == "undefined"||cookies == undefined||cookies == null ||cookies==""){
		
		// 未登陆过，通过回调获取自身cookie
			if(isapp=="Y"){
				// alert("ok");
			}else{
				window.location.href = "http://"+api+".cf123.com.cn/user/getwx/?recommended=0&backpage="+encodeURIComponent(window.location.href);
			}
		}else{
			cookie = Request("key",cookies);
			userid = Request("uid",cookies);
			subscribe = Request("subscribe",cookies);
			myshopid = Request("shopid",cookies);
			if(cookie == ""){
				if(isapp=="Y"){
					console.info("is app");
				}else{
					window.location.href = "http://"+api+".cf123.com.cn/user/getwx/?recommended=0&backpage="+encodeURIComponent(window.location.href);
				}
			}
			if(shopid == "undefined"||shopid == undefined||shopid == null ||shopid==""||shopid==0){
				shopid = Request("shopid",cookies);
			}else{
				// 分享进来的
				if(shopid!=myshopid){
					if(subscribe==0){
						var url = window.location.href;
						userid = Request("uid");
						ajax_get("http://"+api+".cf123.com.cn/user/referer/?uid="+userid+"&url="+url,function(data){

						},null)
					}
					window.localStorage.setItem("other_shopid",shopid);
				}

			}
			// 通过本地cookie再去登陆
			ajax_get('http://'+api+'.cf123.com.cn/user/chk/?key='+cookie,function(data){
				Index.main(api,data.key,data.userid,data.shopid,data.subscribe);
			},function(data){
				if (isapp!="Y"){
					window.location.href = "http://"+api+".cf123.com.cn/user/getwx/?recommended=0&backpage="+encodeURIComponent(window.location.href);
				}else{
					window.location.href = setRandom("http://"+myHost+".cf123.com.cn/app/login.html");
				}
			});
			console.info(123);
		}
	}

}  

var Request = function(){
	var query = location.search;
	var paras = arguments[0];
	if(arguments.length==2){
		query = arguments[1];
	}
	if (query != ""){
		if(query.indexOf("?")!=-1){
			query = query.split("?")[1];
		}
		query = query.split("&");
		for (var i=0;i<query.length;i++){
			var querycoll = query[i].split("=");
			if (querycoll.length == 2){
				if (querycoll[0].toUpperCase() == paras.toUpperCase()){
					return querycoll[1];
					break;
				}
			}
		}
	}
	return "";
}


var cutCookieKey = function(url){
	if(url.indexOf("key=")!=-1){
	var parasArray = url.split("key=")[1].split("&")[0];
	return url.replace("key="+parasArray,"").replace("&&","&");
	}else{
	return url;
	}
	
}
var cutShopid = function(url){
	if(url.indexOf("shopid=")!=-1){
	var parasArray = url.split("shopid=")[1].split("&")[0];
	return url.replace("shopid="+parasArray,"").replace("&&","&");
	}else{
	return url;
	}
	
}
var cutOther_Shopid = function(url){
	if(url.indexOf("other_shopid=")!=-1){
	var parasArray = url.split("other_shopid=")[1].split("&")[0];
	return url.replace("other_shopid="+parasArray,"").replace("&&","&");
	}else{
	return url;
	}
	
}
var cutUid = function(url){
	if(url.indexOf("uid=")!=-1){
	var parasArray = url.split("uid=")[1].split("&")[0];
	return url.replace("uid="+parasArray,"").replace("&&","&");
	}else{
	return url;
	}
}

var getMsg = function(){
	var errmsg = Request("err");
	var msg = Request("msg");
	if(errmsg!=""){
		alert(unescape(errmsg));
	}else if(msg!=""){
		alert(unescape(msg));
	}else{
	}
} 

// 添加随机数
var setRandom = function(url){
	var myrandom = new Date().getTime();
	var newURL;
	var hash = url.split('#')[1];
	url = url.split('#')[0];
	if(hash==''||hash==undefined){
		hash = '';
	}else{
		hash = '#' + hash;
	}
	if(url.indexOf("?")!=-1){
		newURL = url+"&myrandom="+myrandom+"&recommended="+userid+hash;
	}else{
		newURL = url+"?myrandom="+myrandom+"&recommended="+userid+hash;
	}
	return newURL;
}
//写分享次数cookies
var setShareCookie = function(name,value){
	var exp = new Date();
	// var nextExp = Date.UTC(exp.getFullYear(),exp.getMonth()+1,exp.getDate()+1);
	// exp.setTime(nextExp);
	exp.setTime(exp.getTime() + 1*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";domain=cf123.com.cn;expires=" + exp.toGMTString();
}
//写cookies
var setCookie = function(name,value){
	var Days = 30;
	var exp = new Date(); 
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";domain=cf123.com.cn;expires=" + exp.toGMTString();
}
//读取cookies
var getCookie = function(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
}

//删除cookies
var delCookie=function(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+";domain=cf123.com.cn;expires="+exp.toGMTString();
}


var getTheCommonIscroll = function(id,startFunc,moveFunc,endFunc){
	return new iScroll(id,{
		hScroll: false,
		vScroll:true,
		hScrollbar:false,
		vScrollbar:false,
		bounce:true,
		momentum:true,
		checkDOMChanges:true,
		lockDirection: true,
		onBeforeScrollStart:function(evt){
			evt.stopPropagation();
			evt.preventDefault();
			startFunc();
		},
		onScrollMove:function(){
			if(this.y <= this.maxScrollY-20){
				isToBottom = "yes";
			}
			if(this.y >= this.minScrollY+20){
				isToTop = "yes";
			}
			moveFunc();
		},
		onScrollEnd:function(){
			endFunc();
		}
	})
}

// 关键字高亮
var setKeywordRed = function(word,keyword){
	word = word.replace(keyword,"<font color='red'>"+keyword+"</font>");
	return word;
}

// 销量低于10时更换文字
var changeSales = function(num){
	var string = '';
	if(Number(num)<10){
		string = '低于10';
	}else{
		string = num;
	}
	return string ;
}

// 最新活动提醒
var newActivity = function(){
	var timer;
	//$("#afui").append('<div class="newActivity" style="width: 100%;height: 50%;position: absolute;top: 0px;left: 0px;z-index: 30002;"><div class="newActivityBanner" style="width: 100%;height: 100%;position: relative;"><img src="../../../images/images_act/easyOpen_act_shuang11.jpg" alt="" height="100%" width="100%"></div><div class="newActivityFlag" style="position: absolute;right: 10px;bottom:-45px;width: 45px;height: 45px;"><img src="../../../images/images_act/easyOpen_act_shuang11.png"/></div></div>');
	$(".newActivity").css("height",window.innerHeight/2);
	$(".newActivityFlag").find("img").css({"height":"45px","width":"45px"});
	var xHeight = $(".newActivity").css("height");
	// 没活动时注释掉
	// $(".newActivity").stop(false,true).animate({"top":"-"+xHeight},0);
	// 有活动时
	
	$(".newActivity").stop(false,true).animate({"top":"0px"},1000);
	
	clearTimeout(timer);
	timer = setTimeout(function(){
		$(".newActivity").stop(false,true).animate({"top":"-"+xHeight},1000);
	},5000);
	$(".newActivityFlag").click(function(evt){
		evt.stopPropagation();
		evt.preventDefault();
		if($(".newActivity").css("top").substring(0,1)=="-"){
			$(".newActivity").stop(false,true).animate({"top":"0px"},1000);
			clearTimeout(timer);
			timer = setTimeout(function(){
				$(".newActivity").stop(false,true).animate({"top":"-"+xHeight},1000);
			},5000);
		}else{
			$(".newActivity").stop(false,true).animate({"top":"-"+xHeight},1000);
		}
		
	});

	$(".newActivityBanner").click(function(){
		/*window.location.href = setRandom("http://"+myHost+".cf123.com.cn/QW4.0/myHome/microShopDetails.html?proid=421115&shopid="+shopid+"&uid="+userid);*/
		/*window.location.href = setRandom("http://v3.cf123.com.cn/QW4.0/myHome/cloudBaseDetails.html?proid=1518&shopid="+shopid+"&uid="+userid);*/
		window.location.href = setRandom("http://"+myHost+".cf123.com.cn/QW4.0/brand/shuang11/shuang11.html?shopid="+shopid);
	});

}
// 新版最新活动提醒
var newActivityNotice = function(){
	var timer = null;
	$("#afui").append('<div class="newActivity" style="width: 100%;height: 50%;position: absolute;top: 0px;left: 0px;z-index: 30002;"><div class="newActivityBanner" style="width: 100%;height: 100%;position: relative;"><img src="../../../images/images_act/easyOpen_act_shuang11.jpg" alt="" height="100%" width="100%"></div><div class="newActivityFlag" style="position: absolute;right: 0px;bottom:-60px;width: 60px;height: 60px;"><img src="../../../images/images_act/easyOpen_act_shuang11.png"/></div></div>');
	$(".newActivity").css("height",window.innerHeight/2);
	$(".newActivityFlag").find("img").css({"height":"60px","width":"60px"});
	var xHeight = $(".newActivity").css("height");

	// 没活动时注释掉
	// $(".newActivity").stop(false,true).animate({"top":"-"+xHeight},0);

	// 有活动时
	$(".newActivity").stop(false,true).animate({"top":"0px"},1000);
	
	clearTimeout(timer);
	timer = setTimeout(function(){
		$(".newActivity").stop(false,true).animate({"top":"-"+xHeight},1000);
	},5000);
	$(".newActivityFlag").click(function(evt){
		actMissing = false;
		evt.stopPropagation();
		evt.preventDefault();
		if($(".newActivity").css("top").substring(0,1)=="-"){
			$(".newActivity").stop(false,true).animate({"top":"0px"},1000);
			clearTimeout(timer);
			timer = setTimeout(function(){
				$(".newActivity").stop(false,true).animate({"top":"-"+xHeight},1000);
			},5000);
		}else{
			$(".newActivity").stop(false,true).animate({"top":"-"+xHeight},1000);
		}
		
	});

	$(".newActivityBanner").click(function(){
		/*window.location.href = setRandom("http://"+myHost+".cf123.com.cn/QW4.0/myHome/microShopDetails.html?proid=421115&shopid="+shopid+"&uid="+userid);*/
		/*window.location.href = setRandom("http://v3.cf123.com.cn/QW4.0/myHome/cloudBaseDetails.html?proid=1518&shopid="+shopid+"&uid="+userid);*/
		window.location.href = setRandom("http://"+myHost+".cf123.com.cn/QW4.0/brand/shuang11/shuang11.html?shopid="+shopid);
	});

}

var getGPSPosition = function(showPosition){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition,showError);
	}
	else{
		alert("Geolocation is not supported by this browser.");
	}
}

var showError = function(error){
	loadedNow();
	switch(error.code){
		case error.PERMISSION_DENIED:
			alert("User denied the request for Geolocation.用户不允许地理定位");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("Location information is unavailable.无法获取当前位置");
			break;
		case error.TIMEOUT:
			alert("The request to get user location timed out.操作超时");
			break;
		case error.UNKNOWN_ERROR:
			alert("An unknown error occurred.位置获取遇到未知错误");
			break;
	}
}

// 提示信息框
var addMesBody = function(){
	$("#afui").append('<div class="div_details"><div class="div_details_body"></div><a class="iKnow">我知道了</a></div>')
}
var alertMes = function(){
	var msg = arguments[0];
	// $(document).bind('touchstart',function(e){
	// 	e.preventDefault();
	// 	return false;
	// });
	$(".div_details_body").html(msg);
	$(".div_details").show();
	if(arguments.length==2){
		var func = arguments[1];
		$(".iKnow").click(function(){
			$(".div_details").hide();
			// $(document).unbind('touchstart');
			func();
		});
	}else{
		$(".iKnow").click(function(){
			$(".div_details").hide();
			// $(document).unbind('touchstart');
		});
	}
}
// 往window.onload的function中添加事件，防止被覆盖
var addLoadEvent = function(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function'){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}

// 刷新随机数
var refreshRandom = function(str,url){
	var string = url;
	var hash = string.split('#')[1];
	string = string.split('#')[0];
	if(hash==''||hash==undefined){
		hash = '';
	}else{
		hash = '#' + hash;
	}
	if(string.indexOf('?')==-1){     
		return (string + '?myrandom=' + new Date().getTime()+hash);
	}else{
		var parasArray = string.split('?')[1].split('&');  //截取？号后面的那段如果有&  则也要截取
		var oldUrl = string.split('?')[0]+"?";   // 获取地址？前面的那段 并且加？
		if(string.indexOf(str)!=-1){   //如果找到时间戳
			for(var i=0;i<parasArray.length;i++){  // 遍历数组里面的值 
				var key = parasArray[i].split('=')[0]; 
				var value = parasArray[i].split('=')[1];
				if(i==parasArray.length-1){  // 判断是不是数组里面的最后一个 如果是
					if(str == key){   //则判断时间戳和key是不是一致 
						value = new Date().getTime();
						oldUrl+=key+"="+value;
					}else{
						oldUrl+=parasArray[i];
					}
				}else{
					if(str == key){
						value = new Date().getTime();
						oldUrl+=key+"="+value+'&';
					}else{
						oldUrl+=parasArray[i]+'&';
					}
				}
			}
		}else{
			return (string + '&myrandom=' + new Date().getTime()+hash);
		}
		return oldUrl+hash;
	}
}
/*添加刷新按钮*/

/*var insertRefresh = function(){
	$("#afui").append("<a id='float_but'><img src='http://"+myHost+".cf123.com.cn/images/refresh_icon.png'><span>刷新</span></a>");
	$("#float_but").css({"position":"fixed","right":"10px","top": "20%","width": "13%","z-index":'39999','background':'#f90', "border-radius": "6px","color":"#fff","text-align":"center"});
	$("#float_but > img").css({"width": "100%","right":"0px"});
	$("#float_but > span").css("color","#fff");
	var float_btn = document.getElementById('float_but');
	float_btn.addEventListener('click',function(){
		window.location.href = refreshRandom('myrandom',window.location.href);
		event.stopPropagation();
	},false);
}*/

// 刷新url中指定的参数
var refreshParas = function(paras,value){
	var string = window.location.href;
	if(string.indexOf('?')==-1){     
		return (string + '?'+paras+'=' + value);
	}
	else{
		var parasArray = window.location.href.split('?')[1].split('&');  //截取？号后面的那段如果有&  则也要截取
		var oldUrl = window.location.href.split('?')[0]+"?";   // 获取地址？前面的那段 并且加？
		if(window.location.href.indexOf(paras)!=-1){   //如果找到时间戳

			for(var i=0;i<parasArray.length;i++){  // 遍历数组里面的值 
				var key = parasArray[i].split('=')[0]; 
				if(i==parasArray.length-1){  // 判断是不是数组里面的最后一个 如果是
					if(paras == key){   //则判断时间戳和key是不是一致 
						oldUrl+=key+"="+value;
					}else{
						oldUrl+=parasArray[i];
					}
				}else{
					if(paras == key){
						oldUrl+=key+"="+value+'&';
					}else{
						oldUrl+=parasArray[i]+'&';
					}
				}
			}
		}else{
			return (string + '&'+paras+'=' + value);
		}
		return oldUrl;
	}
}

// 管理分享菜单栏
var manageWXOption = function(){
	var appId = null;
	var isTest = location.href.indexOf("v3-test");
	if(isTest!=-1){
		appId = 'wx512a7322e814d5cc';//测试站
		api = "api-test";
		myHost = 'v3-test';
	}else{
		appId = 'wxa9a59e7c67126846';//正式站
		api = "api";
		myHost = 'v3';
	}
	
	var timestamp = new Date().getTime();
	var nonceStr = 'asdfasdfexdfea';
	$.ajax({
		dataType:'jsonp',
		cache:false,
		timeout:10000,
		url:'http://'+api+'.cf123.com.cn/wxapi/get_signature/?url='+encodeURIComponent(window.location.href),
		success:function(data){
			var signature = data.signature;
			timestamp = data.timestamp;
			noncestr = data.noncestr;
			try{
				wx.config({
					debug: false,
					appId: appId, //测试站
					timestamp: timestamp,
					nonceStr: noncestr,
					signature: signature,
					jsApiList: [
						'checkJsApi',
						'openLocation',
						'getLocation',
						// 'hideOptionMenu',
						'showOptionMenu',
						'closeWindow',
						'startRecord',
						'onVoiceRecordEnd',
						'uploadVoice',
						'stopRecord',
						'playVoice',
						'pauseVoice',
						'stopVoice',
						'onVoicePlayEnd'
					]
				});
				wx.error(function (res) {
					loadedNow();
					console.info(res.errMsg);
				});
				wx.ready(function () {
					// wx.hideOptionMenu();
					wx.showOptionMenu();
					loadedNow();
				});
			}catch(e){
				if(e.name == "ReferenceError"){

				}
			}
			
		},
		error:function(){
			loadedNow();
		}

	});
}

//执行自定义弹窗
var initMyAlert = function(){//初始化自定义弹窗
	var myAlertR = (window.innerWidth - 250) / 2;
	$(".myAlert").css("right", myAlertR);
}
var preventDefault =function(e) {e.preventDefault();}; 
initMyAlert();
var removeNoClick = function(){document.getElementById("myAlertNo").onclick = null;}
var removeYesClick = function(){document.getElementById("myAlertYes").onclick = null;}
var removeKnowClick = function(){document.getElementById("myAlertKnow").onclick = null;}
var myAlertEvent = function(){
	document.addEventListener('touchmove',preventDefault,false);
	var desc = arguments[0];
	if(arguments.length == 3){
		$("#myAlertKnow").hide();
		$("#myAlertYes,#myAlertNo").css('display','inline-block');
		var yFunc = arguments[1];
		var nFunc = arguments[2];
		document.getElementById('myAlertYes').onclick = function(){
			$(".myAlertBox").hide();
			$("#myAlertText").html("");
			removeYesClick();
			document.removeEventListener('touchmove',preventDefault,false);
			yFunc();
		}

		document.getElementById('myAlertNo').onclick = function(){
			$(".myAlertBox").hide();
			$("#myAlertText").html("");
			removeNoClick();
			document.removeEventListener('touchmove',preventDefault,false);
			nFunc();
		}

	}else if(arguments.length == 2){
		var cFunc = arguments[1];
		$("#myAlertKnow").css('display','inline-block');
		$("#myAlertYes,#myAlertNo").hide();
		document.getElementById('myAlertKnow').onclick = function(){
			$(".myAlertBox").hide();
			$("#myAlertText").html("");
			removeKnowClick();
			document.removeEventListener('touchmove',preventDefault,false);
			cFunc();
		}
	}
	$("#myAlertText").html(desc);
	$(".myAlertBox").show();
}

// 判断微信版本
var checkWXversion = function(){
	addMesBody();
	var startVer = Number(navigator.userAgent.toLowerCase().indexOf("micromessenger"))+15;
	var endVer = Number(startVer)+5;
	var wxVersion = navigator.userAgent.toLowerCase().substring(startVer,endVer);
	if(wxVersion<"6.1"){
		alertMes('您当前的微信版本是'+wxVersion+',为了更好地体验"千微网"的魅力，建议将微信更新至最新版本哦！');
	}
}

// dom加载完成时执行
$(function(){
	// 插入菊花加载
	insertLoadingPic();
	loadedNow();
	//百度统计
	// if(window.location.href.indexOf('myHomes.html')||window.location.href.indexOf('ActivityForNewYear.html')){
	// 	var _hmt = _hmt || [];
	// 	(function() {
	// 		var hm = document.createElement("script");
	// 		hm.src = "//hm.baidu.com/hm.js?b062e4733d0d0fb81c4add3bc10dbb7c";
	// 		var s = document.getElementsByTagName("script")[0]; 
	// 		s.parentNode.insertBefore(hm, s);
	// 	})();
	// }
	// dom 跟 js 都加载完才执行
	window.onload = function(){
		
		window.localStorage.removeItem("other_shopid");
		window.localStorage.removeItem('uidFromShopid');
		window.localStorage.removeItem("other_uid");
	}
	manageWXOption();
		
	// 判断是否微信登陆
	if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger") {
		// initMenu();
	}else {
		isapp = "Y";
		// showMenu();
		initMenu();
	}
	var isTest = location.href.indexOf("v3-test");
	if(isTest!=-1){
		api = "api-test";
		myHost = "v3-test";
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
		if(isAndroid){
			insertRefresh();
		}
	}else{
		api = "api";
		myHost = "v3";
	}

	// 横屏显示
	// checkOrientationChange();

	// dom与js加载完成时执行
	checkCookie();

});

