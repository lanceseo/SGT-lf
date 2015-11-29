// v2.5 commented out due to incompleteness
// ++++++++++ v2.5 > OOP ++++++++++
var global_student;
var g_primer = null;
// var myStorage = localStorage;

$("document").ready(function() {
    $(".btn-success").on("click", function() {

    });
    $(".btn-primary").on("click", function() {
        a_SGT.studentArray = a_API.getDataFromServer();
        optCallback(a_SGT.studentArray, a_DOM.populate);

        if (a_SGT.studentArray != "") {
            console.log(a_SGT.studentArray);
        }
        else {
            console.log("data not ready");
        }
        //a_DOM.populate(a_SGT.studentArray);
    });
});


function optCallback(options, callback) {
    console.log(options, callback);
    console.log(callback(options));
}

var SGT = function() {
    var self = this;
    self.studentArray = [];

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
    self.getDataFromServer = function () {
        var apiKey = '2VSlnQzAoX';
        var tempData = [];
        $.ajax({
            dataType: 'json',
            method: 'post',
            data: {
                api_key: apiKey
            },
            url: 'http://s-apis.learningfuze.com/sgt/get',
            success: function(result) {
                self.callBack = function() {
                    var dataLength = result.data.length;
                    for (var i = 0; i < dataLength; i++) {
                        tempData[i] = result.data[i];
                    }
                }
            }
        });
        return tempData;
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