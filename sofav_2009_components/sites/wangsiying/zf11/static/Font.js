//���������С
var status0        = '';
var curfontsize    = 10;
var curlineheight  = 18;
function fontSize(type,objname){
  if (type=="b"){
    if(curfontsize<64){
      document.getElementById(objname).style.fontSize=(++curfontsize)+'pt';
      document.getElementById(objname).style.lineHeight=(++curlineheight)+'pt';
    }
  }
  else {
    if(curfontsize>8){
      document.getElementById(objname).style.fontSize=(--curfontsize)+'pt';
      document.getElementById(objname).style.lineHeight=(--curlineheight)+'pt';
    }
  }
}
function setColor(objname,color)
{
document.getElementById(objname).style.color=color
}
//���Ӽ�ת�����ܣ�stardy Edit
function bodytojt(x)
{
	var bodys=document.getElementById(x);
	bodys.innerHTML=Simplized(bodys.innerHTML);
}
function bodytoft(x)
{
	var bodys=document.getElementById(x);
	bodys.innerHTML=Traditionalized(bodys.innerHTML);
}
function JTPYStr()
{
	return '���������������°ðİưаѰҰӰ԰հڰܰް��������������������������������������������ʱ̱ͱαϱбձֱױڱ۱ܱݱޱ߱����������������������������������������������βϲвѲҲӲԲղֲײ޲������������������������������������������������������������³ĳųƳͳγϳҳճٳ۳ܳݳ�����������������������������������������������������´ôĴŴƴǴȴɴʴʹϴдѴӴԴմִ״شٴڴ۴ܴݴ������������������������������������������������������������������ŵƵ˵εϵеӵԵݵ޵ߵ����������������������������������������������������������¶öĶƶͶ϶жѶҶӶԶնֶ׶ضٶڶ۶ܶݶ޶߶������������������������������������������������÷ķɷϷзѷ׷طܷ߷�����������������������������������������������¸øĸŸƸǸȸɸϸиѸҸӸԸոָٸڸݸ޸�����������������������������������������������ƹ˹йع۹ܹݹ߹�����������������������������������������ҺԺպֺ׺غٺ���������������������������������������������������������ƻǻȻɻѻӻԻջֻ׻ٻڻۻݻ޻߻�����������������������������������������������������������������¼üƼǼȼʼ̼ͼϼмԼռּؼټڼۼݼ޼߼������������������������������������������������������������������������������½ýĽŽȽɽʽ˽̽ͽνϽѽҽս׽ؽھ������������������������������������ǾȾɾԾپݾ��������ܽݽ޽߽�������������������������������������������������������������������������������Ŀſǿȿοѿҿٿ�����������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������¡¢£¤¥¦§¨©ª«¬­®¯°±²³¸»¼½¾¿������������������������������������������������������������������������������������������������������������áèêíóôùûýþ����������������������������������������������������������������ġĢıĶķ������������������������������������������������������������šŢťŦŧŨũűŲųŴŵŶŷŸŹźŻżŽ���������������й���ɽ������������������ƭƮƵƶƸƻƼƾƿ����������������������������������������ǣǤǥǦǨǩǫǬǭǮǯǱǲǳǴǵǶǸǹǺǻǼǽǾǿ��������������������������������������������������������ȡȢȣȤȧȨȩȬȰȱȲȳȴȵ��������������������������������������������������ɡɣɤɥɦɧɨɬɱɴɵɶɷɸɹ����������������������������������������������������������ʤʥʦʨʪʫʬʱʴʵʶʻ��������������������������������������������������������˧˫˭˰˱˲˳˴˵˶˸˿��������������������������������������������������������������̴̵̶̷̸̡̢̧̣̩̪̯̰̱̲̳̺̻̼̽̾��������������������������������������������������������ͭͳͷͼͿ������������������������������������������ΤΥΦΧΨΩΪΫάέήΰαγνο������������������������������������������������������������ϡϥϬϭϮϰϱϳϷϸϺϽϿ������������������������������������������������������������������ХШЩЪЫЬЭЮЯвгдежзийклп��������������������������������������ѡѢѣѤѥѦѧѫѯѰѱѵѶѷѹѻѼ������������������������������������������������������������������ҡҢңҤҥҦҩҬҭүҳҴҵҶҸҹҺҼҽҾҿ������������������������������������������������������������ӣӤӥӦӧӨөӪӫӬӱӲӴӵӶӷӸӹӺӻӼӽӿ����������������������������������������������������������ԤԥԦԧԨԯ԰ԱԲԳԴԵԶԷԸԹԺԼԽԾԿ������������������������������������������������������������������������������աբթիծկհձյնշոչպջսվտ��������������������������������������������������������ְֲֳִֽֿ֣֤֡֯����������������������������������������������������פקרשת׫׬׭׮ׯװױײ׳״׶׸׹׺׻������������������������������������������ôΪֻ��׼������������й';
}
function FTPYStr()
{
	return '�}�@�K�۰��O�\�W�ðİưаѰ҉ΰ��T�[���ް��C�k�O�Ͱ��^�r��������������U݅ؐ�^�N��v���P�̱ͱή����]�ֱױڱ۱ܱݱ�߅���H׃���q�p����e�T�l�I�e�P������K���g�N�a�������������Q���M�K�N�nœ�}����ȃԜy��Ԍ�v���s�׋�p�P�b�U������L�L���c�S�����n܇�����س����m��r�ηQ�ͳ��\�G�V�t�Y�u�X��_�x�猙��ꮠ�P�I�I���h���N���z�r�A�������|̎�������J���N�������b�ôĴŴ��o�ȴ��~�n�[��ą����ִ״ش��f�۸Z�ݴ���������e���_�������J��������đ���������Q���������hʎ�n�v���u�\���I�ş����εϔ�����f������c��|늵��յ���{����������ՙ�B���Vӆ�|�����ӗ����Y�٪��x�¶�ـ�呔྄�у�ꠌ��Շ��׶��D���g�ܶݶ޶ߊZ���Z�~Ӟ�𐺶�����I�������D���E�l�P�y�m���\�C����؜��L���w�U���M�����^���S�S������h�L������T�p�S�P�w��ݗ���o�x�}����ؓ��Ӈ�D�`������ԓ�ĸ��}�w�Ȏ��s�ж����M����䓾V�����V���怔R������w���t���o�������������m�ؕ�h�Ϙ�ُ���M��P�^���^�T؞�V��Ҏ���w���|܉Ԏ�����F��݁�L��偹������^������n�h�u�Ժպ��Q�R�ٙM�Z���t��غ��o����W�A����Ԓ�����ѻ��Ěg�h��߀���Q���������o�S�ǻȻ��e�]�x�ջֻך��ڻۻݻ��V�x���Z���M�d�Lȝ����ⷫ@��؛�����C�����e�������I�u�������O��݋���D�׼��E������Ӌӛ���H�^�o�ϊA�v�a�Z⛼ټڃr�{�ޚ��O�Թ{�g�D�}�O�z��A�|���캆�����p�]���b�`�vҊ�IŞ���T�u�R���{���Y�����v�u���������z���ɔ��q�C�e�_��U�g�˽̽��I�^�ѽҷM�A�ع��o�@���������i�o�����R���d�������Q�m�����f�x�e��䏑ք����N������ܽݽ޽ߝ��Y�����]�þo�\�H֔�M���x�a���M���G���X�Q�E�^�x܊�����������E�_���P�������������������w�����n��������ѝ�F�K�~���V��r̝�h�Q�����������������U�����Ϟ�D�R��ه�{���ڔr�@�@�m��׎���[���|���E�ȓƄ��ӝ��՘��D������I������������h���x�����Y���Y����������[���������r�`�����zɏ�B����z�i����Ę朑ٟ����Z�����v��Տ�����ů������|����炫C���R���[�܄C�U�������g⏜R�`��X�I�s�����@���\��¡�Ŕn�]�Ǌ䓧�t©ª�J�R�B�]�t���u̔���T����¾�H���X�H���Čҿ|�]�ʞV�G�n���\���y��݆�����S�]Փ�}���_߉茻j��������j�����aΛ�R�R������I���u�~�}�m�z�U�M��֙؈�^�T�Q���q�]ý�V�T�������������i�͉��i����Ғ�d�����侒������R��瑑�}���Q�և��ġĢ�\��ķ�c�{�y�ғ��X���[�����Hā����f������B�����m����������帔Q���o�~ē���r��ŲųŴ�ZŶ�W�t��ź�Iż�a���˱P���������Ї���ɽ�����������r�����i�_�h�lؚƸ�OƼ�{ƿ�u�����H��䁘��VĚ�R�T�M�������◉ә�����L�T�U�w���tǬǭ�X�Q��ǲ�\�l�qǶǸ����ǻǼ���N�������@��̃S�����N�͸[�`�J�H�p��A���Ո�c���Fڅ�^�|���ȡȢ�xȤ�E��ȩȬ��ȱȲȳ�s�o׌���_�@�ǟ��g�J�x�s�q����ܛ�J�c���������_���w��ِ��ɣɤ��ɦ�}�ߝ�����ɵɶɷ�Y���W���٠���ʂ��p�����ԟ��B���d����z�����O�鼝�����I�B�K���}���{��Ԋ�ƕr�g���R����ҕԇ���ݫF�ߘ�ݔ���H��������������������g���Q�������p�l��˱˲�˴�f�T�q�z����Z��A�b���Ҕ\���K�V�C�����m������q�O�p�S�������s�����i�H��̣�E̩̪��؝�c����̴̵̶�TՄ̺̻̼̽�U���ǠC���Ͽl�v���`�R�}�����w����������ϗl���N�F���d �N�~�y�^�D�T�F�j��͑��������Ó�r�W�E�D�m�㏝���B�f�W�f�`Φ��ΨΩ���H�SȔή���^���^ο�l���y�Ƿ��Ɇ����̮Y��΁�u�C���Ն��u���_�oʏ�ǉ]�F���`�a��ϡϥϬϭ�u��ϱ㊑��rݠ�{�b�M�B�v�r�w�y�t����e�@�U�F�I�h���W�w�����޾�����lԔ��ʒ���N�ԇ[ШЩЪϐЬ�f���y�{�C��ежзий�a�x�\��d���n���C������̓�u����S��w�m܎���x�_ѣ�kѥѦ�W��ԃ���ZӖӍ�d���f������Ӡ����鎟����}�����W�������䏩�V�����P��ꖰW�B�����������u���b�G�{ҦˎҬҭ���Ҵ�I�~ҸҹҺҼ�tҾ��U���z�x�ɏ�ρˇ�|�����������㑛�xԄ�h�x�g�������[�a����yы������t��Ξ�I��ω�fӲ�ѓ��ӷ�bӹӺ�xӼԁ�����n�]♪q�[���T��������ݛ���~����O����c�Z���Z�n���R�z�u�Aԥ�S�x�Y�@�@�T�AԳԴ���hԷ�ԹԺ�sԽ�S耎[�������y���E�\�N�j������s���d����ٝ�E�v��������嗗�^��؟��t���\ٛ����܈��l�p�S��կհ�ֱK��ݚ��չպ����վտ�`���q���~Û�w�U�H�N���@��������ؑᘂ��\���������걠�b�����C��ֲֳ�̼����S���|�R�K�N�[�\���a���S���敃�E�i�T�D�T�󲚇��A�T�B�vק���u�D׫ٍ׭���f�b�yײ�Ѡ��F٘���YՁ����Ɲ�Y�ҝn����ۙ�ھC���v�u���{�M���@��N���b���ʆ���e�Z�N倛�';
}
function Traditionalized(cc)
{
	var str='';
	var oldstat=""+window.status;
	for(var i=0;i<cc.length;i++)
	{
		if((i%1000)==0)window.status="Working..."+Math.round(i*100/cc.length,2)+"%";
		if(JTPYStr().indexOf(cc.charAt(i))!=-1)
   			str+=FTPYStr().charAt(JTPYStr().indexOf(cc.charAt(i)));
  		else
   			str+=cc.charAt(i);
 	}
 	window.status="100% OK!";
 	setTimeout("window.status='"+oldstat+"'",1000);
	return str;
}
function Simplized(cc)
{
	var str='';
	var oldstat=""+window.status;
	for(var i=0;i<cc.length;i++)
	{
		if((i%1000)==0)window.status="Working..."+Math.round(i*100/cc.length,2)+"%";
		if(FTPYStr().indexOf(cc.charAt(i))!=-1)
   			str+=JTPYStr().charAt(FTPYStr().indexOf(cc.charAt(i)));
  		else
   			str+=cc.charAt(i);
 	}
 	window.status="100% OK!";
 	setTimeout("window.status='"+oldstat+"'",1000);
	return str;
}
function bbimg(o){
	var zoom=parseInt(o.style.zoom, 10)||100;zoom+=event.wheelDelta/12;if (zoom>0) o.style.zoom=zoom+'%';
	return false;
}