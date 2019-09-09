/* eslint-disable no-undef */



$(function() {
    // register
    $('.register-button').on('click', function(e) {
        e.preventDefault();
    
        var data = {
          login: $('#register-login').val(),
          password: $('#register-password').val(),
          passwordConfirm: $('#register-password-confirm').val()
        };
    
        $.ajax({ //axios
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/register'
        }).done(function(data){
            console.log(data);
            //вот это переход
            $(location).attr('href', '/');
        });
      
    });

    // login
    $('.login-button').on('click', function(e) {
        e.preventDefault();
        var data = {
            login: $('#login-login').val(),
            password: $('#login-password').val()
          };

        $.ajax({ //axios
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/login'
        }).done(function(data){
            console.log(data);
            $(location).attr('href', '/');
        });
          
    });
});

/* eslin-enable no-undef */
