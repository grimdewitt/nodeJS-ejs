/* eslint-disable no-undef */

$(function()  {
    // eslint-disable-next-line
  var editor = new MediumEditor('#post-body', {
    placeholder: {
      text: '',
      hideOnClick: true
    }
  });

  //publish
  $('.publish-button').on('click', function(e) {
    e.preventDefault();

    var data = {
      title: $('#post-title').val(),
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