 
var AppJiexi = null;
function html5plus(){
   return !!navigator.userAgent.match(/AppleWebKit.*Html5Plus*/);

}
function jiexiOpen(){
   if(html5plus()){
      
   }else{
      $('.menu-area ul > li > .theme-btn').on('click', function () {
         var clientHeight = 600;
          if(window.innerWidth < 750){
             clientHeight = document.documentElement.clientHeight;
          }
          let html = `<iframe border="0" src="${$(this).data("jiexi")}" width="100%" height="${clientHeight}" marginwidth="0" framespacing="0" marginheight="0" frameborder="0"   vspale="0" noresize=""></iframe>`;
          $('#jiexi-box').html(html);
          $('.buy-ticket').show();
          return false;
       });
       $('.buy-ticket .buy-ticket-area > a').on('click', function () {
          $('#jiexi-box').html('');
          $('.buy-ticket').hide();
          return false;
       });
   }
}

( function ($) {
	"use strict";
   $('.simple').on('click', function () {
      var parent = $(this).parent();
      if(parent.hasClass("Open")){
         parent.removeClass('Open')
      }else{
         parent.addClass('Open')
      }
	});
	jiexiOpen();
   var login_popup = $('.login-popup')
   if(MAC.Cookie.Get('user_id') !=undefined && MAC.Cookie.Get('user_id')!=''){
      var user_html = window.innerWidth < 750 ? '我的' : MAC.Cookie.Get('user_name');
      login_popup.html(user_html)
      var user_link =   maccms.path + '/index.php/user';
      login_popup.on('click', function () {
         location.href = user_link;
      });

   }else{
      login_popup.on('click', function () {
         MAC.User.Login();
         $('.login-area').show();
         return false;
      });
      $('.login-box > a').on('click', function () {
         $('.login-area').hide();
         return false;
      });
   }
 
	jQuery(window).load(function(){
		jQuery("#preloader").fadeOut(500);
	});
	
}(jQuery));
