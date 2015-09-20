<?php use_helper('Validation') ?>
<?php use_helper('Object') ?>

<?php echo form_tag('item/updateItem') ?>

<?php echo input_hidden_tag('id', $sf_params->get('id')) ?>
<?php echo input_hidden_tag('refer', $sf_request->getReferer()) ?>


<ul>

<li>
	Title:
	<?php echo input_tag('title', $sf_params->get('title')) ?>
	<?php echo form_error('title') ?>
</li>

<li>
	Url:
	<?php echo input_tag('url', $sf_params->get('url')) ?>
	<?php echo form_error('url') ?>
</li>

<li>
	Tag:
	<?php echo input_tag('tag', $sf_params->get('tag')) ?>
</li>

<li>
	Description:
	<?php echo textarea_tag('description', $sf_params->get('description')) ?>
</li>

<li>
	<input type="submit" value="Save" />
</li>

</form>


