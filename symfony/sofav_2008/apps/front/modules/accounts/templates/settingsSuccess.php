<?php use_helper('Validation') ?>
<?php use_helper('Object') ?>

<?php echo form_tag('accounts/updateSettings') ?>

<?php echo input_hidden_tag('refer', HelperView::getRefer()) ?>

<?php

#var_dump($sf_params);

?>

<ul>

<li>
	OldPassword:
	<?php echo input_password_tag('oldpass', $sf_params->get('oldpass')) ?>
	<?php echo form_error('oldpass') ?>
</li>

<li>
	Password:
	<?php echo input_password_tag('password', $sf_params->get('password')) ?>
	<?php echo form_error('password') ?>
</li>

<li>
	Confirm:
	<?php echo input_password_tag('confirm', $sf_params->get('confirm')) ?>
	<?php echo form_error('confirm') ?>
</li>

<li>
	NickName:
	<?php
		echo input_tag(
				'nickname',
				HelperView::printSeq( $sf_params->get('nickname', ''), $objUser->getNickname() )
			);
	?>
	<?php echo form_error('nickname') ?>
</li>


<li>
	EMail:
	<?php /* echo input_tag('email', $sf_params->get('email')) */ ?>
	<?php /* object_input_tag($objUser, 'getEmail', array(), $sf_params->get('email')) */ ?>

	<?php
		echo input_tag(
				'email',
				HelperView::printSeq( $sf_params->get('email', ''), $objUser->getEmail() )
			);
	?>
	<?php echo form_error('email') ?>
</li>


<li>
	<input type="submit" value="Update" />
</li>

</form>

