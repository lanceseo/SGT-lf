
// v2.5 commented out due to incompleteness
// ++++++++++ v2.5 > OOP ++++++++++
/*$("document").ready(function() {
    $(".btn-success").on("click", function() {

    });
    $(".btn-primary").on("click", function() {
        sgt1.getDataFromServer();
    });

});*/

// var myStorage = localStorage;

/*var sgtx = {
    studentArray: [],
    student: {
        id: 0,
        name: "",
        course: "",
        grade: 0
    },
    inputTexts: {
        stName: $("#studentName"),
        stCourse: $("#course"),
        stGrade: $("#studentGrade")
    },
    getFromInput: function() {

    },
    addToArray: function() {
        console.log("sArray1: ", sgt.studentArray);
        sgt.studentArray.push(sgt.getFromInput());
        console.log("sArray2: ", sgt.studentArray);
    },
    addToTableDOM: function() {
        for (var i=0; i<sgt.studentArray.length; i++) {
            console.log("index: ", i);
            var stuID = $("<td>").text(sgt.studentArray[i].id);
            var stuName = $("<td>").text(sgt.studentArray[i].name);
            var stuCourse = $("<td>").text(sgt.studentArray[i].course);
            var stuGrade = $("<td>").text(sgt.studentArray[i].grade);
            var newTR = $("<tr>").append(stuID, stuName, stuCourse, stuGrade);
            $(".student-list tbody").append(newTR);
        }
    }

};*/

/*
// re-write to object constructor way
var sgt = function() {

    this.studentArray = [];

    this.getDataFromServer = function () {
        $.ajax({
            dataType: 'json',
            method: 'post',
            data: {
                api_key: '2VSlnQzAoX'
            },
            url: 'http://s-apis.learningfuze.com/sgt/get',
            success: function(result) {
                console.log("result is: ", result);
               // student_array = result.data;
            }
        });
    };

};

var sgt1 = new sgt();*/


//+++++++++  v2.0  ++++++++++
/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var studentAll = {
    studentArray:[]
};

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var student_id;
var student_name;
var student_course;
var student_grade;
var avggrade;
/**
 * addClicked - Event Handler when user clicks the add button
 */
$("document").ready(function(){
    student_id = $("#studentID");
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
function addStudent() {     // *** 2
    var student = {};
    student.name = student_name.val();
    student.course = student_course.val();
    student.grade = student_grade.val();
    student.find = function(){return student_array.indexOf(this)};
    if (student.name.trim() == ""){
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

    addToServer(student.name, student.course, student.grade);
    cancelClicked();
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function cancelClicked() {      // *** 4
    student_name.val("");
    student_grade.val("");
    student_course.val("");
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage(){        // *** 3
    var grade;
    var gradeTotal = 0;
    var gradeAvg = 0;

    for (var i = 0; i < student_array.length; i++) {
        grade = parseInt(student_array[i].grade);
        gradeTotal += grade;
    }
    gradeAvg = (gradeTotal / (student_array.length));
    avggrade.text(parseInt(gradeAvg));
}
/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {      // *** 1
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
function addStudentToDom(object, i) {       // *** 5
    object.id = i;
    var stuname = object.name;
    var course = object.course;
    var grade = object.grade;
    var studenttr = $("<tr>");
    var studenttdid = $("<td>").text(student_id);
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
$("document").ready(function() {
    reset();
    avggrade.text("0");
});


// ===== v1.0 Get Student Data From Server using AJAX API Call
$("document").ready(function() {
    $(".btn-primary").attr("onclick","getDataFromServer()");
});

function getDataFromServer() {

    $.ajax({
        dataType: 'json',
        method: 'post',
        data: {
            api_key: '2VSlnQzAoX'
        },
        url: 'http://s-apis.learningfuze.com/sgt/get',
        success: function(result) {
            console.log("result is: ", result);
            student_array = result.data;
        }
    });

    updateStudentList();
}


// ===== v2.0 Add new student data to the server
var newSID = 0;
function addToServer(s_name, s_course, s_grade) {

    $.ajax({
        // api_key: the string for my api access
        // student object that contains all of this student's data
        dataType: 'json',
        method: 'post',
        data: {
            api_key: '2VSlnQzAoX',
            name: s_name,
            course: s_course,
            grade: s_grade
        },
        url: 'http://s-apis.learningfuze.com/sgt/create',
        success: function(result) {
            console.log("New ID: ", result.new_id);
            newSID = result.new_id;
        }
    });

}


function deleteFromServer (ssid) {
    $.ajax({
        // api_key: the string for my api access
        // student object that contains all of this student's data
        dataType: 'json',
        method: 'post',
        data: {
            api_key: '2VSlnQzAoX',
            student_id: ssid
        },
        url: 'http://s-apis.learningfuze.com/sgt/delete',
        success: function(result) {
            console.log("Result: ", result);
        }
    });
}
