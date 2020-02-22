"use strict";

// prod_category_list - list of products
// has "model", "pk", and "fields"
//
// fields has:
//     color, prod_img, is_main, type_id[name, price, min_order, desc], 
//     scent_id[name, desc]
// Most of this could be replaced by Vue, but I wrote it all before I knew Vue
var productElems = document.getElementsByClassName("product");
var csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;

try {
  var total_quantity = 0;
  var products = [];
} catch (e) {
  console.log(e);
}

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

for (var e = 0; e < productElems.length; e++) {
  var element = productElems[e];
  var tp = {};
  var quantElem = element.querySelector(".order_amt_in");
  tp.name = element.id;
  tp.image = element.querySelector(".prod_img").id;
  tp.scent_desc = element.querySelector(".scent_desc").id;
  tp.select = element.querySelector(".prod_select").id;
  tp.quantity = quantElem.id;
  tp.min_quant = quantElem.placeholder.replace("min", "");
  tp.multiple_of = element.querySelector(".multiple-of").id;
  tp.btn = element.querySelector(".add_prod_btn").id;
  products.push(tp);
}

;

for (i in products) {
  var _tp = products[i];
  var tps = document.querySelector("#" + _tp.select + " option");
  var tpb = document.getElementById(_tp.btn);
  tps.addEventListener("click", setProperties(_tp));
  tps.click();
  tpb.addEventListener("click", addToCart(_tp));
}

function setProperties(tp) {
  return function () {
    var prodPk = this.value.replace("p", ""); // Product's Primary Key

    var p_image = document.getElementById(tp.image);
    var p_scent = document.getElementById(tp.scent_desc);

    for (i in prod_category_list) {
      product = prod_category_list[i];
      product_fields = product["fields"];

      if (prodPk == product["pk"]) {
        p_image.src = MEDIA_URL + product_fields["prod_img"];
        p_scent.innerText = product_fields["scent_id"]["desc"];
      }
    }
  };
}

function addToCart(tp) {
  return function () {
    var prod = document.getElementById(tp.select).value; // Product

    var quant = document.getElementById(tp.quantity).value; // Quantity
    // console.log(document.getElementById(tp.multiple_of).innerText);

    var is_multiple = false; // If quantity is a multiple of one of the required multiples

    var multiple_of_list = JSON.parse(document.getElementById(tp.multiple_of).innerText);

    for (numer in multiple_of_list) {
      i = multiple_of_list[numer];

      if (Number(quant) % i == 0) {
        is_multiple = true;
        break;
      }

      ;
    }

    ;

    if (Number(quant) >= Number(tp.min_quant) && is_multiple) {
      var data = JSON.stringify({
        'csrfmiddlewaretoken': csrftoken,
        'product': prod,
        'quantity': quant,
        'total_quantity': total_quantity
      });
      var f = new FormData();
      f.append("1", "hello"); // let data = {
      //     "hello": 1
      // }
      // console.log(data);

      fetch(ADD_TO_CART_URL, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRFToken": csrftoken
        },
        body: data // body: {
        //     'csrfmiddlewaretoken': csrftoken,
        //     'product': prod,
        //     'quantity': quant,
        //     'total_quantity': total_quantity
        // },
        //cache: true,

      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        alert(titleCase(tp.name.replace(/_/g, " ")) + " has been added to your cart.");
        document.getElementById(tp.quantity).value = ""; // $("#" + tp.quantity).val("");

        total_quantity = data.total_quantity;
      }).catch(function (error) {
        console.log(error);
      }); // $.ajax({
      //     type: "POST",
      //     url: ADD_TO_CART_URL,
      //     headers:{
      //         "X-CSRFToken": csrftoken
      //     },
      //     data: {
      //         'csrfmiddlewaretoken': csrftoken,
      //         'product': prod,
      //         'quantity': quant,
      //         'total_quantity': total_quantity
      //     },
      //     //cache: true,
      //     dataType: 'json',
      //     success: function (data) {
      //         if (data.success) {
      // alert(titleCase(tp.name.replace(/_/g, " ")) + " has been added to your cart.");
      // $("#" + tp.quantity).val("");
      // total_quantity = data.total_quantity;
      //         }
      //     }
      // });
    } else {
      alert("You must order at least the minimum quantity.");
    }
  };
}

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');

  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  } // Directly return the joined string


  return splitStr.join(' ');
}