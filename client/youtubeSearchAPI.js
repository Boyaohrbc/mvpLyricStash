
//light template helper function from FiresFlorian
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
  $("#searchBtn").on("click", function(e) {
  	e.preventDefault();
  	var request = gapi.client.youtube.search.list({
  	  part: "snippet",
  	  type: "video",
  	  q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
  	  maxResults: 10
  	});
  	request.execute(function(response) {
      var results = response.result;
      $("#searchResults").html("");
      $.each(results.items, function(index, item) {
        $.get("item.html", function(data) {
          $("#searchResults").append(tplawesome(data, [{"title": item.snippet.title, "videoid": item.id.videoId}]));
        });
      });
      resetVideoHeight();
  	});
  });
  $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
  $(".video").css("height", $("#searchResults").width() * 9/16);
}

function init() {
	gapi.client.setApiKey("AIzaSyAy3_9DMaW9u4OmpwxAmCldGvVCSTTiaa0");
	gapi.client.load("youtube", "v3", function() {
       //youtube api is ready
	});
}
