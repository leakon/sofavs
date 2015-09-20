<?php use_helper('Object') ?>

<?php echo form_tag('post/update') ?>

<?php echo object_input_hidden_tag($post, 'getId') ?>

<?php echo input_hidden_tag('referer', $sf_request->getReferer()) ?>

<table cellpadding="2" cellspacing="2" border="0">
<tbody>
<tr>
	<th>标题</th>
	<td><?php echo object_input_tag($post, 'getTitle', array (
	'size' => 80,
	)) ?></td>
</tr>
<tr>
	<th>链接</th>
	<td><?php echo object_input_tag($post, 'getUrl', array (
	'size' => 80,
	)) ?></td>
</tr>
<tr>
	<th>标签</th>
	<td><?php echo object_input_tag($post, 'getTags', array (
	'size' => 80,
	)) ?></td>
</tr>
<tr>
	<th>正文</th>
	<td><?php echo object_textarea_tag($post, 'getBody', array (
	'size' => '55x5',
	)) ?></td>
</tr>
<tr>
	<th>共享</th>
	<td>
		<?php echo object_checkbox_tag($post, 'getIsPrivate') ?>
		<label for="is_private">设为私有</label>
	</td>
</tr>
<tr>
	<th>&nbsp;</th>
	<td>
		<?php echo submit_tag('保存', array('class' => 'button')) ?>

		<?php if ($post->getId()): ?>
			<?php echo link_to('删除', 'post/delete?id='.$post->getId(), 'post=true&confirm=Are you sure?') ?>

			<?php echo link_to('取消', 'post/show?id='.$post->getId()) ?>

		<?php else: ?>
			<?php echo link_to('取消', 'post/list') ?>
		<?php endif; ?>

	</td>
</tr>
</tbody>
</table>

</form>


<?php if (!empty($similar)) : ?>
<div id="postRes" class="similarRes">
	<p id="similarMsg">这里有一些与您添加的 URL 类似的收藏</p>
	<ul>
		<?php foreach ($similar as $index => $simPost): ?>

		<li class="<?php if ($index % 2) echo 'evenRow' ?>">
		      <p class="title">
		      	<?php echo link_to($simPost->getTitle(), 'post/show?id=' . $simPost->getId()) ?>
		      	<?php
		      		if ($simPost->getIsPrivate()) {
		      			echo image_tag('/images/1001/lock.png', array('class' => 'icoLock', 'alt' => '私有内容，只有您自己可以看到', 'title' => '私有内容，只有您自己可以看到'));
		      		}
		      	?>

		      	<span class="author">
		      	<?php echo $simPost->getUser()->getUsername() ?>
		      	<?php if($sf_user->getId() && $simPost->getUser()->getId() == $sf_user->getId()) : ?>
		      	(您)
		      	<?php endif ?>

		      	</span>
		      </p>
		      <?php
		      	if ($simPost->getArrayTag()) {
		      		echo '<p class="tag">';
		      		foreach($simPost->getArrayTag() as $tag) {

		      			echo link_to_unless(empty($tag), $tag, 'post/show?id=' . $simPost->getId());
		      			echo ' ';
		      		}
		      		echo '</p>';
		      	}
		      ?>

		      <?php if ($simPost->getBody()) {echo '<p>' . $simPost->getBody() . '</p>'; } ?>
		      <p>
		      	<span class="url"><?php echo $simPost->getUrl() ?></span>
		      	<span class="simiqual"><?php echo $simPost->getUrl() == $post->getUrl() ? '<span class="equal">equal</span>' : '<span class="similar">similar</span>' ?></span>
		      	<span class="time"><?php echo $simPost->getCreatedAt() ?></span>
		      </p>
		</li>
		<?php endforeach; ?>

	</ul>

</div>
<?php endif ?>