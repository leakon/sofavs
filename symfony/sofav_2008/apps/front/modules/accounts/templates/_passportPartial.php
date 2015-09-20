
<h2>Sofav</h2>

<p>

<?php if ($sf_user->getId()) : ?>
<?php echo $sf_user->getUsername() ?> | <?php echo link_to('Manage', 'accounts/manage') ?> | <?php echo link_to('Logout', 'accounts/logout') ?>
<?php else : ?>
Guest | <?php echo link_to('Login', 'accounts/login') ?> | <?php echo link_to('SignUp', 'accounts/create') ?>
<?php endif ?>
 | <?php echo link_to('Secure', 'accounts/secure') ?> | <?php echo $GLOBALS['status_codes_glb'] ?>

</p>

<hr />