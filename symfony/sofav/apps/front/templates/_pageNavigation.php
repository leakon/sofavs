<?php if ($pageNavigation->haveToPaginate()): ?>
<?php
	$navLength = 9;
	$firstPosition = ceil(($navLength + 1) * 0.5);
//	$lastPosition = floor(($navLength - 1) * 0.5) + 1;
	$lastPosition = $navLength + 1 - $firstPosition;
	$pageToken = $pageNavigation->getLastPage() > $navLength;	// 总页数是否大于分页条的长度？
?>

<div id="pageNav">
  <?php
  	// previous
  	if ($pageNavigation->getPage() > 1) {
  		echo link_to('&lt;', $pageUri.'page='.$pageNavigation->getPreviousPage());
  	}
  ?>
  <?php
  	// first
  	if ($pageNavigation->getPage() > $firstPosition && $pageToken) {
  		echo link_to('1', $pageUri.'page=1');
  	}
  ?>

  <?php foreach ($pageNavigation->getLinks($navLength) as $page): ?>
    <?php
    	if ($page == $pageNavigation->getPage()) {
    		echo "<b>$page</b>";
    	} else {
    		echo link_to($page, $pageUri.'page='.$page);
    	}
    ?>
  <?php endforeach; ?>

  <?php
  	// last
  	if ($pageNavigation->getPage() <= ($pageNavigation->getLastPage() - $lastPosition) && $pageToken) {
  		echo link_to($pageNavigation->getLastPage(), $pageUri.'page='.$pageNavigation->getLastPage());
  	}
  ?>
  <?php
  	// next
  	if ($pageNavigation->getPage() < $pageNavigation->getLastPage()) {
  		echo link_to('&gt;', $pageUri.'page='.$pageNavigation->getNextPage());
  	}
  ?>

</div>
<?php endif; ?>