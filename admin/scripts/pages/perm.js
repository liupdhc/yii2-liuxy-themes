var perm = function() {
    var requestUri = '/admin/permission/';

    var btnSubmit = $('#btn-submit');
    var container = $('.modal-body');
    var dialog = $('#perm-dialog');
    var dialogTitle = $('#perm-dialog-title');
    var permForm = $('#perm-form');
    var permTree = $('#perm-tree');
    var permTable = $('#perm-table');
    return {
        init:function() {
            permTree.jstree({
              "core" : {
                  "themes" : {
                      "responsive": false
                  },
                  // so that create works
                  "check_callback" : true,
                  'data' : {
                      "state" : { "opened" : false },
                      'url' : function (node) {
                          return baseUrl + requestUri+ 'ajax.json';
                      },
                      'data' : function (node) {
                          return { 'parent' : node.id };
                      },
                      'success':function(data) {
                          data = data.perms;
                      }
                  }
              },
              "types" : {
                  "default" : {
                      "icon" : "fa fa-folder icon-state-warning icon-lg"
                  },
                  "file" : {
                      "icon" : "fa fa-file icon-state-warning icon-lg"
                  }
              },
              "state" : { "key" : "demo2" },
              "plugins" : [ "contextmenu", "state", "types" ],
              'contextmenu':{
                  'items':{
                      create:{
                          label:lang.label.add,
                          icon:'glyphicon glyphicon-plus',
                          action:function() {
                              var ref = permTree.jstree(true);
                              var sel = ref.get_selected();
                              if(!sel.length) {
                                  return false;
                              }
                              sel = sel[0];

                              permForm[0].reset();
                              $('#parent_id').val(sel.substring('node_'.length));
                              dialogTitle.html(lang.label.perm.node.add);
                              dialog.modal();
                              btnSubmit.unbind('click');
                              btnSubmit.click(function() {
                                  perm.create(ref, sel);
                              });
                          }
                      },
                      edit:{
                          label:lang.label.edit,
                          "separator_before": true,
                          "separator_after"	: true,
                          icon:'glyphicon glyphicon-pencil',
                          action:function() {
                              var ref = permTree.jstree(true);
                              var sel = ref.get_selected();
                              if(!sel.length) {
                                  return false;
                              }
                              sel = sel[0];
                              liuxy.ajax(btnSubmit,requestUri+'get.json','json',
                                  {id:sel.substring('node_'.length)},
                                  function(data){
                                      permForm[0].reset();
                                      $('#name').val(data.name);
                                      $('#link').val(data.link);
                                      $('#description').val(data.description);
                                      $('#parent_id').val(sel.substring('node_'.length));
                                      dialogTitle.html(lang.label.perm.node.edit);
                                      dialog.modal();

                                      btnSubmit.unbind('click');
                                      btnSubmit.click(function() {
                                          perm.update();
                                      });
                                  },
                                  function(no,msg) {
                                      bootbox.alert(msg);
                                  },
                                  true
                              );

                          }
                      },
                      remove:{
                          label:lang.label.delete,
                          icon:'glyphicon glyphicon-minus',
                          action:function() {
                              var ref = permTree.jstree(true);
                              var sel = ref.get_selected();
                              if(!sel.length) {
                                  return false;
                              }
                              sel = sel[0];
                              var id = sel.substring('node_'.length);
                              if (id == 1) {
                                  bootbox.alert(lang.error.perm.root_noperm_delete);
                                  return false;
                              }
                              liuxy.ajax(btnSubmit,requestUri+'delete.json','json',
                                  {id:sel.substring('node_'.length)},
                                  function(data){
                                      bootbox.alert(lang.success.delete,function() {
                                          perm.refresh();
                                      });

                                  },
                                  function(no,msg) {
                                      bootbox.alert(msg);
                                  },
                                  true
                              );
                          }
                      }
                  }
              }
          });
            var aObj =  $('.tools a');
            aObj.bind('click',function() {
                var pid = $('#goback').val();
                if (pid) {
                    perm.get(this,pid);
                }
            });
        },
        create:function() {
            liuxy.ajax(btnSubmit,requestUri+'create.json','json',
                permForm.serialize(),
                function(data){
                    message.success(container,{content:lang.success.add});
                    perm.refresh();
                },
                function(no,msg) {
                    message.error(container,{content:msg});
                },
                true
            );
        },
        update:function() {
            liuxy.ajax(btnSubmit,requestUri+'update.json','json',
                permForm.serialize(),
                function(data){
                    message.success(container,{content:lang.success.edit});
                    perm.refresh();
                },
                function(no,msg) {
                    message.error(container,{content:msg});
                },
                true
            );
        },
        refresh:function() {
            permTree.jstree(true).refresh();
        },
        get:function(obj,parentId) {
            $('#tools').hide();
            liuxy.ajax($(obj),requestUri+'ajax','text',
                {'parent':parentId},
                function(data){
                    permTable.html(data);

                    if (parentId != 'node_1') {
                        $('#tools').show();
                    }
                    $( "tbody",permTable ).sortable({
                        placeholder: "ui-state-highlight",
                        update:function(event,u) {
                            var ids=[];
                            $("tr",permTable).each(function() {
                                ids.push($(this).attr('pid'));
                            });
                            liuxy.ajax(btnSubmit,requestUri+'seq.json','json',
                                {'ids' : ids.join('_')},
                                function(data){
                                    perm.refresh();
                                },
                                function(no,msg) {
                                    message.error(container,{content:msg});
                                },
                                true
                            );
                        }
                    });
                    $( "tbody" ,permTable).disableSelection();
                },
                function(no,msg) {
                    message.error(container,{content:msg});
                },
                true
            );
        }
    };
}();