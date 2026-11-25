// Brevo's supported HTML embed configuration. The Turnstile secret stays in Brevo.
window.REQUIRED_CODE_ERROR_MESSAGE = "Please choose a country code";
window.LOCALE = "en";
window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "Please enter a valid email address and try again.";
window.REQUIRED_ERROR_MESSAGE = "Please complete the required fields and wait for the spam check to finish.";
window.GENERIC_INVALID_MESSAGE = "Please enter a valid email address and try again.";
window.INVALID_NUMBER = "Please enter a valid email address and try again.";
window.INVALID_DATE = "Please enter a valid date";
window.REQUIRED_MULTISELECT_MESSAGE = "Please select at least one option";
window.translation = { common: { selectedList: "{quantity} list selected", selectedLists: "{quantity} lists selected", selectedOption: "{quantity} selected", selectedOptions: "{quantity} selected" } };
var AUTOHIDE = true;
function handleCaptchaResponse() {
  document.getElementById("sib-captcha").dispatchEvent(new Event("captchaChange"));
  window.grecaptcha = window.turnstile;
}
