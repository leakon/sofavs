var DM=screen,EM={ddb:"email",Tcb:"advanced",Ddb:"invite",aDa:"access",lga:"link",edb:"email_attach",leb:"share_world",keb:"share_domain",pEa:"init",ydb:"init_share",Zcb:"data"},FM={NONE:0,Ydb:10,deb:20,MFa:30,XEa:40},GM={zga:"seeNotifications",bDa:"aclInfoUpdated",EEa:"menuUpdated"},HM="/ui/";Ig.HtmlUtil_setServerBase=function(a){HM=a};var IM,JM,KM,LM=function(a,b){var c;if(a){c=dl(a);var e=kl(a);c.y+=e[O]}else c=new Vj(0,0);a=e[w]>307?e[w]:307;if(b){c.x+=b[rd]-b[ve];c.y+=b[sd]-b[we]}if(c.x+313>DM[w])c.x=DM[w]-313;if(c.y+600>DM[O])c.y=DM[O]-600;return new Lk(c.x,c.y,a,554)},NM=function(a,b,c,e){var f,g;if(b){g=ak(b);f=g[Jf]("id")}else f=j;b=!Ni&&g?ik($j(g))||m:m;c=LM(g,c);c="toolbar=no,location=no,menubar=no,scrollbars=no,resizable=yes,status=no,width="+c[w]+",height="+c[O]+",top="+c.top+",left="+c[nd];a=MM(a,f,e);if(!IM||IM[gf])IM=
b[uc](a[F](),"_chooser",c);IM[Gd]()},MM=function(a,b,c){a=a.Gq(new Em("widgets/ContactChooser"));b&&a.Aa("inputId",b);if(c){c.serviceName&&a.Aa("service",c.serviceName);c.hl&&a.Aa("hl",c.hl);c.tempTitle&&a.Aa("tempTitle",c.tempTitle)}return a},OM=function(){rk(KM);JM=KM=j};Lg("goog.focus.ChooserLauncher.popChooser",function(a,b,c){var e=new Em(HM[Dc](/ui\/?$/,""));NM(e,a,b,c)},undefined);
Lg("goog.focus.ChooserLauncher.popIframe",function(a,b,c){JM&&OM();var e=new Em(HM[Dc](/ui\/?$/,""));b=ak(a);b=LM(b,j);a=MM(e,a,c);m.iframeDone=OM;a.Aa("done","iframeDone");c=ak("chooser-iframe-div");if(c==j){c=kk("div",{id:"chooser-iframe-div",style:"position: absolute; background-color; #FFF",zIndex:10});oa[rf][u](c);q(c,'<iframe id="chooser-iframe" style="display:none;background-color; #FFF; border: 0"></iframe>')}e=ak("chooser-iframe");s(e[I],"block");il(c,b[nd],b.top);jl(e,b[w],b[O]);e.src=a;
KM=c;JM=e},undefined);var PM,QM,RM,SM=function(a,b){var c=307,e;if(W)c+=5;if(a){e=dl(a);var f=kl(a);e.y+=f[O]}else e=new Vj(0,0);a=f[w]>c?f[w]:c;if(b){e.x+=b[rd]-b[ve];e.y+=b[sd]-b[we]}if(e.x+313>DM[w])e.x=DM[w]-313;if(e.y+600>DM[O])e.y=DM[O]-600;return new Lk(e.x,e.y,a,554)},UM=function(a,b,c,e){var f,g;if(b){g=ak(b);f=g[Jf]("id")}else f=j;b=!Ni&&g?ik($j(g))||m:m;c=SM(g,c);g="toolbar=no,location=no,menubar=no,scrollbars=no,resizable=yes,status=no,width="+c[w]+",height="+c[O]+",top="+c.top+",left="+c[nd];a=TM(a,f,e);a.Aa("width",
c[w]);a.Aa("height",c[O]);if(!PM||PM[gf])PM=b[uc](a[F](),"_picker",g);PM[Gd]()},TM=function(a,b,c){a=a.Gq(new Em("ui/ContactPicker"));b&&a.Aa("inputId",b);if(c){c.serviceName&&a.Aa("service",c.serviceName);c.hl&&a.Aa("hl",c.hl)}return a},VM=function(){rk(RM);QM=RM=j};Lg("goog.focus.PickerLauncher.popPicker",function(a,b){var c=new Em(HM[Dc](/ui\/?$/,""));UM(c,a,b)},undefined);
Lg("goog.focus.PickerLauncher.popIframe",function(a,b,c){QM&&VM();var e=new Em(HM[Dc](/ui\/?$/,""));b=ak(a);b=SM(b,j);a=TM(e,a,c);m.iframeDone=VM;a.Aa("done","iframeDone");c=ak("PICKER_IFRAME_DIV_ID");if(c==j){c=kk("div",{id:"PICKER_IFRAME_DIV_ID",style:"position: absolute; background-color; #FFF",zIndex:10});oa[rf][u](c);q(c,'<iframe id="PICKER_IFRAME_ID" style="display: none; background-color; #FFF; border: 0"></iframe>')}e=ak("PICKER_IFRAME_ID");s(e[I],"block");il(c,b[nd],b.top);jl(e,b[w],b[O]);
e.src=a;RM=c;QM=e},undefined);var JB=function(a,b){this.Qeb=[];this.tP=Tg(a)?new Em(a):a;if(this.tP.Oe[Tc](0)!="/")d(Error());this.TA=b;this.jS={};this.sW=j;this.TB={};this.Aaa={};this.xW={};this.fU=j};JB[H].aB=function(a){this.kF=a};var WM=function(a){this.params=a;this.qO=new Un;this.Ur=j};WM[H].pGa=function(a){this.Ur?this.Ur.addInput(a):this.qO.add(a)};WM[H].F4a=function(a){this.Ur?this.Ur.removeInput(a):this.qO[Fd](a)};WM[H].SP=function(a){this.Ur&&this.Ur.setTarget(a)};Q=JB[H];
Q.W8=function(a){if(this.bma)d(Error("Email autcomplete was already initialized. To attach it to an input field, please use attachAutocomplete()"));this.bma=h;this.jS=a||{};var b=this;this.BPa().VMa(function(c){if(c=(c[me]||c[ig][he])._EmailAc_create){b.sW=c;for(var e in b.TB)b.wra(b.TB[e]);if(b.fU){c=Zg(b.fU);(c=b.xW[c])&&c.SP(b.fU)}for(e in b.TB){c=b.TB[e];c=c.qO.zd();for(var f=1;f<c[G];f++)Aj(c[f],"focus",b.Waa,k,b)}}})};
Q.wra=function(a){if(this.sW){var b=a[Ox];b.serverBase=this.tP;b.onComplete=R(this.G0a,this);for(var c in this.jS)b[c]=this.jS[c];c=a.qO.zd();a.Ur=this.sW(c[0],b);for(b=1;b<c[G];b++)a.Ur.addInput(c[b]);a.qO[fe]()}};Q.wR=function(a,b,c){a=ak(a);b=b||{};var e=Zg(a);this.Aaa[e]=c;var f;c="";for(f in b)c+=f+"="+b[f]+";";f=c;c=this.TB[f];if(!c){c=new WM(b);this.TB[f]=c}c.pGa(a);this.xW[e]=c;c.Ur||(this.sW?this.wra(c):xj(a,"focus",this.Waa,k,this))};Q.Waa=function(a){this.fU=a[K];this.bma||this.W8()};
Q.G0a=function(a){var b=this.Aaa[Zg(a)];b&&b(a)};Q.ELa=function(a){a=ak(a);Aj(a,"focus",this.Waa,k,this);var b=Zg(a);delete this.Aaa[b];var c=this.xW[b];if(c){c.F4a(a);delete this.xW[b]}};Q.mHa=function(a,b){this.W8(b);this.wR(a,b)};Q.lHa=function(a){this.wR(a)};Q.bta=function(a,b){UM(this.tP,a,b,{serviceName:this.TA,hl:this.kF})};Q.CZa=function(a,b){NM(this.tP,a,b,{serviceName:this.TA,hl:this.kF})};
Q.BPa=function(){if(!this.ama){var a=this.tP.Gq(new Em(this.jS.ac2?"ui/EmailAc2":"ui/EmailAc"));a.Aa("service",this.TA);this.kF&&a.Aa("hl",this.kF);this.ama=this.d0a(a[F]())}return this.ama};Q.d0a=function(a){return new XM(a)};Lg("goog.ContactTools",JB,undefined);JB[H].setLocale=JB[H].aB;JB[H].attachAutocompleteTo=JB[H].mHa;JB[H].attachAutocompleteAlsoTo=JB[H].lHa;JB[H].initAutocomplete=JB[H].W8;JB[H].attachAutocomplete=JB[H].wR;JB[H].detachAutocomplete=JB[H].ELa;JB[H].launchPicker=JB[H].bta;
JB[H].launchChooser=JB[H].CZa;var XM=function(a){this.Tj=[];this.hA=this.Z3();oa[rf][u](this.hA);W?xj(this.hA,"readystatechange",this.gO,k,this):xj(this.hA,"load",this.Uua,k,this);this.hA.src=a};XM[H].VMa=function(a){this.ub?a(this.ub):this.Tj[v](a)};XM[H].Z3=function(){var a=kk("iframe");a.src='javascript:""';var b=a[I];ob(b,"hidden");ya(b,mc(b,"10px"));if(Ni)Ya(b,b.marginLeft="-99px");else{yb(b,"absolute");b.top=La(b,"-10px")}return a};XM[H].gO=function(){this.hA[Cd]=="complete"&&this.Uua()};
XM[H].Uua=function(){this.ub=this.hA;delete this.hA;for(var a=0;this.Tj[a];++a)this.Tj[a](this.ub);delete this.Tj};var YM={eeb:"request",bga:"close",fdb:"error",QB:"save",zga:"seeNotifications"};var ZM=function(){};S(ZM,Bo);Q=ZM[H];Q.rpa=function(){return EM};Q.xRa=function(){return Fy};Q.UOa=function(){return GM};Q.AQa=function(){return YM};Q.tv=function(){return FM};Io("shareclient",ZM);
