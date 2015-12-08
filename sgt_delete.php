<?php
require('mysql_connect.php');

$sgtName = $_POST['name'];
$sgtCourse = $_POST['course'];
$sgtGrade = $_POST['grade'];

$query = "INSERT INTO students (name, course, grade) VALUES('$sgtName','$sgtCourse','$sgtGrade')";
mysqli_query($conn, $query);

if (mysqli_affected_rows($conn)>0) {
    $new_id = mysqli_insert_id($conn);
    $result = [
        'success'=>true, 'new_id'=>$new_id
    ];
    print_r(json_encode($result));
}
else {
    print_r('No Good');
}

?>