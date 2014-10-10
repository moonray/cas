var delay=2000;
setTimeout(function() {
$('#DeliveryOption option').each(function () {
    var allOptions = $(this).text();
    var allOptionValues = $(this).val();
    var arr;
    if (allOptions == "select") {
        $(this).remove();
    }
    if (allOptions.indexOf("Print") > -1) {
        var selectedMethod = $(this).attr("selected", true);
    }
    if (allOptionValues > 0) {
        var selectedMethodValueTrue = $(this).val();

        arr = {
            "id": selectedMethodValueTrue
        };
    }
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
});
},delay);


    