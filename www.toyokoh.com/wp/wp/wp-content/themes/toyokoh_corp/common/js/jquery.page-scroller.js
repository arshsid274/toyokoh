/*@cc_on _d=document;eval('var document=_d')@*/

$(function(){
$('a[href^="#"]').not('.noscroll').on('click', function() {
 var speed = 2000;
 var easing = 'swing';
 var href= $(this).attr("href");
 var target = $(href == "#" || href == "" ? 'html' : href);
 var position = target.offset().top;
 $('html, body').animate({scrollTop:position}, speed, easing);
 return false;
});
});