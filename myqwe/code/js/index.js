(function(){
    var indexPg = MMC.indexPg = {};
    var PageIndex  = 1;
    var Keyword ="all";
    var click_num =0;
    var hide = 0;
    var productId;
    var jz =1;
    var userId;
    var proPropertyIds;
    var gou_img = "";
    var money;
    var shopId,imgUrl,QweKey,OrderPriority= 1,OrderPriorityJson = {"Data":[]},OrderPriorityJson2,allNum= 0,isNotHave= 0,_lock = false, _second = false;
    var CategoryIds = "";
    var isShow=0;

    //加载json
    indexPg.sign = function(){
        var main = {
            //根据userId查找到shopId
            userIdFormShopId:function(userId){
                GLOBAL.base.ajax_json({
                    url:"http://shop.api.myqwe.com/api/shops/GetShopIdByUId?userid="+userId
                },function(data){
                    if(data.Status == '200'){
                        shopId = data.Content;
                        window.location.href = window.location.href+"?shopId="+shopId;
                        return;
                    }
                });
            },
            ajax_json: function(shopId){
                if($.trim(shopId) !="" && shopId !=null && shopId !='undefined'){
                    GLOBAL.base.ajax_json({
                        url:"http://shop.api.myqwe.com/api/ProductInShop/GetMyMallInfo?shopId="+shopId
                    },function(data){
                        if (data != null && data != "" && data != "undefined") {
                            if (data.Content != "" && data.Content != null && data.Content != "undefined") {
                                if(data.Content.MallLogo !=null && data.Content.MallLogo != "" && data.Content.MallLogo != "undefined"){
                                    $('.top-box .photo img').attr('src', data.Content.MallLogo);
                                    $('.t-name .u-name b').text(data.Content.MallName);
                                    GLOBAL.base.shareFriendRale({
                                        title : data.Content.MallName,
                                        desc : "千微网v5.0出世啦，漂亮的帅哥美女都在围观，你在干嘛呢？",
                                        link:"http://v5.myqwe.com/index.html?shopId="+shopId,
                                        imgUrl : data.Content.MallLogo,
                                        types:1
                                    });
                                }
                                if(data.Content.MallBanner !=null && data.Content.MallBanner != "" &&　data.Content.MallBanner != "undefined"){
                                    $('.top-box .bg img').attr('src',data.Content.MallBanner);
                                }
                                $('.t-name .u-name span').text("（ID："+data.Content.UserId+"）");
                                if(data.Content.MallIntroduction !=null && data.Content.MallIntroduction != "" &&　data.Content.MallIntroduction != "undefined"){
                                    $('.top-box .wel').text(data.Content.MallIntroduction);
                                }
                            }
                            if (data.Content.All.All != "all") {                                
                                 allNum = 1;
                                // 发一个请求 搜索商品数据
                                main.myproduct();
                               
                            }else{
                                main.ajax_second();
                            }
                        }
                        //alert(JSON.stringify(data));
                    });
                }else{
                    main.ajax_second();
                }
            },
           
            ajax_second: function(){ //OrderPriority 0 上架时间  1 销量  2  价格   
                GLOBAL.base.ajax_json({
                    url:"http://shop.api.myqwe.com/api/Search/SearchByKeyword?Keyword="+Keyword+"&OrderPriority="+OrderPriority+"&PageIndex="+PageIndex+"&PageSize=12"
                },function(data){
                    if(click_num !=0){
                        $('.pro-box ul').empty();
                    }
                    if( data !=null &&  data != "" && data != "undefined" && data.Data != null &&  data.Data != "" && data.Data != "undefined"){
                        var html2 =  template('alllist', data);
                        $('#noneHave').remove();
                        $('.pro-box ul').append(html2);
                        PageIndex ++ ;
                        $('#moreload').remove();
                        _lock = false;
                    }else{
                        $('body').append('<div id="noneHave" style="width: 100%; margin-bottom: 80px; text-align: center; font-size: 1.3rem">已经到最底部</div>');
                        isNotHave =1;
                        /*$("#load_warp").remove( $.txtNullShow );*/
                        $.txtNullShow.hide();
                    }
                });

            },
            myproduct:function(){
                GLOBAL.base.ajax_json({
                    url:"http://shop.api.myqwe.com/api/ProductInShop/GetMyProductInShop?shopId="+shopId+"&Orderby="+OrderPriority+"&PageIndex="+PageIndex+"&PageSize=12"
                },function(data){
                    if( data !=null &&  data != "" && data != "undefined" && data.Data != null &&  data.Data != "" && data.Data != "undefined"){
                        var html2 =  template('alllist', data);
                        $('#noneHave').remove();
                        $('.pro-box ul').append(html2);
                        PageIndex ++ ;
                        $('#moreload').remove();
                        _lock = false;
                        
                    }else{
                        allNum = 0;
                        $('body').append('<div id="noneHave" style="width: 100%; margin-bottom: 80px; text-align: center; font-size: 1.3rem">已经到最底部</div>');
                        isNotHave =1;
                        /*$("#load_warp").remove( $.txtNullShow );*/
                        $.txtNullShow.hide();
                        $("#load_warp ul li:last").children("a").children(".gongneng").children(".blackxia").removeClass("blackxia");
                    }
                })
            },
            guanzhu:function(userId){
                GLOBAL.base.ajax_json({
                    url:"http://weixin.myqwe.com/api/user/IsSubscribe?userId=" + userId
                },function(data){
                    var status = data.Content;
                    if( status == 1){
                        $(".zhezhao").hide();
                        $(".bg-t").css("display","none");
                        $(".top-box").css("height","12rem");
                        $(".photo").css("top","0.8rem");
                        $(".t-name").css("top","0.8rem");
                        $(".xiaoxi").css("top","0.8rem");
                        $(".xiaoxi").css("display","block");
                    }else{
                        jz = 0;
                        var height = document.documentElement.clientHeight;
                        $("body").css({"height":parseInt(height),"overflow":"hidden"});
                        $(".zhezhao").show();
                        $(".bg-t").css("display","block");
                        $(".xiaoxi").css("display","none");
                        /*var jinzhi = 0;
                        document.addEventListener("touchmove",function(e){
                            if(jinzhi==0){
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        },false);*/
                    }
                });
            },
            car: function(userId){
                GLOBAL.base.ajax_json({
                    url:"http://shop.api.myqwe.com/api/ShoppingCart/GetProductByUserId?userId="+userId+"&keys="+QweKey+"&pageIndex=1&pageSize=10000"
                },function(data){
                    if(data !=null &&  data != "" && data != "undefined" && data.data != null &&  data.data != "" && data.data != "undefined"){
                        var len = data.data.length;
                        $('.car em').text(len);
                    }else{
                        $('.car em').text(0);
                    }
                });
            },
            goodsType:function(Id , ths){
                $('body').append('<img id="img_remove" style="position: fixed; left: 50%; top: 50%; width: 4rem; height: 4rem;" src="http://v5.myqwe.com/images/loading2.gif"> ');
                GLOBAL.base.ajax_json({
                   url:"http://shop.api.myqwe.com/api/shops/IsExistSaleProperty?productId="+Id
                },function(data){
                    $('#img_remove').remove();
                    if(data.Status == '200'){
                        //属性输出
                        main.type_shuchu(productId);
                    }else{
                        var price = ths.prev().find('b').text();
                        GLOBAL.base.insertIntoCar({
                            IsHasSalePropery : 0,
                            userId : userId,
                            shopId:shopId,
                            proPropertyValues : "",
                            proQuantity:1,
                            price:price,
                            productId:Id
                        });
                    }
                });
            },
            type_shuchu:function(productId){
                jz=0;
                var elnds = $('.colour').length;
                if(elnds>0){
                }else{
                    $.ajax({
                        url:"http://shop.api.myqwe.com/api/product/GetPropertiesByPId?productId="+productId,
                        type:"get",
                        success:function(data){
                            var len = data.Content.ProductProperties.length;
                            for(var i=0; i<len; i++){
                                var PropertyNames = data.Content.ProductProperties[i].PropertyNames;
                                var arr = new Array();
                                arr = data.Content.ProductProperties[i].PropertyValues.split(',');
                                Cycle_shu(arr,i);
                                PropertyGroup = data.Content.PropertyGroup;
                            }
                        }
                    });
                }
                function Cycle_shu(arr ,index){
                    var len = arr.length;
                    var html;
                    if(index ==0){
                        html='<div class="colour" id="size">';
                        for(var i=0; i<len; i++){
                            html = html + '<div>'+arr[i]+'</div>';
                        }
                    }else if(index ===1){
                        html='<div class="colour" id="color">';
                        for(var i=0; i<len; i++){
                            html = html + '<div>'+arr[i]+'</div>';
                        }
                    }
                    $('.popup_con .number').before(html);
                }
                $(".screen").fadeIn(800);
                $(".popup").slideDown();
                main.Determine(productId);
                main.car_numModify();
                main.changeCar();
                //关闭
                $(".close_black").click(function(){
                    main.carClose();
                });
            },
            carClose:function(){
                jz = 1;
                $('body').css('overflow','auto');
                $('body').css('height','auto');
                $(".popup").slideUp();
                $(".screen").fadeOut(800);
            },
            //点击确定加入购物车
            Determine:function(productId){
                $('.btn_gou').click(function(){
                    var size_ = $('#size .color_cur').text();
                    var color_ = $('#color .color_cur').text();
                    var sizeLen=$('#size div').length;
                    var colorLen=$('#color div').length;
                    if (sizeLen>0){
                        if($("#size div").hasClass("color_cur")){
                            
                        }else{
                            GLOBAL.base.mMsg("请选择商品属性");
                            return;
                        }
                    };
                    if (colorLen>0) {
                        if($("#color div").hasClass("color_cur")){
                            
                        }else{
                            GLOBAL.base.mMsg("请选择商品属性");
                            return;
                        }
                        
                    };
                    if(sizeLen>0 && colorLen>0){
                        if($("#size div").hasClass("color_cur") && $("#color div").hasClass("color_cur")){

                        }else{
                            GLOBAL.base.mMsg("请选择商品属性");
                            return;
                        }
                    }
                    if($.trim(size_) && $.trim(color_)){
                        var price = parseFloat($('#price b').text());
                        proPropertyValues = $('#color .color_cur').text() + ","+$('#size .color_cur').text();
                        var proQuantity = $('.number_change p').text();
                        GLOBAL.base.insertIntoCar({
                            IsHasSalePropery : 0,
                            userId : userId,
                            shopId:shopId,
                            proPropertyValues : proPropertyValues,
                            proQuantity:proQuantity,
                            price:price,
                            productId:productId
                        });
                        main.carClose();
                    }else{
                        GLOBAL.base.mMsg('请选择商品属性',1);
                    }
                });
            },
            inserIntoCar:function(data,proQuantity){
                GLOBAL.base.ajax_json({
                    url:"http://shop.api.myqwe.com/api/ShoppingCart/InsertProductToCart",
                    data:data
                },function(data){
                    if(data.Status == '200'){
                        layer.open({
                            content: '成功加入购物车',
                            style: 'background-color:#fff; color:#333;',
                            time: 1
                        });
                        var car_num = parseInt($('.car em').text()) + parseInt(proQuantity);
                        $('.car em').text(car_num);
                        main.carClose();
                    }
                });
            },
            //购物车数量增加或者减少
            car_numModify: function(){
                //数量加1
                $(".number_add").click(function(){
                    var number= parseInt($(this).next().text());
                    number++;
                    $(this).siblings("p").text(number);
                });
                //数量减1
                $(".number_cut").click(function(){
                    var number=$(this).siblings("p").text();
                    number--;
                    if(number>0){
                        $(this).siblings("p").text(number);
                    }
                });
            },
            //选择购物车属性
            changeCar:function(){
                $(".popup_con").on('click',' #color div',function(){
                    var class_ = $(this).attr('class');
                    if(class_ == 'none'){
                        mMsg('该商品属性库存为0，请选择其他属性');
                    }else if(class_ == 'color_cur') {
                        $(this).removeClass('color_cur');
                        $('.nature').text("");
                        $('#size div').removeClass('none');
                    }else{
                        change_shuxing({color:$(this).text()}, $(this));
                    }
                });

                $('.popup_con').on('click','#size div',function(){
                    var class_ = $(this).attr('class');
                    if(class_ == 'none'){
                        mMsg('该商品属性库存为0，请选择其他属性');
                    }else if(class_ == 'color_cur'){
                        $(this).removeClass('color_cur');
                        $('#color div').removeClass('none');
                        $('.size').text("");
                    }else{
                        change_shuxing({size:$(this).text()} , $(this));
                    }
                });
                function change_shuxing(opts , ths){
                    var def ={
                        color : "",
                        size:""
                    };
                    var setting = $.extend(def ,opts);
                    var len = PropertyGroup.length;
                    var arr = new Array();
                    if(setting.color !=""){
                        var active_size = $('#size .color_cur').text();
                        //$('#size div').addClass('none');
                        var size_len = $('#size div').length;
                        for(var i=0;i<len;i++){
                            arr = PropertyGroup[i].GroupValues.split(',');
                            if(arr[0] == setting.color){
                                if($.trim(active_size) && arr[1] == active_size){
                                    $('#price b').text(PropertyGroup[i].SalePrice);
                                }
                                var size = arr[1];
                                for(var j =0; j<size_len; j++){
                                    var txt = $('#size div').eq(j).text();
                                    if(size == txt){
                                        $('#size div').eq(j).removeClass('none');
                                    }
                                }
                            }
                        }
                        ths.addClass("color_cur").siblings().removeClass("color_cur");
                        var property=ths.html();
                        $('.nature').text(property);
                        $('#color').val(property);
                    }else if(setting.size !=""){
                        var active_color = $('#color .color_cur').text();
                       // $('#color div').addClass('none');
                        var size_len = $('#color div').length;
                        for(var i=0;i<len;i++){
                            arr = PropertyGroup[i].GroupValues.split(',');
                            if(arr[1] == setting.size){
                                var color = arr[0];
                                if($.trim(active_color) && arr[0] == active_color){
                                    $('#price b').text(PropertyGroup[i].SalePrice);
                                }
                                for(var j =0; j<size_len; j++){
                                    var txt = $('#color div').eq(j).text();
                                    if(color == txt){
                                        $('#color div').eq(j).removeClass('none');
                                    }
                                }
                            }
                        }
                        ths.addClass("color_cur").siblings().removeClass("color_cur");
                        var property=ths.html();
                        $('.purchase .size').text(property);
                        $('#color').val(property);
                    }
                }
            },
           
            moreLoadAction_custom:function(url,callback){
                $(window).off("scroll.more").on("scroll.more", function(){
                  /*  if ((($(window).scrollTop() + $(window).height()) ) >= $(document).height() - 360 && _lock == false){*/
                    if (($(window).scrollTop() > 400) && _lock == false){
                        _lock = true;
                        //alert($(window).scrollTop());
                        if(!$.txtNullShow){
                            $.txtNullShow = $('<div id="moreload" style="width: 100%;text-align: center;"><em style="background: url(http://v5.myqwe.com/images/loading2.gif) no-repeat; height: 32px; line-height: 32px; font-size: 1.4rem; display: inline-block; padding-left: 40px;">加载更多中...</em></div>');
                            $("#load_warp").append( $.txtNullShow );
                        }
                        $.txtNullShow.show();
                        $("#noneHave").html("");

                        setTimeout(function(){
                            if(allNum == 1){
                                main.myproduct();
                            }else{
                                main.ajax_second();
                            }
                        }, 500);
                    }
                });

            },
            zhiding:function(curr,proid,IsOneKey,toTop){
                $.ajax({
                    type: 'post',
                    url:"http://shop.api.myqwe.com/api/Product/SetProductToTop?shopId="+ shopId +"&productId=" + proid +"&IsOneKey="+IsOneKey+"&toTop="+toTop,
                    async: false,
                    dataType: 'json',
                    success:function(data){
                        if(IsOneKey == 1 && toTop == 1){
                            var newli = curr.parents("li").clone();
                            curr.parents("ul").prepend(newli);
                            curr.parents("li").remove();
                            $("#load_warp ul li").eq(1).children("a").children(".gongneng").children(".redshang").addClass("redshang");
                        }else if(IsOneKey == 0 && toTop == 1){
                            var prevli = curr.parents("li").prev();
                            prevli.before(curr.parents("li"));
                            $("#load_warp ul li").eq(1).children("a").children(".gongneng").children(".redshang").addClass("redshang");
                        }else if(IsOneKey == 0 && toTop == 0){
                            var nextli = curr.parents("li").next();
                            nextli.after(curr.parents("li"));
                        }
                    }
                });
            },
            //保存推荐人ID
            revoedId:function(){
                var CUID = $.cookie('CUID');
                if(CUID !=null && CUID !="" && CUID !='undefined'){
                    return;
                }else{
                    $.cookie("CUID",userId,{ expires:365 ,path:"/"});
                }
            },
            /*getShopId:function(){
                userId = $.cookie("userId");
                if(!userId&&shopId){
                    window.location.href='jumpPage.html?url='+window.location.href;
                }
                GLOBAL.base.ajax_json({
                    url:"http://shop.api.myqwe.com/api/shops/GetShopIdByUId?userid="+userId
                },function(data){
                    if(data.Status == 200){
                        var meShopId = data.Content;
                        var shopId = GLOBAL.base.getUrlParam('shopId');
                        if(meShopId!=shopId){
                            isShow=1;
                            
                        }else{
                            isShow=2;
                        }
                    }
                });

            },*/

        };

        function event(){
            GLOBAL.base.cookieInsertIntoCar();
            GLOBAL.base.network();
            var opts = GLOBAL.base.getshopIdOrUserId();
            userId = opts.userId;
            shopId = opts.shopId;
            Keyword = GLOBAL.base.getUrlParam('Keyword');
            if(Keyword !=null && Keyword !='undefined' && Keyword !=""){
                Keyword = Keyword;
                $('.search input').val(Keyword);
            }else{
                Keyword = 'all';
            }
            if($.trim(shopId)){
                /*main.getShopId();*/
                main.ajax_json(shopId);
            }else if($.trim(userId)){
                main.userIdFormShopId(userId);
            }else{
                main.ajax_second();
            }
            if($.trim(userId) !="" && userId !=null && userId !='undefined'){
                main.guanzhu(userId);
            }
            QweKey = $.cookie('qweKey');
            main.car(userId);
            main.moreLoadAction_custom();
            main.revoedId();

            $('.search input').click(function(){
                hide =1;
                nav_wrap();
            });

           $('body').click(function(){
               if(hide ==0){
                   $('.search_result').hide();
               }else{
                   $('.search_result').show();
                   hide =0;
               }
           });

            $('.search-box').on('click','.classify li',function(){
                Keyword = $(this).text();
                $(".search input").val(Keyword);
                window.location.href = "searchkeyword.html?shopId="+shopId+"&Keyword=" + Keyword ;
            });

            $('.search span').click(function(){
                Keyword =  $('.search input').val();
                window.location.href = "searchkeyword.html?shopId="+shopId+"&Keyword=" + Keyword ;
            });

            $('.search-box .all').click(function(){
                window.location.href="http://v5.myqwe.com/QW5.0/yunku/yunku-classify.html?isindex=1&shopId="+shopId;
            });

            //点击加入购物车
            $('.pro-box').on('click','.bugCar',function(){
                productId = $(this).parents('li').attr('data-id');
                proPropertyIds = $(this).parents('li').attr('propropertyids');
                var Ids =  $(this).parents('li').attr('propertyids');
                gou_img = $(this).parents('li').find('.img-box img').attr('src');
                $('.correlation_images img').attr('src',gou_img);
                money =  $(this).parents('li').find('.price b').text();
                $('#price b').text(money);
               main.goodsType(productId , $(this)); 
                return false;
            });

            $('#load_warp').on('click','li .img-box',function(){
                var id=  $(this).parents("li").attr('data-id');
                window.location.href = "http://v5.myqwe.com/details.html?p="+id +"&shopId="+shopId;
                
                var tempShopId = (shopId =='' || shopId==undefined || shopId==null) ?　0 : shopId;
                $.ajax({
                    type: 'post',
                    url: "http://shop.api.myqwe.com/api/Product/UpdateHits?shopId="+tempShopId+"&productId=" + id ,
                    async: false,
                    dataType: 'json',
                    success:function(data){
                        
                    }
                });
            });

            $('.list li').click(function(){
                $('.list li').removeClass('cur');
                $(this).addClass('cur');
                OrderPriority = $(this).attr('OrderPriority');
                PageIndex = 1 ;
                $('.pro-box ul').html("");
                $("#noneHave").html("");
                main.ajax_json(shopId);

            });
            /*下架商品*/
            $("#load_warp").on('click',".xiabtn",function(){
                var curr = $(this);
                var proid = curr.parents("li").attr("data-id");
                var productIds = [] ;
                $.ajax({
                    type: 'post',
                    url:"http://shop.api.myqwe.com/api/Product/UnShelfProduct?shopId="+ shopId +"&productIds=" + proid ,
                    async: false,
                    dataType: 'json',
                    success:function(data){
                        curr.parents("li").addClass('none');

                        /*下架切换文字*/
                        /*var spanTxt = $('<span style="text-align:center; width:90%; background:#aaa; color:#fff; margin:0.2rem auto; padding:0.2rem 0;">已下架</span>');
                        curr.parent("gongneng").addClass('none');
                        curr.parent().html(spanTxt);*/
                    }
                });
            });

            /*置顶*/
            $("#load_warp").on('click',".shangbtn",function(){
                var curr = $(this),
                    proid = curr.parents("li").attr("data-id"),
                    IsOneKey = 1 ,
                    toTop = 1 ;
                main.zhiding(curr,proid,IsOneKey,toTop);
            });
            /*上移*/
            $("#load_warp").on('click',".redshang",function(){
                var curr = $(this),
                    proid = curr.parents("li").attr("data-id"),
                    IsOneKey = 0 ,
                    toTop = 1 ;
                main.zhiding(curr,proid,IsOneKey,toTop);
            });
            /*下移*/
            $("#load_warp").on('click',".blackxia",function(){
                var curr = $(this),
                    proid = curr.parents("li").attr("data-id"),
                    IsOneKey = 0 ,
                    toTop = 0 ;
                main.zhiding(curr,proid,IsOneKey,toTop);
            });
        }
        function nav_wrap(){
            var $html = $('.search_result').html();
            $('.search_result').show();
            if($.trim($html) ==""){
                $('.search_result').append('<div class="seek"><div>热</div></div><div class="classify"><ul><li>连衣裙</li> <li>裤子</li><li>鞋子</li><li>风衣</li><li>T恤</li><li>羽绒服</li><li>衬衫</li><li>靴子</li><li>外套</li><li>包袋</li><li>手机包</li><li>保暖裤</li><li>夹克</li><li>棉衣</li><li>休闲裤</li></ul></div>');
            }
        }


        return{
            init:function(){
                event();
            }
        }
    }();

    indexPg.ready = function(){
        indexPg.sign.init();
        document.addEventListener("touchmove",function(e){
            if(jz==0){
                e.preventDefault();
                e.stopPropagation();
            }
        },false);
    }();

    $(".xiaoxi").click(function(){
        window.location.href = "http://v5.myqwe.com/QW5.0/Message/MessageCenter.html";
    });
    $(".stay").click(function(){
        $(".zhezhao").css("display","none");
        jz = 1;
    });
    $(".go").click(function(){
        window.location.href = "http://mp.weixin.qq.com/s?__biz=MzI1MzAyNDAwMw==&mid=218625136&idx=1&sn=40d925a1b9e64d1aaff246b6bed23fd9#rd";
    });
    $(".bg-t").click(function(){
        window.location.href = "http://mp.weixin.qq.com/s?__biz=MzI1MzAyNDAwMw==&mid=218625136&idx=1&sn=40d925a1b9e64d1aaff246b6bed23fd9#rd";
    });
    

})();