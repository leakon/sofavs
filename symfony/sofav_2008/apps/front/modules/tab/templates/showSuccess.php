<?php
// auto-generated by sfDoctrineAdmin
// date: 2008/05/06 16:01:25
?>
<table>
<tbody>
<tr>
<th>Id: </th>
<td><?php echo $tab->getid() ?></td>
</tr>
<tr>
<th>User: </th>
<td><?php echo $tab->getuser_id() ?></td>
</tr>
<tr>
<th>Title: </th>
<td><?php echo $tab->gettitle() ?></td>
</tr>
</tbody>
</table>
<hr />
<?php echo link_to('edit', 'tab/edit?id='.$tab->id) ?>
&nbsp;<?php echo link_to('list', 'tab/list') ?>
