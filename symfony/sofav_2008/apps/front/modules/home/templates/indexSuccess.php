<style>
#testList ul.mylinks	{list-style:none; width: 280px; border:2px solid red; overflow:auto;}

#testList ul.mylinks li	{list-style:none; float:left; }
#testList ul.mylinks li	{width:120px; font-size:14px; margin:4px; padding:4px; cursor:move;}
#testList ul.mylinks li	{border-bottom: 1px dotted black; }
</style>
<style type="text/css">

td
{
 width: 10em;
 text-align: center;
}

table.mytable {
	list-style-type: none;
	padding: 4px 4px 0 4px;
	margin: 0px;
	font-size: 13px;
	font-family: Arial, sans-serif;
}

table.mytable tr {
	margin-bottom: 4px;
	padding: 2px 2px;
	border: 1px solid #c00;
	background-color: #eee;
}

div.draggable {
  cursor:move;
  padding:2px;
  background-color: #BBCCDD;
  z-index:888;
}

div.dropsite {
  padding:2px;
  background-color: #DDBB99;
  z-index:811;
}

div.hoverclass123
{
	border:1px solid red;
}

</style>

<h1>script.aculo.us: Two floating sortables with containment and dropOnEmpty</h1>

<div style="height:200px;">
<div style="float:left;">
<h3>This is the first list</h3>
 <ul class="sortabledemo" id="firstlist" style="height:150px;width:200px;">
   <li class="green" id="firstlist_firstlist1">Item 1 from first list.</li>

   <li class="green" id="firstlist_firstlist2">Item 2 from first list.</li>
   <li class="green" id="firstlist_firstlist3">Item 3 from first list.</li>
 </ul>
</div>
 <div style="float:left;">
 <h3>And now the second list</h3>
 <ul class="sortabledemo" id="secondlist" style="height:150px;width:200px;">
   <li class="orange" id="secondlist_secondlist1">
     <span class="handle">DRAG HERE</span> Item 1 from second list.
   </li>
   <li class="orange" id="secondlist_secondlist2">
     <span class="handle">DRAG HERE</span> Item 2 from second list.
   </li>
   <li class="orange" id="secondlist_secondlist3">
     <span class="handle">DRAG HERE</span> Item 3 from second list.
   </li>

 </ul>


<div id="testList">

<table border="1">
<tr>
<td>
	<h3>Links 1</h3>
	<ul id="links_1" class="mylinks">
	<li>
	<a href="http://www.baidu.com/" target="_blank">百度</a>
	</li>
	<li>
	<a href="http://www.sina.com.cn/" target="_blank">新浪</a>
	</li>
	<li>
	<a href="http://www.sohu.com/" target="_blank">搜狐</a>
	</li>
	<li>
	<a href="http://www.163.com/" target="_blank">网易</a>
	</li>
	<li>
	<a href="http://www.google.com/" target="_blank">Google</a>
	</li>
	<li>
	<a href="http://www.qq.com/" target="_blank">腾讯</a>
	</li>
	<li>
	<a href="http://www.tom.com/" target="_blank">TOM</a>
	</li>
	<li>
	<a href="http://www.taobao.com/" target="_blank">淘宝网</a>
	</li>
	<li>
	<a href="http://www.hao123.com/" target="_blank">Hao123网址之家</a>
	</li>
	</ul>
</td>
<td>


	<h3>Links 2</h3>
	<ul id="links_2" class="mylinks">
	<li>
	<a href="http://www.21cn.com/" target="_blank">21CN</a>
	</li>
	<li>
	<a href="http://www.chinaren.com/" target="_blank">ChinaRen</a>
	</li>
	<li>
	<a href="http://www.yahoo.com.cn/" target="_blank">雅虎</a>
	</li>
	<li>
	<a href="http://www.china.com/" target="_blank">中华网</a>
	</li>
	<li>
	<a href="http://www.chinabbs.com/" target="_blank">ChinaBBS</a>
	</li>
	<li>
	<a href="http://www.ebay.com.cn/" target="_blank">易趣网</a>
	</li>
	<li>
	<a href="http://www.xinhuanet.com/" target="_blank">新华网</a>
	</li>
	<li>
	<a href="http://www.gov.cn/" target="_blank">中国政府网</a>
	</li>
	<li>
	<a href="http://www.pconline.com.cn/" target="_blank">太平洋电脑网</a>
	</li>
	</ul>
</td>
</tr>
</table>

</div>


</div>
</div>

<hr style="clear:both" />

<pre id="firstlist_debug"></pre>
<pre id="secondlist_debug"></pre>

 <script type="text/javascript">
 // <![CDATA[
   Sortable.create("firstlist",
     {dropOnEmpty:true,containment:["firstlist","secondlist"],constraint:false,
      onChange:function(){$('firstlist_debug').innerHTML = Sortable.serialize('firstlist') }});

   Sortable.create("secondlist",
     {dropOnEmpty:true,handle:'handle',containment:["firstlist","secondlist"],constraint:false,
     onChange:function(){$('secondlist_debug').innerHTML = Sortable.serialize('secondlist') }});


   Sortable.create("links_1",
     {dropOnEmpty:true,containment:["links_1","links_2"],constraint:false,
      onChange:function(){}});

   Sortable.create("links_2",
     {dropOnEmpty:true,containment:["links_1","links_2"],constraint:false,
      onChange:function(){}});



 // ]]>
 </script>










<script language="JavaScript" type="text/javascript">

Position.includeScrollOffsets = true;

window.onload = function()
{
	var t1 = document.getElementById("t1");
	add_divs(t1, 'td', 'draggable');
	var trs = t1.getElementsByTagName("tr");
	for (var i = 0; i < trs.length; i++)
	{
		var divs = document.getElementsByClassName("draggable", trs[i]);
		var drag_text = divs[2].innerHTML;
		for (var j = 0; j < divs.length; ++j)
		{
			new Draggable(divs[j], {ghosting:true, revert:true, zindex:4000});
		}
	}

	var t2 = document.getElementById("t2");
	add_divs(t2, 'td', 'dropsite');
	var divs = document.getElementsByClassName("dropsite", t2);
	for (var j = 0; j < divs.length; ++j)
	{
		Droppables.add(divs[j], {
					accept:'draggable',
				//	hoverclass:'hoverclass123',
					onDrop:function(element, dropon, event) {
						debug("dropped " + element.innerHTML + " on "
							+ dropon.innerHTML + "\n");

						dropon.innerHTML = element.innerHTML;

						},
					zindex:2000
					}
			);
	}
};

function debug(text)
{
   document.getElementById('debug').innerHTML
       = "<pre>" + text + "</pre>";
}

function add_divs(table, tag, classname)
{
	var items = table.getElementsByTagName(tag);
	for (var i = 0; i < items.length; i++)
		items[i].innerHTML =
			"<div class='" + classname + "'>" + items[i].innerHTML + "</div>";
}

</script>

 <p>Drag from this table:</p>
<DIV STYLE="padding-left: 50pt;">
<DIV STYLE="overflow: auto; width: 250; height: 100;
            border: 1px gray solid;
            padding:0px; margin: 0px;">
<table id="t1" class="sortable mytable">
    <tr><td>one</td><td>1</td><td>uno</td></tr>
    <tr><td>two</td><td>2</td><td>dos</td></tr>
    <tr><td>three</td><td>3</td><td>tres</td></tr>

    <tr><td>four</td><td>4</td><td>quatro</td></tr>
    <tr><td>five</td><td>5</td><td>cinco</td></tr>
    <tr><td>six</td><td>6</td><td>seis</td></tr>
    <tr><td>seven</td><td>7</td><td>siete</td></tr>

    <tr><td>eight</td><td>8</td><td>ocho</td></tr>
    <tr><td>nine</td><td>9</td><td>nueve</td></tr>
    <tr><td>ten</td><td>10</td><td>diez</td></tr>
</table>
</DIV>

</DIV>
<p>
<p>Drop on this table:</p>
<DIV STYLE="padding-left: 50pt;">
<DIV STYLE="overflow: auto; width: 250; height: 100;
            border: 1px gray solid;
            padding:0px; margin: 0px;">
<table id="t2" class="sortable mytable">
    <tr><td>eleven</td><td>11</td><td>once</td></tr>
    <tr><td>twelve</td><td>12</td><td>doce</td></tr>

    <tr><td>thirteen</td><td>13</td><td>trece</td></tr>
    <tr><td>fourteen</td><td>14</td><td>catorce</td></tr>
    <tr><td>fifteen</td><td>15</td><td>quince</td></tr>
    <tr><td>sixteen</td><td>16</td><td>dieciseis</td></tr>

    <tr><td>seventeen</td><td>17</td><td>diecisiete</td></tr>
    <tr><td>eightteen</td><td>18</td><td>dieciocho</td></tr>
    <tr><td>nineteen</td><td>19</td><td>diecinueve</td></tr>
    <tr><td>twenty</td><td>20</td><td>veinte</td></tr>

</table>
</DIV>
</DIV>
<p>
<div id="debug"></div>
</p>