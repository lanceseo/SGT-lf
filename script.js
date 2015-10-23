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
var student_name = $("#studentName");
var student_course = $("#course");
var student_grade = $("#studentGrade");
/**
 * addClicked - Event Handler when user clicks the add button
 */
$("document").ready(function(){
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
    var student = {
        stuname: "",
        course: "",
        grade: ""
    };
    var student_name = $("#studentName");
    var student_course = $("#course");
    var student_grade = $("#studentGrade");
    student.stuname = student_name.val();
    student.course = student_course.val();
    student.grade = student_grade.val();
    student_array.push(student);
    $("input").val("");
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function cancelClicked() {
    $("#studentName").val("");
    $("#studentGrade").val("");
    $("#course").val("");
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    addStudent();
    function clearboard() {
        $(".student-list tbody").empty();
    }
    clearboard();
    for (i=0;i<student_array.length;i++) {
        addStudentToDom(student_array[i], i);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(object, i) {
    var stuname = object.stuname;
    var course = object.course;
    var grade = object.grade;
    var index = i;
    var studenttr = $("<tr>");
    var studenttdname = $("<td>").text(stuname);
    var studenttdcourse = $("<td>").text(course);
    var studenttdgrade = $("<td>").text(grade);
    var deletebuttontd = $("<td>");
    var deletebutton = $("<button>").addClass("btn btn-danger").text("Delete").click(function(){
        $(this).parents("tr").remove();
        student_array.splice(index,1);
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
}
/**
 * Listen for the document to load and reset the data to the initial state
 */