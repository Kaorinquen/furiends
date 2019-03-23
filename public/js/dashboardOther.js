var pictureUrls = [];
var userId = $("#id").val();
var counter = 0;
var counterStop;

var API = {
  getOtherAllPics: function(userId) {
    return $.ajax({
      type: "GET",
      url: "/api/allOtherPicsUrl/" + userId
    });
  }
};

$(window).scroll(function() {
  var height = $(window).scrollTop();
  if (height > 100) {
    $("#back2Top").fadeIn();
  } else {
    $("#back2Top").fadeOut();
  }
});

$(document).ready(function() {
  $("#back2Top").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
});

API.getOtherAllPics(userId).then(function(data) {
  for (var i = data.length - 1; i >= 0; i--) {
    pictureUrls.push(data[i]);
  }
  start();
});

$(window).scroll(function() {
  if ($(window).scrollTop() === $(document).height() - $(window).height()) {
    counterStop = counter + 6;
    for (var i = counter; i < counterStop; i++) {
      if (counter >= pictureUrls.length) {
        console.log("No more pictures!");
      } else {
        counter += 1;
        $("#containerOther").append(
          "<div class='card mb-3' id='divOne'><img id='pictures' style='height: 200px; width: 100%; display: block;' src='" +
            pictureUrls[i].url +
            "'><div class='card-body' id='cdOne'><p class='card-text' id='comment'>" +
            pictureUrls[i].comment +
            "</p></div><div class='card-footer text-muted' id='date'>" +
            pictureUrls[i].createdAt +
            "</div></div>"
        );
      }
    }
  }
});

var start = function() {
  counterStop = counter + 6;
  for (var i = counter; i < counterStop; i++) {
    if (counter >= pictureUrls.length) {
      console.log("No more pictures!");
    } else {
      counter += 1;
      $("#containerOther").append(
        "<div class='card mb-3' id='divOne'><img id='pictures' style='height: 200px; width: 100%; display: block;' src='" +
          pictureUrls[i].url +
          "'><div class='card-body' id='cdOne'><p class='card-text' id='comment'>" +
          pictureUrls[i].comment +
          "</p></div><div class='card-footer text-muted' id='date'>" +
          pictureUrls[i].createdAt +
          "</div></div>"
      );
    }
  }
};
