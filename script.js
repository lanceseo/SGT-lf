$("document").ready(function() {
    $(".btn-success").on("click", function() {
        //sgt.getFromInput();
        sgt.addToArray();
        sgt.addToTableDOM();
    });
});

// var myStorage = localStorage;

var sgt = {
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
    },
    getFromServer: function() {

    }


};