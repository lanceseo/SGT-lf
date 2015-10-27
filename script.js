/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var student_name;
var student_course;
var student_grade;
var avggrade;
/**
 * addClicked - Event Handler when user clicks the add button
 */
$("document").ready(function(){
    student_name = $("#studentName");
    student_course = $("#course");
    student_grade = $("#studentGrade");
    avggrade = $(".avgGrade");
    $(".btn-success").attr("onclick","updateStudentList()");
});
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
$("document").ready(function(){
    $(".btn-default").attr("onclick","cancelClicked()");
});
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent() {
    var student = {};
    student.stuname = student_name.val();
    student.course = student_course.val();
    student.grade = student_grade.val();
    student.find = function(){return student_array.indexOf(this)};
    if (student.stuname.trim() == ""){
        console.log("invalid name");
        return;
    }
    else if (student.course.trim() == ""){
        console.log("invalid course");
        return;
    }
    else if (student.grade < 0 || student.grade > 100 || student.grade.trim() == ""){
        console.log("invalid grade");
        return;
    }
    student_array.push(student);
    $("input").val("");
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function cancelClicked() {
    student_name.val("");
    student_grade.val("");
    student_course.val("");
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage(){
    var grade;
    var gradeTotal = 0;
    var gradeAvg = 0;

    for (var i = 0; i < student_array.length; i++) {
        grade = parseInt(student_array[i].grade);
        gradeTotal += grade;
    }
    gradeAvg = (gradeTotal / (student_array.length));
    avggrade.text(parseInt(gradeAvg));
    return gradeAvg;
}
/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    addStudent();
    if (student_array.length === 0){
        return;
    }
    calculateAverage();
    function clearboard() {
        $(".student-list tbody").empty();
    }
    clearboard();
    $(".student-list-container > h3").remove()
    for (i = 0; i < student_array.length; i++) {
        addStudentToDom(student_array[i], i);
        }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(object, i) {
    object.id = i;
    var stuname = object.stuname;
    var course = object.course;
    var grade = object.grade;
    var studenttr = $("<tr>");
    var studenttdname = $("<td>").text(stuname);
    var studenttdcourse = $("<td>").text(course);
    var studenttdgrade = $("<td>").text(grade);
    var deletebuttontd = $("<td>");
    var deletebutton = $("<button>").addClass("btn btn-danger").text("Delete").click(function(){
        $(this).parents("tr").remove();
        student_array.splice(object.find(),1);
        calculateAverage();
        if (student_array.length == 0) {
            reset();
            avggrade.text("0");
        }
        else {};
    });
    deletebuttontd.append(deletebutton);
    studenttr.append(studenttdname, studenttdcourse, studenttdgrade, deletebuttontd);
    $(".student-list tbody").append(studenttr);
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){
    $("tbody").empty();
    var nostudent = $("<h3>").text("User Info Unavailable");
    $(".student-list-container").append(nostudent);
    student_array = [];
}
/**
 * Listen for the document to load and reset the data to the initial state
 */
$("document").ready(function(){
    reset();
    avggrade.text("0");
});