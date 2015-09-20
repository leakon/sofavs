<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>

<?php include_http_metas() ?>
<?php include_metas() ?>

<?php include_title() ?>

<link rel="shortcut icon" href="/favicon.ico" />

</head>
<body style="margin-top:30px;">

	<div id="userOption">
	<?php if ($sf_user->isAuthenticated()): ?>
		欢迎 &nbsp; <b><?php echo $sf_user->getUsername() ?></b>&nbsp;
		<?php echo link_to('帐户设置', 'user/edit') ?>|
		<?php echo link_to('切换用户', 'user/login') ?>|
		<?php echo link_to('退出登录', 'user/logout') ?>
	<?php else: ?>
		<?php echo link_to('登录', 'user/login') ?>|
		<?php echo link_to('注册', 'user/reg') ?>
	<?php endif ?>

	</div>

<div id="topNav">

	<div id="logo"><?php echo image_tag('/images/1001/sofav.png', array('alt' => 'Sofav', 'title' => 'Sofav'))?></div>

	<div id="search">
		<ul>
			<li id="type">
				<?php echo link_to('标题', '#title') ?>
				<?php echo link_to('标签', '#tag') ?>
				<?php echo link_to('链接', '#url') ?>
				<?php echo link_to('正文', '#body') ?>
				<?php echo link_to('用户', '#user') ?>
				<?php echo link_to('群组', '#group') ?>

			</li>
			<li>
				<?php echo form_tag('post/list') ?>

				<?php echo input_tag('kw', mb_convert_encoding($sf_params->get('kw'), 'UTF-8', 'GBK')) ?>

				<?php echo submit_tag('搜 索', array('class' => 'button')) ?>
				</form>
			</li>
		</ul>
	</div>

</div>

<div id="mainNav">
	<ul>
		<li><?php echo link_to('添加新篇', 'post/create') ?></li>
		<li><?php echo link_to('最新收录', 'post/index') ?></li>
		<li><?php echo link_to('用户中心', 'user/index') ?></li>

		<li><a onclick="alert('拖拽到浏览器的工具栏就可以立即使用啦！'); return false;" href="javascript:if(window.getSelection){txt=window.getSelection();}else%20if(document.getSelection){txt=document.getSelection();}else%20if(document.selection){txt=document.selection.createRange().text;}location.href='<?php echo url_for('post/create', true) ?>?title='+encodeURIComponent(document.title)+'&amp;url='+encodeURIComponent(location.href)+'&amp;body='+encodeURIComponent(txt);" style="color:red;">快速收藏</a></li>
	</ul>
</div>


<div>
<?php echo $sf_data->getRaw('sf_content') ?>
</div>

<div id="footHeight"></div>
<div id="footContent">
	<div id="logo2">
	<!--	<img src="/images/1001/lock.png" alt="sofav" title="sofav" />-->
	</div>
	<div id="footLinks" class="links">
		<a href="#">加入收藏</a>|
		<a href="#">意见反馈</a>|
		<a href="#">邀请朋友</a>|
		<a href="#">订阅按钮</a>|
		<a href="http://hi.baidu.com/mysofav" target="_blank">开发日记</a>|
		<a href="api_doc/default.htm" target="_blank">开发平台</a>|
		<a href="help/default.htm" target="_blank">帮助信息</a><br />

		<a href="#">关于我们</a>|
		<a href="#">隐私政策</a>|
		<a href="#">使用条款</a>|
		<a href="friend/default.htm" target="_blank">友情链接</a>

	</div>
</div>

</body>
</html>
