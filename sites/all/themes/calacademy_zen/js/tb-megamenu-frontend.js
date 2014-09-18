Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.menuInstance = false;
  Drupal.behaviors.tbMegaMenuAction = {
    attach: function(context) {

      var btn = $('.tb-megamenu-button');
      var myEvent = 'click';

      if (Modernizr.touch) {
        btn = btn.hammer();
        myEvent = 'tap';
      }

      btn.on(myEvent, function() {
        if(parseInt($(this).parent().children('.nav-collapse').height())) {
          $(this).parent().children('.nav-collapse').css({height: 0, overflow: 'hidden'});
        }
        else {
          $(this).parent().children('.nav-collapse').css({height: 'auto', overflow: 'visible'});
        }
      });

    }
  }
})(jQuery);

