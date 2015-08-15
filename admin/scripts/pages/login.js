/**
 * Created by liupeng on 2015/7/20.
 */
var login = function() {
    var loginForm = $('#login-form');
    var btnSubmit = $('#btn-submit');
    return {
        init:function() {
            loginForm[0].reset();
            loginForm.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                rules: {
                    username: {
                        required: true
                    },
                    password: {
                        required: true
                    }
                },

                messages: {
                    username: {
                        required: lang.error.username.required
                    },
                    password: {
                        required: lang.error.password.required
                    }
                },
                highlight: function(element) { // hightlight error inputs
                    $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                success: function(label) {
                    label.closest('.form-group').removeClass('has-error');
                    label.remove();
                },

                errorPlacement: function(error, element) {
                    error.insertAfter(element.closest('.input-icon'));
                },

                submitHandler: function(form) {
                    login.submit(); // form validation success, call ajax form submit
                }
            });

            $('input', loginForm).keypress(function(e) {
                if (e.which == 13) {
                    if (loginForm.validate().form()) {
                        login.submit(); //form validation success, call ajax form submit
                    }
                    return false;
                }
            });
        },
        submit:function() {
            $('#password').val($.md5($('#password').val()));
            liuxy.ajax(btnSubmit,'/admin/default/login.json','json',
                loginForm.serialize(),
                function(data){
                    message.success(loginForm,{content:lang.success.login});
                    window.location.href = data;
                },
                function(no,msg) {
                    message.error(loginForm,{content:msg});
                },
                true
            );
        }
    };
}();