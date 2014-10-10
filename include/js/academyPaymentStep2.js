gts.paymentStep = (function($) {
    var model = {};    
    var settings = {
        selector: "#step-payment",
        template: "#payment-step-template",
        stepsElement: "#steps",
        name: "Payment Information",
        cart: {},
        cartTotalsTemplate: "#cart-totals-template",
        cartTotalsSelector: "#Cart",
        donationInfoSelector: "#donation-info",
        donationAutoRoundUpTemplate: "#auto-donation-template",
        donationRoundUpTemplate: "#roundup-donation-template",
        donationFixedTemplate: "#fixed-donation-template",
        donationEditableTemplate: "#editable-donation-template",
        donationAutoRoundUpRemoveButton: "#donation-auto input",
        donationRoundUpButton: "#donation-roundup input",
        donationFixedButton: "#donation-fixed input",
        donationEditableButton: "#donation-editable-button",
        donationAmountSelector: "#donation-editable-amount",
        contactAddressSelector: "#contact-address ul",
        contactAddressTemplate: "#contact-address-template",
        currentContactSelector: "ul.existing-contacts",
        contactLinkButtonSelector: "ul.existing-contacts li .link",
        contactUnlinkButtonSelector: "ul.existing-contacts li .unlink"
        };
    var loaded;
    
    /*
    Supported events:

    on.load()  // Called when this step is navigated to.
    */
    var on = {
        load: onLoad
    };

    model.add = function (options) {
        $.extend(settings, options.settings);
        $.extend(on, options.on);

        renderStep();

        var newStep = {
            selector: settings.selector,
            name: settings.name,
            data: model,
            on: {
                beforeNext: on.beforeNext,
                load: on.load
            }
        };

        gts.checkoutSteps.AddStep(newStep);

        return $.when();
    };

    function onLoad() {
        if (!loaded) {
            gts.checkoutUI.init({
                checkoutForm: $("#checkout-form"),
                cart: settings.cart,
                on: {
                    updateCartTotals: updateCartTotals
                }
            });
            showDonationOptions();
            initNavigation();
        }

        showContactAddress();
        gts.checkoutBillingContact.get();
        gts.checkoutShippingContact.get();

        loaded = true;
    }

    function initNavigation() {
        $(settings.selector).off("click", settings.donationAutoRoundUpRemoveButton, removeAutoDonation);
        $(settings.selector).on("click", settings.donationAutoRoundUpRemoveButton, removeAutoDonation);
        $(settings.selector).off("click", settings.donationRoundUpButton, addRoundUpDonation);
        $(settings.selector).on("click", settings.donationRoundUpButton, addRoundUpDonation);
        $(settings.selector).off("click", settings.donationFixedButton, addFixedDonation);
        $(settings.selector).on("click", settings.donationFixedButton, addFixedDonation);
        $(settings.selector).off("click", settings.donationEditableButton, addEditableDonation);
        $(settings.selector).on("click", settings.donationEditableButton, addEditableDonation);
        $(settings.selector).off("click", settings.contactLinkButtonSelector, handleLinkCurrentContact);
        $(settings.selector).on("click", settings.contactLinkButtonSelector, handleLinkCurrentContact);
        $(settings.selector).off("click", settings.contactUnlinkButtonSelector, handleUnlinkCurrentContact);
        $(settings.selector).on("click", settings.contactUnlinkButtonSelector, handleUnlinkCurrentContact);
    }

    function addDonation(donation) {
        return gts.eGalaxyWebAPI.donation.post(donation)
            .done(function() {
                hideDonationOptions();
            })
            .fail(function() {

            });
    }

    function deleteDonation() {
        gts.eGalaxyWebAPI.donation.Delete()
            .done(function() {
                hideDonationOptions();
            })
            .fail(function() {

            });
    }

    function addEditableDonation(e) {
        e.preventDefault();
        var amount = $(settings.selector).find(settings.donationAmountSelector).spinner("value");
        if (!amount)
            return;
        
        var donation = { DonationType: gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInEditable, Amount: amount };
        addDonation(donation);
    }

    function addFixedDonation(e) {
        e.preventDefault();
        var donation = { DonationType: gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInFixed };
        addDonation(donation);
    }

    function addRoundUpDonation(e) {
        e.preventDefault();
        var donation = { DonationType: gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInRoundUp };
        addDonation(donation);
    }
    
    function removeAutoDonation(e) {
        e.preventDefault();
        deleteDonation();
    }
    
    function hideDonationOptions() {
        $(settings.selector).find(settings.donationInfoSelector).slideUp();
        refreshCartTotals();
    }

    function showOptOutDonation() {
        var donation = gts.donationService.currentDonation(settings.cart.Items);
        if (donation) {
            var markup = $.trim($(settings.donationAutoRoundUpTemplate).render(donation));
            $(settings.selector).find(settings.donationInfoSelector).html(markup);
        }
    }

    function showOptInDonation() {
        var markup = $.trim($(settings.donationRoundUpTemplate).render({}));
        $(settings.selector).find(settings.donationInfoSelector).html(markup);
    }

    function showOptInFixedDonation() {
        var markup = $.trim($(settings.donationFixedTemplate).render({}));
        $(settings.selector).find(settings.donationInfoSelector).html(markup);
    }

    function showOptInEditableDonation() {
        gts.eGalaxyWebAPI.donation.get()
            .done(function(donation) {
                var markup = $.trim($(settings.donationEditableTemplate).render({}));
                $(settings.selector).find(settings.donationInfoSelector).html(markup);

                $(settings.selector).find(settings.donationAmountSelector).spinner({
                    min: donation.MinimumAmount,
                    max: donation.MaximumAmount,
                    step: 0.01,
                    start: donation.StartingAmount,
                    numberFormat: "C"
                }).spinner("value", donation.StartingAmount);
            });
    }
    
    function showDonationOptions() {
        var donationPromptType = settings.cart.CheckoutOptions.DonationPromptType;
        if (!donationPromptType || donationPromptType === gts.eGalaxyWebAPI.Cart.DonationPromptTypes.None)
            return;

        if (donationPromptType === gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptOut) {
            showOptOutDonation();
        } else if (donationPromptType === gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInRoundUp) {
            showOptInDonation();
        } else if (donationPromptType === gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInFixed) {
            showOptInFixedDonation();
        } else if (donationPromptType === gts.eGalaxyWebAPI.Cart.DonationPromptTypes.OptInEditable) {
            showOptInEditableDonation();
        }
    }

    function showContactAddress() {
        gts.eGalaxyWebAPI.contacts.get()
            .done(function (data) {
                if (data === null) {
                    return;
                }

                var billToId = 0;
                var contact;
                var contacts = [];

                for (var i = 0; i < data.length; i++) {
                    contact = data[i];
                    var displayContact = {};

                    displayContact.Id = contact.Id;
                    displayContact.ContactGuid = contact.ContactGuid;
                    displayContact.Linked = contact.IsBillTo;

                    if (displayContact.Linked) {
                        billToId = displayContact.Id;
                    }
                    
                    displayContact.FirstName = contact.FirstName;
                    displayContact.LastName = contact.LastName;
                    displayContact.Name = displayContact.FirstName + " " + displayContact.LastName;

                    displayContact.Address1 = contact.StreetAddress1;
                    displayContact.Address2 = contact.StreetAddress2;

                    contacts.push(displayContact);
                }

                var markup = $.trim($(settings.contactAddressTemplate).render(contacts));
                $(settings.selector).find(settings.contactAddressSelector).html(markup);

                $(settings.selector).find(settings.contactUnlinkButtonSelector).hide();

                if (billToId > 0) {
                    $(settings.selector).find(settings.contactAddressSelector).find("li[data-id=" + billToId + "]").find(".unlink").show();
                    $(settings.selector).find(settings.contactAddressSelector).find("li[data-id=" + billToId + "]").find(".link").hide();
                }
        });
    }

    function renderStep() {
        $(settings.stepsElement).append($.trim($(settings.template).render(settings.cart)));

        updateCartTotals(settings.cart);
    }
    
    function redirectToError() {
        window.location = "../error.aspx";
    }
    
    function refreshCartTotals() {
        gts.eGalaxyWebAPI.Cart.Get()
            .done(function (cart) {
                updateCartTotals(cart);
            })
            .fail(redirectToError);
    }
    
    function updateCartTotals(cartData) {
        settings.cart = cartData;
        var cartTotals = {
            Subtotal: Globalize.format(settings.cart.Totals.Subtotal, "c"),
            Fees: Globalize.format(settings.cart.Totals.Fees, "c"),
            Tax: Globalize.format(settings.cart.Totals.Tax, "c"),
            Shipping: Globalize.format(settings.cart.Totals.Shipping, "c"),
            Total: Globalize.format(settings.cart.Totals.Total, "c"),
            Discount: Globalize.format(settings.cart.Totals.Discount, "c")
        };
        
        $(settings.cartTotalsSelector).html($.trim($(settings.cartTotalsTemplate).render(cartTotals)));
    }

    function handleLinkCurrentContact(e) {
        e.preventDefault();
        var contactId = $(this).closest(settings.currentContactSelector + " li").data("id");
        gts.checkoutBillingContact.select(settings, contactId);
        showContactAddress();
    }

    function handleUnlinkCurrentContact(e) {
        e.preventDefault();
        gts.checkoutBillingContact.New(settings);
        showContactAddress();
    }

    return model;
})(jQuery);

gts.donationService = (function() {
    var model = {};

    model.currentDonation = function (cartItems) {
        if (!cartItems) return undefined;
        var cartItem;
        for (var i = 0; i < cartItems.length; i++) {
            cartItem = cartItems[i];
            if (cartItem.ProductType === gts.eGalaxyWebAPI.Cart.ProductTypes.Donation) {
                return cartItem;
            }
        }
        return undefined;
    };

    return model;
})();

// Legacy modules that need to be rewritten into the payment step.
gts.checkoutUI = (function ($) {
    var model = {};
    var doNothing = function () {};
    var settings = {
        cart: {}
    };
    var on = {
        updateCartTotals: doNothing
    };
    
    model.init = function (options) {
        $.extend(settings, options);

        if (!options.checkoutForm) {
            throw ("A jQuery wrapped form must be provided to gts.checkoutUI.init");
        }

        if (!$.blockUI) {
            throw ("jQuery BlockUI is not inculded.");
        }

        if (!gts.eGalaxyWebAPI) {
            throw ("eGalaxyWebAPI is not included.");
        }

        settings.checkoutForm = options.checkoutForm;

        initBlockUI();
        gts.checkoutExpiration.init();
        gts.checkoutDeliveryOption.init({ on: { updateCartTotals: on.updateCartTotals } });

        $.blockUI({ message: "<h3>Loading...</h3>" });

        gts.eGalaxyWebAPI.Config.Init()
            .pipe(gts.eGalaxyWebAPI.Config.ShoppingCheckout.init)
            .pipe(getCountries)
            .pipe(getDefaultCountry)
            .pipe(getStates)
            .pipe(gts.checkoutDeliveryOption.Get)
            .pipe($.unblockUI)
			.fail(redirectToError);

        gts.checkoutTermsAndConditions.init();
        gts.checkoutNewsletterSurvey.init();
        gts.checkoutConfirmOrder.init({
            on: {
                submitOrder: submitOrder
            }
        });
        gts.checkoutCVV.init();

        gts.checkoutGuestNames.init();
        options.checkoutForm.submit(function (e) {
            try {
                e.preventDefault();

                if (!options.checkoutForm.validate) {
                    throw "missing validation plugin";
                }

                gts.checkoutValidation.validate();
                var valid = options.checkoutForm.valid();
                if (!valid) {
                    return false;
                }

                orderConfirmation();
            }
            catch (error) {
                gts.checkoutUI.JSError(error);
            }
        });

        gts.checkoutValidation.init();

        activateAddress2Link();
    };

    function orderConfirmation() {
        if (gts.eGalaxyWebAPI.Config.ShoppingCheckout.DisplayOrderConfirmationPrompt) {
            $.unblockUI();
            gts.checkoutConfirmOrder.Prompt();
        } else {
            submitOrder();
        }
    }

    function isZeroDollarTransaction() {
        return (settings.cart.CheckoutOptions.AllowZeroDollarTransactions && settings.cart.Totals.Total <= 0);
    }

    function verifyPayment() {
        // Don't send a payment if one isn't required. If one isn't sent and it is required, it will error.
        if (settings.cart.CheckoutOptions.IsIndirectPaymentProvider || isZeroDollarTransaction()) {
            return $.when();
        }
        return gts.checkoutPayment.Post();
    }
    
    function submitOrder() {
        var steps = function () { };

        $.blockUI();

        if (!gts.checkoutGuestNames.Processed()) {
            steps = gts.checkoutBillingContact.save()
                .pipe(gts.checkoutShippingContact.save)
                .pipe(gts.checkoutNewsletterSurvey.Post)
                .pipe(gts.checkoutGuestNames.Process)
                .pipe(verifyPayment);
        } else if (!gts.checkoutPayment.Posted()) {
            steps = gts.checkoutBillingContact.save()
                .pipe(gts.checkoutShippingContact.save)
                .pipe(gts.checkoutNewsletterSurvey.Post)
                .pipe(verifyPayment);
        }

        if (isZeroDollarTransaction() || !settings.cart.CheckoutOptions.IsIndirectPaymentProvider)
            steps = steps.pipe(gts.eGalaxyWebAPI.finalizeOrder.post);

        steps
            .done(function () {
                if (!isZeroDollarTransaction() && settings.cart.CheckoutOptions.IsIndirectPaymentProvider)
                    window.location = "PaymentPOST.ashx";
                else
                    window.location = "OrderConfirmation.aspx";
            })
            .fail(function () {
                $.unblockUI();
                $("#ErrorMessage").html("An unexpected error has occurred.");
            })
            .always(function () {

            });
    }
    
    function getCountries() {
        return gts.countries.Get($("#Countries"));
    }

    function getDefaultCountry() {
        var defaultCountry = gts.countries.DefaultCountry();
        $("#Countries").val(defaultCountry);

        $("#Countries").change(function () {
            getStates();
        });
    }

    function getStates() {
        var countryCode = $("#Countries option:selected").val();
        return gts.states.Get(countryCode, $("#States"), $("#State"));
    }

    function initBlockUI() {
        $.blockUI.defaults.fadeIn = 0;
        $.blockUI.defaults.fadeOut = 100;
        $.blockUI.defaults.message = "<h3>Processing...</h3>";
    }

    function activateAddress2Link() {
        settings.checkoutForm.on("click", ".additional-address", function (e) {
            e.preventDefault();
            $(".address2-form-field").slideDown().find('input').focus();
            $(this).hide();
        });
    }

    function redirectToError() {
        window.location = "../error.aspx";
    }

    model.JSError = function (error) {
        $("#ErrorMessage").html("An unexpected error has occurred.");
        $("#ErrorMessage").addClass("error-message");
        throw new Error(error.message); // throw new error so that js execution stops
    };

    model.DisplayError = function (data) {
        if (!data || !data.responseText) {
            model.JSError(data);
        }
        var message = $.parseJSON(data.responseText);
        $("#ErrorMessage").html(message);
        $("#ErrorMessage").addClass("error-message");
    };

    return model;

}(jQuery));

gts.checkoutValidation = (function () {
    var model = {};

    model.init = function () {
        $.validator.addMethod("requireChecked", function (value, element) {
            return $(element).is(":checked");
        }, "");

        $.validator.addMethod("valueNotEqual", function (value, element, notEqualValue) {
            return notEqualValue !== value;
        }, "");

        model.validate();
    };

    model.validate = function () {
        // Remove the previous validator information, otherwise this validate call does nothing.
        $.removeData($("#checkout-form")[0], "validator");

        $("#checkout-form").validate({
            rules: {
                FirstName: { required: true, onfocusout: false },
                LastName: { required: true, onfocusout: false },
                Endorsement: { required: true, creditcard: true },
                ExpirationMonth: { required: true, valueNotEqual: "label" },
                ExpirationYear: { required: true, valueNotEqual: "label" },
                CVV: { required: true, onfocusout: false },
                Address: { required: true },
                City: { required: true },
                Countries: { required: true },
                States: { required: "#States:visible" },
                State: { required: "#State:visible" },
                Zip: { required: true },
                Email: { required: true, email: true },
                DeliveryOption: { required: true, valueNotEqual: "label" },
                TermsConditions: { requireChecked: true }
            },
            messages: {
                TermsConditions: { requireChecked: "You must agree to the terms and conditions." }
            },
            errorClass: "input-validation-error",
            errorPlacement: function (error, element) {
                if (element.attr("name") === "TermsConditions") {
                    error.insertAfter(".terms-conditions-form-field");
                }
            },
            errorElement: "div",
            onfocusin: false,
            onfocusout: false
        });
    };

    return model;
})();

gts.checkoutExpiration = (function ($) {
    var model = {};

    model.init = function () {
        initMonth();
        initYear();
    };

    function initMonth() {
        $("#ExpirationMonth").empty();
        $("#ExpirationMonth").append("<option value='label'>month</option>");

        for (var month = 1; month < 13; month++) {
            $("#ExpirationMonth").append("<option value=" + month + ">" + month + "</option>");
        }
    }

    function initYear() {
        $("#ExpirationYear").empty();
        $("#ExpirationYear").append("<option value='label'>year</option>");

        var currentYear = new Date().getFullYear();
        for (var year = currentYear; year < currentYear + 17; year++) {
            $("#ExpirationYear").append("<option value=" + year + ">" + year + "</option>");
        }
    }

    return model;
})(jQuery);

gts.countries = (function ($) {
    var model = {};
    var countriesCache = {};
    var loaded = false;

    model.DefaultCountry = function () {
        return gts.eGalaxyWebAPI.Config.General.DefaultCountryCode;
    };

    model.Get = function (countriesInput) {
        if (loaded) {
            populateCountries(countriesCache, countriesInput);
            return $.when();
        }

        return gts.eGalaxyWebAPI.Countries.Get(function (data) {
            countriesCache = data;
            loaded = true;

            populateCountries(data, countriesInput);
        }, onError);
    };

    function populateCountries(countries, countriesInput) {
        countriesInput.empty();

        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            var option = $("<option></option>").text(country.Name).val(country.Code);
            countriesInput.append(option);
        }
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;

})(jQuery);

gts.states = (function ($) {
    var model = {};
    var statesCache = {};

    model.SelectedValue = function (selectInput, textInput) {
        return (selectInput.is(":visible")) ? selectInput.find("option:selected").val() : textInput.val();
    };

    model.Get = function (countryCode, selectInput, textInput) {
        var data = {};
        data.CountryCode = countryCode;

        if (statesCache[data.CountryCode] && statesCache[data.CountryCode].length > 0) {
            populateStates(statesCache[data.CountryCode], selectInput, textInput);
            return $.Deferred().resolve().promise();
        }

        return gts.eGalaxyWebAPI.States.Get(data, function (result) {
            statesCache[data.CountryCode] = result;
            populateStates(result, selectInput, textInput);
        }, onError);
    };

    function populateStates(states, selectInput, textInput) {
        selectInput.empty();
        textInput.val("");

        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            var option = $("<option></option>").text(state.Name).val(state.Abbreviation);

            if (state.DefaultLocale) {
                option.attr("selected", "selected");
            }
            selectInput.append(option);
        }

        toggleVisibility(selectInput, textInput);
    }

    function toggleVisibility(selectInput, textInput) {
        var count = selectInput.find("option").length;

        if (count === 0) {
            selectInput.hide();
            textInput.show();
        } else {
            selectInput.show();
            textInput.hide();
        }
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
})(jQuery);

gts.checkoutConfirmOrder = (function ($) {
    var model = {};

    var on = {
        submitOrder: function () { }
    };
    
    model.init = function (options) {
        $.extend(on, options.on);

        $("#ConfirmOrderDialog").dialog({
            autoOpen: false,
            modal: true,
            dialogClass: "dialogButtons",
            resizable: false,
            width: 450,
            title: "Confirm Order",
            buttons: [
				{
				    text: "Cancel",
				    click: function () {
				        $(this).dialog("close");
				    }
				},
				{
				    text: "OK",
				    click: function () {
				        $(this).dialog("close");
				        on.submitOrder();
				    }
				}
            ],
            open: function () {
                $("div.dialogButtons div button:nth-child(2)").focus();
            }

        });

        $("div.dialogButtons div button:nth-child(1)").addClass("cancelButton");
        $("div.dialogButtons div button:nth-child(2)").addClass("okButton");
    };

    model.Prompt = function () {
        try {
            var billing = getBilling();
            $("#ConfirmOrderBilling .text").html(billing);

            var maskedCreditCard = getMaskedCreditCard();
            $("#ConfirmOrderMaskedCardNumber .text").html(maskedCreditCard);

            var deliveryMethod = getDeliveryMethod();
            $("#ConfirmOrderDeliveryMethod .text").html(deliveryMethod);

            $("#ConfirmOrderDialog").dialog("open");
            $(".ui-dialog-titlebar").show();
        }
        catch (error) {
            gts.checkoutUI.JSError(error);
        }
    };

    function getBilling() {
        var billing;
        billing = $("#FirstName").val() + " " + $("#LastName").val() + "<br />";
        billing += $("#Address").val() + "<br />";

        if ($("#Address2").val() !== "") {
            billing += $("#Address2").val() + "<br />";
        }

        billing += $("#City").val() + " " + gts.states.SelectedValue($("#States"), $("#State")) + ", " + $("#Zip").val() + "<br />";
        billing += "<br />Email: " + $("#Email").val() + "<br />";

        if ($("#PhoneNumber").val() !== "") {
            billing += "Phone: " + $("#PhoneNumber").val() + "<br />";
        }
        return billing;
    }

    function getMaskedCreditCard() {
        var startPos = $("#Endorsement").val().length - 4;
        var lastFour = $("#Endorsement").val().substr(startPos, 4);
        return "xxxx-xxxx-xxxx-" + lastFour;
    }

    function getDeliveryMethod() {
        return $('#DeliveryOption option:selected').text();
    }

    return model;
}(jQuery));

gts.checkoutOrder = (function ($) {
    var model = {};
    var orderData;

    model.Data = function () {
        return orderData;
    };

    model.Get = function () {
        return gts.eGalaxyWebAPI.Order.Get(onGet, onError);
    };

    function onGet(data) {
        orderData = data;
        var total = Globalize.format(data.Totals.Total, "c");
        $("#TotalValue").html(total);
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));


gts.checkoutBillingContact = (function ($) {
    var model = {};
    var billingContactId;

    model.get = function () {
        return gts.eGalaxyWebAPI.BillingContact.get(onGet, onError);
    };

    model.New = function (settings) {
        billingContactId = 0;
        var data = {};

        return gts.eGalaxyWebAPI.BillingContact.post(data)
            .done(function (returnData) {
                billingContactId = returnData.Id;
                clearDisplay();

                $(settings.selector).find(settings.contactUnlinkButtonSelector).hide();
                $(settings.selector).find(settings.contactLinkButtonSelector).show();
            })
            .fail(function() {
                gts.checkoutUI.DisplayError(data);
            });
    };

    model.save = function () {
        var data = {};

        data.Id = billingContactId;
        data.FirstName = $("#FirstName").val();
        data.MiddleName = $("#MiddleName").val();
        data.LastName = $("#LastName").val();
        data.StreetAddress1 = $("#Address").val();
        data.StreetAddress2 = $("#Address2").val();
        data.City = $("#City").val();
        data.State = gts.states.SelectedValue($("#States"), $("#State"));
        data.PostalCode = $("#Zip").val();
        data.CountryCode = $('#Countries option:selected').val();
        data.EmailAddress = $("#Email").val();
        data.PhoneNumber = $("#PhoneNumber").val();

        if (data.Id) {
            return gts.eGalaxyWebAPI.BillingContact.put(data, onPost, onError);
        } else {
            return gts.eGalaxyWebAPI.BillingContact.post(data, onPost, onError);
        }
    };

    model.select = function (settings, contactId) {
        var data = {};
        data.Id = contactId;

        return gts.eGalaxyWebAPI.BillingContact.put(data)
            .done(function (contactData) {
                $(settings.selector).find(settings.contactAddressSelector).find("li[data-id=" + data.Id + "]").find(".unlink").show();
                $(settings.selector).find(settings.contactAddressSelector).find("li[data-id=" + data.Id + "]").find(".link").hide();

                if (billingContactId === data.Id) return;

                billingContactId = data.Id;

                $("#FirstName").val(contactData.FirstName);
                $("#LastName").val(contactData.LastName);
                $("#Address").val(contactData.StreetAddress1);
                $("#Address2").val(contactData.StreetAddress2);
                $("#City").val(contactData.City);

                // Don't change the default values if we just don't have a billing contact.
                if (data.Country) {
                    $("#Countries").val(contactData.Country);
                }
                if (contactData.State) {
                    $("#States, #State").val(contactData.State);
                }

                $("#Zip").val(contactData.PostalCode);
                $("#Email").val(contactData.EmailAddress);
                $("#PhoneNumber").val(contactData.PhoneNumber);
            })
            .fail(function () {
                gts.checkoutUI.DisplayError(contactData);
            });
    };

    function clearDisplay() {
        $("#FirstName").val("");
        $("#LastName").val("");
        $("#Address").val("");
        $("#Address2").val("");
        $("#City").val("");

        // TODO: set the defaults if we do not have values

        $("#Zip").val("");
        $("#Email").val("");
        $("#PhoneNumber").val("");
    }

    function updateDisplay(data) {
    }

    function onGet(data) {
        billingContactId = data.Id;

        $("#FirstName").val(data.FirstName.Value);
        $("#LastName").val(data.LastName.Value);
        $("#Address").val(data.StreetAddress1.Value);
        $("#Address2").val(data.StreetAddress2.Value);
        $("#City").val(data.City.Value);

        // Don't change the default values if we just don't have a billing contact.
        if (data.Country.Value) {
            $("#Countries").val(data.Country.Value);
        }
        if (data.State.Value) {
            $("#States, #State").val(data.State.Value);
        }

        $("#Zip").val(data.PostalCode.Value);
        $("#Email").val(data.EmailAddress.Value);
        $("#PhoneNumber").val(data.PhoneNumber.Value);
    }

    function onPost() {
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));


gts.checkoutShippingContact = (function ($) {
    var model = {};
    var shippingContactId;

    model.get = function () {
        return gts.eGalaxyWebAPI.ShippingContact.get(onGet, onError);
    };

    model.save = function () {
        var data = {};

        data.Id = shippingContactId;
        data.FirstName = $("#FirstName").val();
        data.MiddleName = $("#MiddleName").val();
        data.LastName = $("#LastName").val();
        data.StreetAddress1 = $("#Address").val();
        data.StreetAddress2 = $("#Address2").val();
        data.City = $("#City").val();
        data.State = gts.states.SelectedValue($("#States"), $("#State"));
        data.PostalCode = $("#Zip").val();
        data.CountryCode = $('#Countries option:selected').val();
        data.EmailAddress = $("#Email").val();
        data.PhoneNumber = $("#PhoneNumber").val();

        if (data.Id) {
            return gts.eGalaxyWebAPI.ShippingContact.put(data, onPost, onError);
        } else {
            return gts.eGalaxyWebAPI.ShippingContact.post(data, onPost, onError);
        }

    };

    function onGet(data) {
        shippingContactId = data.Id;
    }

    function onPost() {
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));

gts.checkoutDeliveryOption = (function ($) {
    var model = {};
    var doNothing = function () { };
    /*
        Supported Events:
        updateCartTotals: Injected logic to do the actual DOM updating given the totals object.
    */
    var on = {
        updateCartTotals: doNothing
    };

    function getFormData() {
        var form = {};
        form.id = $('#DeliveryOption option:selected').val();
        return form;
    }

    function processDeliveryMethod() {
        var deliveryOptionValue = $('#DeliveryOption option:selected').val();
        if (!deliveryOptionValue || deliveryOptionValue === "label") {
            return;
        }

        $("#delivery-update-indicator").show();

        gts.checkoutDeliveryOption.Post()
            .done(function () {
                gts.eGalaxyWebAPI.Cart.Get(function(cartData) {
                    on.updateCartTotals(cartData);
                });
            })
            .always(function () {
                $("#delivery-update-indicator").hide();
            });
    }

    model.init = function (options) {
        $.extend(on, options.on);
        
        $("#DeliveryOption").change(function () {
            processDeliveryMethod();
        });
    };

    model.Get = function () {
        return gts.eGalaxyWebAPI.Shipping.Get(onGet, onError);
    };

    model.Post = function () {
        var data = getFormData();
        return gts.eGalaxyWebAPI.Shipping.Post(data, onPost, onError);
    };

    function onGet(data) {
        $("#DeliveryOption").empty();

        for (var i = 0, len = data.length; i < len; i++) {
            var shippingOption = data[i];
            $("#DeliveryOption").append("<option value='" + shippingOption.Id + "'>" + shippingOption.Name + "</option>");
        }
    }

    function onPost() {
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));

gts.checkoutNewsletter = (function ($) {
    var model = {};
    model.Enabled = false;

    model.OptedIn = function () {
        return $('#NewsletterOption').is(':checked') ? true : false;
    };

    model.GetDisplay = function () {
        return gts.eGalaxyWebAPI.NewsletterOptInDisplay.Get(onGet);
    };

    model.Show = function () {
        $('#Newsletter').show();
    };

    model.Hide = function () {
        $('#Newsletter').hide();
    };

    model.Post = function () {
        var data = {};
        data.OptIn = true;
        return gts.eGalaxyWebAPI.NewsletterOptIn.Post(data, onPost, onError);
    };

    function onGet(data) {
        model.Enabled = data.Enabled;
    }

    function onPost() {
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));


gts.checkoutSurvey = (function ($) {
    var model = {};
    model.Enabled = false;

    model.OptedIn = function () {
        return $('#SurveyOption').is(':checked') ? true : false;
    };

    model.GetDisplay = function () {
        return gts.eGalaxyWebAPI.SurveyOptInDisplay.Get(onGet);
    };

    model.Show = function () {
        $('#Survey').show();
    };

    model.Hide = function () {
        $('#Survey').hide();
    };

    model.Post = function () {
        return gts.eGalaxyWebAPI.SurveyOptIn.Post(onPost, onError);
    };

    function onGet(data) {
        model.Enabled = data.Enabled;
    }

    function onPost() {
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));

gts.checkoutNewsletterSurvey = (function ($) {
    var model = {};

    model.init = function () {
        gts.checkoutNewsletter.GetDisplay()
            .pipe(gts.checkoutSurvey.GetDisplay)
            .pipe(gts.checkoutNewsletterSurvey.SetDisplay);
    };

    model.OptedIn = function () {
        return $('#NewsletterSurveyOption').is(':checked') ? true : false;
    };

    model.SetDisplay = function () {
        gts.checkoutNewsletterSurvey.Hide();
        if (gts.checkoutNewsletter.Enabled && gts.checkoutSurvey.Enabled) {
            gts.checkoutNewsletterSurvey.Show();
        } else if (gts.checkoutNewsletter.Enabled) {
            gts.checkoutNewsletter.Show();
            gts.checkoutSurvey.Hide();
        } else if (gts.checkoutSurvey.Enabled) {
            gts.checkoutSurvey.Show();
            gts.checkoutNewsletter.Hide();
        } else {
            gts.checkoutSurvey.Hide();
            gts.checkoutNewsletter.Hide();
        }
    };

    model.Show = function () {
        $('#NewsletterSurvey').show();
        gts.checkoutSurvey.Hide();
        gts.checkoutNewsletter.Hide();
    };

    model.Hide = function () {
        $('#NewsletterSurvey').hide();
    };

    model.Post = function () {
        if (gts.checkoutNewsletterSurvey.OptedIn()) {
            gts.checkoutNewsletter.Post();
            gts.checkoutSurvey.Post();
        }
        else if (gts.checkoutNewsletter.OptedIn()) {
            gts.checkoutNewsletter.Post();
        }
        else if (gts.checkoutSurvey.OptedIn()) {
            gts.checkoutSurvey.Post();
        }
    };

    return model;
}(jQuery));

gts.checkoutGuestNames = (function ($) {
    var model = {};
    var processed = false;
    var deferred;

    model.init = function () {
        $("#GuestNamesDialog").dialog({
            autoOpen: false,
            modal: true,
            resizable: false,
            width: 420,
            title: "Guest Names",
            buttons: [
			    {
			        text: "OK",
			        click: function () {
			            post();
			        }
			    },
				{
				    text: "Cancel",
				    click: function () {
				        $(this).dialog("close");
				        processed = false;
				        deferred.reject("Cancelled Guest Name Dialog");
				    }
				}
            ]
        });
    };

    model.Process = function () {
        processed = false;

        // Remove error msg if it has previously been set
        $("#GuestNamesDialog #GuestNamesError").text("");
        $("#GuestNamesDialog #GuestNamesError").removeClass("error-message");

        deferred = $.Deferred();
        getGuestNamesToPrompt();

        return deferred.promise();
    };

    model.Processed = function () { return processed; };

    function getGuestNamesToPrompt() {
        return gts.eGalaxyWebAPI.GuestNames.Get(onGet, onError);
    }

    function post() {
        $.blockUI();
        var postDeferreds = [];

        $(".guest-name").each(function () {
            var id = $(this).find(".guest-id").val();
            var firstName = $(this).find(".guest-first-name").val();
            var lastName = $(this).find(".guest-last-name").val();
            var guestName = { Id: id, FirstName: firstName, LastName: lastName };

            postDeferreds.push(gts.eGalaxyWebAPI.GuestNames.Post(guestName, null, null));
        });

        // when all ajax posts are finished
        $.when.apply(null, postDeferreds)
            .done(function (data) {
                processed = true;
                deferred.resolve(data);
                $("#GuestNamesDialog").dialog("close");
            })
            .fail(onPostError);
    }

    function onGet(data) {

        if ($.isEmptyObject(data)) {
            processed = true;
            deferred.resolve(data);
            return;
        }

        // use jsrender to bind the guest name data to a template
        var guestNamesHtml = $.trim($("#GuestNamesTemplate").render(data));
        $("#GuestNamesForm").html(guestNamesHtml);
        $.unblockUI();

        // copies the last name entered in the first "last name" text box
        // to other "last name" text boxes
        $("#GuestNamesDialog .guest-last-name:first").blur(function () {
            $(".guest-last-name").val($(this).val());
        });

        // display the dialog
        $("#GuestNamesDialog").dialog("open");
    }

    function onError(data) {
        processed = false;
        deferred.reject(data);
    }

    function onPostError(data) {
        if (data && data.responseText) {
            var error = $.parseJSON(data.responseText);
            $("#GuestNamesDialog #GuestNamesError").addClass("error-message").text(error);
        }
        $.unblockUI();
    }

    return model;
}(jQuery));

gts.checkoutTermsAndConditions = (function ($) {
    var model = {};

    model.init = function () {
        $("#TermsConditionsDialog").dialog({
            autoOpen: false,
            modal: true,
            title: "Terms and Conditions",
            height: 300,
            width: 350,
            buttons: [
			{
			    text: "OK",
			    click: function () { $(this).dialog("close"); }
			}]
        });

        $("#TermsConditionsLink").click(model.Get);
    };

    model.Get = function () {
        return gts.eGalaxyWebAPI.Html.Get(gts.eGalaxyWebAPI.Html.Types.TermsAndConditions, onGet, onError);
    };

    function onGet(data) {
        $("#TermsConditionsDialog").html(data);
        $("#TermsConditionsDialog").dialog("open");
        $(".ui-dialog-titlebar").show();
    }

    function onError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
}(jQuery));

gts.checkoutCVV = (function ($) {
    var model = {};

    model.init = function () {
        $("#CVVDialog").dialog({
            autoOpen: false,
            resizable: false,
            modal: true,
            height: 550,
            width: 550,
            buttons: [
			{
			    text: "OK",
			    click: function () { $(this).dialog("close"); }
			}]
        });

        $("#CVVHelp").on("click", gts.checkoutCVV.Get);
    };

    model.Get = function () {
        $("#CVVDialog").load("CVVPopUp.aspx #CVVPopUp", onGet); // load only the #CVVPopUp div portion of the page
    };

    function onGet() {
        $("#CVVDialog").dialog("open");
        $(".ui-dialog-titlebar").hide();
        $("#CloseButton").hide(); // CVVPopUp.aspx has a close button on it we don't want
    }

    return model;
}(jQuery));

gts.checkoutPayment = (function ($) {
    var model = {};
    var posted = false;

    function getFormData() {
        try {
            var form = {};

            form.Endorsement = $("#Endorsement").val();
            form.ExpirationMonth = $("#ExpirationMonth").val();
            form.ExpirationYear = $("#ExpirationYear").val();
            form.Cvv = $("#CVV").val();

            return form;
        }
        catch (error) {
            gts.checkoutUI.JSError(error);
        }
    }

    function onPost() {
        posted = true;
    }

    function onError(data) {
        if (data.getResponseHeader('Location')) {
            window.location = data.getResponseHeader('Location');
        } else {
            posted = false;
            gts.checkoutUI.DisplayError(data);
        }
    }

    model.Post = function () {
        posted = false;
        var data = getFormData();
        return gts.eGalaxyWebAPI.Payment.Post(data, onPost, onError);
    };

    model.Posted = function () {
        return posted;
    };

    return model;
}(jQuery));

gts.checkoutNameTitles = (function () {
    var model = {};
    var nameTitlesCache = {};
    var loaded = false;

    model.Get = function (onGet, onError) {
        if (loaded) {
            if (onGet) {
                onGet(nameTitlesCache);
            }
            return $.when();
        }

        return gts.eGalaxyWebAPI.NameTitles.Get(function (data) {
            nameTitlesCache = data;
            loaded = true;
            if (onGet) {
                onGet(data);
            }
        }, function (data) {
            displayError(data);
            if (onError) {
                onError(data);
            }
        });
    };

    function displayError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
})();

gts.checkoutNameSuffixes = (function () {
    var model = {};
    var nameSuffixesCache = {};
    var loaded = false;

    model.Get = function (onGet, onError) {
        if (loaded) {
            if (onGet) {
                onGet(nameSuffixesCache);
            }
            return $.when();
        }

        return gts.eGalaxyWebAPI.NameSuffixes.Get(function (data) {
            nameSuffixesCache = data;
            loaded = true;
            if (onGet) {
                onGet(data);
            }
        }, function (data) {
            displayError(data);
            if (onError) {
                onError(data);
            }
        });
    };

    function displayError(data) {
        gts.checkoutUI.DisplayError(data);
    }

    return model;
})();