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

// $data = getWalkabouts();
// echo json_encode($data);
echo getWalkabouts();

// // $data = file_get_contents("php://input");
// $data = getWalkabouts();
// // echo $data;
// echo json_decode($data);
 
// $objData = json_decode($data);
 
// perform query or whatever you wish, sample:
 
/*
$query = 'SELECT * FROM
tbl_content
WHERE
title="'. $objData->data .'"';
*/
 
// Static array for this demo
// $values = array('php', 'web', 'angularjs', 'js');
 
// // Check if the keywords are in our array
// if(in_array($objData->data, $values)) {
//     echo 'I have found what you\'re looking for!';
// }
// else {
//     echo 'Sorry, no match!';
// }
    // $host = "localhost"; 
    // $user = "repre_admin"; 
    // $pass = "Av89nc83!!"; 
    // $database = "repre_main";
    // $con = mysql_connect($host,$user,$pass);
    // if (!$con) {
    //     die('Could not connect: ' . mysql_error());
    // }
    // echo 'Connected successfully'; 
    // mysql_select_db($database,$con);  
    //  //select
    // $query = "SELECT * FROM walkaboutsg "; 
    // $result = mysql_query($query) OR die(mysql_error()); 
    // $arr = array();
    // //now we turn the results into an array and loop through them. 
    // while ($row = mysql_fetch_array($result)) { 
    //     $title = $row['title']; 
    //     $description = $row['description']; 
    //     //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
    //     // $arr[] = $row;
    //     $arr[] = array('name' => $name, 'description' => $description);
    // } 
    // echo json_encode($arr[]);
?>