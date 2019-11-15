$(document).ready(function () {
    var apolloStatus = $("#apollo-status");
    var zeusStatus = $("#zeus-status");
    var hadesStatus = $("#hades-status");
    apolloStatus.removeClass().addClass("card-panel yellow lighten-2").html("Connecting to apollo.");
    zeusStatus.removeClass().addClass("card-panel yellow lighten-2").html("Connecting to zeus.");
    hadesStatus.removeClass().addClass("card-panel yellow lighten-2").html("Connecting to hades.");
    setTimeout(
        function () {
            $.ajax({
                url: "http://localhost:8084",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                processData: false,
                data: "{}",
                success: function (response) {
                    apolloStatus
                        .removeClass()
                        .addClass("card-panel green lighten-2")
                        .html("Successfully connected to apollo, message: " + response.meta.message);
                },
                error: function () {
                    apolloStatus
                        .removeClass()
                        .addClass("card-panel red darken-3")
                        .html("Couldn't connect to apollo");
                }
            });
            $.ajax({
                url: "http://localhost:8081/authenticate",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                processData: false,
                data: "{}",
                success: function (response) {
                    hadesStatus
                        .removeClass()
                        .addClass("card-panel green lighten-2")
                        .html("Successfully connected to hades, message: " + response.meta.message);
                },
                error: function () {
                    hadesStatus
                        .removeClass()
                        .addClass("card-panel red darken-3")
                        .html("Couldn't connect to hades");
                }
            });
            $.ajax({
                url: "http://localhost:8082",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                processData: false,
                data: "{}",
                success: function (response) {
                    zeusStatus
                        .removeClass()
                        .addClass("card-panel green lighten-2")
                        .html("Successfully connected to zeus, message: " + response.meta.message);
                },
                error: function () {
                    zeusStatus
                        .removeClass()
                        .addClass("card-panel red darken-3")
                        .html("Couldn't connect to zeus");
                }
            });
        }, 2000);
});
