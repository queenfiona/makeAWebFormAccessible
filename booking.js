$(document).ready(function () {
    $(".datepicker").datepicker();

    $("#activities-breakfast").click(function () {
        $("#breakfast-options").toggle($(this).is(":checked"));
        if ($(this).is(":checked")) {
            $("#breakfast-options input").focus();
        }
    });

    $(".activities input").click(function () {
        updatePrice();
    });
    $("#requests").change(function () {
        updatePrice();
    });

    $("#submit-form").click(function () {
        return validateForm();
    });

    $("#cancel").click(function () {
        window.location.href = "cancelled.html";
    });
});

function updatePrice() {
    var price = 109.99;
    $(".activities input:checked").each(function (i, item) {
        price += $(item).data("price");
    });
    $("#requests option:selected").each(function (i, item) {
        price += $(item).data("price");
    });
    $(".total-price-value").html("&pound;" + price);
}

function validateForm() {
    $("#validation-summary").html("");
    $("input", "select").removeClass("invalid");

    validateDate($("#date-from"), true, "Please enter date from");
    validateDate($("#date-to"), true, "Please enter date to");
    validateRequiredField($("#location"), "Please select a location");
    validateText($("#details-name"), true, 50, "Please enter your name");
    validateText($("#details-email"), true, 100, "Please enter your email address");
    validateText($("#details-tel"), false, 15, "Please enter your telephone number");
    validateRequiredField($("#details-card-type"), "Please select the card type");
    validateText($("#details-card-number"), true, 16, "Please enter the card number");
    validateRequiredField($("#details-card-expiry-month"), "Please select the card expiry month");
    validateRequiredField($("#details-card-expiry-year"), "Please select the card expiry year");

    var valid = $("#validation-summary *").length == 0;
}

function validateRequiredField($input, errorMessage) {
    var empty = !$input.val();
    if (empty)
        addValidationIssue(errorMessage, $input);
    return !empty;
}

function validateText($input, required, maxLength, errorMessage) {
    var valid = true;
    if (required)
        valid = validateRequiredField($input, errorMessage);
    if (valid) {
        if ($input.val().length > maxLength) {
            valid = false;
            addValidationIssue(errorMessage, $input);
        }
    }
    return valid;
}

function validateDate($input, required, errorMessage) {
    var valid = true;
    if (required)
        valid = validateRequiredField($input, errorMessage);
    if (valid) {
        var date = new Date($input.val());
        if (!date || date < new Date()) {
            valid = false;
            addValidationIssue(errorMessage, $input);
        }
    }
    return valid;
}

function addValidationIssue(errorMessage, $input) {
    $input.addClass("invalid");
    $("#validation-summary").append("<p>" + errorMessage + "</p>");
}