// The API object contains methods for each kind of request we'll make
var API = {
  getFront: function(offsetFront) {
    return $.ajax({
      type: "GET",
      url: "/api/front/" + offsetFront
    });
  }
};

//==============================================================//
// Infinity scroll
var offsetFront = 0;
$(window).scroll(function() {
  if ($(window).scrollTop() === $(document).height() - $(window).height()) {
    API.getFront(offsetFront).then(function(data) {
      var divNumber = [
        "divOne",
        "divTwo",
        "divThree",
        "divOne",
        "divTwo",
        "divThree",
        "divOne",
        "divTwo",
        "divThree"
      ];
      offset += 12;
      console.log(data);
      if (data === []) {
        console.log("All Done!");
      } else {
        for (var i = 0; i < 12; i++) {
          $("#container").append(
            "<div class='card mb-3' id='" +
              divNumber[i] +
              "'><img style='height: 200px; width: 100%; display: block;' src='" +
              data[i].url +
              "'>"
          );
        }
      }
    });
  }
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

$("#uploadButton").on("click", function() {
  event.preventDefault();
  "#uploadModal".trigger("focus");
});

// $(".jumbotron").on(hover, function () {
//   $("#updateButton").show();
//   member.username.show();
//   member.bio.show();
//   member.species.show();
//   member.breed.show();
// },
// function () {
//   member.username.hide();
//   member.bio.hide();
//   member.species.hide();
//   member.breed.hide();
// });

//front page
API.getFront(offsetFront).then(function(data) {
  console.log(data);
  var divNumber = [
    "divOne",
    "divTwo",
    "divThree",
    "divOne",
    "divTwo",
    "divThree",
    "divOne",
    "divTwo",
    "divThree",
    "divOne",
    "divTwo",
    "divThree",
    "divOne",
    "divTwo",
    "divThree",
    "divOne",
    "divTwo",
    "divThree"
  ];
  offsetFront += 12;
  for (var i = 0; i < 12; i++) {
    $("#containerFront").append(
      "<div class='card mb-3' id='" +
        divNumber[i] +
        "'><img style='height: 200px; width: 100%; display: block;' src='" +
        data[i].url +
        "'>"
    );
  }
});

// //Click event for register modal
// $(document).ready(function() {
  

//   $("#uploadButton").on("click", function(){
//                 ("#uploadModal").trigger('focus')
//         });

//         $('#uploadButton').on('shown.bs.modal', function () {
//           $('#uploadmodal').trigger('focus')
//   })
//   $(".jumbotron").on(hover, function () {
//           $("#updateButton").show();
//           member.username.show();
//           member.bio.show();
//           member.species.show();
//           member.breed.show();
//   }, function () {
//           member.username.hide();
//           member.bio.hide();
//           member.species.hide();
//           member.breed.hide();
//   });
// });