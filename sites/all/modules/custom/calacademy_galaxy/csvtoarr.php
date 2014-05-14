<?php

header('Content-type: application/json');

//recursive in_array()

function in_array_r($needle, $haystack, $strict = false) {
    foreach ($haystack as $item) {
        if (($strict ? $item === $needle : $item == $needle) || (is_array($item) && in_array_r($needle, $item, $strict))) {
            return true;
        }
    }

    return false;
}

//set php to detect /r automatically
ini_set("auto_detect_line_endings", true);

//turn our csv into an array
$csv = array_map('str_getcsv', file('example.csv'));

//assign headers
foreach($csv AS $c) {
    $plus[] = array_combine($csv[0], $c);
}

//remove header array
array_shift($plus);

//array of tickets to withhold from module
$blacklist = array('Web Ticketing');

//print '<pre>'; print_r($plus); print '</pre>';

$products = array();
foreach($plus AS $plu) {
  if(in_array_r($plu['uniqueID'],$products)) {
    foreach($products[$plu['uniqueID']]['plus'] AS $p) {
      if(!in_array_r($plu['PLU'],$products)) {
        $products[$plu['uniqueID']]['plus'][] = array(
                                                    'plu' => $plu['PLU'],
                                                    'description' => $plu['Description'],
                                                    'price' => $plu['Price'],
                                                  );
      }
    }
  }
  else {
    if(!in_array($plu['C_Parameter'], $blacklist)) {
        $products[$plu['uniqueID']]['linkID'] = $plu['uniqueID'];
        $products[$plu['uniqueID']]['Category'] = $plu['C_Parameter'];
        $products[$plu['uniqueID']]['url'] = $plu['URL'];
        $products[$plu['uniqueID']]['plus'][] = array(
                                                  'plu' => $plu['PLU'],
                                                  'description' => $plu['Description'],
                                                  'price' => $plu['Price'],
                                                );

    }
  }
}

$products = json_encode($products);

?>
