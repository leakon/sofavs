<?php
// auto-generated by sfPropelCrud
// date: 2007/07/16 02:18:00
?>
<h1>tag</h1>

<table>
<thead>
<tr>
  <th>Id</th>
  <th>User</th>
  <th>Tag</th>
</tr>
</thead>
<tbody>
<?php foreach ($tags as $tag): ?>
<tr>
    <td><?php echo link_to($tag->getId(), 'tag/show?id='.$tag->getId()) ?></td>
      <td><?php echo $tag->getUserId() ?></td>
      <td><?php echo $tag->getTag() ?></td>
  </tr>
<?php endforeach; ?>
</tbody>
</table>

<?php echo link_to ('create', 'tag/create') ?>