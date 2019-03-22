var API = {
  getAllPics: function(offset) {
    return $.ajax({
      type: "GET",
      url: "/api/allPicsUrl/" + offset
    });
  }
};

//==============================================================//
// Infinity scroll
var offset = 0;
$(window).scroll(function() {
  if ($(window).scrollTop() === $(document).height() - $(window).height()) {
    API.getAllPics(offset).then(function(data) {
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
      offset += 6;
      console.log(data);
      if (data === []) {
        console.log("All Done!");
      } else {
        for (var i = 0; i < 6; i++) {
          $("#container").append(
            "<div class='card mb-3' id='" +
              divNumber[i] +
              "'><img style='height: 200px; width: 100%; display: block;' src='" +
              data[i].url +
              "'><div class='card-body'><p class='card-text' id='comment'>" +
              data[i].comment +
              "</p></div><div class='card-footer text-muted' id='date'>" +
              data[i].createdAt +
              "</div></div>"
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


//user profile
API.getAllPics(offset).then(function(data) {
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
  offset += 6;
  for (var i = 0; i < 6; i++) {
    $("#container").append(
      "<div class='card mb-3' id='" +
        divNumber[i] +
        "'><img style='height: 200px; width: 100%; display: block;' src='" +
        data[i].url +
        "'><div class='card-body'><p class='card-text' id='comment'>" +
        data[i].comment +
        "</p></div><div class='card-footer text-muted' id='date'>" +
        data[i].createdAt +
        "</div></div>"
    );
  }
});
