<?php
require('ini.php');

if (!$_SERVER['PATH_INFO'] and $_SERVER['REQUEST_METHOD'] == 'POST') {
    // addRoute
    $route = json_decode(file_get_contents('php://input'), true);

    $title = $route['title'];
    $positions = $route['positions'];
    $userId = $route['userId'];
    $timestamp = date('Y-m-d H:i:s');
    $color = "#0000ff";
    $visualize = 1;

    $positionsJson = json_encode($positions);

    $query = "INSERT INTO routes (title, ts, positions, color, visualize, userId) VALUES ('".$title."', '".$timestamp."', '".$positionsJson."', '".$color."', '".$visualize."', '".$userId."')";
    $res = $db->exec($query);

    if ($res) {
       echo "Success";
    } else {
        http_response_code(500);
        echo $db->lastErrorMsg();
    }
}elseif (!$_SERVER['PATH_INFO'] and $_SERVER['REQUEST_METHOD'] == 'GET') {
    // listRoutes
    $userId = $_GET['userId'];
    $routeId = isset($_GET['routeId']) ? $_GET['routeId'] : '';
    $visualize = isset($_GET['visualize']) ? $_GET['visualize'] : '';

    if($routeId) $sql = "SELECT * FROM routes WHERE userId = '".$userId."' AND id = '".$routeId."'";
        else if($visualize) $sql = "SELECT * FROM routes WHERE userId = '".$userId."' AND visualize = '1'";
            else $sql = "SELECT * FROM routes WHERE userId = '".$userId."'";

    $routes = array();
    $res = $db->query($sql);

    if ($res) {
        while ($row = $res->fetchArray()) {
            $route = array(
            'id' => $row['id'],
            'title' => $row['title'],
            'positions' => $row['positions'],
            'timestamp' => $row['ts'],
            'color' => $row['color'],
            'visualize' => $row['visualize']
            );
            array_push($routes, $route);
        }
        header('Content-Type: application/json');
        echo json_encode($routes);
    } else {
        http_response_code(500);
        echo $db->lastErrorMsg();
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    // updateRoute
    $route = json_decode(file_get_contents('php://input'), true);
    $id = $route['id'];
    $title = $route['title'];
    $positions = $route['positions'];
    $timestamp = $route['timestamp'];
    $color = $route['color'];
    $visualize = $route['visualize'];
    $userId = $route['userId'];

    $positionsJson = json_encode($positions);

    $sql = "UPDATE routes SET title='".$title."', positions='".$positions."', ts='".$timestamp."', color='".$color."', visualize='".$visualize."', userId ='".$userId."' WHERE id = '".$id."'";
    $res = $db->query($sql);

    if($res)
    {
        echo "Success";
    }else
    {
        http_response_code(500);
        echo $db->lastErrorMsg();
    }
} elseif ($_SERVER['PATH_INFO'] == '/delete' and $_SERVER['REQUEST_METHOD'] == 'POST') {
    // deleteRoute
    $route = json_decode(file_get_contents('php://input'), true);
    
    $routeID = $route['routeID'];
    
    $res = $db->query("DELETE FROM routes WHERE id = '".$routeID."'");
   
    if ($res) {
        echo "Success";
    } else {
        http_response_code(500);
        echo $db->lastErrorMsg();
    }
}

require('end.php');
?>