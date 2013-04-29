<?php

function getConnection() {
	$dbhost="localhost";
	$dbuser="repre_admin";
	$dbpass="Av89nc83!!";
	$dbname="repre_main";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

function getWalkabouts() {
    $sql = "select * FROM `walkaboutsg` order by title";
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
echo getWalkabouts();

?>