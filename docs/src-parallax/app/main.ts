import '../css/styles.css!css';
import * as $ from 'jquery';
import 'parallax';

$(()=>{
    console.log('READY');
    ($('#scene') as any).parallax();
    // let scene = document.getElementById('scene');
    // let parallax = new Parallax(scene);
});