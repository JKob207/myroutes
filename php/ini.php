<?php
error_reporting(E_ERROR | E_PARSE); // mostrar sólo errores por salida

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");

// open database
$db = new SQLite3('myroutes.db');

// create database
$res = $db->query('SELECT * FROM users');
if (!$res) {
    $db->exec('CREATE TABLE users (id VARCHAR(32), email VARCHAR(32), name VARCHAR(32), surname VARCHAR(32), password VARCHAR(32), img TEXT)') or die;
    $db->exec('CREATE TABLE routes (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(32), ts INTEGER, positions TEXT, attachments TEXT, color VARCHAR(32), visualize INTEGER, userId VARCHAR(32) )') or die;
    error_log("Created database successfully");
}

// manage authentication
if (isset($_REQUEST['token'])) {
    $token = $_REQUEST['token'];
    $user = NULL;
    $res = $db->query("SELECT * FROM users WHERE id='$token'");
    while ($row = $res->fetchArray()) {
        $user = array(
        'id' => $row['id'],
        'email' => $row['email'],
        'name' => $row['name'],
        'surname' => $row['surname'],
        'img' => $row['img'],
        'token' => $row['id']
        );
    }
    if (!$user) {
        $db->close();
        http_response_code(401);
        exit;
    }
}

?>