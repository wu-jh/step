
var list_a = $('.category ul li a');
var search = $('.category .default');
var big_news = $('#big-news');
var big_news_content = $('#big-news-content');
var local_news = $('#local-news');
var local_news_content = $('#local-news-content');
for(var i = 0; i < list_a.length; i++){
    if(list_a.eq(i).html() == search.html()){
        list_a.eq(i).addClass('selected');
    }

    list_a.eq(i).mouseover(function(){
        $(this).addClass('selected')
        .parent().siblings().children().removeClass('selected');
    });

    list_a.eq(i).mouseout(function(){
        $(this).removeClass('selected');
        
    });

    list_a.eq(i).click(function(){
        search.html($(this).html());
        $('.category ul').css('display','none');
    });
}

$('.category').mouseover(function(){
    $('.category ul').css('display','block');
    $('.category i').html('&#xe60a;');
});

$('.category').mouseout(function(){
    $('.category ul').css('display','none');
    $('.category i').html('&#xe85e;')
    for(var i = 0; i < list_a.length; i++){
        if(list_a.eq(i).html() == search.html()){
            list_a.eq(i).addClass('selected')
            .parent().siblings().children().removeClass('selected');;
        }
    }
});

$('.nav .more').mouseover(function(){
    $('.nav .more-content').css('display','block');
    $(this).children().eq(0).html('&#xe60a;');
});

$('.nav .more').mouseout(function(){
    $('.nav .more-content').css('display','none');
    $(this).children().eq(0).html('&#xe85e')
});

var wheel_spot = $('.wheel-spot');
var wheel_img = $('.wheel-img');
var rtime = null;
var index = 0;
wheel_spot.children().eq(0).addClass('active');
wheel_img.children().eq(0).addClass('show').removeClass('hide');

interval();

wheel_spot.children().click(function(){
    index = $(this).index();
    $(this).addClass('active')
            .siblings().removeClass('active');
    wheel_img.children().eq(index).addClass('show').removeClass('hide')
                .siblings().addClass('hide').removeClass('show');
    clearInterval(rtime);
    interval();
});

function interval(){
    rtime = setInterval(function(){
        index++;
        index = index >= wheel_img.children().length?0:index;
        wheel_img.children().eq(index).addClass('show').removeClass('hide')
                    .siblings().addClass('hide').removeClass('show');
        wheel_spot.children().eq(index).addClass('active')
                    .siblings().removeClass('active');
    },3000);
}

local_news.mouseover(function(){
    big_news.removeClass('slected');
    $(this).addClass('slected');
    big_news_content.addClass('hide');
    local_news_content.removeClass('hide');
})

big_news.mouseover(function(){
    local_news.removeClass('slected');
    $(this).addClass('slected');
    local_news_content.addClass('hide');
    big_news_content.removeClass('hide');
})

var tmp1 = true;
var product = $('.product');
var w = $('.product').css('width');
var lis = $('.product>ul>li');
$('.flexible').click(function(){
    if(tmp1){
        $(this).html('&#xe85d;');
        product.animate({width:'200%'},300);
        tmp1 = false;
        setTimeout(function(){
            product.mouseleave(function(){
                $('.flexible').html('&#xe85c;');
                product.animate({width:'100%'},300);
                tmp1 = true;   
                $(this).unbind('mouseleave') 
            });
        },1)
    }else{
        $(this).html('&#xe85c;');
        product.animate({width:'100%'},300);
        tmp1 = true;
    }
});



