/*
* Fix an issue with CKEditor adding a bunch of non-breaking spaces on paste
* @author Greg Rotter
*/
jQuery(document).ready(function() {
  CKEDITOR.on('instanceReady', function (ev) {
    ev.editor.on('paste', function (e) {
      var str = e.data.dataValue;
      e.data.dataValue = str.replace(/&nbsp;/g, ' ');
    });
  });
});
