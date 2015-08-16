# yii2-liuxy-themes
基于Metronic3.5的后台主题模板

安装
------------

推荐使用 [composer](http://getcomposer.org/download/).进行安装

运行

```
php composer.phar require --prefer-dist liuxy/yii2-themes "*"
```

或者添加如下内容

```
"liuxy/yii2-themes": "*"
```

到 `composer.json` 文件中

配置
-------------

修改Yii2 backend配置文件中components的`view` 部分:

```php
'view' => [
    'theme' => 'liuxy\admin\Theme'
],
```

插件说明
-------------
`core.min.css`
包含以下插件：

```
font-awesome.min.css
simple-line-icons.min.css
bootstrap.min.css
uniform.default.min.css
bootstrap-switch.min.css
jquery-ui-1.10.3.custom.min.css
```

`jquery.min.css`
包含以下插件：

```
jquery.tagsinput.css
jquery.nestable.css
```

`theme.min.css`
包含以下插件：

```
包含layout.css、metronic的plugin.css、圆角样式components-rounded.css
默认使用metronic的layout模板+darkblue.css主题
其他主题在css/themes目录下，可以在页面中包含的theme.min.css下方来替换新主题
```

`bootstrap.min.css`
包含以下插件：

```
bootstrap-colorpicker
bootstrap-datepaginator
bootstrap-datepicker
bootstrap-daterangepicker
bootstrap-datetimepicker
bootstrap-timepicker
```

`pages.min.css`
包含了所有metronic3.5的后台模板样式文件：

```
about-us.css、error.css、coming-soon.css、image-crop.css
inbox.css、invoice.css、lock.css、login3.css
news.css、portfolio.css、pricing-table.css、pricing-tables.css
profile.css、search.css、tasks.css、timeline.css、todo.css

```


`plugins.core.min.js`
包含以下插件：

```
jquery.min.js、jquery-migrate.min.js、jquery-ui-1.10.3.custom.min.js
bootstrap.min.js、bootstrap-hover-dropdown.min.js、jquery.slimscroll.min.js
jquery.blockui.min.js、jquery.cokie.min.js、jquery.uniform.min.js、

```

`app.min.js`
包含metronic的核心扩展文件：

```
metronic.js、layout.js、quick-sidebar.js、demo.js、datatable.js

```

`bootstrap.plugins.min.js`

包含以下插件：
```
jquery.tagsinput.min.js
bootstrap-colorpicker/js/bootstrap-colorpicker.js
bootstrap-daterangepicker/moment.min.js
bootstrap-datepicker/js/bootstrap-datepicker.js
bootstrap-daterangepicker/daterangepicker.js
bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js
bootstrap-timepicker/js/bootstrap-timepicker.min.js
bootstrap-datepaginator/bootstrap-datepaginator.min.js
bootbox/bootbox.min.js'
```


`jquery.plugins.min.js`
包含以下插件：
```
jquery.tagsinput.min.js
jquery.nestable.min.js
query.backstretch.min.js
jquery.zoom.min.js
jquery.easing.min.js
jquery.mockjax.min.js
jquery.parallax.min.js
jquery.pulsate.min.js
jquery.scrollTo.min.js
jquery.sparkline.min.js
jquery.input-ip-address-control-1.0.min.js
jquery-validation/js/jquery.validate.min.js
jquery-validation/js/additional-methods.min.js
jquery.md5.min.js
jquery.base64.min.js
```

其他自定义添加的插件在plugins目录下，核心文件中的图片、字体、富媒体资源均整合到对应
的images或img、fonts和media目录