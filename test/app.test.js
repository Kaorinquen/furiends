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
