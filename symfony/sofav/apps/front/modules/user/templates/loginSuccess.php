<?php use_helper('Validation') ?>
<?php echo form_tag('user/login') ?>
<table cellpadding="2" cellspacing="2" border="0">
<tr>
	<th>
		<label for="username">用户名</label>
	</th>
	<td>
		<?php echo form_error('username') ?>
		<?php echo input_tag('username', $sf_params->get('username')) ?>
	</td>

</tr>
<tr>
	<th>
		<label for="password">密码</label>
	</th>
	<td>
		<?php echo form_error('password') ?>
		<?php if (!empty($loginInfo['password_incorrect'])): ?>
		<div>密码错误</div>
		<?php endif ?>
		<?php echo input_password_tag('password') ?>
	</td>

</tr>
<tr>
	<th>&nbsp;</th>
	<td>
		<?php echo input_hidden_tag('referer', $sf_request->getAttribute('referer')) ?>
		<?php echo submit_tag('登录', array('class' => 'button')) ?>
	</td>
</tr>
</table>
</form>