var BA=function(a){return Tg(a)||Ug(a)};Dz[H].jha=Gg(81,function(a,b){var c=new Fm(this.Ao);a[ed]("up_")==0||(a="up_"+a);c.set(a,b);this.Ao=c[F]()});Jr[H].V6=Gg(44,function(){var a=this.Lc,b=this.md;return a&&b?(b<a?a-b:b-a)+1:j});hA[H].aca=Gg(37,function(){return k});ux[H].fna=Gg(29,function(a,b){a&&this.yc.Xj(h);this.cfa(0,b)});ux[H].p4=Gg(28,function(a){a&&this.yc.Xj(h);this.Ca.Hj(a)});ux[H].cfa=Gg(6,function(a,b){if(this.areTherePendingRequests())a<5?nm(R(this.cfa,this,a+1,b),200):b(h);else b(k)});
var CA=function(a,b,c){var e=j;if(a==0){a=bo((new Em(m[ef][Wf])).xk("xpc"));e=new nz(a);e[Nx]("handle_message",R(this[af],this,"em"));e.zg(c||function(){})}else if(a==1){if(!b)d(Error("Please specify xpc config when initializing outer frame"));e=new nz(b);e[Nx]("handle_message",R(this[af],this,"tr"))}this.ya=e};S(CA,hA);Q=CA[H];Q.aca=function(){return h};Q.bb=function(a,b){a=this.ya.cka(a,R(this.rda,this));this.ya.zg(b);return a};
Sa(Q,function(a){if(!this.ya.yj())d(Error("Channel must be connected in order to send"));this.ya[yd]("handle_message",a)});Q.receive=function(a,b){this[D](new iA({mid:a,msg:b}))};Q.rda=function(a){gc(a[I],"0px");a.frameBorder="no";a.scrolling="no";a.marginheight="0";a.marginwidth="0";ya(a,"100%");mc(a,"100%")};
var DA=/^#(?:[0-9A-Fa-f]{3}){1,2}$/,EA=function(a){return a==j||Vg(a)},FA=function(a){if(!Rg(a))return k;for(var b=0;b<a[G];b++){var c=a[b];if(!Rg(c))return k;for(var e=0;e<c[G];e++)if(!BA(c[e]))return k}return h},GA=function(a){return Ug(a)&&a>0},HA,IA=function(a,b,c){a=Zg(a);var e=vj[a];if(e){var f=Kg(b),g=Kg(c);if(f&&g){e=uj[b];return!!e&&!!e[c]&&a in e[c]}else return f||g?Zh(e,function(i){return f&&i[be]==b||g&&i[id]==c}):h}return k},JA=function(a,b,c){Lg(a,b,c)};
function KA(a){return"Incorrect value passed as argument, '"+(a+"' is not a positive number")}function LA(a){return"Incorrect value passed as argument, '"+(a+"' is not a string nor a number")}function MA(a){return"Invalid HEX color representation '"+(a+"'")};var NA=function(){};S(NA,eo);NA[H].eya=function(a,b){var c=a[G];b[v]("[");for(var e=0,f="",g=0;g<c;g++)if(a[g]==j)e++;else{if(e>0){b[v](zh(",",e));e=0}b[v](f);this.p_(a[g],b);f=","}b[v]("]")};var OA=j,PA=function(a){OA||(OA=new NA);return OA.xa(a)};var QA=function(a,b,c){this.Sk=a;this.lia=b||3;Ga(this,c)};QA[H].Zd=function(){var a=[];a[1]=this.Sk;if(Rg(this[A])&&this.Sk==6){a[3]=fo(this[A]);a[9]=h}else a[this.lia]=this[A];return a};
var SA=function(a){var b=new QA;b.Sk=a[1];var c;a:{switch(b.Sk){case 1:case 2:case 3:case 4:case 5:case 21:case 20:c=2;break a;case 30:c=3;break a}c=j}if(b.lia=c)Ga(b,a[c]);else if(a[9]){Ga(b,bo(a[3]));b[9]=h}else Ga(b,RA(a));return b},TA=function(a){for(var b=[],c=0;c<a[G];c++)b[v](SA(a[c]));return b},RA=function(a){for(var b=2;b<a[G];b++)if(a[b]!=j)return a[b];return j};var UA=function(){this.pb=j;Qa(this,j);this.Ys=j;wa(this,j);this.Lc=j;lb(this,j);this.gG=this.uC=this.md=j;Ga(this,j);this.xaa=this.yaa=j},VA={ieb:"setgadgetuserprefs",heb:"setgadgetprefs",odb:"getpref",geb:"setactivecell",jeb:"setselection",mdb:"getactivecell",pdb:"getselection",ndb:"getactivesheet",sdb:"haspendingchanges",idb:"flushpendingchanges",Jdb:"locksheet",veb:"unlocksheet"};
UA[H].Xa=function(){var a=[];a[2]=this.pb;var b=[];this[wd]!=j&&b[v]((new QA(1,2,this[wd])).Zd());this.Ys!=j&&b[v]((new QA(30,3,this.Ys)).Zd());this[rc]!=j&&b[v]((new QA(2,2,this[rc])).Zd());this.Lc!=j&&b[v]((new QA(4,2,this.Lc)).Zd());this[se]!=j&&b[v]((new QA(3,2,this[se])).Zd());this.md!=j&&b[v]((new QA(5,2,this.md)).Zd());this.Opa!=j&&b[v]((new QA(31,2,this.Opa)).Zd());this.hBa!=j&&b[v]((new QA(32,2,this.hBa)).Zd());this.fBa!=j&&b[v]((new QA(34,2,this.fBa)).Zd());this.tma!=j&&b[v]((new QA(33,
2,this.tma)).Zd());this.rma!=j&&b[v]((new QA(35,2,this.rma)).Zd());this.gG!=j&&b[v]((new QA(21,2,this.gG)).Zd());this.uC!=j&&b[v]((new QA(20,2,this.uC)).Zd());this[A]!=j&&b[v]((new QA(6,j,this[A])).Zd());this.yaa!=j&&b[v]((new QA(15,2,this.yaa)).Zd());this.xaa!=j&&b[v]((new QA(16,2,this.xaa)).Zd());a[4]=b;return PA(a)};var WA=function(a){this.Wa=a};WA[H].$7a=function(a,b){if(!BA(a))d(Error(LA(a)));if(!BA(b))d(Error(LA(b)));var c=new UA;c.pb="setgadgetuserprefs";c.Ys="remote_iframe_"+Ig._args().mid;Ga(c,a+"="+b);this.Wa.Bb(c.Xa(),j,h)};WA[H].setGadgetUserPrefs=WA[H].$7a;WA[H].Y7a=function(a,b){if(!BA(a))d(Error(LA(a)));if(!BA(b))d(Error(LA(b)));var c=new UA;c.pb="setgadgetprefs";c.Ys="remote_iframe_"+Ig._args().mid;Ga(c,a+"="+b);this.Wa.Bb(c.Xa(),j,h)};WA[H].setGadgetPrefs=WA[H].Y7a;
WA[H].XQa=function(a,b){if(!BA(a))d(Error(LA(a)));if(!EA(b))d(Error("Invalid callback passed as argument."));var c=new UA;c.pb="getpref";c.Ys="remote_iframe_"+Ig._args().mid;Ga(c,a);this.Wa.Bb(c.Xa(),b,h)};WA[H].getPref=WA[H].XQa;var Yu=function(a,b){ab(this,a);this.params=b};var XA=function(a,b,c,e,f,g){this.hq=a;this.Wa=b;this.Xw=c;this.Ww=e;this.nK=f||c;this.mK=g||e};XA[H].yE=function(){return this.Xw==this.nK&&this.Ww==this.mK};XA[H].isCell=XA[H].yE;XA[H].kRa=function(){return this.Xw};XA[H].getRowIndex=XA[H].kRa;XA[H].Xb=function(){return this.nK-this.Xw+1};XA[H].getNumRows=XA[H].Xb;XA[H].YOa=function(){return this.Ww};XA[H].getColumnIndex=XA[H].YOa;XA[H].V6=function(){return this.mK-this.Ww+1};XA[H].getNumColumns=XA[H].V6;
XA[H].MOa=function(a,b){if(!GA(a))d(Error(KA(a)));if(!GA(b))d(Error(KA(b)));return new XA(this.hq,this.Wa,this.Xw+a-1,this.Ww+b-1)};XA[H].getCell=XA[H].MOa;XA[H].Nd=function(){return this.mK-this.Ww+1};XA[H].getWidth=XA[H].Nd;XA[H].yd=function(){return this.nK-this.Xw+1};XA[H].getHeight=XA[H].yd;
XA[H].u0a=function(a,b,c,e){if(!GA(a))d(Error(KA(a)));if(!GA(b))d(Error(KA(b)));if(c&&!GA(c))d(Error(KA(c)));if(e&&!GA(e))d(Error(KA(e)));a=this.Xw+a;b=this.Ww+b;c=c||this.yd();e=e||this.Nd();return new XA(this.hq,this.Wa,a,b,a+c-1,b+e-1)};XA[H].offset=XA[H].u0a;XA[H].Oa=function(a){if(!BA(a))d(Error(LA(a)));var b=this.Tb();b.pb=1;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setValue=XA[H].Oa;
XA[H].Uda=function(a){if(!FA(a))d(Error("Invalid range passed as argument."));var b=this.Tb();b.pb=79;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setValues=XA[H].Uda;XA[H].ra=function(a){if(!EA(a))d(Error("Invalid callback passed as argument."));if(!this.yE())d(Error("Please call getValues for ranges which are not single cells."));var b=this.Tb();b.pb=2;this.Wa.Bb(b.Xa(),a)};XA[H].getValue=XA[H].ra;
XA[H].zd=function(a){if(!EA(a))d(Error("Invalid callback passed as argument."));var b=this.Tb();b.pb=46;this.Wa.Bb(b.Xa(),a)};XA[H].getValues=XA[H].zd;XA[H].t7a=function(a){if(!BA(a))d(Error(LA(a)));var b=this.Tb();b.pb=10;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setComment=XA[H].t7a;XA[H].HIa=function(){var a=this.Tb();a.pb=34;this.Wa.Bb(a.Xa());return this};XA[H].clearComment=XA[H].HIa;XA[H].sya=function(a){if(!DA[vc](a))d(Error(MA(a)));var b=this.Tb();b.pb=8;Ga(b,a);this.Wa.Bb(b.Xa());return this};
XA[H].setBackgroundColor=XA[H].sya;XA[H].b7a=function(a,b,c){if(!(a>=0&&a<=255&&b>=0&&b<=255&&c>=0&&c<=255?h:k))d(Error("Invalid RGB color representation '("+(a+(","+(b+(","+(c+")'")))))));return this.sya(YA(a,b,c))};XA[H].setBackgroundColorRGB=XA[H].b7a;XA[H].BU=function(a){if(!EA(a))d(Error("Invalid callback passed as argument."));var b=this.Tb();b.pb=100;this.Wa.Bb(b.Xa(),a)};XA[H].getBackgroundColor=XA[H].BU;
XA[H].J7a=function(a){if(!DA[vc](a))d(Error(MA(a)));var b=this.Tb();b.pb=11;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setFontColor=XA[H].J7a;XA[H].M7a=function(a){if(!GA(a))d(Error(KA(a)));var b=this.Tb();b.pb=14;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setFontSize=XA[H].M7a;XA[H].N7a=function(a){if(!BA(a))d(Error(LA(a)));var b=this.Tb();b.pb=32;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setFontStyle=XA[H].N7a;
XA[H].O7a=function(a){if(!BA(a))d(Error(LA(a)));var b=this.Tb();b.pb=15;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setFontWeight=XA[H].O7a;XA[H].K7a=function(a){if(!BA(a))d(Error(LA(a)));var b=this.Tb();b.pb=12;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setFontFamily=XA[H].K7a;XA[H].E8a=function(a){if(!BA(a))d(Error(LA(a)));var b=this.Tb();b.pb=6;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setNumberFormat=XA[H].E8a;
XA[H].NQa=function(a){if(!EA(a))d(Error("Invalid callback passed as argument."));if(!this.yE())d(Error("getNumberFormat should only be called on single cells."));var b=this.Tb();b.pb=36;this.Wa.Bb(b.Xa(),a)};XA[H].getNumberFormat=XA[H].NQa;XA[H].t3=function(){var a=this.Tb();a.pb=33;this.Wa.Bb(a.Xa());return this};XA[H].clearFormat=XA[H].t3;db(XA[H],function(){var a=this.Tb();a.pb=85;this.Wa.Bb(a.Xa());return this});db(XA[H],XA[H][fe]);
XA[H].R7a=function(a){if(!BA(a))d(Error(LA(a)));var b=this.Tb();b.pb=1;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setFormula=XA[H].R7a;XA[H].kL=function(a){if(!EA(a))d(Error("Invalid callback passed as argument."));if(!this.yE())d(Error("Please call getFormula only on single cells."));var b=this.Tb();b.pb=44;this.Wa.Bb(b.Xa(),a)};XA[H].getFormula=XA[H].kL;XA[H].i8a=function(a){if(!BA(a))d(Error(LA(a)));var b=this.Tb();b.pb=5;Ga(b,a);this.Wa.Bb(b.Xa());return this};
XA[H].setHorizontalAlignment=XA[H].i8a;XA[H].M9a=function(a){if(!BA(a))d(Error(LA(a)));var b=this.Tb();b.pb=7;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setVerticalAlignment=XA[H].M9a;XA[H].N9a=function(a){if(!jy(a))d(Error("Incorrect value passed as argument, '"+(a+"' is not a boolean")));var b=this.Tb();b.pb=16;Ga(b,a);this.Wa.Bb(b.Xa());return this};XA[H].setWrap=XA[H].N9a;XA[H].q_a=function(){var a=this.Tb();a.pb=76;this.Wa.Bb(a.Xa());return this};XA[H].mergeAcross=XA[H].q_a;
XA[H].HHa=function(){var a=this.Tb();a.pb=77;this.Wa.Bb(a.Xa());return this};XA[H].breakApart=XA[H].HHa;XA[H].Mja=function(a,b){if(b)if(b.contentOnly)this.Pja(a);else b.formatOnly&&this.Jja(a);else{this.Pja(a);this.Jja(a)}};XA[H].copyTo=XA[H].Mja;XA[H].Jja=function(a){a=this.Tb(a);a.pb=106;this.Wa.Bb(a.Xa())};XA[H].Pja=function(a){a=this.Tb(a);a.pb=105;this.Wa.Bb(a.Xa())};XA[H].moveTo=function(a){this.Mja(a);this[fe]()};XA[H].moveTo=XA[H].moveTo;
var YA=function(a,b,c){a=ca(a);b=ca(b);c=ca(c);if(ra(a)||a<0||a>255||ra(b)||b<0||b>255||ra(c)||c<0||c>255)d(Error('"('+a+","+b+","+c+'") is not a valid RGB color'));a=ZA(a[F](16));b=ZA(b[F](16));c=ZA(c[F](16));return"#"+a+b+c},$A=/^\s*([a-zA-Z]*)(\d*)(:([a-zA-Z]*)(\d*))?\s*$/,aB=function(a){a=ja(a,10);return a>0?a:j},bB=function(a){var b=a?a[G]:0;if(b<1||b>2)return j;a=a[tg]();for(var c=0,e,f=0;f<b;f++){if((e="ABCDEFGHIJKLMNOPQRSTUVWXYZ"[ed](a[Tc](f)))<0)return j;c=c*26+(e+1)}return c},ZA=function(a){return a[G]==
1?"0"+a:a};XA[H].Tb=function(a){var b=new UA;Qa(b,this.hq);wa(b,this.Xw);b.Lc=this.Ww;lb(b,this.nK);b.md=this.mK;if(a){b.Opa=a.hq;b.hBa=a.Xw;b.fBa=a.Ww;b.tma=a.nK;b.rma=a.mK}return b};var cB=function(a,b,c){var e,f,g,i,l;c=TA(c);for(var n=0;n<c[G];n++){var p=c[n];if(p.Sk)switch(p.Sk){case 1:e=p[A];break;case 2:f=p[A];break;case 4:g=p[A];break;case 3:i=p[A];break;case 5:l=p[A];break}}b(new XA(e,a,f,g,i,l))},eB=function(a,b,c){var e;c=TA(c);for(var f=0;f<c[G];f++){var g=c[f];if(g.Sk)switch(g.Sk){case 1:e=g[A];break}}b(new dB(e,a))},fB=function(a,b,c){var e;a=TA(c);for(c=0;c<a[G];c++){var f=a[c];if(f.Sk)switch(f.Sk){case 6:e=f[A];break}}b(e)},gB=function(a,b,c,e){var f;for(a=0;a<
e[G];a++){var g=e[a];if(g.Sk==c)f=g[A]}b(f)};var dB=function(a,b){this.K=a;this.Wa=b};dB[H].pL=function(){return this.K};dB[H].getIndex=dB[H].pL;dB[H].dRa=function(a){var b;a:{b=this.K;var c=this.Wa;if(a!=""){var e=a[td]($A);if(e){var f=aB(e[2]),g=bB(e[1]),i,l;if(e[3]){i=aB(e[5]);l=bB(e[4])}else if(f&&g){i=f;l=g}b=new XA(b,c,f,g,i,l);break a}}b=j}if(!b)d(Error("Incorrect range parameters, error passing '"+(a+"'")));return b};dB[H].getRangeFromA1Notation=dB[H].dRa;
dB[H].eRa=function(a,b,c,e){a=new XA(this.K,this.Wa,a,b,a+(c?c:1)-1,b+(e?e:1)-1);if(!a)d(Error("Invalid range passed as argument."));return a};dB[H].getRangeFromIndices=dB[H].eRa;dB[H].t_=function(a,b,c,e){if(!GA(a))d(Error(KA(a)));if(!GA(b))d(Error(KA(b)));if(!GA(c))d(Error(KA(c)));if(!GA(e))d(Error(KA(e)));if(c<a)d(Error("End row is less than start row."));if(e<b)d(Error("End row is less than start row."));var f=this.Tb();f.pb="setselection";wa(f,a);f.Lc=b;lb(f,c);f.md=e;this.Wa.Bb(f.Xa(),j,h)};
dB[H].setActiveRange=dB[H].t_;dB[H].Ei=function(a){if(!EA(a))d(Error("Invalid callback passed as argument."));var b=this.Tb();b.pb="getactivecell";this.Wa.Bb(b.Xa(),ah(cB,this.Wa,a),h)};dB[H].getActiveCell=dB[H].Ei;dB[H].sOa=function(a){if(!EA(a))d(Error("Invalid callback passed as argument."));var b=this.Tb();b.pb="getselection";this.Wa.Bb(b.Xa(),ah(cB,this.Wa,a),h)};dB[H].getActiveRange=dB[H].sOa;dB[H].qQa=function(a){this.boa(a,3)};dB[H].getMaxRows=dB[H].qQa;dB[H].pQa=function(a){this.boa(a,5)};
dB[H].getMaxColumns=dB[H].pQa;dB[H].boa=function(a,b){if(!EA(a))d(Error("Invalid callback passed as argument."));var c=this.Tb();c.pb=103;this.Wa.Bb(c.Xa(),ah(gB,this.Wa,a,b))};dB[H].iQa=function(a){this.Dna(a,3)};dB[H].getLastRow=dB[H].iQa;dB[H].hQa=function(a){this.Dna(a,5)};dB[H].getLastColumn=dB[H].hQa;dB[H].Dna=function(a,b){if(!EA(a))d(Error("Invalid callback passed as argument."));var c=this.Tb();c.pb=b==3?88:113;this.Wa.Bb(c.Xa(),a)};
dB[H].yRa=function(a,b,c,e,f){if(!EA(a))d(Error("Invalid callback passed as argument."));var g=this.Tb();g.pb=127;wa(g,b||1);g.Lc=c||1;g.yaa=e||-1;g.xaa=f||-1;this.Wa.Bb(g.Xa(),a)};dB[H].getSheetValues=dB[H].yRa;dB[H].s7a=function(a,b){if(!GA(a))d(Error(KA(a)));if(!GA(b))d(Error(KA(b)));var c=this.Tb();c.pb=23;c.uC=a;Ga(c,b);this.Wa.Bb(c.Xa())};dB[H].setColumnWidth=dB[H].s7a;dB[H].X8a=function(a,b){if(!GA(a))d(Error(KA(a)));if(!GA(b))d(Error(KA(b)));var c=this.Tb();c.pb=24;c.gG=a;Ga(c,b);this.Wa.Bb(c.Xa())};
dB[H].setRowHeight=dB[H].X8a;dB[H].pYa=function(a,b){if(!(GA(a)||a==0))d(Error(KA(a)));if(b&&!GA(b))d(Error(KA(b)));var c=this.Tb();b=b||1;c.pb=21;c.gG=a;Ga(c,b);this.Wa.Bb(c.Xa())};dB[H].insertRows=dB[H].pYa;dB[H].aYa=function(a,b){if(!(GA(a)||a==0))d(Error(KA(a)));if(b&&!GA(b))d(Error(KA(b)));var c=this.Tb();b=b||1;c.pb=19;c.uC=a;Ga(c,b);this.Wa.Bb(c.Xa())};dB[H].insertColumns=dB[H].aYa;
dB[H].wLa=function(a,b){if(!GA(a))d(Error(KA(a)));if(b&&!GA(b))d(Error(KA(b)));var c=this.Tb();b=b||1;c.pb=18;c.gG=a;Ga(c,b);this.Wa.Bb(c.Xa())};dB[H].deleteRows=dB[H].wLa;dB[H].lLa=function(a,b){if(!GA(a))d(Error(KA(a)));if(b&&!GA(b))d(Error(KA(b)));var c=this.Tb();b=b||1;c.pb=17;c.uC=a;Ga(c,b);this.Wa.Bb(c.Xa())};dB[H].deleteColumns=dB[H].lLa;dB[H].V7a=function(a){if(!GA(a))d(Error(KA(a)));var b=this.Tb();b.pb=66;Ga(b,a);this.Wa.Bb(b.Xa())};dB[H].setFrozenRows=dB[H].V7a;
dB[H].U7a=function(a){if(!GA(a))d(Error(KA(a)));var b=this.Tb();b.pb=67;Ga(b,a);this.Wa.Bb(b.Xa())};dB[H].setFrozenColumns=dB[H].U7a;db(dB[H],function(a){var b=this.Tb();if(a)if(a.contentOnly)b.pb=84;else{if(a.formatOnly)b.pb=83}else b.pb=82;this.Wa.Bb(b.Xa());return this});db(dB[H],dB[H][fe]);dB[H].RWa=function(a,b){if(!GA(a))d(Error(KA(a)));if(!GA(b))d(Error(KA(b)));if(b<0)d(Error("End row is less than start row."));var c=this.Tb();c.pb=70;wa(c,a);lb(c,a+b-1);this.Wa.Bb(c.Xa())};
dB[H].hideRows=dB[H].RWa;dB[H].Q$a=function(a,b){if(!GA(a))d(Error(KA(a)));if(!GA(b))d(Error(KA(b)));if(b<0)d(Error("End row is less than start row."));var c=this.Tb();c.pb=71;wa(c,a);lb(c,a+b-1);this.Wa.Bb(c.Xa())};dB[H].showRows=dB[H].Q$a;dB[H].LWa=function(a,b){if(!GA(a))d(Error(KA(a)));if(!GA(b))d(Error(KA(b)));if(b<0)d(Error("End row is less than start row."));var c=this.Tb();c.pb=68;c.Lc=a;c.md=a+b-1;this.Wa.Bb(c.Xa())};dB[H].hideColumns=dB[H].LWa;
dB[H].n$a=function(a,b){if(!GA(a))d(Error(KA(a)));if(!GA(b))d(Error(KA(b)));if(b<0)d(Error("End row is less than start row."));var c=this.Tb();c.pb=69;c.Lc=a;c.md=a+b-1;this.Wa.Bb(c.Xa())};dB[H].showColumns=dB[H].n$a;dB[H].getCellValue=function(a,b,c){if(!GA(a))d(Error(KA(a)));if(!GA(b))d(Error(KA(b)));if(!EA(c))d(Error("Invalid callback passed as argument."));(new XA(this.K,this.Wa,a,b)).ra(c)};dB[H].getCellValue=dB[H].getCellValue;dB[H].Tb=function(){var a=new UA;Qa(a,this.K);return a};var hB=function(a,b){this.dg=a;this.Wa=b};hB[H].Q=function(){return this.dg};hB[H].getId=hB[H].Q;hB[H].Dc=function(a){if(!EA(a))d(Error("Invalid callback passed as argument."));if(j==0)a(new dB(j,this.Wa));else{var b=new UA;b.pb="getactivesheet";this.Wa.Bb(b.Xa(),ah(eB,this.Wa,a),h)}};hB[H].getActiveSheet=hB[H].Dc;hB[H].CWa=function(a,b){if(!EA(a))d(Error("Invalid callback passed as argument."));var c=new UA;c.pb=b?"flushpendingchanges":"haspendingchanges";this.Wa.Bb(c.Xa(),ah(fB,this.Wa,a),h)};
hB[H].hasPendingChanges=hB[H].CWa;hB[H].UZa=function(a,b){if(!EA(a))d(Error("Invalid callback passed as argument."));var c=new UA;c.pb=b?"locksheet":"unlocksheet";this.Wa.Bb(c.Xa(),ah(fB,this.Wa,a),h)};hB[H].lock=hB[H].UZa;hB[H].lwa=function(a,b){if(!EA(b))d(Error("Invalid callback passed as argument."));this.SYa(a)||this.Wa.p4a(a,b,h)};hB[H].l4a=function(a){this.lwa("edit",a)};hB[H].registerEditListener=hB[H].l4a;hB[H].k4a=function(a){this.lwa("disconnect",a)};hB[H].registerDisconnectListener=hB[H].k4a;
hB[H].SYa=function(a){return this.Wa.RYa(a)};var iB=function(){d(Error("Error retrieving active spreadsheet."))};j==0&&JA("google.spreadsheets.getActiveSpreadsheet",iB);var jB=function(){d(Error("Error retrieving active gadget."))};j==0&&JA("google.spreadsheets.getGadget",jB);Lg("google.spreadsheets.create",function(a,b,c){kB(a,b,c)},undefined);var lB=function(a,b,c,e){kB(a,b,c,e)};Lg("google.spreadsheets.openById",lB,undefined);Lg("google.spreadsheets.openByKey",lB,undefined);
var kB=function(a,b,c,e){mB=k;if(!c.Ata)d(Error("Please specify a local relay file. This can be any file that exists on the same domain that's creating the spreadsheetwidget."));if(j==1){var f=new Em(""),g=f.Oe;ch(g,"/")||(g+="/");f.Ui(g+"ccc");e?f.Aa("key",e):f.Aa("new","");f.Aa("embed","true");f.Aa("chrome","false");c.Ccb||f.Aa("authp","true");f.Aa("embedConfig",c.toJSON());e=f[F]();c=c.Ata;f={};e=new Em(e);f.pu=e[F]();f.ppu=e.Gq(new Em("obj/blank.html"))[F]();f.lpu=c;c=new CA(1,f);c=new nB(c,j)}else if(j==
0)c=new nB(kA||(kA=new jA),j,j);else d(Error("Unrecognized dispatcher context"));e=c.Bpa();if(e.aca()){xj(c,"open",ah(oB,c,b));e.bb(a,ah(pB,c))}},mB=k,pB=function(a){om(HA);if(mB)HA=nm(ah(pB,a),500);else a[D](new Yu("ack_open"),h)},oB=function(a,b,c){mB=h;b(new hB(c[Ox].key,a))};var qB=function(){this.LZ=j;Ga(this,j);this.nJ=this.Yr=j};qB[H].Xa=function(){var a=[];a[1]=this.LZ;a[3]=this.Yr;var b=[];this[A]!=j&&b[v]((new QA(6,j,this[A])).Zd());this.nJ!=j&&b[v]((new QA(26,2,this.nJ)).Zd());a[2]=b;return PA(a)};qB[H].Aza=function(a,b,c,e,f){Ga(this,[]);this[A][v]((new QA(1,2,a)).Zd());this[A][v]((new QA(2,2,b)).Zd());this[A][v]((new QA(4,2,c)).Zd());e&&this[A][v]((new QA(3,2,e)).Zd());f&&this[A][v]((new QA(5,2,f)).Zd())};
qB[H].o9a=function(a){Ga(this,[]);this[A][v]((new QA(1,2,a)).Zd())};qB[H].c8a=function(a,b){var c=j;b=b[Xe]("&");for(var e=0;e<b[G];e++)if(b[e][Xe]("=")[0]==a){c=b[e][Xe]("=")[1];break}Ga(this,c)};var rB=function(a){this.G=a},sB=j;
lc(rB[H],function(a,b,c){var e;e=Tg(b)?bo(b):b;b=new UA;b.pb=e[2];e=TA(e[4]);for(var f=0;f<e[G];f++){var g=e[f];switch(g.Sk){case 1:Qa(b,g[A]);break;case 30:b.Ys=g[A];break;case 2:wa(b,g[A]);break;case 4:b.Lc=g[A];break;case 3:lb(b,g[A]);break;case 5:b.md=g[A];break;case 21:b.gG=g[A];break;case 20:b.uC=g[A];break;case 6:Ga(b,g[A]);break}}e=this.G.H;f=b[wd]?e.Be(b[wd]):e[Nd]();e=new qB;switch(b.pb){case "setgadgetuserprefs":var i=new rA(this.G.qh(),this.G.Ec.ea);f=b[A][Xe]("=")[0];g=b[A][Xe]("=")[1];
i.wza(b.Ys,"",f,g);break;case "setgadgetprefs":i=this.G.qh().lL(b.Ys);f=b[A][Xe]("=")[0];g=b[A][Xe]("=")[1];i.jha(f,g);i.Mq();break;case "getpref":i=this.G.qh().lL(b.Ys);f="up_"+b[A];b=i.T6();e.c8a(f,b);break;case "setselection":f.selectCells(b[rc],b.Lc,b[se],b.md);break;case "getactivecell":e.Aza(f.K,f.zb,f.wb);break;case "getselection":b=f.zL();e.Aza(f.K,b[rc],b.Lc,b[se],b.md);break;case "getactivesheet":e.o9a(f.K);break;case "haspendingchanges":Ga(e,[(new QA(6,4,this.G.areTherePendingRequests())).Zd()]);
break;case "locksheet":this.G.p4(h);Ga(e,[(new QA(6,4,h)).Zd()]);break;case "unlocksheet":this.G.p4(k);Ga(e,[(new QA(6,4,h)).Zd()]);break;case "flushpendingchanges":this.G.fna(h,R(this.ESa,this,a,c));return}e.LZ=0;e.nJ=a;c([[a,e.Xa()]])});rB[H].ESa=function(a,b,c){var e=new qB;Ga(e,[(new QA(6,4,c)).Zd()]);e.LZ=0;e.nJ=a;b([[a,e.Xa()]])};var tB=function(a){this.G=a},uB=0;lc(tB[H],function(a,b){var c=bo(a[0][1]),e;a:{e=c[2];for(var f in VA)if(VA[f]==e){e=h;break a}e=k}e?(sB||(sB=new rB(this.G)))[rg](a[0][0],c,b):this.t6a(a,b)});tB[H].t6a=function(a,b){var c=new Fm;c.set("id",this.G.Wy());a=[uB++,a];c.set("js",fo(a));Om(m[ef][Wf]).xk("authp")&&c.set("authp","true");so("/mapi",R(this.Is,this,b),"POST",c[F]())};tB[H].Is=function(a,b){b=b[K].ZD();a(b[1])};var nB=function(a,b,c){this.Du=a;this.DT=b;this.K=c||"tr";this.Tj=[];this.C3=[];this.sA=[];this.D=new fm(this);this.D.z(this.Du,"messagereceived",this.aM)};S(nB,Kj);var vB=0,wB=0;Q=nB[H];Q.Bpa=function(){return this.Du};Q.Bb=function(a,b,c){var e=vB++;if(b&&Vg(b))this.Tj[e]=b;if(c)this.Du[yd](fo([this.K,wB++,[[e,a]]]));else{this.C3[v]([e,a]);m[Te](R(this.zMa,this),0)}};Q.zMa=function(){var a=this.C3;if(a[G]>0){a=[this.K,wB++,a];this.Du[yd](fo(a));this.C3=[]}};
Ia(Q,function(a,b){nB.j[D][L](this,a);if(b)if(th(Om(m[ef][Wf]).Or,"gmodules")){b=this.sA;for(var c=0;c<b[G];c++)this.Du[yd](fo([,,,,a]),this.sA[c][0],this.sA[c][1])}else this.Du[yd](fo([,,,,a]))});Q.p4a=function(a,b,c){xj(this,a,R(this.P7,this,b));if(c){c=new UA;c.pb=89;Ga(c,a);this.Bb(c.Xa(),b,h)}};Q.RYa=function(a){return IA(this,a,k)};Q.P7=function(a,b){switch(b[be]){case "disconnect":a();break;case "edit":b=bo(b[Ox])[4];cB(this,a,b);break}};
Q.aM=function(a){var b=a[Ox].mdm,c=bo(a[Ox].msg);a=c[0];var e=c[1],f=c[2],g=c[3];c=c[4];if(f)this.DT[rg](f,R(this.vTa,this,b,a,e));else if(g)this.ySa(g);else c&&this[D](c)};Q.vTa=function(a,b,c,e){this.t4a(a,b);c=[this.K,c,j,e];this.Du&&this.Du[yd](fo(c),a,b)};
Q.ySa=function(a){if(a[0]=="-1")ea(a[1]);else for(var b=this.Tj,c=0;c<a[G];c++){var e=a[c],f=e[0],g=bo(e[1]);e=new qB;e.LZ=g[1];e.Yr=g[3];var i=g[2];g=[];if(Kg(i)){i=TA(i);for(var l=0;l<i[G];l++){var n=i[l];switch(n.Sk){case 6:g[v](n[A]);break;case 3:case 5:g[v](n);break;case 26:e.nJ=n[A];break}}}Ga(e,g[G]>1?g:g[0]);if(g=b[f]){g(e[A]);b[f]=j}}};Q.t4a=function(a,b){for(var c=0;c<this.sA[G];c++)if(this.sA[c][1]==b)break;c==this.sA[G]&&this.sA[v]([a,b])};var xx=function(a){this.G=a;this.DT=new tB(a);this.gJa=new fm(this);this.jsa=this.isa=k;this.fD=j;if(Om(m[ef][Wf]).kf.Mh("xpc")){a=new CA(0,j,R(this.QSa,this));this.fD=new nB(a,this.DT);this.gJa.z(this.fD,"ack_open",this.dSa);this.isa&&this.lY()}Go("gadgets",function(){this.Rfa=new nB(kA||(kA=new jA),this.DT)},this)};Q=xx[H];Q.Rfa=j;Q.QSa=function(){if(this.fD)this.lY();else this.isa=h};Q.dSa=function(){this.jsa=h;this.lY()};
Q.lY=function(){om(this.u2a);this.fD[D](new Yu("open",{key:this.G.uj()}),h);if(!this.jsa)this.u2a=nm(this.lY,500,this)};Q.vla=function(a){if(this.fD)this.fD[D](a,h);else this.Rfa&&this.Rfa[D](a,h)};Io("api");