import "jquery-form";
import "jquery-validation";

export default (el, $el, opts) => {
  const $successEl = $(opts.successEl);
  const $errorEl = $(opts.errorEl);
  const $loadingEl = $(opts.loadingEl);

  opts.hideClass = opts.hideClass || "u-dn";
  opts.errorElement = opts.errorElement || "span";
  opts.hideClass = opts.hideClass || "u-dn";
  opts.errorClass = opts.errorClass || "caption error";

  const _opts = {
    ...opts,
    invalidHandler(ev, validator) {
      $el.toggleClass("has-error", !!validator.numberOfInvalids());
    },
    async submitHandler(form) {
      let recaptchaResponse;
      if (window.grecaptcha) {
        recaptchaResponse = await window.grecaptcha.execute();
        $el.find('[name="recaptchaResponse"]').val(recaptchaResponse);
      }

      $(form).ajaxSubmit({
        success: async function(resp, statusText, xhr, $form) {
          const { isSuccess, message } = resp;
          $loadingEl.addClass(opts.hideClass);
          $successEl.toggleClass(opts.hideClass, !isSuccess);
          $errorEl.toggleClass(opts.hideClass, isSuccess);

          const [{ default: Noty }] = await Promise.all([
            import(/* webpackChunkName: "noty" */ "noty"),
            import(/* webpackChunkName: "noty" */ "noty/src/noty.scss"),
            // import(/* webpackChunkName: "noty" */ "@/modules/noty/bctheme.scss") //add your theme css/scss
          ]);

          new Noty({
            // theme: "bctheme", //add your own theme
            text: message,
            visibilityControl: true,
            timeout: 5000,
            layout: "topCenter",
            type: isSuccess ? "success" : "error"
          }).show();

          if (isSuccess) {
            $form.resetForm();
            if (window.grecaptcha) {
              window.grecaptcha.reset();
            }
          }
          // hide it after 3s
          // setTimeout(() => {
          // 	$successEl.addClass(opts.hideClass);
          // 	$errorEl.addClass(opts.hideClass);
          // }, 3000);
        },
        error: function() {
          $loadingEl.addClass(opts.hideClass);
          $errorEl.removeClass(opts.hideClass);

          // hide it after 3s
          setTimeout(() => {
            $errorEl.addClass(opts.hideClass);
          }, 3000);
        }
      });
    }
  };

  $el
    .on("submit", e => {
      e.preventDefault();
    })
    .validate(_opts);

  // load recaptcha
  if (opts.useRecaptcha && !window.grecaptcha) {
    const script = document.createElement("script");
    script.setAttribute("src", "https://www.google.com/recaptcha/api.js");
    document.body.appendChild(script);
  }
};
