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

    loadTable();
    $("#btnItemClear").click();
});









