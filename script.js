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

/**
 * addClicked - Event Handler when user clicks the add button
 */
$("document").ready(function(){
    $(".btn-success").attr("onclick","addStudent()");
});
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
$("document").ready(function(){
    $(".btn-default").attr("onclick","cancelClicked()");
});
function cancelClicked() {
    $("input:text").val("");
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent() {
    var temp = $("#studentName").val();
    var temp1 = $("#course").val();
    var temp3 = $("#studentGrade").val();
    var student = {
        stuname: "",
        course: "",
        grade: ""
    };
    student.stuname = temp;
    student.course = temp1;
    student.grade = temp3;
    if (temp == "" || temp1 == "" || temp3 == "") {
        return;
    }
    student_array.push(student);
    $("input:text").val("");
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
var gradeAverage;

function calculateAverage (){

    for (i = 0; i < array.length; i++) {
        var grade = array[i].grade;
        var gradeTotal += grade;
    }
    var gradeAvg = (gradeTotal / (array.length - 1));
    return gradeAvg;
}
/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(array) {
    function clearboard() {
        $(".student-list tbody").empty();
    }
    clearboard();
    for (i=0;i<array.length;i++) {
        var stuname = student_array[i].stuname;
        var course = student_array[i].course;
        var grade = student_array[i].grade;
        var studenttr = $("<tr>");
        var studenttdname = $("<td>").text(stuname);
        var studenttdcourse = $("<td>").text(course);
        var studenttdgrade = $("<td>").text(grade);
        var deletebuttontd = $("<td>");
        var deletebutton = $("<button>").addClass("btn btn-danger").attr("onclick", "clearAddStudentForm()").text("Delete");
        deletebuttontd.append(deletebutton);
        studenttr.append(studenttdname, studenttdcourse, studenttdgrade, deletebuttontd);
        $(".student-list tbody").append(studenttr);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom() {
    var stuname = student_array[student_array.length - 1].stuname;
    var course = student_array[student_array.length - 1].course;
    var grade = student_array[student_array.length - 1].grade;
    var studenttr = $("<tr>");
    var studenttdname = $("<td>").text(stuname);
    var studenttdcourse = $("<td>").text(course);
    var studenttdgrade = $("<td>").text(grade);
    var deletebuttontd = $("<td>");
    var deletebutton = $("<button>").addClass("btn btn-danger").attr("onclick", "clearAddStudentForm()").text("Delete");
    deletebuttontd.append(deletebutton);
    studenttr.append(studenttdname, studenttdcourse, studenttdgrade, deletebuttontd);
    $(".student-list tbody").append(studenttr);
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */


/**
 * Listen for the document to load and reset the data to the initial state
 */