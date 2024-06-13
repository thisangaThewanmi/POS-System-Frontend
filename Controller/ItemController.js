import {ItemModel} from "../Model/ItemModel.js";
import{items} from "../db/db.js";

var recordIndex;

function loadTable() {
    $('#item-table-body').empty();

    items.map((ITEM, index) => {
        var record = `
            <tr>
                <td class="item-id-value">${ITEM.id}</td>
                <td class="item-name-value">${ITEM.Name}</td>
                <td class="item-qty-value">${ITEM.qty}</td>
                <td class="item-price-value">${ITEM.price}</td>
            </tr>
        `;
        $("#item-table-body").append(record);
    });
}


/*=======================get data from the current index=====================*/

$("#item-table-body").on('click', 'tr' , function () {

    let index = $(this).index();
    recordIndex = index;

    console.log("index: ",index);

    let Id = $(this).find(".item-id-value").text();
    let Name = $(this).find(".item-name-value").text();
    let Qty = $(this).find(".item-qty-value").text();
    let Price = $(this).find(".item-price-value").text();


    $("#ItemId").val(Id);
    $("#ItemName").val(Name);
    $("#ItemQty").val(Qty);
    $("#ItemPrice").val(Price);



});




/*============save an Item============================*/
$("#btnItemSave").on('click', () => {

    console.log("start button triggerd IN iTEMS");

    if (validateAll()){
        var itemId = $("#ItemId").val();

        var itemName = $("#ItemName").val();

        var itemQty = $("#ItemQty").val();

        var itemPrice = $("#ItemPrice").val();







        let item= new ItemModel(itemId,itemName,itemQty,itemPrice);
        items.push(item);


        /*console.log(CustomerId);
        console.log(CustomerName);
        console.log(CustomerAddress);
        console.log(CustomerContact);*/

        console.log(items);

        loadTable();
        $("#btnItemClear").click();


    }


});


/*=====================Update an Item===========================*/
$("#btnItemUpdate").on('click', () => {

    var itemId = $("#ItemId").val();

    var itemName = $("#ItemName").val();

    var itemQty = $("#ItemQty").val();

    var itemPrice = $("#ItemPrice").val();


    let itemObj = items[recordIndex];

    itemObj.id = itemId;
    itemObj.Name = itemName;
    itemObj.qty = itemQty;
    itemObj.price = itemPrice;

    loadTable();
    $("#btnItemClear").click();
});


/*========================delete an Item=======================*/

$("#btnItemDelete").on('click', () => {

    items.splice(recordIndex, 1);
    console.log(items);

    loadTable();
    $("#btnItemClear").click();
});

function validateItemId() {
    console.log("method validateItemId called");

    var ItemId = $('#ItemId').val();
    let pattern = /^I\d{3}$/;

       if (pattern.test(ItemId)) {
        $('#error-ItemId').html("");
        return true;
       }

       else {
        $('#error-ItemId').html("Please enter in the I-*** format  ");
        return false;
    }
}

function validateItemName() {
    console.log("method validateItemName called");

    var ItemName = $('#ItemName').val();
    let pattern = /^[A-Za-z]+(([' -][A-Za-z ])?[A-Za-z]*)*$/;

    if (pattern.test(ItemName)) {
        $('#error-ItemName').html("");
        return true;
    }

    else {
        $('#error-ItemName').html("Please enter a valid Name  ");
        return false;
    }
}


function validateItemQty() {
    console.log("method validateItemQty called");

    var Itemqty = $('#ItemQty').val();
    let pattern = /^[1-9]\d*$/;

    if (pattern.test(Itemqty)) {
        $('#error-ItemQty').html("");
        return true;
    }

    else {
        $('#error-ItemQty').html("Please enter a valid quantity ");
        return false;
    }
}


function validateItemPrice() {
    console.log("method validateItemprice called");

    var ItemPrice = $('#ItemPrice').val();
    let pattern = /^\d{1,4}\.\d{2}$/;


    if (pattern.test(ItemPrice)) {
        $('#error-ItemPrice').html("");
        return true;
    }

    else {
        $('#error-ItemPrice').html("Please enter in the format Rs.****");
        return false;
    }
}

$('#ItemId').on('input',validateItemId);
$('#ItemName').on('input',validateItemName);
$('#ItemQty').on('input',validateItemQty);
$('#ItemPrice').on('input',validateItemPrice);


function validateAll() {
    // Call each validation method and store the result
    let isValidId = validateItemId();
    let isValidName = validateItemName();
    let isValidQty = validateItemQty();
    let isValidPrice = validateItemPrice();

    // Check if all validation methods return true
    if (isValidId && isValidName && isValidQty && isValidPrice) {
        // All validations passed
        return true;
    } else {
        // At least one validation failed
        return false;
    }
}










