/**
 * Created by liupeng on 2015/6/30.
 */
var role = function() {
    var requestUri = '/admin/role/';
    var permTree =  $('#perm-tree');
    var btnSubmit = $('#btn-submit');
    var dialog = $('#role-dialog');
    var dialogTitle = $('#role-dialog-title');
    var container = $('.modal-body');
    var roleForm = $('#role-form');
    var coreOptions = {//树形实例核心配置
        "themes" : {
            "responsive": false
        },
        "check_callback" : true,
        'data':{
            "state" : { "opened" : true },
            'url' : function (node) {
                return baseUrl + requestUri+ 'perm.json';
            },
            'data' : function (node) {
                return { 'parent' : node.id ,'id':$('#id').val()};
            },
            'success':function(data) {
                data = data.perms;
            }
        }
    };

    var checkBoxOptions = {//树形实例选中插件配置
        "three_state":false,
        "cascade": ""
    };
    return {
        init:function() {
            jtable.checkbox($('#role-table'));

            btnSubmit.click(function() {
                role.save();
            });
            $('#role-add').click(function() {
                dialogTitle.html(lang.label.role.add);
                roleForm[0].reset();
                $('#id').val('');
                //添加时支持下拉级联选中
                checkBoxOptions.cascade = 'up+undetermined+down';
                role.perm();
                dialog.modal();
            });
            dialog.on('hide.bs.modal',function(e) {
                //关闭窗口，销毁权限树
                var ref = permTree.jstree(true);
                if (ref) {
                    ref.destroy();
                }
            });
        },
        save:function() {
            var ids="";
            var ref = permTree.jstree(true);
            var nodes = ref.get_checked(true);
            $.each(nodes, function (i, n) {
                ids += $(n).attr("id").substring('node_'.length) + ",";
            });
            permTree.find(".jstree-undetermined").each(function () {
                ids += $(this).parent().parent().attr("id").substring('node_'.length)+",";
            });
            $('#pids').val(ids);
            liuxy.ajax(container,requestUri+'save.json','json',
                roleForm.serialize(),
                function(data){
                    message.success(container,{content:lang.success.edit});
                },
                function(no,msg) {
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
                    $('#description').val(data.description);
                    dialogTitle.html(lang.label.role.edit);
                    dialog.modal();
                    //编辑时时取消下拉级联选中
                    checkBoxOptions.cascade = 'up+undetermined';
                    role.perm();
                },
                function(no,msg) {
                    message.error(container,{content:msg});
                },
                true
            );
        },
        delete:function(id) {
            liuxy.ajax($('body'),requestUri+'delete.json','json',
                {id:id},
                function(data){
                    bootbox.alert(lang.success.delete,function() {
                        $('#tr-role-'+id).remove();
                    });
                },
                function(no,msg) {
                    bootbox.alert(msg);
                },
                true
            );
        },
        perm:function() {
            permTree.jstree({
                'plugins': ["checkbox", "types"],
                'core': coreOptions,
                "types" : {
                    "default" : {
                        "icon" : "fa fa-folder icon-state-warning icon-lg"
                    },
                    "file" : {
                        "icon" : "fa fa-file icon-state-warning icon-lg"
                    }
                },
                "checkbox":checkBoxOptions
            });
        }
    };
}();
