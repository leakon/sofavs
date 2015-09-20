

<?php if (0): ?>

<?php foreach (TabTable::getUserTabs( $sf_user->getId() ) as $tab): ?>

<td class="l_tab ">
	<div class="rounded bb">
		<div class="t"><div class="l"><div class="r"><div class="tl"><div class="tr">
			<div class="body">

		<a href="<?php
			#	echo url_for( $sf_user->getUsername() . '/tab/33'.urlencode($tab->title) );
				echo url_for( sprintf('@user_tab?username=%s&title=%s', $sf_user->getUsername(), urlencode($tab->title)) );


			?>"><?php echo $tab->get('title'); ?></a>

			</div>
		</div></div></div></div></div>
	</div>
</td>

<?php endforeach; ?>



<tr>
    <td><?php echo link_to($tab->get('id'), 'tab/show?id='.$tab->id); ?></td>
      <td><?php echo $tab->get('user_id'); ?></td>
      <td><?php echo $tab->get('title'); ?></td>
  </tr>

<?php endif ?>
