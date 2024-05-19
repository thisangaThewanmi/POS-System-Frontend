import {CustomerModel} from "../Model/CustomerModel.js";
import{customers} from "../db/db.js";

var recordIndex;




function loadTable() {
    $('#Cus-table-body').empty();

    customers.map((customer, index) => {
        var record = `
            <tr>
                <td class="cus-id-value">${customer.id}</td>
                <td class="cus-name-value">${customer.Name}</td>
                <td class="cus-address-value">${customer.address}</td>
                <td class="cus-contactNo-value">${customer.contactNo}</td>
            </tr>
        `;
        $("#Cus-table-body").append(record);
    });
}


/*=======================get data from the current index=====================*/

$("#Cus-table-body").on('click', 'tr' , function () {

    let index = $(this).index();
    recordIndex = index;

    console.log("index: ",index);

    let Id = $(this).find(".cus-id-value").text();
    let Name = $(this).find(".cus-name-value").text();
    let Address = $(this).find(".cus-address-value").text();
    let ContactNo = $(this).find(".cus-contactNo-value").text();


    $("#cusId").val(Id);
    $("#cusFullname").val(Name);
    $("#cusAddress").val(Address);
    $("#cusContactNo").val(ContactNo);



});




/*============save a customer============================*/


    $("#btnCusSave").on('click', () => {
        console.log("start button triggered");

        if (!validateCusId()) {
            console.log("save eken ena valiCus eka");
            return;
        }

    var CustomerId = $("#cusId").val();

    var CustomerName = $("#cusFullname").val();

    var CustomerAddress = $("#cusAddress").val();

    var CustomerContact = $("#cusContactNo").val();









    let customer= new CustomerModel(CustomerId,CustomerName,CustomerAddress,CustomerContact);
    customers.push(customer);
    alert("Customer Saved");


    /*console.log(CustomerId);
    console.log(CustomerName);
    console.log(CustomerAddress);
    console.log(CustomerContact);*/

    console.log(customers);

    loadTable();
    $("btnCusClear").click();


});


/*=====================Update a customer===========================*/
$("#btnCusUpadate").on('click', () => {

    var CustomerId = $("#cusId").val();

    var CustomerName = $("#cusFullname").val();

    var CustomerAddress = $("#cusAddress").val();

    var CustomerContact = $("#cusContactNo").val();


    let customerObj = customers[recordIndex];

    customerObj.id = CustomerId;
    customerObj.Name = CustomerName;
    customerObj.address = CustomerAddress;
    customerObj.contactNo = CustomerContact;

    loadTable();
    $("#btnCusClear").click();
});


/*========================delete a customer=======================*/

$("#btnCusDelete").on('click', () => {

    customers.splice(recordIndex, 1);

    loadTable();
    $("#btnCusClear").click();
});




function  validateCusId(){
    console.log("validate method called");

    var CustomerId = $("#cusId").val();
    let pattern = /^C\d{3}$/;


    if (pattern.test(CustomerId)) {
        $('#error-msgId').html("") ;
        return true;
    } else {
        $('#error-msgId').html("Please enter the id in C-*** format");
        console.log("Please enter the id in C-*** format");
        return false;
    }
}

function  validateCusName(){
    console.log("validate method called for Name");

    var CustomerName = $("#cusFullname").val();
    let pattern = /^[A-Za-z]+(([' -][A-Za-z ])?[A-Za-z]*)*$/;


    if (pattern.test(CustomerName)) {
        $('#error-msgName').html("") ;
        return true;
    } else {
        $('#error-msgName').html("Please enter a valid name");
        console.log("Please enter a valid name");
        return false;
    }
}


$("#cusId").on('input', validateCusId);
$("#cusFullname").on('input', validateCusName);
$("#cusAddress").on('input', validateCusAddress);
$("#cusContactNo").on('input', validateCusContact);








