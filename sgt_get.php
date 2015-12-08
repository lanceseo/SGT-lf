<?php
require('mysql_connect.php');

$query = "SELECT * FROM students";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result)>0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $output[] = $row;
    }

    $result = [
        'success'=>true, 'output'=>$output
    ];
    print_r(json_encode($result));
}
else {
    print_r('SQL operation failed or No data');
}

?>
