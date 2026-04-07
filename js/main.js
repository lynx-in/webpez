function acceptCookies(){
    var site_preferences = JSON.parse($.cookie("preferences_json"));
    site_preferences["privacy"]=true;
    $.cookie('preferences_json', JSON.stringify(site_preferences), { expires: 30 });
}
function hidePops(){
    $(".pop-page").each(function() {
        $(this).removeClass( "active" );
        });
}
function togglePop($toggleId){
    if($( "#"+$toggleId ).hasClass( "active" )){
        $( "#"+$toggleId ).removeClass( "active" );
    }
    else {
    hidePops();
        $( "#"+$toggleId ).addClass( "active" );
    }
}
$(window).scroll(function () {
    var $heightScrolled = $(window).scrollTop();
    var $defaultHeight = 100;

    if ($heightScrolled < $defaultHeight) {
        $('header').removeClass("small");
    }
    else {
        $('header').addClass("small")
    }

});
function activateReplaceForm($formId){
    $($formId).submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.
    
        var form = $(this);
        var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                $($formId).html(data);
                $([document.documentElement, document.body]).animate({
                    scrollTop: $($formId).offset().top-100
                }, 100);
            }
        });
        
    });
}
function activateAlertForm($formId){
    $($formId).submit(function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
    
        var form = $(this);
        var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                alert(data);
            }
        });
        
    });
}
$(window).on('load', function() {
$(".replace-form").each(function() {
    activateReplaceForm("#"+$(this).attr("id"));
  });

$(".alert-form").each(function() {
    activateAlertForm("#"+$(this).attr("id"));
  });

$("header ul").each(function(index, element) {
    $(element).append('<li class="close-button"><span class="material-icons">cancel</span></li>');
  });

$(".minus-btn").each(function() {
    $(this).click(function(event) {
        event.preventDefault();
        var $input = $(this).siblings('input');
        var value = parseInt($input.val());
        $input.val(value-1< $input.attr('min') ? $input.attr('min') : value-1);
    });
  });
  
$(".plus-btn").each(function() {
    $(this).click(function(event) {
        event.preventDefault();
        var $input = $(this).siblings('input');
        var value = parseInt($input.val());
        $input.val(value+1> $input.attr('max') ? $input.attr('max') : value+1);
    });
  });
$("header li").each(function() {
    $(this).click(function() {
        $(this).siblings().children().removeClass('active');
        $(this).children("ul").addClass('active');
    });
  });
$(".close-button").unbind("click");
  $(".close-button").each(function() {
  $(this).click(function(event) {
    event.stopPropagation()
        $(this).closest("ul").removeClass('active');
    });
});
});
