<?php


$products = array(
              array(
                "name" => "General Admission",
                "plu" => "12345678",
                "url" => "https://wwww.calacademy.org/tickets",
                "price" => array(
                  "adult edited" => "$5129.95",
                  "senior edited" => "$5124.95",
                  "reedit monkey" => "77.95"
                )
              ),
              array(
                "name" => "Nightlife",
                "plu" => "66666666",
                "url" => "https://wwww.calacademy.org/nl",
                "price" => array(
                  "member poo" => "$22210.00",
                  "non-member" => "$44412.00",
                )
              )
);

$products = json_encode($products);

?>
