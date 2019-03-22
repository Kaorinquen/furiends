// The API object contains methods for each kind of request we'll make
var API = {
  getFront: function(offsetFront) {
    return $.ajax({
      type: "GET",
      url: "/api/front/" + offsetFront
    });
  },
  getExplorer: function(offsetFront) {
    return $.ajax({
      type: "GET",
      url: "/api/explorer/" + offsetFront
    });
  }
};

//==============================================================//
// Infinity scroll
var offsetFront = 0;
var offsetExplorer = 0;

//front page scroll pictures
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
      offsetFront += 12;
      console.log(data);
      if (data === []) {
        console.log("All Done!");
      } else {
        for (var i = 0; i < 12; i++) {
          $("#containerFront").append(
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

//explorer scroll
$(window).scroll(function() {
  if ($(window).scrollTop() === $(document).height() - $(window).height()) {
    API.getExplorer(offsetExplorer).then(function(data) {
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
      offsetExplorer += 12;
      console.log(data);
      if (data === []) {
        console.log("All Done!");
      } else {
        for (var i = 0; i < 12; i++) {
          $("#containerExplorer").append(
            "<div class='card mb-3' id='" +
              divNumber[i] +
              "'><img style='height: 200px; width: 100%; display: block;' src='" +
              data[i].url +
              "'><div class='card-body'><p class='card-text' id='comment'>" +
              data[i].comment + "</p><a href='userprofile/" + data[i].userId +"' >" + data[i].userName + "</a></div><div class='card-footer text-muted' id='date'>" +
              data[i].createdAt +
              "</div></div>"
          );
        }
      }
    });
  }
});

//explorer page
API.getExplorer(offsetExplorer).then(function(data) {
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
  offsetExplorer += 12;
  for (var i = 0; i < 12; i++) {
    $("#containerExplorer").append(
      "<div class='card mb-3' id='" +
        divNumber[i] +
        "'><img style='height: 200px; width: 100%; display: block;' src='" +
        data[i].url +
        "'><div class='card-body'><p class='card-text' id='comment'>" +
        data[i].comment + "</p><a href='userprofile/" + data[i].userId +"' >" + data[i].userName + "</a></div><div class='card-footer text-muted' id='date'>" +
        data[i].createdAt +
        "</div></div>"
    );
  }
});
