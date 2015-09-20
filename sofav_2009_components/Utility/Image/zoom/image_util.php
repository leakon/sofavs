<?php

require_once(dirname(__FILE__) . '/../../require.php');

try {

    // 缩放

    // 截取
    // 等比
    // 不等比     

    $from       = 'src/big_wide_2.jpg';
    $to         = 'dst/big_wide_2.jpg';

    $from       = 'src/phone_long.jpg';
    $to         = 'dst/phone_long.jpg';

    if (file_exists($to)) {
        unlink($to);
    }

/*
    $new_file_path      = $to;


    list($img_width, $img_height) = @getimagesize($from);

    var_dump($img_width, $img_height);

    $src_img            = imagecreatefromjpeg($from);
    $new_img            = imagecreatetruecolor($new_width = 120, $new_height = 120);
    
    $write_image        = 'imagejpeg';
    $image_quality      = 99;

    $src_x  = 0;
    $src_y  = 0;

        #$success = imagecopyresampled(
        $success = imagecopyresized(
            $new_img,
            $src_img,
            $dst_x          = 0,
            $dst_y          = 0,
            $src_x          = ($img_width - $new_width) / 2,
            $src_y          = ($img_height - $new_height) / 2,
            $new_width      = $img_width,
            $new_height     = $img_height,
            $img_width,
            $img_height
        ) && $write_image($new_img, $new_file_path, $image_quality);

    var_dump($success);


*/


    #$result = SofavImageUtilZoom::zoom($from, $to, $width = 120, $height = 120, $option = array());
    #$result = SofavImageUtilZoom::crop($from, $to, $width = 120, $height = 120, $option = array());
    $result = SofavImageUtilZoom::cut($from, $to, $width = 300, $height = 300, $option = array());
    var_dump($result);


} catch (Exception $exp) {

    print_r($exp);

}

echo    "OK\n";

