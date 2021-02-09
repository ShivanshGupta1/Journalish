
    $(document).ready(function(){
      $('.carousel').carousel();
    });
  $(document).ready(function(){
    $('.pushpin-demo-nav').each(function() {
    var $this = $(this);
    var $target = $('#' + $(this).attr('data-target'));
    $this.pushpin({
      top: $target.offset().top,
      bottom: $target.offset().top + $target.outerHeight() - $this.height()
    });
  });
  });


// SIDEBAR
$(document).ready(function(){
  $('.button-collapse').sideNav({
      menuWidth: 500, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
  // START OPEN
  $('.button-collapse').sideNav('show');
});
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
  
(jQuery);