<?php use_helper('Validation') ?>
<?php echo form_tag('accounts/login') ?>

<?php echo input_hidden_tag('refer', $sf_request->getReferer()) ?>

<ul>

<?php if (isset($passwordNotMatch)) : ?>


<li>
	用户名和密码不匹配
</li>

<?php endif ?>

<li>
	UserName:
	<?php echo input_tag('username', $sf_params->get('username')) ?>
	<?php echo form_error('username') ?>
</li>

<li>
	Password:
	<?php echo input_password_tag('password', $sf_params->get('password')) ?>
	<?php echo form_error('password') ?>
</li>

<li>
	<input type="submit" value="Login" />
</li>

</form>