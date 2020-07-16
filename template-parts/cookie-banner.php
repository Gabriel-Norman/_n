<?php
/**
 * Template part for displaying cookie banner
 *
 * @package _n
 */

?>

<div id="biscuits">
    <div id="biscuits-txt">
        <?php
        ob_start();
        dynamic_sidebar( 'cookie-banner-area' );
        $output = ob_get_contents();
        ob_end_clean();
        preg_match("/<div[^>]*class=\"textwidget\">(.*?)<\\/div>/si", $output, $match);
        $content = $match[1];
        echo $content;
        ?>
    </div>
    <button id="biscuits-btn" type="button">
        <?php printf( esc_html__( '%1$s', '_n' ), 'Accetta'); ?>
    </button>
</div>
