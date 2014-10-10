<script src="https://www.calacademy.org/images/cas/js/Auto_Select_Delivery_Method.js"></script>
var delay=3000;
setTimeout(function() {
    $.ajax({
        type: "POST",
        url: "/Webstore/API/Shipping",
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        success: function (msg) {
            alert("post successful");
        }
    });
},delay);