$(window).on('load',function(){

    headerScroll();
    gnbTab();
    menuSlide()
    subMenu();
    eventSlide();
    bestTab();
    todayPhoto();
    
})

function headerScroll(){

    let lastScroll = 0;

    $(window).on('scroll',onScroll);

    function onScroll(){

        var headerTop = $(window).scrollTop(); //스크롤 세로좌표(맨 위에서 0으로 시작)

        if(headerTop > lastScroll){
            $('.header').addClass('hide');
        }else{
            $('.header').removeClass('hide');
        }//스크롤내렸을때

        if(headerTop >= $(window).height()){
            $('.header').addClass('active');
        }else{
            $('.header').removeClass('active');
        }

        lastScroll = headerTop;
    }
}

function gnbTab(){

    $('.header-bottom .gnb-item a').click(function(e){
        e.preventDefault();
        target = $(this).data('target');
        $(this).addClass('active').parent().siblings().find('a').removeClass('active');
        $(target).addClass('active').siblings().removeClass('active');
    })
}

function subMenu(){
    $('.header .btn-menu').click(function(e){
        e.preventDefault()
        $('.menu').addClass('active');
        $('.dimmed').addClass('show');
    })

    $('.dimmed').click(function(e){
        e.preventDefault()
        $('.menu').removeClass('active');
        $('.dimmed').removeClass('show');
    })
}

function menuSlide(){

    $('.depth').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        if ($(this).siblings('.sub-menu .menu-list').css('display')=='none') { 
            $('.depth').removeClass('active');
            $(this).addClass('active'); // 처음클릭

            $('.close-arrow').removeClass('open')
            $(this).find('.close-arrow').toggleClass('open');
            
        } else { // 재클릭
            $('.depth').removeClass('active');
            $('.close-arrow').removeClass('open')  
        }
        $('.sub-menu .menu-list').stop().slideUp();
        $(this).siblings('.sub-menu .menu-list').stop().slideToggle();
       
    })

}

function eventSlide(){
    var swiper = new Swiper(".swiper", {
        slidesPerView : 'auto',
        centeredSlides: true, 
        autoplay: {
            delay:2000,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: {
          el: ".fraction",
          type: "custom",
          renderCustom:function(swiper, current, total){
            return `
                <span class="curr">${current}</span>
                <span class="slach">/</span>
                <span class="total">${total}</span>
                <span class="link"></span>
            `;
          }
        },
    });
}

function bestTab(){

    $('.sc-best .link-cate').click(function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    })
}


function todayPhoto(){

    fetch('./asset/data/todayphoto.json')
    .then((response) => response.json())
    .then((json) => {
            data = json.items;
            let html = '';
            isNumber = '<span class="num">${index++}</span>';
            index = 1;

            data.forEach(el => {

                if(index < 4){
                    isNumber = `<span class="num">${index++}</span>`;
                }else{
                    isNumber = '';
                }

                html+= `
                <li class="photo-item">
                    <a href="" class="link-photo">
                        <img src="${el.thumbnail}" alt="인기사진이미지">
                    </a>
                    ${isNumber}
                </li>
                `;
            });
            $('.photo-list').html(html)

    })

}