$(document).ready(function () {
    var apolloStatus = $('#apollo-status');
    var zeusStatus = $('#zeus-status');
    var hadesStatus = $('#hades-status');
    apolloStatus.removeClass().addClass('card-panel yellow lighten-2').html('Connecting to apollo.');
    zeusStatus.removeClass().addClass('card-panel yellow lighten-2').html('Connecting to zeus.');
    hadesStatus.removeClass().addClass('card-panel yellow lighten-2').html('Connecting to hades.');
    setTimeout(
        function () {
            $.ajax({
                url: "http://localhost:8084",
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: false,
                data: '{}',
                success: function (data) {
                    apolloStatus.removeClass().addClass('card-panel green lighten-2').html("Successfully connected to apollo");

                },
                error: function () {
                    apolloStatus.removeClass().addClass('card-panel red darken-3').html("Couldn't connect to apollo");
                }
            });
            $.ajax({
                url: "http://localhost:8081",
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: false,
                data: '{}',
                success: function (data) {
                    hadesStatus.removeClass().addClass('card-panel green lighten-2').html("Successfully connected to hades");

                },
                error: function () {
                    hadesStatus.removeClass().addClass('card-panel red darken-3').html("Couldn't connect to hades");
                }
            });
            $.ajax({
                url: "http://localhost:8082",
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                processData: false,
                data: '{}',
                success: function (data) {
                    zeusStatus.removeClass().addClass('card-panel green lighten-2').html("Successfully connected to zeus");

                },
                error: function () {
                    zeusStatus.removeClass().addClass('card-panel red darken-3').html("Couldn't connect to zeus");
                }
            });
        }, 2000);
});