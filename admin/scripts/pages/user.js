/**
 * Created by liupeng on 2015/7/20.
 */
var user = function() {
    var requestUri = '/admin/user/';

    var btnSubmit = $('#btn-submit');
    var dialog = $('#user-dialog');
    var dialogTitle = $('#user-dialog-title');
    var container = $('.modal-body');
    var userForm = $('#user-form');
    var userStatus = $('#user-status');

    return {
        init:function() {
            userStatus.val(userStatus.attr('data-value'));
            btnSubmit.click(function() {
                user.save();
            });
            userStatus.change(function() {
                liuxy.redirect(requestUri.substr(1,requestUri.length-1)+"?status="+userStatus.val());
            });
            $('#user-add').click(function() {
                dialogTitle.html(lang.label.user.add);
                userForm[0].reset();
                $('#id').val('');
                $('#username').removeAttr('readonly');
                dialog.modal();
            });
        },
        save:function() {
            $('#password').val($.md5($('#password').val()));
            liuxy.ajax(container,requestUri+'save.json','json',
                userForm.serialize(),
                function(data){
                    $('#password').val('');
                    message.success(container,{content:lang.success.edit});
                },
                function(no,msg) {
                    $('#password').val('');
                    message.error(container,{content:msg});
                },
                true
            );
        },
        get:function(id) {
            liuxy.ajax(container,requestUri+'get.json','json',
                {id:id},
                function(data){
                    $('#id').val(id);
                    $('#name').val(data.name);
                    $('#password').val('');
                    $('#username').val(data.username);
                    $('#username').attr('readonly','realonly');
                    $("input[name='status']").each(function () {
                        if($(this).val() == data.status) {
                            $(this).parent().click();
                            return false;
                        }
                    });
                    if (data.roles) {
                        $("input[type='checkbox']").each(function () {
                            var _role = $(this);
                            $.each(data.roles, function (n, value) {
                                if (value.role_id == _role.val()) {
                                    _role.parent().click();
                                }
                            });
                        });
                    }
                    dialogTitle.html(lang.label.user.edit);
                    dialog.modal();
                },
                function(no,msg) {
                    message.error(container,{content:msg});
                },
                true
            );
        }
    };
}();
