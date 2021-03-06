/**
 * Created by liupeng on 2015/7/26.
 */
var lang = function() {
    return {
        error : {
            username:{
                required:'用户名不能为空'
            },
            password:{
                required:'密码不能为空'
            },
            perm:{
                root_noperm_delete:'Root不能删除'
            }
        },
        label: {
            add:'添加',
            edit:'编辑',
            delete:'删除',
            submit:'提交',
            save:'保存',
            perm:{
                node:{
                    add:'添加节点',
                    edit:'编辑节点'
                }
            },
            role:{
                add:'添加角色',
                edit:'编辑角色'
            },
            user:{
                add:'添加管理员',
                edit:'编辑管理员'
            }
        },
        success:{
            add:'添加成功',
            edit:'更新成功',
            delete:'删除成功',
            login:'登录成功，正在努力跳转...'
        }
    };
}();