<?php

$conn = new mysqli('database-1.cgmdca9sofeq.us-east-1.rds.amazonaws.com', 'uptask', 'Misamores12', 'uptask');

if($conn->connect_error){
    echo $conn->connect_error;
}

$conn->set_charset('utf8');