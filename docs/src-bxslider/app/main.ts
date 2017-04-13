///<reference types="dw-bxslider-4" />
import '../css/jquery.bxslider.css!css'
import * as $ from 'jquery';
import 'bxslider';

$(()=>{
    $('.bxslider').bxSlider({
        mode: 'fade',
        captions: true
    });

    $('.slider5').bxSlider({
        slideWidth: 300,
        minSlides: 3,
        maxSlides: 3,
        moveSlides: 3,
        slideMargin: 10
    });
})

    