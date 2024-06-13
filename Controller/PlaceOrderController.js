import {items} from "../db/db.js";
import {customers} from "../db/db.js";
import {itemCart} from "../db/db.js";
import {ItemCartModel} from "../Model/ItemCartModel.js";



console.clear();
/*------------------------------------------*/




function loadComboBoxes(array, comboBoxId) {
    console.log("combo-box loaded", array, comboBoxId);
    var comboBox = $(comboBoxId); //uda ena comboxId eka tama meken ganne

    // clearing the combo 2
    comboBox.empty();

    //udata ena arrya ek aganata iterate krnoo
    for (var i = 0; i < array.length; i++) {
        // array eke current index eke id eka ganno
        var id = array[i].id;
        // Append option to combo box
        comboBox.append($('<option>', {value: id, text: id}));
    }

    // If there's only one item, manually trigger change event
    if (array.length === 1) {
        comboBox.one('click', function() {
            $(this).change();
        });
    }
}

$('#placeOrder-link').click(function () {  //place order link eka ebuwama witharak meka load wenna ona e nisaii header link ekata id dunne ntm mulinma load unoth arraya nisa data na
    console.log("main method");

    loadComboBoxes(customers, '#orderCusId'); // meken method ekata array ekai cmb id ekai yawanoo
    loadComboBoxes(items, '#O-itemID');
});

function loadCusData(cusId) {
    console.log("loaded the loadCusData");
    for (var i = 0; i < customers.length; i++) {
        if (cusId === customers[i].id) {
            console.log("cusName", customers[i].Name);
            $('#orderCusName').val(customers[i].Name);
            $('#orderCusAddress').val(customers[i].address);
            $('#orderCusContact').val(customers[i].contactNo);
        }
    }
}

$('#orderCusId').change(function () {
    console.log("clicke cmb");
    var cusId = $(this).val();
    console.log("cusId:", cusId);
    loadCusData(cusId);
});

/*=======================LOAD ITEM DATA=========================*/

function loadItemData(itemId) {
    console.log("loaded the loadItemData");
    for (var i = 0; i < items.length; i++) {
        if (itemId === items[i].id) {
            console.log("itemName", items[i].Name);
            $('#O-itemName').val(items[i].Name);
            $('#O-itemPrice').val(items[i].price);
            $('#O-itemQty').val(items[i].qty);
        }
    }
}

$('#O-itemID').change(function () {
    console.log("clicked item combo");
    var itemId = $(this).val();
    console.log("itemId:", itemId);
    loadItemData(itemId);
});


/*===================================Load to the table====================*/
function loadTable() {
    $('#item-cart-tablebody').empty();

   itemCart.map((itemCart, index) => {
        var record = `
            <tr>
                <td class="cartItemId">${itemCart.itemId}</td>
                <td class="cartItemName">${itemCart.ItemName}</td>
                <td class="cartItemQty">${itemCart.Qty}</td>
                <td class="cartItemPrice">${itemCart.Price}</td>
                <td class="cartItemTotal">${itemCart.Total}</td>
            </tr>
        `;
        $("#item-cart-tablebody").append(record);
    });
}




/*==============================save to the cart=======================*/
var total =0;
var finalTotal=0;

/*$("#btnAddItem").on('click', () => {
    var OrderItemId = $('#O-itemID').val();
    var OrderItemName = $('#O-itemName').val();
    var OrderItemPrice = parseFloat($('#O-itemPrice').val());
    var OrderQty = parseInt($('#O-orderQty').val());

    if (isNaN(OrderItemPrice) || isNaN(OrderQty)) {
        alert("Please enter valid numbers for price and quantity.");
        return;
    }

    total = OrderQty * OrderItemPrice;
    console.log("total: " + total);

    finalTotal += total; // Incrementally add to final total
    console.log("Final Total: " + finalTotal);

    $('#totalPriceLabel').text(finalTotal);



    // Create an object to store item data
  /!*  const orderItem = {
        id: OrderItemId,
        name: OrderItemName,
        qty: OrderQty,
        price: OrderItemPrice,
        total:total
    };*!/

    let cart =  new ItemCartModel(OrderItemId,OrderItemName,OrderItemPrice,OrderQty,total);

    // Push the object to the itemCart array

    itemCart.push(cart);

    updateItemQty();

    console.log(itemCart);
    loadTable();


})*/

$("#btnAddItem").on('click', () => {
    var OrderItemId = $('#O-itemID').val();
    var OrderItemName = $('#O-itemName').val();

    // Strip non-numeric characters from price
    var OrderItemPriceString = $('#O-itemPrice').val();
    var OrderItemPrice = parseFloat(OrderItemPriceString.replace(/[^0-9.]/g, ''));
    console.log(OrderItemPrice+"OrderItemPrice");

    // Parse quantity as integer
    var OrderQtyString = $('#O-orderQty').val();
    var OrderQty = parseInt(OrderQtyString);
    console.log(OrderQty+"orderQty");

    if (isNaN(OrderItemPrice) || isNaN(OrderQty)) {
        alert("Please enter valid numbers for price and quantity.");
        return;
    }

    var total = OrderQty * OrderItemPrice;
    console.log("total: " + total);

    finalTotal += total; // Incrementally add to final total
    console.log("Final Total: " + finalTotal);

    $('#totalPriceLabel').text(finalTotal);

    // Create an object to store item data
    let cartItem = new ItemCartModel(OrderItemId, OrderItemName,  OrderQty, OrderItemPrice,total);
    console.log("Before sending to the table");


    // Push the object to the itemCart array
    itemCart.push(cartItem);

    updateItemQty(OrderItemId, OrderQty);

    console.log(itemCart);
    loadTable();
});


function updateItemQty() {

    var OrderItemId = $('#O-itemID').val();

    for (var i = 0; i < items.length; i++) {
        if (OrderItemId === items[i].id) {
            var currentItemQty = items[i].qty;
            console.log("currentItemQty : "+currentItemQty);
            var OrderQty = parseInt($('#O-orderQty').val());
            console.log("currentOrderQty : "+OrderQty);
            var updatedQty = currentItemQty - OrderQty;
            console.log("updateQty : "+updatedQty);

            items[i].qty = updatedQty;
            console.log(" items[i].qty"+ items[i].qty);
        }

    }
}


/*===========================load into the table==================*/



