$(document).ready(function () {
    $('select').formSelect();
    var apolloStatus = $("#apollo-status");
    var hadesStatus = $("#hades-status");
    apolloStatus.removeClass().addClass("card-panel yellow lighten-2").html("Connecting to apollo.");
    hadesStatus.removeClass().addClass("card-panel yellow lighten-2").html("Connecting to hades.");
    setTimeout(
        function () {
            checkApolloConnection(apolloStatus);
            $.ajax({
                url: "http://localhost:8081/authenticate",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                processData: false,
                data: '{"username": "user","password": "pass"}',
                success: function (response) {
                    hadesStatus
                        .removeClass()
                        .addClass("card-panel green lighten-2")
                        .html("Successful authentication from hades, token: " + response.data.token);
                    $("#user_token").html(response.data.token);
                    $("#user_name").html("user");
                },
                error: function () {
                    hadesStatus
                        .removeClass()
                        .addClass("card-panel red darken-3")
                        .html("Couldn't connect to hades");
                }
            });
        }, 1000);

    getAvailableGenres();

    $("#search_form input[type='submit']").click(searchFormHandler);

    $("#genre_form input[type='submit']").click(genreFormHandler);

    $("#show_watched").click(updateUserData);

    $("#show_recommendations").click(showRecommendationsHandler);

});

function enableAddMovieButtons() {
    $("a.add-movie").click(function (e) {
        addMovieToUser($(this).data('movieid'));
    });
}

function addMovieToUser(movieId) {
    $.ajax({
        url: "http://localhost:8081/users/" + getUsername() + "/movies/" + movieId,
        type: "POST",
        data: "",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': `Bearer ` + getUserToken(),
        },
        success: function (result) {
            updateUserData($("#user_name").html());
        },
    });
}

function updateUserData() {
    enableMoviePreloader();
    $.ajax({
        url: "http://localhost:8081/users/" + getUsername(),
        type: "GET",
        data: "",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': `Bearer ` + getUserToken(),
        },
        success: function (result) {
            data = {
                'moviesIds': result.data.movies
            };

            $.ajax({
                type: "POST",
                url: "http://localhost:8084/?function=searchByList",
                data: data,
                success: function (result) {
                    disableMoviePreloader();
                    $("#search_form_result").html(result);
                }
            });
        },
    });
}

function askForUserToken() {
    $.ajax({
        url: "http://localhost:8081/authenticate",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        processData: false,
        data: '{"username": "user","password": "pass"}',
        success: function (response) {
            $("#user_token").html(response.data.token);
        }
    });
}

function getUserToken() {
    if ($("#user_token").html().length === 0) {
        $.when(askForUserToken()).done(function () {
            return $("#user_token").html();
        })
    } else {
        return $("#user_token").html();
    }
}

function getUsername() {
    if ($("#user_name").html().length === 0) {
        $("#user_name").html("user");
    }
    return $("#user_name").html();
}

function getAvailableGenres() {
    $.ajax({
        url: "http://localhost:8084?function=getAvailableGenres",
        type: "POST",
        dataType: "html",
        contentType: "application/json",
        processData: false,
        data: "{}",
        success: function (response) {
            $("#genre_form_select").html(response).formSelect();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function checkApolloConnection(apolloStatus) {
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
            $("#movie-container-preloader").addClass("d-none");
            $("#movie-container").removeClass("d-none");
            setTimeout(function () {
                $('#movie-container').removeClass("hidden");
            }, 0);
        },
        error: function () {
            apolloStatus
                .removeClass()
                .addClass("card-panel red darken-3")
                .html("Couldn't connect to apollo");
        }
    });
}

function enableMoviePreloader() {
    $("#search_form_result").html("");
    $("#movie-preloader").removeClass("d-none");
}

function disableMoviePreloader() {
    $("#movie-preloader").addClass("d-none");
}

function searchFormHandler() {
    enableMoviePreloader();
    data = {
        'title': $("#search_form_title").val(),
        'type': $("#search_form_type").val()
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8084/?function=searchByTitle",
        data: data,
        success: function (result) {
            disableMoviePreloader();
            $("#search_form_result").html(result);
            enableAddMovieButtons();

        }
    });

    return false;
}

function genreFormHandler() {
    enableMoviePreloader();
    data = {
        'genres': [$("#genre_form_select").val()]
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8084/?function=searchByGenres",
        data: data,
        success: function (result) {
            disableMoviePreloader();
            $("#search_form_result").html(result);
            enableAddMovieButtons();
        }
    });

    return false;
}

function showRecommendationsHandler() {
    enableMoviePreloader();
    $.ajax({
        url: "http://localhost:8081/users/" + getUsername(),
        type: "GET",
        data: "",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': `Bearer ` + getUserToken(),
        },
        success: function (result) {
            data = {
                'moviesIds': result.data.movies
            };

            $.ajax({
                type: "POST",
                url: "http://localhost:8084/?function=recommend",
                data: data,
                success: function (result) {
                    disableMoviePreloader();
                    $("#search_form_result").html(result);
                    enableAddMovieButtons();
                }
            });
        },
    });
}