console.log("Works");

//Назначить Cookie
var date = new Date(new Date().getTime() + 60 * 1000);
document.cookie = "login=value; path=/; expires=" + date.toUTCString();
document.cookie = "password=123sd; path=/; expires=" + date.toUTCString();




$(document).ready(function () {
    
    $('.form-signin').on('submit', function () {
        //evt.preventDefault();
        var action = $(this).attr('action');
        var container = $('.messageSubmit');
        // $.ajax({
        //     url: action,
        //     type: 'POST',
        //     data: $(this).serialize(),
        //     success: function (data) {
        //         if (data.success) {
                    container.html('<h2>Спасибо!</h2>');
        //         } else {
        //             container.html('Возникла проблема.');
        //         }
        //     },
        //     error: function () {
        //         container.html('Возникла проблема.');
        //     }
        // });
    });


    
});
