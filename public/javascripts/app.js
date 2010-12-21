var baseUrl = "http://beta.mrbrdo.net/";
//var baseUrl = "http://www.mrbrdo.net:3000/";
function getImageList(callback)
{
  $("#content").stop(true, true).fadeOut();
  $.ajax({
    url: baseUrl + "images.json",
    dataType: "jsonp",
    data: {},
    success: function(data) {
      var images = $('<div id="images"></div>');
      $("#content").html("");
      images.appendTo("#content");
      $.each(data, function(idx, val) {
        images.append('<a href="'+val['url']+'"><img src="'+val['url']+'"></a>');
      });
      $("#images a").lightBox();
      $("#content").stop(true, true).fadeIn();
    }
  });
}

function menuSelect(which)
{
  $("#menu a").removeClass("active");
  which.addClass("active");
}

function getPageList()
{
  $.ajax({
    url: baseUrl + "pages.json",
    dataType: "jsonp",
    data: {},
    success: function(data) {
      var first = true;
      $.each(data, function(idx, val) {
        var link = $('<a href="#" data-page-id="'+val['id']+'">'+val['title']+'</a>');
        link.appendTo("#menu");
        $("#menu").append(" ");
        link.click(function() {
          $("#content").stop(true, true).fadeOut();
          menuSelect($(this));
          $.ajax({
            url: baseUrl + "pages/"+$(this).attr('data-page-id')+".json",
            dataType: "jsonp",
            data: {},
            success: function(data) {
              page = data['page'];
              $("#content").html("<h1>"+page['title']+"</h1>"+page['content']);
              $("#content").stop(true, true).fadeIn();
            }
          });
          return false;
        });
        if (first) {
          link.click();
          first = false;
        }
      });
      var link = $('<a href="#">Galerija</a>');
      link.appendTo("#menu");
      link.click(function() {
        menuSelect($(this));
        getImageList();
        return false;
      });
    }
  });
}

function login(callback)
{
  $.ajax({
    url: baseUrl + "login.json",
    dataType: "jsonp",
    data: { user: "mrbrdo" },
    success: function(data) {
      callback(data);
    }
  });
}
function objectToString(o){
    
    var parse = function(_o){
    
        var a = [], t;
        
        for(var p in _o){
        
            if(_o.hasOwnProperty(p)){
            
                t = _o[p];
                
                if(t && typeof t == "object"){
                
                    a[a.length]= p + ":{ " + arguments.callee(t).join(", ") + "}";
                    
                }
                else {
                    
                    if(typeof t == "string"){
                    
                        a[a.length] = [ p+ ": \"" + t.toString() + "\"" ];
                    }
                    else{
                        a[a.length] = [ p+ ": " + t.toString()];
                    }
                    
                }
            }
        }
        
        return a;
        
    }
    
    return "{" + parse(o).join(", ") + "}";
    
}

$(function() {
  login(function() {
    getPageList();
  });
  
  /*$.ajax({
    url: baseUrl + "images.json?_method=POST",
    dataType: "jsonp",
    data: { image: { url: "www.drek.com" } },
    success: function(data) {
      alert(objectToString(data));
    }
  });*/
});