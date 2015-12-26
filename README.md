# yii2-liuxy-themes
基于Metronic的后台主题模板

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

后台模板配置
-------------

修改Yii2 backend配置文件中components的`view` 部分:

```php
'view' => [
    'theme' => 'liuxy\admin\Theme'
],
```

前台模板配置
-------------

修改Yii2 frontend配置文件中components的`view` 部分:

```php
'view' => [
    'theme' => 'liuxy\frontend\Theme'
],
```
