function getImageList(callback)
{
  $("#content").stop(true, true).fadeOut();
  $.ajax({
    url: "http://www.mrbrdo.net:3000/images.json",
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
    url: "http://www.mrbrdo.net:3000/pages.json",
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
            url: "http://www.mrbrdo.net:3000/pages/"+$(this).attr('data-page-id')+".json",
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
    url: "http://www.mrbrdo.net:3000/login.json",
    dataType: "jsonp",
    data: { user: "mrbrdo" },
    success: function(data) {
      callback(data);
    }
  });
}

$(function() {
  login(function() {
    getPageList();
  });
});