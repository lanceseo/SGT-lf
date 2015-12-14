<?php
require('mysql_connect.php');

$sgtName = $_POST['name'];
$sgtCourse = $_POST['course'];
$sgtGrade = $_POST['grade'];

$nameCheck = preg_match('/[a-zA-z]+ [a-zA-Z\']+/', $sgtName);
$courseCheck = preg_match('/[a-zA-z ]*/', $sgtCourse);
$gradeCheck = preg_match('/\b(0*(?:[1-9][0-9]?|100))\b/', $sgtGrade);

if (!$nameCheck) {
    $errors[] = ['nameErr' => 'Name error'];
}
if (!$courseCheck) {
    $errors[] = ['courseErr' => 'Course error'];
}
if (!$gradeCheck) {
    $errors[] = ['gradeErr' => 'Grade error'];
}
if (isset($errors)) {
    print_r(json_encode($errors));
}

if ($nameCheck && $courseCheck && $gradeCheck) {
    $query = "INSERT INTO students (name, course, grade) VALUES('$sgtName','$sgtCourse','$sgtGrade')";
    mysqli_query($conn, $query);

    if (mysqli_affected_rows($conn) > 0) {
        $new_id = mysqli_insert_id($conn);
        $result = ['success' => true, 'new_id' => $new_id];
        print_r(json_encode($result));
    } else {
        print_r('SQL operation failed');
    }
}
?>