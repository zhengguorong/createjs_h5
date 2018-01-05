var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    pagination: '.swiper-pagination',
    mousewheelControl: true,
    touchRatio : 0.5,
    onInit: function (swiper) {
        swiperAnimateCache(swiper);
        swiperAnimate(swiper);
    },
    onSlideChangeEnd: function (swiper) {
        swiperAnimate(swiper);
        if(swiper.activeIndex == 5){
            document.getElementsByClassName("maka-Arrow")[0].style.opacity = 0;
        }else {
            document.getElementsByClassName("maka-Arrow")[0].style.opacity = .6;
        }
        // swiper.slides[swiper.activeIndex].style.opacity=1;
        // swiper.slides[swiper.previousIndex].style.opacity=0;
    }
})
