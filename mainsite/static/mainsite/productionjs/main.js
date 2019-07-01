"use strict";

var isIE;
var firstLoad = true;
var MAIN_NAV_LINKS = [['index-link', indexUrl], ['products-link', productsUrl], ['about-link', aboutUrl], ['cart-link', cartUrl]];
$('.hamburger').click(function () {
  $('.hamburger').toggleClass("is-active");
});

function LinkToUrl(buttonId, url) {
  document.getElementById(buttonId).addEventListener("click", function () {
    LoadPage(url);
  });
}

function GetAndReplacePage(newPage, historyPage) {
  var _isIE = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : isIE;

  if (_isIE) {
    window.location.href = newPage;
  } else {
    fetch(newPage, {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(function (response) {
      return response.text();
    }).then(function (html) {
      PushHTMLContent(html);

      if (!historyPage) {
        history.pushState(null, document.title, newPage);
      }
    });
  }
}

function LoadPage(page_url) {
  var historyPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var _isIE = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : isIE;

  var fullUrl = window.location.origin + page_url;
  var isSamePage = fullUrl == window.location.href;
  var newPage = !isSamePage ? page_url : fullUrl;

  if (!isSamePage) {
    GetAndReplacePage(newPage, historyPage);
  }
}

function PushHTMLContent(content) {
  var _isIE = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isIE;

  if (_isIE) {
    var thisDoc = document.open("text/html", "replace");
    thisDoc.write(content);
    thisDoc.close();
  } else {
    $(".main-cont").html(content);
  }
}
/** Checks if browser is Internet Explorer */


function checkIfIE() {
  var ua = navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/

  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  isIE = is_ie;
}

checkIfIE();
window.addEventListener('popstate', function (event) {
  event.preventDefault();
  LoadPage(window.location.href, true);
});

for (var _i = 0, _MAIN_NAV_LINKS = MAIN_NAV_LINKS; _i < _MAIN_NAV_LINKS.length; _i++) {
  var linkSet = _MAIN_NAV_LINKS[_i];
  LinkToUrl(linkSet[0], linkSet[1]);
}