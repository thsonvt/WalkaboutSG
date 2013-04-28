<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/walkabouts', 'getWalkabouts');
$app->get('/walkabout/:id',	'getWalkabout');

$app->run();

function getWalkabouts() {
	$sql = "select * FROM walkaboutsg ORDER BY title";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$walkabouts = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($walkabouts);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getWalkabout($id) {
	$sql = "SELECT * FROM walkaboutsg WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$walkabout = $stmt->fetchObject();  
		$db = null;
		echo json_encode($walkabout); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="localhost";
	$dbuser="repre_admin";
	$dbpass="Av89nc83!!";
	$dbname="repre_main";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

$data = getWalkabouts();
echo $data;

?>