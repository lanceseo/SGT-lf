// Backend_v3.0

$("document").ready(function() {
    $(".addData").on("click", function() {
        a_DOM.getInput(a_Student);
        a_API.addDataToServer(a_Student.name, a_Student.course, a_Student.grade);
        // Get data from server
        a_DOM.clearTable();
        a_API.getDataFromServer(a_SGT, a_DOM);
        a_DOM.clearInputs();
    });

    $(".cancelData").on("click", function() {
        a_DOM.clearInputs();
    });

    $(".getData").on("click", function() {
        a_DOM.clearTable();
        a_API.getDataFromServer(a_SGT, a_DOM);
    });

    $(".deleteData").on("click",function() {
        a_DOM.getInputID(d_Student);
        a_API.deleteFromServer(d_Student.id);
        // Get data from server
        a_DOM.clearTable();
        a_API.getDataFromServer(a_SGT, a_DOM);
    });
});

// callback to assure data is received from server before calc avg and populating
function loadData(data, sgtObj, domObj) {
    // console.log(data, sgtObj, domObj);
    sgtObj.setStudentArray(data);
    sgtObj.calcAvg();
    domObj.populateTable(sgtObj.studentArray);
    domObj.populateAvg(sgtObj.gradeAvg);
}

var Student = function() {
    var self = this;
    self.id = null;
    self.name = "";
    self.course = "";
    self.grade = null;
};

var SGT = function() {
    var self = this;
    self.setStudentArray = function(serverData) {
        self.studentArray = serverData;
    };
    self.calcAvg = function() {
        var gradeTotal = null;
        for (var i=0; i<self.studentArray.length; i++) {
            gradeTotal += parseInt(self.studentArray[i].grade);
        }
        self.gradeAvg = parseInt((gradeTotal / self.studentArray.length));
    };
};

var SGT_API = function() {
    var self = this;
    //var apiKey = '2VSlnQzAoX';
    self.getDataFromServer = function(sgtObj, domObj) {
        $.ajax({
            dataType: 'json',
            method: 'get',
            //data: {
            //    api_key: apiKey
            //},
            url: 'sgt_get.php',
            success: function(result) {
                console.log("Data received: ", result);
                loadData(result.output, sgtObj, domObj);
            },
            error: function() {
                console.log("an error");
            }
        });
    };
    self.addDataToServer = function(sName, sCourse, sGrade) {
        $.ajax({
            dataType: 'json',
            method: 'post',
            data: {
                //api_key: apiKey,
                name: sName,
                course: sCourse,
                grade: sGrade
            },
            url: 'sgt_create.php',
            success: function(result) {
                console.log("Added. New ID: ", result.new_id);
            },
            error: function() {
                console.log("an error");
            }
        });
    };
    self.deleteFromServer = function(sID) {
        $.ajax({
            dataType: 'json',
            method: 'post',
            data: {
                //api_key: '2VSlnQzAoX',
                student_id: sID
            },
            url: 'sgt_delete.php',
            success: function(result) {
                console.log("Deleted: ", result);
            },
            error: function() {
                console.log("an error");
            }
        });
    };
};

var SGT_DOM = function() {
    var self = this;
    self.clearInputs = function() {
        $("#studentName").val("");
        $("#course").val("");
        $("#studentGrade").val("");
    };
    self.clearTable = function() {
        $(".student-list tbody").empty();
    };
    self.populateTable = function(sData) {
        var sDataLength = sData.length;
        for (var i=0; i<sDataLength; i++) {
            var tr = $("<tr>");
            var tdId = $("<td>").text(sData[i].id);
            var tdName = $("<td>").text(sData[i].name);
            var tdCourse = $("<td>").text(sData[i].course);
            var tdGrade =  $("<td>").text(sData[i].grade);
            tr.append(tdId, tdName, tdCourse, tdGrade);
            $(".student-list tbody").append(tr);
        }
    };
    self.populateAvg = function(gradeAvg) {
        $(".avgGrade").empty();
        $(".avgGrade").append(gradeAvg);
    };
    self.getInput = function(newStudent) {
        var sName = $("#studentName").val();
        var sCourse = $("#course").val();
        var sGrade = $("#studentGrade").val();
        //console.log('Input is: ', sName, sCourse, sGrade);
        newStudent.name = sName;
        newStudent.course = sCourse;
        newStudent.grade = sGrade;
    };
    self.getInputID = function(delStudent) {
        delStudent.id = $("#studentID").val();
    };
};

var a_Student = new Student();
var d_Student = new Student();
var a_SGT = new SGT();
var a_API = new SGT_API();
var a_DOM = new SGT_DOM();