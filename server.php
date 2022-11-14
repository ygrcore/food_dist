<?php
$_POST = json_decode(file_get_contents("php://input"), true); // чтобы получить на php коде json данные
echo var_dump($_POST);