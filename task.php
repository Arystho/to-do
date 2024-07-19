<?php
// Gérer les CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Si la méthode est OPTIONS, terminer ici (pour les requêtes préliminaires CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
$message = null;

if(!empty($_POST['submit'])) {
    
    if(empty($_POST['taskInput'])) {
        $message = "Entrez une tâche à ajouter";
    } else {
        require_once 'connect.php';
        $task = R::dispense('tasks');
        $task->task = $_POST['taskInput'];
        $id = R::store($task);
        if($id) {
            $message = "Ajout de la tâche effectué avec succès";
        } else {
            $message = "Une erreur s'est produite lors de l'ajout de la tâche";
        }
    }
}
?>
