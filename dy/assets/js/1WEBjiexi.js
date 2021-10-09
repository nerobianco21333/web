
class WEBjiexi{
   constructor(){
         
        //扩展jquery的格式化方法
        $.fn.parseForm=function(){
         var serializeObj={};
         var array=this.serializeArray();
         var str=this.serialize();
         $(array).each(function(){
            if(serializeObj[this.name]){
               if($.isArray(serializeObj[this.name])){
                     serializeObj[this.name].push(this.value);
               }else{
                     serializeObj[this.name]=[serializeObj[this.name],this.value];
               }
            }else{
               serializeObj[this.name]=this.value; 
            }
         });
         return serializeObj;
      };
      if(this._isMobile()){
         $('#validationTextarea').focus(function(){
            $('.buy-ticket-area',parent.document).css({"margin-top":0})
         });
         $('#validationTextarea').blur(function(){
            $('.buy-ticket-area',parent.document).css({"margin-top":"140px"})
         });
      }
      $("input[name='type']").change(function () {
         if($(this).attr('data-force') =="0"){
            alert('该分类需要审核！')
         }
      });

    
   }
   _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
   }
   upload(e){

      var _this = e;
      var valTextarea = $('#validationTextarea').val();
      if(valTextarea ==""){
         alert('输入内容不能为空');
         return false;
      };
      var param = $("#form").parseForm();
      param['url'] = this.httpString(param['url'])
      param['url'] = param['url'].join("\n");
      console.log(param['url'])
 
      $.ajax({
         url:'get_api',
         data: '?url=param',
         type: "post", 
         dataType: 'json',
         beforeSend: function () {
            $(_this).text("解析中...");
         },
         success: function (data) {
            $(_this).text("发布视频");
            alert(data.msg);
            if(data.code == 1){
               location.reload();
            }
         },
         error: function () {
            $('#alert').html('保存配置执行异常!');
         }
      });
   }
   MP4down(e){
      var _this = e;
      var valTextarea = $('#validationTextarea').val();
      if(valTextarea ==""){
         alert('输入内容不能为空');
         return false;
      };
      $.ajax({
         url: get_api,
         data: '?url= $("#form").serialize()',
         type: "post", 
         dataType: 'json',
         beforeSend: function () {
            $(_this).text("解析中...");
         },
         success: function (data) {
            if(data.code == 1){
               var jxplayerHtml = `
               <div class="d-flex justify-content-between mb-2">
                  <h5 class="w-75 text-truncate d-flex  align-self-center mb-0">${data.list.title}</h5>
                  <a href="javascript:;"  id="downloadFile" class="theme-btn" ><svg class="icon icon-search" aria-hidden="true"><use xlink:href="#icon-ziyuanldpi"></use></svg>下载视频</a>
               </div>
               <div class="mt-1">
                  <iframe border="0" src="http://dy.112123.xyz/player/?/url=${encodeURIComponent(data.list.url)}" width="100%" height="610" marginWidth="0" frameSpacing="0" marginHeight="0" frameBorder="0" scrolling="no" vspale="0" noResize></iframe>
               </div>`;
               $('#jxplayer').html(jxplayerHtml);
               $("body,html").animate({scrollTop:0},500);
               $(_this).text("下载视频");
               $('#downloadFile').click(function(){
                  parent.window.douyin.downloadFile(data.list.videourl,data.list.title+'.mp4',"video/mp4");
               });
            }else{
               alert('解析失败')
            }
         },
         error: function () {
            $(_this).text("解析失败请重试！");
         }
      });
   }
   HttpServlet301(url){
      
 

   }
   httpString(s) {
	   var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
	   s = s.match(reg);
      for(let i = 0; i < s.length;i++){
         this.HttpServlet301(s[i])
      }
	   return (s)
	}
   
}
 