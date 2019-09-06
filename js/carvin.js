/**
 * Created by acer on 2018/12/13.
 */
$(function() {
    /*home page 二级菜单展开、收缩*/
    $(".nav-sub").hover(function() {
        $(this).children("ol").fadeIn(500).end().children("a").children("i").addClass("up");
    }, function() {
        $(this).children("ol").fadeOut(500).end().children("a").children("i").removeClass("up");
    });
    /*--------------------------------------------*/
    /*all page 返回顶部*/
    $(window).on("scroll", function() {
        var sTop = $(window).scrollTop();
        if (sTop >= 500) {
            $(".md-back-top").fadeIn();
        } else {
            $(".md-back-top").fadeOut();
        }
    });
    $(".md-back-top").click(function() {
        $("html").animate({
            scrollTop: 0
        }, 500);
    });
    $(window).trigger('scroll'); /*触发滚动事件，避免在显示回到顶部按钮时，因页面刷新导致按钮消失*/
    /*----------------------------------------------------------*/
    /*home page slide 轮播交互*/
    var mySwiper = new Swiper('.swiper-container', {
        //        direction: 'vertical', // 垂直切换选项
        direction: 'horizontal', //水平切换选项（默认）
        loop: true, // 循环模式选项
        autoplay: true,

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination'
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },

        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar'
        },
        /*----------home page slide 动画控制------------*/
        on: {
            init: function() {
                swiperAnimateCache(this); //隐藏动画元素
                swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function() {
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
            }
        }
    });

    /*----------FAQ page show details------------*/
    $(".note-p").click(function() {
        $(this).siblings().slideToggle();
    });


    /*------------Baidu map API--------------------*/
    // 百度地图API功能
    var map = new BMap.Map("carvin-map"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
        mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]
    }));
    map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放





    //    alert("欢迎来到柠檬幼儿园！");
    function myFun(result) {
        var cityName = result.name;
        map.setCenter(cityName);
        //        alert("您当前访问的是【"+cityName+"】柠檬幼儿园！")
    }

    var myCity = new BMap.LocalCity();
    myCity.get(myFun);
});