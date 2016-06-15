var MMC = MMC || {};

var GLOBAL = MMC.GLOBAL = {};
//倒计时对象
var countdownTimeID;

(function () {
    //全局变量
    GLOBAL.var = {
        //延迟对象
        delayEventLock: {}
    };

    //全局工具
    GLOBAL.Utils = {
        /**
         * 图片延时加载
         * @param cls 图片的className， 默认为J-lazy
         * @param attr 存储图片真实地址的属性, 默认为data-original
         * return 无
         */
        lazyLoad: function (cls, attr) {
            var cls = (typeof cls) == 'undefined' ? 'J-lazy' : cls;
            var attr = (typeof attr) == "undefined" ? 'data-original' : attr;
            var imgs = $('img.' + cls);
            imgs.each(function () {
                var none = 0;
                $(this).parents().each(function () {
                    if ($(this).css('display') == 'none') {
                        none = 1;
                        return false;
                    }
                });

                if (none == 1) return;
                var fold = $(window).height() + $(window).scrollTop();
                if (fold >= $(this).offset().top - 200) {
                    var src = $(this).attr(attr);
                    $(this).removeAttr(attr).removeClass(cls).attr('src', src);
                }
            });
        },
        /**
         * rem自适应，页面按照比例缩放
         */
        changeRem: function () {
            var $html = $('html');

            init();

            $(window).off('resize.changeRem').on('resize.changeRem', function () {
                init()
            });

            function init() {
                if ($(window).width() >= 640) {
                    main(20);
                } else {
                    var size = $(window).width() * 20 / 640;
                    main(size);
                }
            }

            function main(s) {
                $html.css('font-size', s);
                $html.attr("data-rem", 1);
                if ($html.attr("data-rem") == 1) {
                    $(".J-body").show()
                }
            }
        }
    };

    //底层处理方法
    GLOBAL.base = {
        /**
         * 事件延迟
         * 防止连续的事件被触发，例如键盘事件
         * @param id 事件命名空间
         * @param fn 执行的函数
         * @param wait 延迟触发的时间
         * return 无
         */
        delayEvent: function (id, fn, wait) {
            if (GLOBAL.var.delayEventLock[id]) {
                window.clearTimeout(GLOBAL.var.delayEventLock[id]);
                delete GLOBAL.var.delayEventLock[id];
            }

            return GLOBAL.var.delayEventLock[id] = window.setTimeout(function () {
                fn();
                delete GLOBAL.var.delayEventLock[id];
            }, wait);
        },
        Msg: function (txt, time, style) {
            layer.open({
                content: txt,
                style: style,
                time: time
            });
        },
        /**
         * tip提示窗，基于layer
         * @param txt 提示的内容文本,
         * @param time 显示的时间，为0则提示窗不消失,
         * return 无
         */
        mMsg: function (txt, time, callback) {
            var t = time || 2;
            if (time == 0) {
                layer.open({
                    content: txt,
                    shadeClose: false,
                    time: 0,
                    style: "text-align: center; background:#333;color: #fff;",
                    shade: false
                });
            } else {
                layer.open({
                    style: "text-align: center; background:#333;color: #fff;",
                    content: txt,
                    shadeClose: false,
                    time: t,
                    shade: false,
                    end: callback && callback()
                });
            }
        },
        /**
         * 搜索列表
         */
        search_fn: function (opts, obj, callback) {
            var def = {
                IP: "",
                center: "1",
                PageIndex: "1",
                PageSize: "10"
            };
            var setting = $.extend(def, opts);
            var PageIndex = setting.PageIndex;
            $.ajax({
                type: 'get',
                url: "http://" + setting.IP + setting.center + setting.PageIndex + "&PageSize=" + setting.PageSize,
                async: false,
                data: "",
                dataType: 'json',
                success: function (data) {
                    callback && callback(data);
                    GLOBAL.base.dateOut(data, obj);
                    PageIndex++;
                },
                error: function (data) {
                }
            });
        },
        /*
         * 数据循环
         * */
        dateOut: function (data, obj) {
            var $html = "";
            if (data != null && data != "" && data != "undefined" && data.Data != null && data.Data != "" && data.Data != "undefined") {
                $html = template('loadlist', data);
                obj.append($html).fadeIn();
            } else {
                $html = '<div style="width: 100%; text-align: center; padding-bottom: 30px;"><p>已没有更多数据</p></div>';
                obj.append($html);

            }
        },
        /*
         * 加载到底部  触发方法
         *  方法已有循环输出的数据的 search_fn
         * */
        moreLoadAction: function (obj) {
            var _lock = false;
            var moreLoadPage = 2;
            $(window).off("scroll.more").on("scroll.more", function () {
                if ((($(window).scrollTop() + $(window).height()) ) >= $(document).height() - 80 && _lock == false) {
                    _lock = true;
                    if (!$.txtNullShow) {
                        $.txtNullShow = $('<div id="moreload" style="width: 100%;text-align: center;"><em style="background: url(http://v5.myqwe.com/images/loading2.gif) no-repeat; height: 32px; line-height: 32px; display: inline-block; padding-left: 40px;">载入中...</em></div>');
                        $("#load_warp").append($.txtNullShow);
                    }
                    $.txtNullShow.show();
                    setTimeout(function () {
                        $("#moreload").remove();
                        GLOBAL.base.search_fn(obj);
                    }, 500);
                }
            });
        },
        /*
         * 加载到底部后输出
         * callback 可做方法传入
         * */
        moreLoadAction_custom: function (url, callback) {
            var _lock = false;
            var PageIndex = 2;
            $(window).off("scroll.more").on("scroll.more", function () {
                if ((($(window).scrollTop() + $(window).height()) ) >= $(document).height() - 80 && _lock == false) {
                    _lock = true;

                    if (!$.txtNullShow) {
                        $.txtNullShow = $('<div id="moreload" style="width: 100%;text-align: center;"><em style="background: url(http://v5.myqwe.com/images/loading2.gif) no-repeat; height: 32px; line-height: 32px; font-size: 1.4rem; display: inline-block; padding-left: 40px;">加载更多中...</em></div>');
                        $("#load_warp").append($.txtNullShow);
                    }
                    $.txtNullShow.show();

                    setTimeout(function () {
                        GLOBAL.base.ajax_json({
                            "url": url,
                            type: "get",
                            data: {PageIndex: PageIndex}
                        }, function (data) {
                            if (data) {
                                $("#load_warp").show();
                                $('#moreload').remove();
                                if (data != null && data != "" && data != "undefined" && data.Data != null && data.Data != "" && data.Data != "undefined") {
                                    var html = template('alllist', data);
                                    $('.pro-box ul').append(html);
                                    _lock = false;
                                    callback && callback();
                                    PageIndex++;
                                } else {

                                }
                            }
                        });
                    }, 500);
                }
            });

        },
        /*
         * 倒计时方法（00天00时00分00秒）
         * @callback 作为当倒计时为0时触发的方法
         * CountdownTime({},function(){}).start(1000);触发开始
         * CountdownTime().stop(1000);停止倒计时
         * */
        CountdownTime: function (opts, callback) {
            var def = {
                dayID: "#dayID",
                hourId: "#hourId",
                minuteId: "#minuteId",
                secondId: "#secondId"
            };
            var setting = $.extend(def, opts);
            return {
                start: start,
                stop: stop
            };
            //倒计时开始
            function start(num) {
                var intDiff = parseInt(num);
                countdownTimeID = setInterval(function () {
                    var day = 0,
                        hour = 0,
                        minute = 0,
                        second = 0;
                    if (intDiff > 0) {
                        day = Math.floor(intDiff / (60 * 60 * 24));
                        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                        if (second == 0) {
                            second = 60;
                        }
                    } else if (intDiff == 00) {
                        intDiff = parseInt(num);
                        callback && callback();
                        return
                    }
                    if (minute <= 9) minute = '0' + minute;
                    if (second <= 9) second = '0' + second;
                    $(def.dayID).html(+day);
                    $(def.hourId).html(+hour);
                    $(def.minuteId).html(+minute);
                    $(def.secondId).html(+second);
                    intDiff--;
                }, 1000);
            }

            //倒计时结束
            function stop() {
                clearInterval(countdownTimeID);
            }
        },
        /*
         * 倒计时(几秒形式)
         * @time   倒计时几秒
         * @callback  当倒计时没到0时事件
         * @zeroCallback  当倒计到0时事件
         * */
        CountdownTime_second: function (time, callback, zeroCallback) {
            countdownTimeID = setInterval(function () {
                var time_num = parseInt(time);
                if (time_num > 0) {
                    callback && callback();
                    time--;
                } else if (time_num == 0) {
                    clearInterval(countdownTimeID);
                    zeroCallback && zeroCallback();
                    return;
                }
            }, 1000);
        },
        /*
         * Ajax加载json
         * */
        ajax_json: function (opts, callback, errorback) {
            var def = {
                type: "get",
                url: "",
                async: "false",
                data: "",
                dataType: "json"
            };
            var setting = $.extend(def, opts);
            $.ajax({
                type: setting.type,
                url: setting.url,
                async: def.async,
                data: def.data,
                dataType: def.dataType,
                success: function (data) {
                    callback && callback(data);
                },
                error: function (data) {
                    errorback && errorback();
                }
            });
        },
        /*
         * 解析url参数的方法
         * @name 参数的名字
         * */
        getUrlParam: function (key, url) {//获取url的键值对
            if (!key) return;
            var link = url || decodeURI(window.location.href);
            var index = link.indexOf('?');
            if (index < 0) return;
            var suffix = link.substr(index + 1);
            var keyValue = suffix.split('&');
            for (var i = 0; i < keyValue.length; i++) {
                var content = keyValue[i];
                if (content) {
                    var contentShare = content.split('=');
                    if (contentShare[0].replace(/(^\s+)|(\s+$)/g, "") == key) return contentShare[1];
                }
            }
            return '';
        },
        /*
         * 判断是不是微信登录(原理是判断是不是微信内核的浏览器浏览，如果是则返回 true  不是就返回false)
         * */
        isWeiXin: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        login: function () {
            //var typeData = {"type": "", userId: "", "qweKey": ""};
            if (GLOBAL.base.isWeiXin()) {
                if ($.cookie('userId')) {
                    return false;
                } else {
                    $.ajax({
                        url: "http://weixin.myqwe.com/api/user/GetUserAuthorize?url=" + window.location.href,
                        type: "get",
                        dataType: "json",
                        success: function (data) {
                            $.cookie("userId", data.UserId, {expires: 1, path: "/"});
                            $.cookie("userName", data.RealName, {expires: 1, path: "/"});
                            $.cookie("qweKey", data.qweKey, {expires: 1, path: "/"});
                            $.cookie("userLogo", data.userLogo, {expires: 1, path: "/"});
                            var userId = $.cookie('userId');
                            GLOBAL.base.cookieInsertIntoCar(userId);
                        }
                    });
                }


            } else {
                //alert(2);
                //window.location.href="";
                //return typeData;
            }
        },
        //地理位置获取
        currentPosition: function (callback) {
            var location = {"lat": "", "lng": "", "result": ""};
            if (window.navigator.geolocation) {
                var options = {
                    enableHighAccuracy: true
                };
                window.navigator.geolocation.getCurrentPosition(function (position) {
                    //alert(position.coords.latitude+","+position.coords.longitude);
                    location.lat = position.coords.latitude;
                    location.lng = position.coords.longitude;
                    location.result = GLOBAL.base.showCityInfo(position.coords.latitude, position.coords.longitude, callback);
                    return location;
                }, function (options) {
                    GLOBAL.base.mMsg("定位失败", 1);
                }, options);
            } else {
                GLOBAL.base.mMsg("浏览器不支持html5来获取地理位置信息", 1);
            }
        },
        //获取用户所在城市信息
        showCityInfo: function (lat, lng, callback) {
            var lnglatXY = new AMap.LngLat(lng, lat);//需转为地址描述的坐标
            //加载地理编码插件
            var geocoder;
            var results;
            AMap.service(["AMap.Geocoder"], function () {
                geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });
                //逆地理编码
                geocoder.getAddress(lnglatXY, function (status, result) {
                    //取回逆地理编码结果
                    if (status === 'complete' && result.info === 'OK') {
                        //alert(result.regeocode.formattedAddress);
                        var vals = result.regeocode.addressComponent.street + "" + result.regeocode.addressComponent.township + "" + result.regeocode.addressComponent.streetNumber;
                        $('#address_detail').val(vals);
                        callback && callback(result, lat, lng);
                    } else {
                        return "当前定位不到";
                    }
                    return results;
                });
            });
        },
        //页面中判断该怎么传userId或者是shopId
        getshopIdOrUserId: function () {
            var opts = {"userId": "", "shopId": ""};
            var shopId = GLOBAL.base.getUrlParam('shopId');
            var test_userId = $.cookie("userId");
            if (shopId != "" && shopId != null && shopId != "undefined") {
                opts.shopId = shopId;
            }
            if (test_userId != "" && test_userId != null && test_userId != "undefined") {
                opts.userId = test_userId;
            }
            return opts;
        },
        /*
         * 分享到朋友圈，分享到QQ好友，分享到QQ空间，分享到微博
         * @opts {
         *       title: 分享标题
         *       desc：分享描述
         *       link：分享链接
         *       imgUrl：分享图标
         *       type：/ 分享类型,music、video或link，不填默认为link
         *       dataUrl：/ 分享类型,music、video或link，不填默认为link
         * }
         * @successB 分享成功执行的方法
         * @cancelB 分享失败执行的方法
         * */
        shareFriendRale: function (opts, successB, cancelB) {
            var arr = window.location.href.split('&');
            var def = {
                title: "",
                desc: "",
                link: "",
                imgUrl: "",
                type: "",
                dataUrl: "",
                types: ""
            };
            var setting = $.extend(def, opts);
            if (setting.types == 1) {
                if (arr.length > 1) {
                    window.location.href = arr[0];
                }
            }
            $.getJSON("http://play.api.myqwe.com/wechat/config?url=" + window.location.href, function (jsobj) {
                if (jsobj != null) {
                    wx.config({
                        debug: false,
                        appId: jsobj.appId,
                        timestamp: jsobj.timestamp,
                        nonceStr: jsobj.nonceStr,
                        signature: jsobj.signature,
                        jsApiList: [
                            'onMenuShareAppMessage',
                            'onMenuShareTimeline',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone'
                        ]
                    });
                }
            });
            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                    ]
                });

                //分享朋友圈
                wx.onMenuShareTimeline({
                    title: setting.title,
                    desc: setting.desc,
                    link: setting.link,
                    imgUrl: setting.imgUrl,
                    trigger: function (res) {
                    },
                    success: function (res) {
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: setting.title,
                    desc: setting.desc,
                    link: setting.link,
                    imgUrl: setting.imgUrl,
                    trigger: function (res) {
                    },
                    success: function (res) {
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });

                //分享到QQ
                wx.onMenuShareQQ({
                    title: setting.title, // 分享标题
                    desc: setting.desc, // 分享描述
                    link: setting.link, // 分享链接
                    imgUrl: setting.imgUrl, // 分享图标
                    trigger: function (res) {
                    },
                    success: function (res) {
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });

                //分享到微博
                wx.onMenuShareWeibo({
                    title: setting.title,
                    desc: setting.desc,
                    link: setting.link,
                    imgUrl: setting.imgUrl,
                    trigger: function (res) {
                    },
                    success: function (res) {
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });

                //分享到QQ空间
                wx.onMenuShareQZone({
                    title: setting.title,
                    desc: setting.desc,
                    link: setting.link,
                    imgUrl: setting.imgUrl,
                    trigger: function (res) {
                    },
                    success: function (res) {
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });

            });
            wx.error(function (res) {
                //alert('wx.error: '+JSON.stringify(res));
            });
        },
        /*
         * 判断网络是什么
         * */
        network: function () {
            var networkType;
            $.getJSON("http://play.api.myqwe.com/wechat/config?url=" + window.location.href, function (jsobj) {
                if (jsobj != null) {
                    wx.config({
                        debug: false,
                        appId: jsobj.appId,
                        timestamp: jsobj.timestamp,
                        nonceStr: jsobj.nonceStr,
                        signature: jsobj.signature,
                        jsApiList: [
                            'getNetworkType'
                        ]
                    });
                }
            });
            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: [
                        'getNetworkType'
                    ]
                });
                wx.getNetworkType({
                    success: function (res) {
                        networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                        if (networkType != 'wifi') {
                            layer.open({
                                content: '您当前的网络是' + networkType + "您确定要继续浏览页面吗？",
                                btn: ['继续浏览', '关闭页面'],
                                shadeClose: false,
                                yes: function () {
                                    layer.closeAll();
                                }, no: function () {
                                    wx.closeWindow();
                                }
                            });
                        }
                    }
                });

            });
            wx.error(function (res) {
                alert('wx.error: ' + JSON.stringify(res));
            });
        },
        /**
         *商品加入购物车
         *@opts{
         *      userId: 用户ID,
         *      shopId:商品Id,
         *      proPropertyValues:商品属性集合,
         *      proQuantity:购买数量,
         *      price:商品价格，
         *      productId:商品价格
         * }
         */
        insertIntoCar: function (opts) {
            var def = {
                IsHasSalePropery: 0,
                userId: "",
                shopId: "",
                proPropertyValues: "",
                proQuantity: "",
                price: "",
                productId: ""
            };
            var setting = $.extend(def, opts);
            //已经登录
            if ($.trim(setting.userId)) {
                insert();
            } else {
                cookieCar();
            }

            function insert() {
                var isAdd = true;
                //检查是否已经加入过购物车
                GLOBAL.base.ajax_json({
                    url: "http://shop.api.myqwe.com/api/ShoppingCart/GetProductByUserId?userId=" + $.cookie("userId") + "&keys=" + $.cookie("qweKey") + "&pageIndex=1&pageSize=10000000",
                    async: false,
                }, function (data) {

                    if (data != null && data != "" && data != "undefined" && data.data != null && data.data != "" && data.data != "undefined") {
                        var dataV = data.data;
                        var len = dataV.length;
                        for (var i = 0; i < len; i++) {
                            if (dataV[i].ProductId == setting.productId && dataV[i].ProPropertyValues == setting.proPropertyValues) {
                                isAdd = false;
                            }
                        }
                    }
                });
                if (!isAdd) {
                    GLOBAL.base.mMsg("该产品已经加入过购物车了~~");
                    return;
                }
                GLOBAL.base.ajax_json({
                    url: decodeURI("http://shop.api.myqwe.com/api/ShoppingCart/InsertProductToCart"),
                    data: {
                        productId: setting.productId,
                        userId: setting.userId,
                        proPropertyValues: setting.proPropertyValues,
                        proQuantity: setting.proQuantity,
                        shopId: setting.shopId,
                        price: setting.price
                    }
                }, function (data) {
                    if (data.Status == '200') {
                        GLOBAL.base.mMsg('加入购物车成功');
                        var car = parseInt($('.car em').text());
                        $('.car em').text(car + 1);
                    } else {
                        GLOBAL.base.mMsg('加入购物车失败');
                    }
                }, function () {
                    alert("http://shop.api.myqwe.com/api/ShoppingCart/InsertProductToCart?productId=" + setting.productId + "&userId=" + setting.userId + "&" +
                        "proPropertyValues=" + setting.proPropertyValues + "&proQuantity=" + setting.proQuantity + "&shopId=" + setting.shopId + "&price=" + setting.price
                    );
                    GLOBAL.base.mMsg('系统异常，加入购物车失败');
                });
            }

            function cookieCar() {
                var carNum = new Array();
                var carcookie = $.cookie("carNum");

                if ($.trim(carcookie)) {
                    var isAdd = true;
                    carNum = JSON.parse(carcookie);
                    var len = carNum.length;
                    for (var i = 0; i < len; i++) {
                        if (carNum[i].productId == setting.productId && carNum[i].proPropertyValues == setting.proPropertyValues) isAdd = false;
                    }
                    if (!isAdd) {
                        GLOBAL.base.mMsg("该产品已经加入过购物车了~~");
                        return;
                    }
                    carNum.push({
                        productId: setting.productId,
                        userId: setting.userId,
                        proPropertyValues: setting.proPropertyValues,
                        proQuantity: setting.proQuantity,
                        shopId: setting.shopId,
                        price: setting.price
                    });
                } else {
                    carNum.push({
                        productId: setting.productId,
                        userId: setting.userId,
                        proPropertyValues: setting.proPropertyValues,
                        proQuantity: setting.proQuantity,
                        shopId: setting.shopId,
                        price: setting.price
                    });
                }
                $.cookie("carNum", JSON.stringify(carNum), {expires: 1, path: "/"});
                var car = parseInt($('.car em').text());
                $('.car em').text(car + 1);
                GLOBAL.base.mMsg('添加购物车成功', 1)
            }
        },
        //登录后cookie拿数据添加到数据库
        cookieInsertIntoCar: function (userId) {
            var carNum = new Array();
            var carcookie = $.cookie("carNum");
            if ($.trim(carcookie)) {
                carNum = JSON.parse(carcookie);
                var len = carNum.length;
                for (var i = 0; i < len; i++) {
                    var shopId = carNum[i].shopId;
                    var userIds = carNum[i].userId;
                    //添加的购物车没有shopId
                    if (shopId == "" && shopId == null && shopId == "undefined") {
                        shopId = getShopId(userId);
                        carNum[i].shopId = shopId;
                    }
                    //添加的购物车没有userId
                    if (userIds == "" && userIds == null && userIds == "undefined") {
                        carNum[i].userId = userId;
                    }
                    loginInser(carNum[i]);
                }
                $.cookie("carNum", "", {expires: 1, path: "/"});
            }


            function getShopId(userId) {
                var shopId;
                GLOBAL.base.ajax_json({
                    url: "http://shop.api.myqwe.com/api/shops/GetShopIdByUId?userid=" + userId
                }, function (data) {
                    if (data.Status == '200') {
                        shopId = data.Content;
                    }
                });
                return shopId;
            }

            function loginInser(datas) {
                GLOBAL.base.ajax_json({
                    url: decodeURI("http://shop.api.myqwe.com/api/ShoppingCart/InsertProductToCart"),
                    data: datas
                }, function (data) {
                })
            }
        },
        //判断是否存在shopId，若不存在判断有没有登录，没登录，判断是不是微信系统的浏览器，如果是系统的浏览器，自动帮登录，登录后跳转到分享的当前页面
        shopIdLoinWin: function (opts) {
            var def = {
                shopId: "",
                returnURL: "",
                pid: ""
            };
            var setting = $.extend(def, opts);
            if (!$.trim(setting.shopId)) { //shopId不存在
                var userIds = $.cookie("userId");
                if (!$.trim(userIds)) { //没有登录
                    if (GLOBAL.base.isWeiXin()) { //微信系统浏览器
                        GLOBAL.base.ajax_json({
                            url: "http://weixin.myqwe.com/api/User/GetAuthorizeCode?url=" + setting.returnURL,
                            type: "get"
                        }, function (data) {
                            $.cookie("userId", data.UserId, {expires: 1, path: "/"});
                            $.cookie("userName", data.RealName, {expires: 1, path: "/"});
                            $.cookie("qweKey", data.qweKey, {expires: 1, path: "/"});
                            $.cookie("userLogo", data.userLogo, {expires: 1, path: "/"});
                        });
                    }
                } else { //已经登录 根据userId查找到shopId
                    GLOBAL.base.ajax_json({
                        url: "http://shop.api.myqwe.com/api/shops/GetShopIdByUId?userid=" + userIds
                    }, function (data) {
                        if (data.Status == '200') {
                            var shopId = data.Content;
                            var arr = window.location.href.split('?');
                            var url = arr[0] + "?p=" + setting.pid + "&shopId=" + shopId;
                            window.location.href = url;
                        }
                    });
                }
            } else {
                return
            }
        }
    };

    GLOBAL.ready = function () {
        GLOBAL.Utils.changeRem();
        GLOBAL.base.login();
        $(".backBox").click(function () {
            window.history.back(-1);
        });
       // var menu = $(".footer").css("height");
       // $("body > div > div:eq(-2)").css("margin-bottom", parseInt(menu) + 6);
    }();
})();

function obj2str(o) {
    var r = [];
    if (typeof o == "string" || o == null) {
        return o;
    }
    if (typeof o == "object") {
        if (!o.sort) {
            r[0] = "{";
            for (var i in o) {
                r[r.length] = i;
                r[r.length] = ":";
                r[r.length] = obj2str(o[i]);
                r[r.length] = ",";
            }
            r[r.length - 1] = "}";
        } else {
            r[0] = "[";
            for (var i = 0; i < o.length; i++) {
                r[r.length] = obj2str(o[i]);
                r[r.length] = ",";
            }
            r[r.length - 1] = "]";
        }
        return r.join("");
    }
    return o.toString();
}