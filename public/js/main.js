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
});

//Click event for register modal
$(document).ready(function() {
  

  $("#uploadButton").on("click", function(){
                ("#uploadModal").trigger('focus')
        });

        $('#uploadButton').on('shown.bs.modal', function () {
          $('#uploadmodal').trigger('focus')
  })
  $(".jumbotron").on(hover, function () {
          $("#updateButton").show();
          member.username.show();
          member.bio.show();
          member.species.show();
          member.breed.show();
  }, function () {
          member.username.hide();
          member.bio.hide();
          member.species.hide();
          member.breed.hide();
  });
});

