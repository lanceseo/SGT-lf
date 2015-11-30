// v2.5 commented out due to incompleteness
// ++++++++++ v2.5 > OOP ++++++++++
var global_student;
var g_primer = null;
// var myStorage = localStorage;

$("document").ready(function() {
    $(".btn-success").on("click", function() {

    });
    $(".btn-primary").on("click", function() {
        a_API.getDataFromServer(a_SGT, a_DOM);

        //if (a_SGT.studentArray != "") {
        //    console.log(a_SGT.studentArray);
        //
        //}
        //else {
        //    console.log("data not ready");
        //}

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
    self.getDataFromServer = function (obj1, obj2) {
        var apiKey = '2VSlnQzAoX';
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