(function($) {
  $.fn.abValidate = function(options) {

    var settings = $.extend({
      color: "#556b2f",
      backgroundColor: "white",
      debug: false
    }, options);

    var th_form = this;
    var form_tried = false;

    this.submit(function(e) {
      form_tried = true;
      return checkValidate(th_form);
    });

    this.find('.ab-validation-i').each(function() {
      $(this).keyup(function() {
        if(form_tried) checkValidate(th_form);
      });
      $(this).prop('autocomplete', 'off');
    });

    function checkValidate(this_form) {
      var valOkay = true;
      try {
        this_form.find('.ab-validation-i').each(function() {
          var validation_attr = $(this).attr('ab-validation').replace(/,\s*$/, "");
          var validations = validation_attr.split(',');
          var helpText = $(this).next();
          var parentD = $(this).parent();
          var requiredInput = false;
          helpText.html('');
          for (var i = 0; i < validations.length; i++) {
            var vals = validations[i].trim().split(':');
            var valName = vals[0];
            if(valName == 'required') requiredInput = true;
          }
          if (debug) console.log(validations);
          for (var i = 0; i < validations.length; i++) {
            var vals = validations[i].trim().split(':');
            var valName = vals[0];
            var valMsg = vals[1];
            var valErrors = false;
            var isNotReq = (!requiredInput && $(this).val().length <= 0) ? true : false;
            switch (valName) {
              case 'required':
                if ($(this).val().length <= 0) {
                  valErrors = true;
                  if (debug) console.log('Required');
                  if(valMsg == null) valMsg = 'Required';
                  parentD.addClass('netm-form-group-error');
                  helpText.css('display', 'block');
                  helpText.append('* ' + valMsg + '<br>');
                }
                break;
              case 'min':
                if(isNotReq) break;
                var valMsgSp = valMsg.trim().split('|');
                var minL = parseInt(valMsgSp[0]);
                var minLMsg = valMsgSp[1];
                if ($(this).val().length < minL) {
                  if (debug) console.log('Min');
                  valErrors = true;
                  if(minLMsg == null) minLMsg = 'Min';
                  parentD.addClass('netm-form-group-error');
                  helpText.css('display', 'block');
                  helpText.append('* ' + minLMsg + '<br>');
                }
                break;
              case 'max':
                if(isNotReq) break;
                var valMsgSp = valMsg.trim().split('|');
                var minL = parseInt(valMsgSp[0]);
                var minLMsg = valMsgSp[1];
                if ($(this).val().length > minL) {
                  if (debug) console.log('Max');
                  valErrors = true;
                  if(minLMsg == null) minLMsg = 'Max';
                  parentD.addClass('netm-form-group-error');
                  helpText.css('display', 'block');
                  helpText.append('* ' + minLMsg + '<br>');
                }
                break;
              case 'confirm':
                if(isNotReq) break;
                var valMsgSp = valMsg.trim().split('|');
                var conf_id = $('#' + valMsgSp[0]);
                var confMsg = valMsgSp[1];
                if ($(this).val() !=  conf_id.val()) {
                  if (debug) console.log('Confirm');
                  valErrors = true;
                  if(confMsg == null) confMsg = 'Confirm';
                  parentD.addClass('netm-form-group-error');
                  helpText.css('display', 'block');
                  helpText.append('* ' + confMsg + '<br>');
                }
                break;
              case 'email':
                if(isNotReq) break;
                if (!validateEmail($(this).val())) {
                  if (debug) console.log('Email');
                  valErrors = true;
                  if(valMsg == null) valMsg = 'Email';
                  parentD.addClass('netm-form-group-error');
                  helpText.css('display', 'block');
                  helpText.append('* ' + valMsg + '<br>');
                }
                break;
              default:
                if(isNotReq) break;
                if (debug) console.log('Default');
                valErrors = true;
                break;
            }
            if (valErrors) {
              valOkay = false;
            }
            else {
              parentD.removeClass('netm-form-group-error');
              helpText.css('display', 'none');
            }
          }
        });
      }
      catch(err) {
          // console.log(err);
      }
      return valOkay;
    }

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }


    return {
      success:checkValidate(th_form),
      message:'Message ya, Aslam !',
    };

  };

}(jQuery));
