
jQuery(document).ready(function($) {
<<<<<<< HEAD
  // Hide the hero widgets.
=======
  // Display the selected Hero widget.
>>>>>>> dev
  var selected = $('.field-name-field-hero-type .form-radios input[type=\'radio\']:checked');
  if (selected.val())
  {
    hero_region_reveal_widget(selected.val());
  }
<<<<<<< HEAD
  
=======
>>>>>>> dev
  $('.field-name-field-hero-type .form-radios input').on('click', function() {
    if ($(this).val()) {
      hero_region_reveal_widget($(this).val());
    }
  });
});

function hero_region_reveal_widget(widget)
{
  var className = null;
  
  // Hide widgets unless the widget is excluded.
  if (widget != 'image-standard')
  {
    jQuery('.field-name-field-hero-region .field-name-field-image-primary').addClass('element-invisible');
  }
  if (widget != 'image-large')
  {
    jQuery('.field-name-field-hero-region .field-name-field-image-primary-large').addClass('element-invisible');
  }
  if (widget != 'slideshow-standard')
  {
    jQuery('.field-name-field-hero-region .field-name-field-hero-slideshow').addClass('element-invisible');
  }
  if (widget != 'slideshow-large')
  {
    jQuery('.field-name-field-hero-region .field-name-field-hero-slideshow-large').addClass('element-invisible');
  }

  switch (widget)
  {
    case 'image-standard':
      className = '.field-name-field-image-primary';
      break;
      
    case 'image-large':
      className = '.field-name-field-image-primary-large';
      break;
      
    case 'slideshow-standard':
      className = '.field-name-field-hero-slideshow';
      break;
      
    case 'slideshow-large':
      className = '.field-name-field-hero-slideshow-large';
      break;
  }

  jQuery('.field-name-field-hero-region ' + className + '').removeClass('element-invisible');
}