$(function () {
    $('#typeahead').typeahead({
        source: function (query, process) {
            products = [];
            map = {};

            $.ajax({
                url: '/api/Search?',
                type: 'GET',
                data: 'product=' + query,
                dataTpe: 'JSON',
                async: true,
                success: function (data) {
                    var temp = JSON.parse(data);
                    //console.log(temp.products[0].id);

                    var results = [];
                    $.map(temp.products, function (product) {
                        results.push(product.name);
                    });

                    process(results);
                }
            });
        },
        updater: function (item) {
            //alert(item);
            var temp = item;
            //alert(temp);
            $('#result').text(temp);
        }
    });
});
