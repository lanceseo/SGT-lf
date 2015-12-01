// v2.5 commented out due to incompleteness
// ++++++++++ v2.5 > OOP ++++++++++
var global_student;
var g_primer = null;
// var myStorage = localStorage;

$("document").ready(function() {
    $(".addData").on("click", function() {

    });
    $(".getData").on("click", function() {
        a_API.getDataFromServer(a_SGT, a_DOM);

    });
});


function loadData(data, obj1, obj2) {
    console.log(data, obj1, obj2);
    obj1.setStudentArray(data);
    obj2.populate(obj1.studentArray);
}

var SGT = function() {
    var self = this;
    //self.studentArray = [];
    self.setStudentArray = function(serverData) {
        self.studentArray = serverData;
        //a_DOM.populate(a_SGT.studentArray);
        //console.log(self.studentArray);
    }

};

var Student = function() {
    var self = this;
    self.id = null;
    self.name = "";
    self.course = "";
    self.grade = null;

};

var SGT_API = function() {
    var self = this;
    var apiKey = '2VSlnQzAoX';
    self.getDataFromServer = function(obj1, obj2) {
        $.ajax({
            dataType: 'json',
            method: 'post',
            data: {
                api_key: apiKey
            },
            url: 'http://s-apis.learningfuze.com/sgt/get',
            success: function(result) {
                console.log(typeof result.data);
                loadData(result.data, obj1, obj2);
            }
        });
    };
    self.addDataToServer = function() {
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
    };

};

var SGT_DOM = function() {
    var self = this;
    self.populate = function(sData) {
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
    }

};


var a_Student = new Student();
var a_SGT = new SGT();
var a_API = new SGT_API();
var a_DOM = new SGT_DOM();