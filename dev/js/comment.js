/* eslint-disable no-undef */



$(function() {
    var commentForm;


    //add
    $('#new #reply').on('click', function() {
        commentForm= $('form.comment').clone(true,true);
        if ($(this).attr('id')==='new'){
            commentForm.appendTo('.comment-list');
        }

        
    });


    $('form.comment .send').on('click', function(e) {
        e.preventDefault();
    
        var data = {
          body: $('#post-body').html(),
        };
    
        //console.log(data);
        $.ajax({ //axios
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/post/add'
        }).done(function(data){
            console.log(data);
            $(location).attr('href', '/');
        });
    
      });
});

/* eslin-enable no-undef */
