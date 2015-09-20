<?php use_helper('Validation') ?>
<?php echo form_tag('user/edit') ?>

修改 <?php echo $sf_user->getUsername() ?> 的密码
<table cellpadding="2" cellspacing="2" border="0">
<tr>
	<th>
		<label for="old_password">原密码</label>
	</th>
	<td>
		<?php echo form_error('old_password') ?>
		<?php if (!empty($editInfo['old_password_incorrect'])): ?>
		<div>原密码错误，请重新输入</div>
		<?php endif ?>

		<?php echo input_password_tag('old_password', $sf_params->get('old_password')) ?>

	</td>
</tr>
<tr>
	<th>
		<label for="password">新密码</label>
	</th>
	<td>
		<?php echo form_error('password') ?>
		<?php echo input_password_tag('password', $sf_params->get('password')) ?>

	</td>
</tr>
<tr>
	<th>
		<label for="confirm">确认密码</label>
	</th>
	<td>
		<?php echo form_error('confirm') ?>
		<?php echo input_password_tag('confirm', $sf_params->get('confirm')) ?>

	</td>
</tr>
<tr>
	<th>&nbsp;</th>
	<td>
		<?php echo input_hidden_tag('signature', empty($editInfo['signature']) ? $sf_params->get('signature') : $editInfo['signature']) ?>

		<?php echo submit_tag('保存', array('class' => 'button')) ?>

	</td>
</tr>
</table>
</form>