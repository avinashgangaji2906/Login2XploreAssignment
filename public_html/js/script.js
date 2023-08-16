//  Comman  Data
var connToken = "90931321|-31949322197452297|90950521";
var stuDBName = "SCHOOL-DB";
var stuRelationName = "STUDENT-TABLE";
var jpdbBaseUrl = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";

$("#stuRoll").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getStuRollAsJsonObj() { 
    var stuRoll = $("#stuRoll").val();
    var jsonStr = {
        Roll: stuRoll
    };
    return JSON.stringify(jsonStr);
}


function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data2 = JSON.parse(jsonObj.data).record;

    $("#stuName").val(data2.Name);
    $("#stuClass").val(data2.Class);
    $("#stuDate").val(data2.Date);
    $("#stuAddress").val(data2.Address);
    $("#stuEnrollDate").val(data2.EnrollDate);
}


// reset form
function resetForm() {
    $("#stuRoll").val("");
    $("#stuName").val("");
    $("#stuClass").val("");
    $("#stuDate").val("");
    $("#stuAddress").val("");
    $("#stuEnrollDate").val("");
    $("#stuRoll").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#stuRoll").focus();
}
;


// validate form data
function validateAndGetFormData() {
    var stuRoll = $("#stuRoll").val();
    var stuName = $("#stuName").val();
    var stuClass = $("#stuClass").val();
    var stuDate = $("#stuDate").val();
    var stuAddress = $("#stuAddress").val();
    var stuEnrollDate = $("#stuEnrollDate").val();

    if (stuRoll === "") {
        alert("Student Roll No Required Value");
        $("#stuRoll").focus();
        return "";
    }

    if (stuName === "") {
        alert("Student Name is Required Value");
        $("#stuName").focus();
        return "";
    }

    if (stuClass === "") {
        alert("Student Class is Required Value");
        $("#stuClass").focus();
        return "";
    }

    if (stuDate === "") {
        alert("Student Date is Required Value");
        $("#stuDate").focus();
        return "";
    }

    if (stuAddress === "") {
        alert("Student Address is Required Value");
        $("#stuAddress").focus();
        return "";
    }

    if (stuEnrollDate === "") {
        alert("Student Enrollment Date is Required Value");
        $("#stuEnrollDate").focus();
        return "";
    }

    // Json Object
    var jsonStrObj = {
        Roll: stuRoll,
        Name: stuName,
        Class: stuClass,
        Date: stuDate,
        Address: stuAddress,
        EnrollDate: stuEnrollDate
    };
    return JSON.stringify(jsonStrObj);
}

// At end Saving data into Database
function saveStudent() {
    var jsonStrObj = validateAndGetFormData();
    if (jsonStrObj === " ") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelationName);
//    alert(putRequest);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseUrl, jpdbIML);
//      alert(JSON.stringify(resultObj));
//        console.log(resultObj);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#stuRoll").focus();
}

// get Student 
function getStudent() {
    var stuRollJsonObj =getStuRollAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stuDBName, stuRelationName, stuRollJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuName").focus();
    } else if (resJsonObj.status === 200) {
        $("#stuRoll").prop("disabled", false);
        fillData(resJsonObj);

        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuName").focus();
    }
}


// Update data 
function updateStudent() {
    $("#update").prop("disabled", true);
    jsonUpdate = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonUpdate, stuDBName, stuRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resultJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resultJsonObj);
    resetForm();
    $("#stuRoll").focus();
}
