<?php


$products = array(
              array(
                "name" => "General Admission",
                "plu" => "12345678",
                "url" => "https://wwww.calacademy.org/tickets",
                "price" => array (
                  "adult" => "$29.95",
                  "senior" => "$24.95",
                  "student" => "$24.95",
                  "child" => "$19.95"
                )
              ),
              array(
                "name" => "Nightlife",
                "plu" => "66666666",
                "url" => "https://wwww.calacademy.org/nl",
                "price" => array (
                  "member" => "$10.00",
                  "non-member" => "$12.00",
                )
              )
);

$products = json_encode($products);

?>
