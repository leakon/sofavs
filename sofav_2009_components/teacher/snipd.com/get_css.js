var style = '.boxy-wrapper { position: absolute; }' + 
'' + 
'.boxy-wrapper.fixed { position: fixed;/*fixed for firefox, IE must be absolute*/ }' + 
'' + 
'' + 
'  /* Modal */' + 
'  ' + 
'  .boxy-modal-blackout { position: absolute; background-color: black; left: 0; top: 0; }' + 
'  ' + 
'  /* Border */' + 
'' + 
'  .boxy-wrapper { empty-cells: show; }' + 
'	.boxy-wrapper .top-left,' + 
'	.boxy-wrapper .top-right,' + 
'	.boxy-wrapper .bottom-right,' + 
'	.boxy-wrapper .bottom-left { width: 10px; height: 10px; padding: 0 }' + 
'	' + 
'	.boxy-wrapper .top-left { background: url(\'http://onehackoranother.com/projects/jquery/boxy/images/boxy-nw.png\'); }' + 
'	.boxy-wrapper .top-right { background: url(\'http://onehackoranother.com/projects/jquery/boxy/images/boxy-ne.png\'); }' + 
'	.boxy-wrapper .bottom-right { background: url(\'http://onehackoranother.com/projects/jquery/boxy/images/boxy-se.png\'); }' + 
'	.boxy-wrapper .bottom-left { background: url(\'http://onehackoranother.com/projects/jquery/boxy/images/boxy-sw.png\'); }' + 
'	' + 
'	/* IE6+7 hacks for the border. IE7 should support this natively but fails in conjuction with modal blackout bg. */' + 
'	/* NB: these must be absolute paths or URLs to your images */' + 
'	.boxy-wrapper .top-left { #background: none; #filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://onehackoranother.com/projects/jquery/boxy/images/boxy-nw.png\'); }' + 
'	.boxy-wrapper .top-right { #background: none; #filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://onehackoranother.com/projects/jquery/boxy/images/boxy-ne.png\'); }' + 
'	.boxy-wrapper .bottom-right { #background: none; #filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://onehackoranother.com/projects/jquery/boxy/images/boxy-se.png\'); }' + 
'	.boxy-wrapper .bottom-left { #background: none; #filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://onehackoranother.com/projects/jquery/boxy/images/boxy-sw.png\'); }' + 
'	' + 
'	.boxy-wrapper .top,' + 
'	.boxy-wrapper .bottom { height: 10px; background-color: black; opacity: 0.6; filter: alpha(opacity=60); padding: 0 }' + 
'	' + 
'	.boxy-wrapper .left,' + 
'	.boxy-wrapper .right { width: 10px; background-color: black; opacity: 0.6; filter: alpha(opacity=60); padding: 0 }' + 
'	' + 
'	/* Title bar */' + 
'	' + 
'	.boxy-wrapper .title-bar { background-color: black; padding: 6px; position: relative; }' + 
'	  .boxy-wrapper .title-bar.dragging { cursor: move; }' + 
'	    .boxy-wrapper .title-bar h2 { font-size: 12px; color: white; line-height: 1; margin: 0; padding: 0; font-weight: normal; }' + 
'	    .boxy-wrapper .title-bar .close { color: white; position: absolute; top: 6px; right: 6px; font-size: 90%; line-height: 1; }' + 
'		' + 
'	/* Content Region */' + 
'	' + 
'	.boxy-inner { background-color: white; padding: 0 }' + 
'	.boxy-content { padding: 15px; }' + 
'	' + 
'	/* Question Boxes */' + 
'' + 
'    .boxy-wrapper .question { width: 350px; min-height: 80px; }' + 
'    .boxy-wrapper .answers { text-align: right; }' + 
''; Gui.inject_style("<style>"+style+"</style>");