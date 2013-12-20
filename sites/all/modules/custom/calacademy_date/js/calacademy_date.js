(function ($) {
	
	var _confirmClosure = function (el, type, field) {
		if (type != "select") {
			if (!$(el).attr("checked")) return;
		}
		
		if (!confirm("This category should only be used for museum-wide closures and will suppress all overlapping events. Are you sure you want to do this?")) {
			$(el).removeAttr("checked");
			
			if (type == "radio") {
				$("input", field).each(function () {
					if ($(this).val() == field.originalValue) {
						$(this).attr({
							checked: "checked"
						});
					}
				});
			}
			
			if (type == "select") {
				$("option", field).each(function () {
					if ($(this).val() == field.originalValue) {
						$(this).attr({
							selected: "selected"
						});
					}
				});
			}
		}
	}

	Drupal.behaviors.calacademy_date = {
		attach: function (context, settings) {			
			// confirm closure check
			$(".field-name-field-category").each(function () {
				var type;
				
				if ($("select", this).length > 0) {
					type = "select";
					
					var selected = $("option:selected", this);
					
					if (selected.length == 1) {
						this.originalValue = selected.val();
					}
				} else {
					type = $("input", this).attr("type");
					
					// skip anything else that isn't a checkbox or radio
					if (type != "radio" && type != "checkbox") return;
					
					if (type == "radio") {
						var checked = $("input:checked", this);
						
						if (checked.length == 1) {
							this.originalValue = checked.val();
						}
					}
				}
				
				var field = this;
				
				$("input, select", field).change(function () {					
					var el = (type == "select") ? $("option:selected", this) : $(this);
					var label;
					
					if (type == "select") {
						label = el.text();
					} else {
						label = el.next("label").text();
					}

					switch (label.toLowerCase().trim()) {
						case "museum closure":
							_confirmClosure(this, type, field);
							break;
						default:
							field.originalValue = el.val();
					}
				});
			});
		}
	}; 

})(jQuery);
