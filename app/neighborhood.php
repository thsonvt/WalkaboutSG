<?php

// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!


// require 'Slim/Slim.php';

// $app = new Slim();

// $app->get('/walkabouts', 'getWalkabouts');

// $app->run();

function getConnection() {
	$dbhost="localhost";
	$dbuser="repre_admin";
	$dbpass="Av89nc83!!";
	$dbname="repre_main";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

function getNeighborhoods() {
    $sql = "select * FROM `walkabout_neighborhood` order by id";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);  
        $neighborhoods = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($neighborhoods);

    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

echo getNeighborhoods();

?>