<?php
// auto-generated by sfDoctrineAdmin
// date: 2008/05/06 16:01:25
?>
<h1>tab</h1>

<table>
<thead>
<tr>
  <th>Id</th>
  <th>User</th>
  <th>Title</th>
</tr>
</thead>
<tbody>
<?php foreach ($tabs as $tab): ?>
<tr>
    <td><?php echo link_to($tab->get('id'), 'tab/show?id='.$tab->id); ?></td>
      <td><?php echo $tab->get('user_id'); ?></td>
      <td><?php echo $tab->get('title'); ?></td>
  </tr>
<?php endforeach; ?>
<tr><td>Number of tabs: <?php echo count($tabs) ?></td></tr>
</tbody>
</table>

<?php echo link_to ('create', 'tab/create') ?>
