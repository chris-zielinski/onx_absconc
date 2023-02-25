<?php
/* Database connection to save data from the online experiment using PDO
Table name is defined here.


CREx-BLRI-AMU project :
https://github.com/chris-zielinski/Online_experiments_jsPsych/tree/master/HowFast/keyseq
*/

//---- Name of the table
$tname = 'tab_results';

//---------------------
// Connection parameters

$hname = "localhost";

// Database name
$dname = 'thename'; 

// User name
include_once('......./connect.php');

//---------------------
// Database connection

$dsn = 'mysql:host=' . $hname . ';dbname=' . $dname . ';charset=utf8';

$opt = array(
	// any occurring errors will be thrown as PDOException
	PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
	// an SQL command to execute when connecting
	PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'"
);

try {
	$dba = new PDO($dsn, $usern, $pword, $opt);
} 
catch(PDOException $e)
{
	echo "Connection to database FAILED <br>" . $e->getMessage();  
}