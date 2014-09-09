jQuery(document).ready(function($) {
  $('#node_person_form_group_more_info_pressexperts').addClass('element-invisible');
  $("select#edit-field-person-category-und").on('change', function () {
    if ($(this).val() == 576) {
      $('#node_person_form_group_more_info_pressexperts').removeClass('element-invisible');
    }
    else {
      $('#node_person_form_group_more_info_pressexperts').addClass('element-invisible');
    }
  });
});
