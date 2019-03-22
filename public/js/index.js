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

var API = {
  getAllPics: function(offset) {
    return $.ajax({
      type: "GET",
      url: "/api/allPicsUrl/" + offset
    });
  },
  getOtherAllPics: function(offsetOther, userId) {
    return $.ajax({
      type: "GET",
      url: "/api/allOtherPicsUrl/" + offsetOther + "/" + userId
    });
  }
};

// Dashboard==============================================================//

// Infinity scroll
var offset = 0;
$(window).scroll(function() {
  if ($(window).scrollTop() === $(document).height() - $(window).height()) {
    API.getAllPics(offset).then(function(data) {
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

$("#uploadButton").on("click", function() {
  event.preventDefault();
  "#uploadModal".trigger("focus");
});

API.getAllPics(offset).then(function(data) {
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

// other profile pages  =======================================================================
var offsetOther = 0;
var userId = $("#id").val();

$(window).scroll(function() {
  if ($(window).scrollTop() === $(document).height() - $(window).height()) {
    API.getOtherAllPics(offsetOther, userId).then(function(data) {
      offsetOther += 6;
      console.log(data);
      if (data === []) {
        console.log("All Done!");
      } else {
        for (var i = 0; i < 6; i++) {
          $("#containerOther").append(
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

API.getOtherAllPics(offsetOther, userId).then(function(data) {
  offsetOther += 6;
  for (var i = 0; i < 6; i++) {
    $("#containerOther").append(
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
