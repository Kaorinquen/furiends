// Infinity scroll
var box = 2;
$(window).scroll(function() {
  if ($(window).scrollTop() === $(document).height() - $(window).height()) {
    console.log(++box);
    $("#container").append("<div class='box one'></div>");
    $("#container").append("<div class='box two'></div>");
    $("#container").append("<div class='box three'></div>");
    $("#container").append("<div class='box two'></div>");
    $("#container").append("<div class='box five'></div>");
    $("#container").append("<div class='box one'></div>");
    $("#container").append("<div class='box two'></div>");
    $("#container").append("<div class='box six'></div>");
  }
  // } else{
  //   $(window).unbind("#container");
  // }
});

//Click event for register modal
$(document).ready(function() {
  $("#register").on("click", function() {
    $(".bg-modal").css("display", "block");
  });
  $(".close").click(function() {
    $(".bg-modal").css("display", "none");
  });
});
//Click event for login modal
$(document).ready(function() {
  $("#login").on("click", function() {
    $(".modal").css("display", "block");
  });
  $(".close").click(function() {
    $(".modal").css("display", "none");
  });
});