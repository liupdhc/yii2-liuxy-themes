/**
 * Created by liupeng on 2015/6/26.
 */

var liuxy = function() {
    return {
        /**
         * 通用Ajax数据请求
         * @param obj	触发ajax请求的jquery对象，设置为非null，可以防止重复提交
         * @param url	请求相对地址
         * @param type	ajax的dataType
         * @param param	请求的参数，json格式
         * @param success	请求成功的回调函数
         * @param error	请求失败的回调函数
         * @param isAsync	是否采用异步方式
         */
        ajax: function (obj, url, type, param, success, error, isAsync) {
            var ajax = liuxy._ajax(obj, url, type, param, success, error);
            if (ajax) {
                ajax.async = isAsync;
                $.ajax(ajax);
            } else {
                return false;
            }
        },
        /**
         * 简化form、支持file的异步提交
         * @param obj   表单对象
         * @param url	请求相对地址
         * @param type	ajax的dataType
         * @param param	额外请求的参数，json格式
         * @param success	请求成功的回调函数
         * @param error	请求失败的回调函数
         * @param isAsync	是否采用异步方式
         * @returns {boolean}
         */
        ajaxForm:function (obj, url, type, param, success, error, isAsync) {
            var ajax = liuxy._ajax(obj, url, type, param, success, error);
            if (ajax) {
                ajax.forceSync = !isAsync;
                obj.ajaxSubmit(ajax);
            } else {
                return false;
            }
        },
        _ajax:function(obj, url, type, param, success, error) {
            if (obj) {
                if (obj.attr('submitting') == 1) {
                    return false;
                } else {
                    obj.attr('submitting',1);
                }
            }
            var ajax = {type: 'post', url: baseUrl + url, dataType: type};
            if (param) ajax.data = param;
            ajax.success = function(data) {
                if (data.code) {
                    if (data.code == 200) {
                        if (success) {
                            success(data.data);
                            if (obj) {
                                obj.attr('submitting',0);
                            }
                        }
                    } else {
                        if (error) {
                            error(data.code, data.msg);
                            if (obj) {
                                obj.attr('submitting',0);
                            }
                        }
                    }
                } else {
                    if (success) {
                        success(data);
                        if (obj) {
                            obj.attr('submitting',0);
                        }
                    }
                }
                JUI.stopPageLoading();
            };
            if (error) {
                ajax.error = function() {
                    error(500, '服务器错误，请重试');
                    if (obj) {
                        obj.attr('submitting',0);
                    }
                    JUI.stopPageLoading();
                }
            }
            JUI.startPageLoading({animate: true});
            return ajax;
        },
        redirect:function(url) {
            if (url == '#' || url.indexOf('#') != -1) {
                return false;
            }
            JUI.startPageLoading({animate: true});
            window.location.href = baseUrl + "/" + url;
        }
    };
}();

/**
 * div显示信息
 * 用法：
 * message.warning($('#domid'), {'content':'show message',callback:function() {
 * });
 * callback可省略
 * @type {{warning, error, success, info, popup}}
 */
var message = function() {
    return {
        warning:function (container, options){
            options = $.extend(true, {
                container: container,
                class: 'warning',
                icon: "warning"
            }, options);
            message.popup(options);
        },
        error:function (container, options) {
            options = $.extend(true, {
                container: container,
                class: 'danger',
                icon: "danger"
            }, options);
            message.popup(options);
        },
        success:function (container, options) {
            options = $.extend(true, {
                container: container,
                class: 'success',
                icon: "success"
            }, options);
            message.popup(options);
        },
        info:function (container, options) {
            options = $.extend(true, {
                container: container,
                class: 'info',
                icon: "warning"
            }, options);
            message.popup(options);
        },
        popup:function (options) {
            options = $.extend(true, {
                callback: false
            }, options);
            JUI.alert({
                container: options.container, // alerts parent container(by default placed after the page breadcrumbs)
                place: 'append', // append or prepent in container
                type: options.class,  // alert's type
                message: options.content,  // alert's message
                close: true, // make alert closable
                reset: true, // close all previouse alerts first
                focus: true, // auto scroll to the alert after shown
                closeInSeconds:3, // auto close after defined seconds
                icon:options.icon, // put icon before the message
                callback:options.callback
            });
        }
    };
}();

var jtable = function(){
    return {
        /**
         * 初始化checkbox选择
         * @param obj
         */
        checkbox:function(obj) {
            obj.find('.group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
                jQuery(set).each(function () {
                    if (checked) {
                        $(this).attr("checked", true);
                        $(this).parents('tr').addClass("active");
                    } else {
                        $(this).attr("checked", false);
                        $(this).parents('tr').removeClass("active");
                    }
                });
                jQuery.uniform.update(set);
            });

            obj.on('change', 'tbody tr .checkboxes', function () {
                $(this).parents('tr').toggleClass("active");
            });
        }
    };
}();
