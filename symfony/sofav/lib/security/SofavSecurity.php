<?php

class SofavSecurity {

	private static function doEncrypt($key, $signature) {
		return md5($signature . $key . $signature);
	}

	public static function encryptKey($key) {

		return self::doEncrypt($key, SofavSignature::generateSignature());

	}

	/**
	 * 生成客户端签名
	 *
	 * @param object $recordRef	表的某条记录对象，要求主键名为 id
	 * @param array $templateRef	用于生成表单的数组，直接修改此数组
	 */
	public static function makeSignatureForEdit(&$recordRef, &$templateRef) {
		$signature = self::encryptKey($recordRef->getId());
		$templateRef['signature'] = $signature;
	}

	/**
	 * 检查客户端提交的主键与签名是否匹配
	 * 必须在本方法返回 true 时，才可调用 $recordRef->save() 保存对象
	 *
	 * @param object $recordRef	表的某条记录对象，要求主键名为 id
	 * @param array $actionRef	Action 对象，用于获取 id 和 signature 字段
	 * @return bool
	 */
	public static function checkSignatureForSave(&$recordRef, &$actionRef) {
		$submitedSignature = $actionRef->getRequestParameter('signature');
		$expectedSignature = self::encryptKey($recordRef->getId());
		return $submitedSignature == $expectedSignature;
	}

}