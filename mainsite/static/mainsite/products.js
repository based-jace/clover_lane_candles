// prod_category_list - list of products
// has "model", "pk", and "fields"
  // fields has:
 //     color, prod_img, is_main, type_id[name, price, min_order, desc], 
//      scent_id[name, desc]

var csrftoken = $("[name=csrfmiddlewaretoken]").val();

try{
    var total_quantity = 0;
    var products = [];
}
catch(e){
    console.log(e);
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$(".product").each(function(i){
    let tp = {};
    
    tp.name = $(this).attr("id");
    tp.image = $(this).find(".prod_img").attr("id");
    tp.scent_desc = $(this).find(".scent_desc").attr("id");
    tp.select = $(this).find(".prod_select").attr("id");
    tp.quantity = $(this).find(".order_amt_in").attr("id");
    tp.min_quant = $("#" + tp.quantity).attr("placeholder").replace('min ','')
    tp.multiple_of = $(this).find(".multiple-of").attr("id");
    tp.btn = $(this).find(".add_prod_btn").attr("id");

    products.push(tp);
});

for(i in products){
    let tp = products[i];
    let tps = "#" + tp.select + " option";
    let tpb = "#" + tp.btn;

    $(tps).click(setProperties(tp));
    $(tps).trigger("click");
    $(tpb).click(addToCart(tp));
}

function setProperties(tp){
    return function(){
        let me = this.value.replace("p","");
        let p_image = $("#" + tp.image);
        let p_scent = $("#" + tp.scent_desc);
        for(i in prod_category_list){
            product = prod_category_list[i];
            product_fields = product["fields"];
            if(me == product["pk"]){
                p_image.attr("src", MEDIA_URL + product_fields["prod_img"]);
                p_scent.text(product_fields["scent_id"]["desc"]);
            }
        }
    }
}

function addToCart(tp){
    return function(){
        let prod = $("#" + tp.select).attr("value"); // Product
        let quant = $("#" + tp.quantity).attr("value"); // Quantity
        console.log(document.getElementById(tp.multiple_of).innerText);
        
        let is_multiple = false; // If 
        let multiple_of_list = JSON.parse(document.getElementById(tp.multiple_of).innerText);
        for(numer in multiple_of_list){
            i = multiple_of_list[numer];
            if (Number(quant) % i == 0){
                is_multiple = true;
                break;
            };
        };

        if(
            Number(quant) >= Number(tp.min_quant) &&
            is_multiple
            ){
            $.ajax({
                type: "POST",
                url: ADD_TO_CART_URL,
                headers:{
                    "X-CSRFToken": csrftoken
                },
                data: {
                    'csrfmiddlewaretoken': csrftoken,
                    'product': prod,
                    'quantity': quant,
                    'total_quantity': total_quantity
                },
                //cache: true,
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        alert(titleCase(tp.name.replace(/_/g, " ")) + " has been added to your cart.");
                        $("#" + tp.quantity).val("");
                        total_quantity = data.total_quantity;
                    }
                }
            });
        }
        else{
            alert("You must order at least the minimum quantity.");
        }
    }
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }
 
