<?php
require('mysql_connect.php');

$sgtID = $_POST['student_id'];

$query = "DELETE FROM students WHERE id=$sgtID";
mysqli_query($conn, $query);

if (mysqli_affected_rows($conn)>0) {
    $result = [
        'success'=>true, 'del_id'=>$sgtID
    ];
    print_r(json_encode($result));
}
else {
    print_r('SQL operation failed');
}

?>