<?php use_helper('Validation') ?>
<?php echo form_tag('user/reg') ?>
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
		<?php echo submit_tag('注册', array('class' => 'button')) ?>
	</td>
</tr>
</table>
</form>