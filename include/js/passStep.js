gts.PassStep = function() {
    var model = { };

    var settings = {
        cartItem: { },
        checkoutOptions: { },
        addons: { },
        passKind: { },
        pass: { },
        id: "pass-step-1",
        name: "Membership Information",
        selector: "#pass-step-1",
        passForm: ".pass-step-form",
        jointMembership: false,
        defaultPassSameAsBilling: false,
        primaryFieldInputPrefix: "Primary1",
        adultFieldInputPrefix: "Additional1",
        childFieldInputPrefix: "Child1",
        addonFieldInputPrefix: "Addon1",
        addAdultDialog: ".new-adult-wrapper",
        addChildDialog: ".new-child-wrapper",
        addAddonDialog: ".new-addon-wrapper",
        stepsElement: "#steps",
        jointMembersElement: ".joint-members",
        childrenElement: ".children",
        childMemberElements: ".child-additions",
        adultElement: ".adults",
        adultMemberElements: ".adult-additions",
        addonsElement: ".addons",
        addonMemberElements: ".addon-additions",
        guestMemberElements: ".guests",
        passStepTemplate: "#pass-step-template",
        savedAdultTemplate: "#saved-adult-template",
        savedChildTemplate: "#saved-child-template",
        savedAddonTemplate: "#saved-addon-template",
        adultAvailableElement: ".adults .adult.available",
        childAvailableElement: ".children .child.available",
        addonAvailableElement: ".addons .addon.available",
        existingMembersSelector: "ul.existing-contacts",
        existingMemberClassName: "existing-contact",
        existingMembersCopyButtonSelector: "ul.existing-contacts li .copy",
        existingMembersLinkButtonSelector: "ul.existing-contacts li .link",
        existingMembersUnlinkButtonSelector: "ul.existing-contacts li .unlink",
        existingMemberTemplate: "#existing-contact-template",
        existingContactFocusColor: "#f0a30a"
    };

    /*
    Supported events:

    on.beforeNext(deferred)               // Gets called before moving to the next page. Use deferred object to reject or accept the change.
    on.addRule(rule)                      // Caller gets a chance to make any custom requirements on the rule as it is being added.
    on.addInputValues(rule, input)        // Allows caller to change the state of the input. You can also return a new input. Handler needs to return a promise object.
    on.load(primaryMember)                // Called when this step is navigated to.
    on.setMemberFields(inputPrefix, rules, fields) // Allows the caller to define how to set the field values before posting the additional members to the server.
    on.setFieldsFromMember(rules, member) // Allows the caller to define how to set the form values when editing an additional member.
    on.afterInputAdded(rule, input)       // Last chance to change or read values from the input.
    on.getExistingMembersInOrder()        // A way to inject the logic to look through all steps and return a collection of members from other pass steps that may exist.
    on.preventPrimaryPassSelectionStep()  // A way to inject the logic to prevent the head of household selection step from the calling code.
    on.getPrimaryPassId                   // A way to inject the logic to look through all steps and return a primary pass that may have been set from other pass steps.
    */
    var on = {
        beforeNext: validatePass,
        addRule: doNothing,
        addInputValues: doNothing,
        load: load,
        setMemberFields: doNothing,
        afterInputAdded: doNothing,
        getExistingMembersInOrder: doNothing,
        preventPrimaryPassSelectionStep: doNothing,
        getPrimaryPassId: doNothing
    };

    function doNothing() {
    }

    var loaded = false;
    var namingChildren = true;
    var linkedContactGuid;
    
    var additionalAdults = [];
    var children = [];
    var addons = [];

    var primaryMemberFieldRules = [];
    var adultMemberFieldRules = [];
    var childMemberFieldRules = [];
    var addonMemberFieldRules = [];

    var relationshipTypesCache;

    function redirectToError() {
        window.location = "../error.aspx";
    }
    
    function getPrimaryMember() {
        if (!settings.pass || !settings.pass.Members) {
            return undefined;
        }
        for (var i = 0; i < settings.pass.Members.length; i++) {
            var member = settings.pass.Members[i];
            if (member.PrimaryMember)
                return member;
        }

        return undefined;
    }

    function clearPrimaryMember() {
        if (!settings.pass || !settings.pass.Members)
            return;
            
        for (var i = 0; i < settings.pass.Members.length; i++) {
            var member = settings.pass.Members[i];
            if (member.PrimaryMember)
                settings.pass.Members[i] = {};
        }
    }
    
    function addExtendedPropertiesFromMemberCollection(memberDemographicType, collection) {
        var members = [];
        for (var i = 0; i < settings.pass.Members.length; i++) {
            var member = settings.pass.Members[i];
            if (!member.PrimaryMember && member.MemberDemographicType === memberDemographicType)
                members.push(member);
        }

        // For now, we have to assume that the members will be returned in their original order
        // because we have no other way of associating members to ids. We need to keep the
        // existing member object because it has properties that the DTO does not have.
        for (var j = 0; j < members.length; j++) {
            members[j].InputId = collection[j].InputId;
            members[j].Named = collection[j].Named;
            members[j].MemberDemographicType = collection[j].MemberDemographicType;
        }
        
        return members;
    }

    function setIdsFromAdultMembers() {
        additionalAdults = addExtendedPropertiesFromMemberCollection(gts.eGalaxyWebAPI.Member.MemberDemographicTypes.Adult, additionalAdults);
    }
    
    function setIdsFromChildMembers() {
        children = addExtendedPropertiesFromMemberCollection(gts.eGalaxyWebAPI.Member.MemberDemographicTypes.Child, children);
    }
    
    function setIdsFromAddonMembers() {
        addons = addExtendedPropertiesFromMemberCollection(gts.eGalaxyWebAPI.Member.MemberDemographicTypes.Addon, addons);
    }

    // Expose the saved pass to the calling code.
    model.currentPass = function() {
        return settings.pass;
    };
    
    model.Add = function(options) {
        // Deep copy so that we get our own set of pass rules.
        $.extend(true, settings, options.settings);
        $.extend(on, options.on);

        if (!gts.checkoutSteps) {
            throw ("Checkout Steps module is not included.");
        }

        if (!gts.formGenerator) {
            throw ("Form Generator module is not included.");
        }

        if (!$(settings.selector).find(settings.passForm).validate) {
            throw ("jQuery validation is not included.");
        }

        if (!gts.eGalaxyWebAPI) {
            throw ("eGalaxyWebAPI is not included.");
        }

        if (!gts.countries) {
            throw ("Countries module is not included.");
        }

        if (!gts.states) {
            throw ("States module is not included.");
        }

        if (!$.render) {
            throw ("jsRender is not included.");
        }

        // Return any initialization tasks that may take a while to complete before you say that this step is added.
        return getProduct()
            .pipe(getPassKind)
            .pipe(getExistingPass)
            .pipe(initJointMembership);
    };

    function initNavigation() {
        $(settings.selector).off("click", settings.existingMembersCopyButtonSelector, copyExistingMemberToCurrent);
        $(settings.selector).on("click", settings.existingMembersCopyButtonSelector, copyExistingMemberToCurrent);
        $(settings.selector).off("click", settings.existingMembersLinkButtonSelector, copyExistingMemberToCurrent);
        $(settings.selector).on("click", settings.existingMembersLinkButtonSelector, copyExistingMemberToCurrent);
        $(settings.selector).off("click", settings.existingMembersUnlinkButtonSelector, handleUnlinkCurrentUser);
        $(settings.selector).on("click", settings.existingMembersUnlinkButtonSelector, handleUnlinkCurrentUser);
    }
    
    function setNewMemberDefaults(member, pass) {
        member.Named = true;
        // InputId is only for the client to know what the data-id of the UI element is.
        member.InputId = newGuid();
        member.PassId = pass.Id,
        member.OrderLineId = settings.cartItem.Id,
        member.UsePassAsBilling = false,
        member.PrimaryMember = false;
    }
        
    function renderExistingAdults(pass) {
        for (var i = 0; i < additionalAdults.length; i++) {
            var member = additionalAdults[i];

            setNewMemberDefaults(member, pass);
            
            renderMember(member, settings.savedAdultTemplate, settings.adultMemberElements, settings.addAdultDialog, "+1 adult");
            displayNumberOfAdults();

            if (!canAddMoreAdults()) {
                $(settings.selector).find(settings.adultAvailableElement).hide();
            }
        }
    }

    function renderExistingChildren(pass) {
        for (var i = 0; i < children.length; i++) {
            var member = children[i];

            setNewMemberDefaults(member, pass);

            renderMember(member, settings.savedChildTemplate, settings.childMemberElements, settings.addChildDialog, "+1 child");
            displayNumberOfChildren();

            if (!canAddMoreChildren()) {
                $(settings.selector).find(settings.childAvailableElement).hide();
            }
        }
    }

    function renderExistingAddons(pass) {
        for (var i = 0; i < addons.length; i++) {
            var member = addons[i];
            var addonOrderLineId = member.OrderLineId;
            var addonPlu = member.Plu;
            
            setNewMemberDefaults(member, pass);
            member.OrderLineId = addonOrderLineId;
            member.Plu = addonPlu;

            renderMember(member, settings.savedAddonTemplate, settings.addonMemberElements, settings.addAddonDialog, getAddonNameFromPlu(member.Plu));
            displayNumberOfAddons();

            if (!canAddMoreAddons()) {
                $(settings.selector).find(settings.addonAvailableElement).hide();
            }
        }
    }

    function matchUpAddonWithCartItem(plu) {
        for (var i = 0; i < settings.addons.length; i++) {
            var availableAddon = settings.addons[i];
            if ($.trim(availableAddon.Plu) === $.trim(plu) && !availableAddon.Used) {
                availableAddon.Used = true;
                return availableAddon;
            }
        }
    }

    function renderExistingMembers(pass) {
        additionalAdults = $.grep(pass.Members, function (adultMember) {
            return adultMember.MemberDemographicType === gts.eGalaxyWebAPI.Member.MemberDemographicTypes.Adult && !adultMember.PrimaryMember;
        });
        renderExistingAdults(pass);

        children = $.grep(pass.Members, function (childMember) {
            return childMember.MemberDemographicType === gts.eGalaxyWebAPI.Member.MemberDemographicTypes.Child;
        });
        renderExistingChildren(pass);

        // Only add addons up to the limit of our cart items. If the previous pass had 2 addons but we only want one in our renewal, only add the first.
        addons = [];
        for (var i = 0; i < pass.Members.length; i++) {
            var member = pass.Members[i];

            if (member.MemberType === gts.eGalaxyWebAPI.Member.MemberTypes.Addon && addons.length < settings.addons.length) {
                // Addons need to be matched up with orderlines and given proper OrderLineIds that match available addons in the cart.
                var matchingCartItem = matchUpAddonWithCartItem(member.Plu);
                if (!matchingCartItem) {
                    continue;
                }
                member.OrderLineId = matchingCartItem.Id;
                addons.push(member);
            }
        }
        renderExistingAddons(pass);
    }

    function getExistingPass() {
        var existingPassId;
        if (settings.cartItem.IsRenewal) {
            existingPassId = settings.cartItem.PreviousPassId;

            return gts.eGalaxyWebAPI.Pass.Get(existingPassId, renderExistingMembers, redirectToError)
                .done(function (pass) {
                    // Because this is a renewal, we don't want to keep around any information other than the member information.
                    settings.pass.Members = pass.Members;
                    
                    // The primary member orderlineId will be wrong for this new pass when loading the old pass demographics. Change it to the new OrderLineId.
                    var primaryMember;
                    for (var primaryMemberIndex = 0; primaryMemberIndex < settings.pass.Members.length; primaryMemberIndex++) {
                        var possiblePrimaryMember = settings.pass.Members[primaryMemberIndex];
                        if (possiblePrimaryMember.PrimaryMember) {
                            primaryMember = possiblePrimaryMember;
                            break;
                        }
                    }
                    if (primaryMember) {
                        primaryMember.OrderLineId = settings.cartItem.Id;
                    }
                });
        }
        
        existingPassId = settings.cartItem.PassId;
        
        if (existingPassId) {
            return gts.eGalaxyWebAPI.Pass.Get(existingPassId, renderExistingMembers, redirectToError)
                .done(function(pass) {
                    // This is someone coming back to the checkout page after editing and leaving once before.
                    // Set the pass so that we can load all the previously saved information.
                    settings.pass = pass;
                });
        } else {
            return $.when();
        }
    }
    
    function maintainCurrentUserLink() {
        return on.getExistingMembersInOrder()
            .done(function (existingMembers) {
                if (!existingMembers || existingMembers.length === 0) {
                    return;
                }

                var currentPrimaryMember = getPrimaryMember();
                if (!currentPrimaryMember) {
                    return;
                }
                
                for (var i = 0; i < existingMembers.length; i++) {
                    var member = existingMembers[i];
                    // if a member marked with CurrentUser exists in the existingMembers list, then this member is linked to a membership in the transaction already.
                    if (member.CurrentUser) {
                        member.Linked = true;
                        // This member may also be linked to the current membership. If so, save this off to reference it later.
                        if (currentPrimaryMember.ContactGuid === member.ContactGuid) {
                            linkedContactGuid = member.ContactGuid;
                        }
                        return;
                    }
                }
            });
    }
    
    function getProduct() {
        if (!settings.passKindId) {
            var productData = { plu: settings.cartItem.Plu };
            return gts.eGalaxyWebAPI.Product.Get(productData, function (product) {
                if (!product.PassKindId) {
                    redirectToError();
                }
                settings.passKindId = product.PassKindId;
            }, redirectToError);
        } else {
            return $.when();
        }
    }

    function getPassKind() {
        return gts.eGalaxyWebAPI.PassKind.Get(settings.passKindId, function (passKind) {
            settings.passKind = passKind;
            settings.jointMembership = passKind.JointMembership;
            
            primaryMemberFieldRules = $.grep(passKind.FieldRules, function (fieldRule) {
                return fieldRule.MemberType === gts.eGalaxyWebAPI.FieldRule.MemberTypes.Primary;
            });

            adultMemberFieldRules = $.grep(passKind.FieldRules, function (fieldRule) {
                return fieldRule.MemberType === gts.eGalaxyWebAPI.FieldRule.MemberTypes.Adult;
            });

            childMemberFieldRules = $.grep(passKind.FieldRules, function (fieldRule) {
                return fieldRule.MemberType === gts.eGalaxyWebAPI.FieldRule.MemberTypes.Child;
            });

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
            
            if (passKind.JointMembership) {
                // If we have a joint membership in checkout. The contact for this membership is always the head of household and no selection step is required.
                on.preventPrimaryPassSelectionStep();
                // Joint Membership steps go first in the checkout process.
                gts.checkoutSteps.InsertStep(0, newStep);
            } else {
                gts.checkoutSteps.AddStep(newStep);
            }
        });
    }

    function renderStep() {
        $(settings.stepsElement).append($.trim($(settings.passStepTemplate).render(settings)));
    }

    function initJointMembership() {
        if (!settings.passKind.JointMembership) {
            return;
        }
        
        initMemberRules();

        $(settings.selector).off("click", ".adult.available");
        $(settings.selector).on("click", ".adult.available", showNewAdult);

        $(settings.selector).off("click", ".child.available");
        $(settings.selector).on("click", ".child.available", showNewChild);

        $(settings.selector).off("click", settings.addAdultDialog + " .navigation .add");
        $(settings.selector).on("click", settings.addAdultDialog + " .navigation .add", addAdult);

        $(settings.selector).off("click", settings.addChildDialog + " .navigation .add");
        $(settings.selector).on("click", settings.addChildDialog + " .navigation .add", addNamedChild);

        $(settings.selector).off("click", settings.addAddonDialog + " .navigation .add");
        $(settings.selector).on("click", settings.addAddonDialog + " .navigation .add", addNamedAddon);

        $(settings.selector).off("click", settings.addChildDialog + " .not-naming");
        $(settings.selector).on("click", settings.addChildDialog + " .not-naming", addGeneralChild);
        
        $(settings.selector).off("click", ".new-adult .navigation .cancel");
        $(settings.selector).on("click", ".new-adult .navigation .cancel", function() {
            $(settings.selector).find(settings.addAdultDialog).hide();
        });

        $(settings.selector).off("click", ".new-child .navigation .cancel");
        $(settings.selector).on("click", ".new-child .navigation .cancel", function() {
            $(settings.selector).find(settings.addChildDialog).hide();
        });

        $(settings.selector).off("click", ".new-addon .navigation .cancel");
        $(settings.selector).on("click", ".new-addon .navigation .cancel", function () {
            $(settings.selector).find(settings.addAddonDialog).hide();
        });

        $(settings.selector).off("click", settings.adultMemberElements + " .icon.x");
        $(settings.selector).on("click", settings.adultMemberElements + " .icon.x", removeAdult);

        $(settings.selector).off("click", settings.childMemberElements + " .icon.x");
        $(settings.selector).on("click", settings.childMemberElements + " .icon.x", removeChild);

        $(settings.selector).off("click", settings.addonMemberElements + " .icon.x");
        $(settings.selector).on("click", settings.addonMemberElements + " .icon.x", removeAddon);

        $(settings.selector).off("click", settings.adultMemberElements + " .adult .name");
        $(settings.selector).on("click", settings.adultMemberElements + " .adult .name", editAdult);

        $(settings.selector).off("click", settings.childMemberElements + " .child .name");
        $(settings.selector).on("click", settings.childMemberElements + " .child .name", editChild);

        $(settings.selector).off("click", settings.addonMemberElements + " .addon .name");
        $(settings.selector).on("click", settings.addonMemberElements + " .addon .name", editAddon);

        $(settings.selector).find(settings.jointMembersElement).fadeIn(500);

        displayNumberOfAdults();
        displayNumberOfChildren();
        displayNumberOfAddons();

        getAddonProductRules();
    }

    function displayNumberOfAdults() {
        $("span#adultCount").text(additionalAdults.length + " / " + (settings.passKind.MaxAdults - 1));
    }

    function displayNumberOfAddons() {
        $("#addonCount").text(addons.length + " / " + settings.addons.length);
    }
       
    function getAddonProductRules() {
        var allProductQueries = [];
        var productQuery;
        var productData;
        var addon;
        var searchedProducts = [];
        
        for (var i = 0; i < settings.addons.length; i++) {
            addon = settings.addons[i];
            if ($.inArray(addon.Plu, searchedProducts) >= 0) {
                continue;
            }
            searchedProducts.push(addon.Plu);
            
            productData = { plu: addon.Plu };
            productQuery = gts.eGalaxyWebAPI.Product.Get(productData, addAddonMemberFieldRule);
            
            allProductQueries.push(productQuery);
        }

        $.when(allProductQueries)
            .done(displayAvailableAddons)
            .fail(redirectToError);
    }

    function addAddonMemberFieldRule(product) {
        var fieldRule;
        for (var j = 0; j < product.FieldRules.length; j++) {
            fieldRule = product.FieldRules[j];
            addonMemberFieldRules.push(fieldRule);
        }
    }
    
    function displayAvailableAddons() {
        var availableAddon;
        for (var i = 0; i < settings.addons.length; i++)
        {
        // Only add available addons if they are not already used by an existing addon that may have been added from a pass renewal.
            availableAddon = settings.addons[i];
            
            if (!availableAddon.Used) {
                addAddon(availableAddon.Plu, availableAddon.Id);
            }
        }
    }

    function displayNumberOfChildren() {
        if (settings.passKind.MaxChildren < 0)
            $("span#childCount").text(children.length);

        else if(settings.passKind.MaxChildren > 0)
            $("span#childCount").text(children.length + " / " + settings.passKind.MaxChildren);
    }
   
    function initMemberRules() {
        if (canAddMoreChildren()) {
            $(settings.selector).find(settings.childAvailableElement).fadeIn(500);
        } else {
            $(settings.selector).find(settings.childAvailableElement).hide();
        }

        if (canAddMoreAdults()) {
            $(settings.selector).find(settings.adultAvailableElement).fadeIn(500);
        } else {
            $(settings.selector).find(settings.adultAvailableElement).hide();
        }

        if (canAddMoreAddons()) {
            $(settings.selector).find(settings.addonAvailableElement).fadeIn(500);
        } else {
            $(settings.selector).find(settings.addonAvailableElement).hide();
        }

        if (settings.passKind.MaxGuests > 0) {
            if (settings.passKind.MaxGuests === 1) {
                $(settings.selector).find(settings.guestMemberElements).find(".count").text(settings.passKind.MaxGuests + " guest");
            } else {
                $(settings.selector).find(settings.guestMemberElements).find(".count").text(settings.passKind.MaxGuests + " guests");
            }

            $(settings.selector).find(settings.guestMemberElements).show();
        }

        if (settings.passKind.MaxChildren !== 0) {
            $(settings.selector).find(settings.childrenElement).show();
        }

        if (settings.passKind.MaxAdults > 1) {
            $(settings.selector).find(settings.adultElement).show();
        }

        if (settings.addons.length > 0) {
            $(settings.selector).find(settings.addonsElement).show();
        }
    }
    
    function onAddPassInputValues(rule, input) {
        return on.addInputValues(rule, input);
    }
    
    function copyExistingMemberToCurrent(e) {
        e.preventDefault();
        var contactGuid = $(this).closest(settings.existingMembersSelector + " li").data("contactguid");
        
        on.getExistingMembersInOrder()
            .done(function(existingMembers) {
                if (!existingMembers || existingMembers.length === 0) {
                    return;
                }

                for (var i = 0; i < existingMembers.length; i++) {
                    var member = existingMembers[i];
                    if (member.ContactGuid === contactGuid) {
                        var copying = true;
                        if (member.CurrentUser) {
                            member.Linked = true;
                            linkedContactGuid = contactGuid;
                            copying = false; // We're actually linking
                            showUnlinkCurrentUser();
                        } else if (linkedContactGuid) {
                            // Then we are going from a linked contact to copying a member, so unlink and copy.
                            unlinkCurrentUser();
                        }
                        
                        populateFieldsFromMember(settings.primaryFieldInputPrefix, primaryMemberFieldRules, member, copying);
                        
                        // set focus to the first input without a value
                        $(settings.selector).find(settings.passForm).find("input:visible:first[value='']").focus();
                        return;
                    }
                }
            });
    }

    function showUnlinkCurrentUser() {
        renderAvailableMembersToCopy();
    }
    
    function handleUnlinkCurrentUser(e) {
        e.preventDefault();
        unlinkCurrentUser();
    }
    
    function unlinkCurrentUser() {
        // Clear any saved GUIDs
        linkedContactGuid = undefined;
        clearPrimaryMember();
        
        // Re-render all member options since the unlinked one can now be linked again.
        renderAvailableMembersToCopy();
        
        // It's easier to regenerate the form rather than clear out the form and find defaults.
        gts.formGenerator.generate({
            rules: primaryMemberFieldRules,
            form: $(settings.selector).find(settings.passForm),
            fieldInputPrefix: settings.primaryFieldInputPrefix,
            on: {
                addRule: on.addRule,
                addInputValues: onAddPassInputValues,
                afterInputAdded: onAfterInputAdded
            }
        }).done(function () {
            populateCountriesAndStates(settings.primaryFieldInputPrefix);
        }).fail(redirectToError);
    }

    function renderAvailableMembersToCopy() {
        return on.getExistingMembersInOrder()
            .done(function(existingMembers) {
                if (!existingMembers || existingMembers.length == 0) {
                    return;
                }

                // Clear out any members from previous page loads
                $(settings.selector).find(settings.existingMembersSelector).empty();
                var currentPrimaryMember = getPrimaryMember();

                for (var i = 0; i < existingMembers.length; i++) {
                    var member = existingMembers[i];

                    var highlightNewContact = !currentPrimaryMember && !linkedContactGuid;

                    if (member.CurrentUser) {                        
                        if (member.ContactGuid === linkedContactGuid) {
                            // Since it's clear this member is the current linked member, make sure that is carried through when rendering.
                            member.Linked = true;
                            renderAsCopyMember(highlightNewContact, member);
                        } else if (!member.Linked) {
                            // If we know the member is not linked, then it's available to be linked.
                            renderAsCopyMember(highlightNewContact, member);
                        }
                        // The only way you will get past this condition is to have a current user member that is linked to another membership in the transaction.
                    } else {
                        // Only allow reuse of contacts that are primary members and not THIS primary member.
                        // Members should be compared by contactGuid or Id because individual memberships do not have Member Ids
                        if (member.PrimaryMember && !(currentPrimaryMember && currentPrimaryMember.ContactGuid === member.ContactGuid)) {
                            renderAsCopyMember(highlightNewContact, member);
                        }
                    }
                }
            });
    }

    function renderAsCopyMember(highlightNewContact, member) {
        var memberViewModel = {
            ContactId: member.ContactId,
            ContactGuid: member.ContactGuid,
            CurrentUser: member.CurrentUser,
            Name: member.Fields.First + " " + member.Fields.Last,
            Address1: getAddressFirstLine(member),
            Address2: getAddressSecondLine(member),
            Linked: member.Linked
        };

        var memberElement = $(settings.selector)
            .find(settings.existingMembersSelector)
            .append($.trim($(settings.existingMemberTemplate).render(memberViewModel)))
            .find("li:last");

        // if the user has not saved a contact for this pass, indicate they can copy from existing members.
        if (highlightNewContact) {
            indicateNewContact(memberElement);
        }
    }
    
    function indicateNewContact(contactItem) {
        setTimeout(function () {
            contactItem.css({ backgroundColor: settings.existingContactFocusColor }).animate({ backgroundColor: "transparent" }, 2000);
        }, 1000);

    }
    
    function getAddressFirstLine(member) {
        var result;
        var street1 = member.Fields.Street1;
        var street2 = member.Fields.Street2;
        
        if (!street1) {
            return "";
        }
        result = street1;
        if (street2) {
            result = result + " " + street2;
        }
        return result;
    }

    function getAddressSecondLine(member) {
        var result;
        var city = member.Fields.City;
        var state = member.Fields.State;
        var zip = member.Fields.Zip;

        if (city) {
            result = city;
        }

        if (state) {
            if (result) {
                result = result + " " + state;
            } else {
                result = state;
            }
        }
        
        if (zip) {
            if (result) {
                result = result + " " + zip;
            } else {
                result = zip;
            }
        }
        return result;
    }

    function load() {
        // The primary contact may be linked to the current user. We want to keep this connection if it exists.
        maintainCurrentUserLink()
            .pipe(renderAvailableMembersToCopy);
        
        if (loaded) {
            return;
        }
        // Preload the relationship types, titles, and suffixes so that they will be cached when we need them quickly.
        $.when(loadRelationshipTypesIntoCache(), gts.checkoutNameTitles.Get(), gts.checkoutNameSuffixes.Get())
            .done(function() {
                gts.formGenerator.generate({
                    rules: primaryMemberFieldRules,
                    form: $(settings.selector).find(settings.passForm),
                    fieldInputPrefix: settings.primaryFieldInputPrefix,
                    on: {
                        addRule: on.addRule,
                        addInputValues: onAddPassInputValues,
                        afterInputAdded: onAfterInputAdded
                    }
                }).done(function() {
                    // If we have an existing pass and members on our load then the user has been to checkout before
                    if (settings.pass && settings.pass.Members) {
                        // Set the edit fields with the primary member from the loaded pass.
                        var primaryMember = getPrimaryMember();
                        if (primaryMember) {
                            populateFieldsFromMember(settings.primaryFieldInputPrefix, primaryMemberFieldRules, primaryMember);
                        }
                    } else {
                        populateCountriesAndStates(settings.primaryFieldInputPrefix);
                    }
                    initNavigation();
                    loaded = true;
                }).fail(redirectToError);
            });
    }

    function newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    function populateCountriesAndStates(inputPrefix, countryCode, state) {
        populateCountries(inputPrefix)
            .done(function() {
                if (countryCode) {
                    setCountry(inputPrefix, countryCode);
                } else {
                    setDefaultCountry(inputPrefix);
                }
            })
            .always(function() {
                populateStates(inputPrefix)
                    .done(function () {
                        if (!state) {
                            return;
                        }

                        if ($("#" + inputPrefix + "State").is(":visible")) {
                            $("#" + inputPrefix + "State").val(state);
                        } else {
                            $("#" + inputPrefix + "States").val(state);
                        }
                    });
            });
    }

    function validatePass(promise) {
        $("#ErrorMessage").html("");
        var valid = $(settings.selector).find(settings.passForm).valid();
        if (!valid) {
            promise.reject();
            return;
        }

        $(settings.selector).find(".navigation img").show();

        var processSteps;
        if (!settings.pass || !settings.pass.Id) {
            processSteps = processJointMembershipRules()
                .pipe(postPass);
        } else {
            processSteps = processJointMembershipRules()
                .pipe(putPass);
        }

        $.when(processSteps)
            .done(function () {
                promise.resolve();
            })
            .fail(function () {
                promise.reject();
            })
            .always(function () {
                $(settings.selector).find(".navigation img").hide();
            });
    }

    function createPrimaryMemberObject(id) {
        var newPrimaryMember = {
            Id: id,
            ContactGuid: linkedContactGuid,
            OrderLineId: settings.cartItem.Id,
            MemberType: gts.eGalaxyWebAPI.Member.MemberTypes.Standard,
            MemberDemographicType: gts.eGalaxyWebAPI.Member.MemberDemographicTypes.Adult,
            UsePassAsBilling: !!linkedContactGuid || settings.defaultPassSameAsBilling, // if we linked the membership to an account or if the step says we should link them.
            PrimaryMember: true,
            Fields: {}
        };

        on.setMemberFields(settings.primaryFieldInputPrefix, primaryMemberFieldRules, newPrimaryMember.Fields);

        return newPrimaryMember;
    }

    function addAdditionalMembersToPassForSaving(pass) {
        for (var adultIndex = 0; adultIndex < additionalAdults.length; adultIndex++) {
            pass.Members.push(additionalAdults[adultIndex]);
        }

        for (var childIndex = 0; childIndex < children.length; childIndex++) {
            pass.Members.push(children[childIndex]);
        }

        for (var addonIndex = 0; addonIndex < addons.length; addonIndex++) {
            pass.Members.push(addons[addonIndex]);
        }
    }

    function setPrimaryPass(pass) {
        if (settings.checkoutOptions.AssignPrimaryPass) {
            if (settings.jointMembership) {
                pass.Master = pass.Id;
                pass.IsPrimary = true;
            } else {
                pass.Master = on.getPrimaryPassId();
            }
        }
    }
    
    function postPass() {
        var newPrimaryMember = createPrimaryMemberObject();
        
        var newPass = {};
        newPass.PassKindId = settings.passKindId;
        newPass.AdultQty = additionalAdults.length + 1; // The primary member needs to be included in the quantity.
        newPass.ChildQty = children.length;
        newPass.Members = [];
        newPass.Members.push(newPrimaryMember);

        setPrimaryPass(newPass);
        
        addAdditionalMembersToPassForSaving(newPass);

        return gts.eGalaxyWebAPI.Pass.Post(newPass, function (postedPass) {
            settings.pass = postedPass;
            setIdsFromAdultMembers();
            setIdsFromChildMembers();
            setIdsFromAddonMembers();
        }, onBrokenRulesError)
            .pipe(setBillingAndShippingContact);
    }
    
    function setBillingAndShippingContact() {
        if (!settings.jointMembership || !settings.checkoutOptions.UsePassAsBilling) {
            return $.when();
        }
        
        var primaryMember = getPrimaryMember();
        if (!primaryMember || !primaryMember.ContactId) {
            return $.when();
        }

        return $.when(setBillingContact(primaryMember.ContactId), setShippingContact(primaryMember.ContactId));
    }
    
    function setBillingContact(id) {
        var data = { Id: id };
        return gts.eGalaxyWebAPI.BillingContact.post(data);
    }

    function setShippingContact(id) {
        var data = { Id: id };
        return gts.eGalaxyWebAPI.ShippingContact.post(data);
    }
    
    function putPass() {
        var existingPrimaryMember = getPrimaryMember();
        var id = existingPrimaryMember && existingPrimaryMember.Id;
        var newPrimaryMember = createPrimaryMemberObject(id);

        settings.pass.AdultQty = additionalAdults.length + 1; // The primary member needs to be included in the quantity.
        settings.pass.ChildQty = children.length;
        settings.pass.Members = [];
        settings.pass.Members.push(newPrimaryMember);

        setPrimaryPass(settings.pass);

        addAdditionalMembersToPassForSaving(settings.pass);

        return gts.eGalaxyWebAPI.Pass.Put(settings.pass, function(updatedPass) {
            settings.pass = updatedPass;
            setIdsFromAdultMembers();
            setIdsFromChildMembers();
            setIdsFromAddonMembers();
        }, onBrokenRulesError);
    }
    
    function onBrokenRulesError(brokenRules) {
        if (!brokenRules || brokenRules.length === 0) {
            $("#ErrorMessage").text("An error occurred while processing your request.");
            return;
        }

        for (var i = 0; i < brokenRules.length; i++) {
            var rule = brokenRules[i];
            $("#ErrorMessage").append($("<div></div>").text(rule.Message));
        }
    }

    function processJointMembershipRules() {
        var deferred = $.Deferred();
        
        if (settings.passKind.JointMembership && !validateJointMembershipInfo()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise();
    }

    function validateJointMembershipInfo() {
        var message;

        if (1 + additionalAdults.length > settings.passKind.MaxAdults) {
            message = "There are too many adults named on this membership.";
        } else if (1 + additionalAdults.length < settings.passKind.MinQtyNamedAdults) {
            message = "There are not enough adults named on this membership.";
        } else if (children.length > settings.passKind.MaxChildren) {
            message = "There are too many children on this membership.";
        } else if (children.length < settings.passKind.MinQtyNamedChildren) {
            message = "There are not enough children on this membership.";
        } else if (addons.length > settings.passKind.MaxAddons) {
            message = "There are too many addons on this membership.";
        } else if (addons.length < settings.addons.length) {
            message = "There are unused addons on this membership.";
        } else if (addons.length > settings.addons.length) {
            message = "There are too many addons on this membership.";
        } else if (!addonMembersHaveRequiredFieldsProvided()) {
            message = "Please provide all required fields for your addon members.";
        } else {
            return true;
        }

        $("#ErrorMessage").text(message);
        return false;
    }

    function addonMembersHaveRequiredFieldsProvided() {
        var addon;
        for (var i = 0; i < addons.length; i++) {
            addon = addons[i];
            if (addonRulesHaveRequiredFields(addon.Plu) && $.isEmptyObject(addon.Fields)) {
                return false;
            }
        }
        return true;
    }
    
    function addonRulesHaveRequiredFields(plu) {
        var rules = getAddonMemberFieldRules(plu);
        var rule;
        for (var i = 0; i < rules.length; i++) {
            rule = rules[i];
            if (rule.Required) {
                return true;
            }
        }
        
        return false;
    }

    function findByInputId(id, array) {
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (item.InputId === id) {
                return item;
            }
        }
        return undefined;
    }

    function editAdult() {
        var id = $(this).closest(".adult").data("id");
        var member = findByInputId(id, additionalAdults);

        editMember(member, settings.adultFieldInputPrefix, settings.addAdultDialog, adultMemberFieldRules);
    }

    function editChild() {
        var id = $(this).closest(".child").data("id");
        var member = findByInputId(id, children);
        editMember(member, settings.childFieldInputPrefix, settings.addChildDialog, childMemberFieldRules);
    }

    function editAddon() {
        var id = $(this).closest(".addon").data("id");
        var member = findByInputId(id, addons);
        editMember(member, settings.addonFieldInputPrefix, settings.addAddonDialog, getAddonMemberFieldRules(member.Plu));
    }

    function editMember(member, inputPrefix, dialogSelector, rules) {
        var form = $(settings.selector).find(dialogSelector).find("form").html("");

        form.data("id", member.InputId);

        gts.formGenerator.generate({
            rules: rules,
            form: form,
            fieldInputPrefix: inputPrefix,
            on: {
                addRule: on.addRule,
                addInputValues: onAddPassInputValues,
                afterInputAdded: onAfterInputAdded
            }
        }).done(function() {
            populateCountries(inputPrefix)
                .done(function () {
                    populateFieldsFromMember(inputPrefix, rules, member);
                    $(settings.selector).find(dialogSelector).show().find("input:first").focus();
                });

        });

        $("html, body").animate({ scrollTop: 0 }, 500);
    }

    function getAddonMemberFieldRules(plu) {
        return $.grep(addonMemberFieldRules, function (fieldRule) {
            return $.trim(fieldRule.Plu) === $.trim(plu);
        });
    }

    function populateFieldsFromMember(inputPrefix, rules, member, copying) {
        var rule;
        var countryCode;
        var state;
        var relationshipTypeId;

        for (var i = 0; i < rules.length; i++) {
            rule = rules[i];
            var id = "#" + inputPrefix + rule.ColumnName;

            if (!member.Fields[rule.ColumnName]) {
                continue;
            }

            var value;
            // If we are copying fields from an existing member and the the rules defines a clear, make sure we clear out the value
            if (copying && rule.ClearForNew) {
                value = undefined;
            } else {
                value = member.Fields[rule.ColumnName];
            }
            
            if (rule.FieldKindId === gts.formGenerator.fieldKinds.checkbox) {
                if (value) {
                    $(id).attr("checked", "checked");
                } else {
                    $(id).removeAttr("checked");
                }
            } else if (rule.FieldNumber === gts.eGalaxyWebAPI.Pass.Fields.State) {
                state = value;
            } else if (rule.FieldNumber === gts.eGalaxyWebAPI.Pass.Fields.CountryCode) {
                countryCode = value;
            } else if (rule.FieldNumber === gts.eGalaxyWebAPI.Pass.Fields.relationshipType) {
                relationshipTypeId = value;
            } else {
                $(id).val(value);
            }
        }
        
        populateRelationshipTypes(inputPrefix, relationshipTypeId);
        populateCountriesAndStates(inputPrefix, countryCode, state);
    }

    function removeAdult(e) {
        e.preventDefault();

        var adultElement = $(this).closest(".adult");
        var adultToRemove = findByInputId(adultElement.data("id"), additionalAdults);
        if (!adultToRemove) {
            return;
        }

        removeMember(adultToRemove).done(function() {
            // Remove the member from the collection
            additionalAdults = $.grep(additionalAdults, function (adult) {
                return adult !== adultToRemove;
            });

            // Remove the member from the UI.
            adultElement.fadeOut(500, function () {
                $(this).remove();
                displayNumberOfAdults();
                if (canAddMoreAdults()) {
                    $(settings.selector).find(settings.adultAvailableElement).fadeIn(500);
                }
            });
        });
    }

    function removeChild(e) {
        e.preventDefault();
        
        var childElement = $(this).closest(".child");
        var childToRemove = findByInputId(childElement.data("id"), children);
        if (!childToRemove) {
            return;
        }

        removeMember(childToRemove).done(function () {
            // Remove the member from the collection
            children = $.grep(children, function (child) {
                return child !== childToRemove;
            });

            // Remove the member from the UI.
            childElement.fadeOut(500, function () {
                $(this).remove();
                displayNumberOfChildren();
                if (canAddMoreChildren()) {
                    $(settings.selector).find(settings.childAvailableElement).fadeIn(500);
                }
            });
        });
    }

    function removeAddon(e) {
        e.preventDefault();

        var addonElement = $(this).closest(".addon");
        var addonToRemove = findByInputId(addonElement.data("id"), addons);
        if (!addonToRemove) {
            return;
        }

        removeMember(addonToRemove).done(function () {
            // Remove the member from the collection
            addons = $.grep(addons, function (addon) {
                return addon !== addonToRemove;
            });

            // Remove the member from the UI.
            addonElement.fadeOut(500, function () {
                $(this).remove();
                displayNumberOfAddons();
                if (canAddMoreAddons()) {
                    $(settings.selector).find(settings.addonAvailableElement).fadeIn(500);
                }
            });
        });
    }
    
    function removeMember(memberToRemove) {
        if (memberToRemove.Id) {
            // This member was previously posted so it will need to be deleted.
            return gts.eGalaxyWebAPI.Member.Delete(memberToRemove.Id);
        } else {
            // This is a member that has not been saved yet so there is no need to call delete.
            return $.when();
        }
    }

    function showNewAdult() {
        if (!canAddMoreAdults()) {
            return;
        }

        populateAdultForm($(settings.selector).find(settings.addAdultDialog));
        $("html, body").animate({ scrollTop: 0 }, 500);
        $(settings.selector).find(settings.addAdultDialog).show().find("input:first").focus();
    }

    function showNewChild() {
        if (!canAddMoreChildren()) {
            return;
        }

        if (namingChildren) {
            populateChildForm($(settings.selector).find(settings.addChildDialog));
            $("html, body").animate({ scrollTop: 0 }, 500);
            $(settings.selector).find(settings.addChildDialog).show().find("input:first").focus();
        } else {
            // clear the form so that data is not accidentally collected from the previous member.
            $(settings.addChildDialog).find("form").removeData("id").html("");
            addChild();
        }
        
        var lastName = $(settings.selector).find(settings.passForm).find("input:first[id*='Last']").val();
        $(settings.selector).find(settings.addChildDialog).find("input:first[id*='Last']").val(lastName);
        
        if (settings.passKind.RestrictJointChildAge && settings.passKind.JointChildMaxAge > 0)
            $(settings.selector).find(settings.addChildDialog).find(".child-age").html("age " + settings.passKind.JointChildMaxAge + " and under");
        
        if(settings.passKind.RequireChildDOB)
            $(settings.selector).find(settings.addChildDialog).find(".not-naming").hide();
    }

    function canAddMoreChildren() {
        if (settings.passKind.MaxChildren > 0)
            return children.length < settings.passKind.MaxChildren;
        else  if (settings.passKind.MaxChildren < 0)
            return true;
        
        return false;
    }

    function canAddMoreAdults() {
        return additionalAdults.length < (settings.passKind.MaxAdults - 1);
    }

    function canAddMoreAddons() {
        return addons.length < settings.addons.length;
    }

    function populateAdultForm() {
        populateForm(settings.adultFieldInputPrefix, settings.addAdultDialog, adultMemberFieldRules);
    }

    function populateChildForm() {
        populateForm(settings.childFieldInputPrefix, settings.addChildDialog, childMemberFieldRules);
    }

    function populateForm(inputPrefix, dialogSelector, rules) {
        var form = $(dialogSelector).find("form").removeData("id").html("");

        gts.formGenerator.generate({
            rules: rules,
            form: form,
            fieldInputPrefix: inputPrefix,
            on: {
                addRule: on.addRule,
                addInputValues: onAddPassInputValues,
                afterInputAdded: onAfterInputAdded
            }
        }).done(function() {
            populateRelationshipTypes(inputPrefix);
            populateCountriesAndStates(inputPrefix);
        });
    }

    function populateCountries(inputPrefix) {
        var countriesInput = $("#" + inputPrefix + "CountryCode");
        if (countriesInput.length === 0) {
            // TODO: What if state is included in the form but countries are not?
            return $.when();
        }

        return $.when(gts.eGalaxyWebAPI.Config.Init(), gts.countries.Get(countriesInput));
    }

    function setCountry(inputPrefix, countryCode) {
        $("#" + inputPrefix + "CountryCode").val(countryCode);

        $(settings.selector).off("change", "#" + inputPrefix + "CountryCode");
        $(settings.selector).on("change", "#" + inputPrefix + "CountryCode", function() {
            populateStates(inputPrefix);
        });
    }

    function setDefaultCountry(inputPrefix) {
        var defaultCountry = gts.countries.DefaultCountry();
        setCountry(inputPrefix, defaultCountry);
    }

    function populateRelationshipTypeInput(input, relationshipTypes) {
        input.empty();

        for (var i = 0; i < relationshipTypes.length; i++) {
            var relationshipType = relationshipTypes[i];
            var option = $("<option></option>").text(relationshipType.Description).val(relationshipType.Id);

            input.append(option);
        }
    }

    function loadRelationshipTypesIntoCache() {
        return gts.eGalaxyWebAPI.relationshipTypes.get(function(data) {
            relationshipTypesCache = data;
        });
    }
    
    function populateRelationshipTypes(inputPrefix, selectedValue) {
        var input = $("#" + inputPrefix + "RelationshipTypeID");
        if (input.length === 0) {
            return $.when();
        }
        
        if (relationshipTypesCache) {
            populateRelationshipTypeInput(input, relationshipTypesCache);
            if (selectedValue) {
                input.val(selectedValue);
            }
            return $.when();
        } else {
            return loadRelationshipTypesIntoCache()
                .done(function() {
                    populateRelationshipTypeInput(input, relationshipTypesCache);
                    if (selectedValue) {
                        input.val(selectedValue);
                    }
                });
        }
    }

    function populateStates(inputPrefix) {
        var countriesInput = $("#" + inputPrefix + "CountryCode");
        var statesInput = $("#" + inputPrefix + "States");
        var stateInput = $("#" + inputPrefix + "State");

        if (countriesInput.length > 0 && statesInput.length > 0) {
            // we have countries and states in our form.
            var countryCode = countriesInput.find(":selected").val();
            if (!countryCode) {
                return $.Deferred().resolve().promise();
            }

            return gts.states.Get(countryCode, statesInput, stateInput);
        } else {
            return $.Deferred().resolve().promise();
        }
    }

    function addAdult() {
        $("#ErrorMessage").text("");
        var form = $(settings.selector).find(settings.addAdultDialog).find("form");
        if (!form.valid()) {
            return;
        }

        var existingId = form.data("id");
        var member;

        if (existingId) {
            member = setExistingMemberFields(existingId, additionalAdults, settings.adultFieldInputPrefix, adultMemberFieldRules);
            // Remove exisiting element
            $(settings.selector + " .adult" + "[data-id=" + existingId + "]").remove();
        } else {
            member = setNewMemberFields(settings.adultFieldInputPrefix, gts.eGalaxyWebAPI.Member.MemberDemographicTypes.Adult, adultMemberFieldRules);
            additionalAdults[additionalAdults.length] = member;
        }

        member.Named = true;
        renderMember(member, settings.savedAdultTemplate, settings.adultMemberElements, settings.addAdultDialog, "+1 adult");
        displayNumberOfAdults();

        if (!canAddMoreAdults()) {
            $(settings.selector).find(settings.adultAvailableElement).hide();
        }
    }

    function addGeneralChild() {
        namingChildren = false;
        addChild();
    }

    function addNamedChild() {
        namingChildren = true;
        addChild();
    }

    function addChild() {
        $("#ErrorMessage").text("");
        var form = $(settings.selector).find(settings.addChildDialog).find("form");
        if (namingChildren && !form.valid()) {
            return;
        }

        var existingId = form.data("id");
        var member;

        if (existingId) {
            member = setExistingMemberFields(existingId, children, settings.childFieldInputPrefix, childMemberFieldRules);

            // Remove exisiting element
            $(settings.selector + " .child" + "[data-id=" + existingId + "]").remove();
            member.Named = namingChildren;
        } else {
            member = setNewMemberFields(settings.childFieldInputPrefix, gts.eGalaxyWebAPI.Member.MemberDemographicTypes.Child, childMemberFieldRules);
            member.Named = namingChildren;
            children[children.length] = member;
        }

        // If the member was changed to be unnamed, clear all the fields so it is not confusing if it is edited again.
        if (!member.Named) {
            member.Fields = {};
        }
        
        renderMember(member, settings.savedChildTemplate, settings.childMemberElements, settings.addChildDialog, "+1 child");
        displayNumberOfChildren();

        if (!canAddMoreChildren()) {
            $(settings.selector).find(settings.childAvailableElement).hide();
        }
    }
    
    function addNamedAddon() {
        var form = $(settings.selector).find(settings.addAddonDialog).find("form");

        var existingId = form.data("id");
        var member = findByInputId(existingId, addons);

        addAddon(member.Plu, member.OrderLineId);
    }

    function addAddon(plu, orderLineId) {
        $("#ErrorMessage").text("");
        var form = $(settings.selector).find(settings.addAddonDialog).find("form");
        if (!form.valid()) {
            return;
        }
        
        var existingId = form.data("id");
        var member;
        
        if (existingId) {
            member = setExistingMemberFields(existingId, addons, settings.addonFieldInputPrefix, getAddonMemberFieldRules(plu));

            // Remove exisiting element
            $(settings.selector + " .addon" + "[data-id=" + existingId + "]").remove();
        }
        else {
            member = setNewMemberFields(settings.addonFieldInputPrefix, gts.eGalaxyWebAPI.Member.MemberDemographicTypes.Addon, getAddonMemberFieldRules(plu));
            member.OrderLineId = orderLineId;
            member.Plu = plu;
            addons[addons.length] = member;
        }

        member.Named = true;
        renderMember(member, settings.savedAddonTemplate, settings.addonMemberElements, settings.addAddonDialog, getAddonNameFromPlu(plu));
        displayNumberOfAddons();

        if (!canAddMoreAddons()) {
            $(settings.selector).find(settings.addonAvailableElement).hide();
        }
    }

    function getAddonNameFromPlu(plu) {
        var addon;
        for (var i = 0; i < settings.addons.length; i++) {
            addon = settings.addons[i];
            if ($.trim(addon.Plu) === $.trim(plu)) {
                return addon.Name;
            }
        }
    }

    function setNewMemberFields(fieldPrefix, memberDemographicType, rules) {
        var memberType;
        if (memberDemographicType === gts.eGalaxyWebAPI.Member.MemberDemographicTypes.Addon) {
            memberType = gts.eGalaxyWebAPI.Member.MemberTypes.Addon;
        } else {
            memberType = gts.eGalaxyWebAPI.Member.MemberTypes.Standard;
        }

        var member = {};
        setNewMemberDefaults(member, settings.pass);
        
        member.MemberType = memberType;
        member.MemberDemographicType = memberDemographicType;
        member.Fields = {};

        on.setMemberFields(fieldPrefix, rules, member.Fields);
        return member;
    }

    function setExistingMemberFields(inputId, memberArray, fieldPrefix, rules) {
        var member = findByInputId(inputId, memberArray);
        if (!member) {
            return undefined;
        }

        on.setMemberFields(fieldPrefix, rules, member.Fields);
        return member;
    }

    function renderMember(member, templateSelector, memberElementsSelector, dialogSelector, displayName) {
        var name = displayName;

        if (member.Named) {
            if (member.Fields.First) {
                name = member.Fields.First;
                if (member.Fields.Last) {
                    name = name + " " + member.Fields.Last;
                }
            } else {
                if (member.Fields.Last) {
                    name = member.Fields.Last;
                }
            }
        }
        
        var data = {
            Id: member.InputId,
            HasImage: false,
            Name: name
        };

        var memberElement = $($.trim($(templateSelector).render(data))).hide();
        $(settings.selector).find(memberElementsSelector).append(memberElement);
        memberElement.fadeIn(500);

        $(settings.selector).find(dialogSelector).hide();
    }

    function onAfterInputAdded(rule, input) {
        if (rule.Required) {
            input.closest(".form-field-input").addClass("required");
        }
        return on.afterInputAdded(rule, input);
    }

    return model;
};