import {items} from "../db/db.js";
import {customers} from "../db/db.js";
import {itemCart} from "../db/db.js";



console.clear();
/*------------------------------------------*/

function loadComboBoxes(array, comboBoxId) {
    console.log("combo-box loaded", array, comboBoxId);
    var comboBox = $(/*'#' + */comboBoxId); //uda ena comboxId eka tama meken ganne

//clearing the combo 2
    comboBox.empty();

    //udata ena arrya ek aganata iterate krnoo
    for (var i = 0; i < array.length; i++) {
        // array eke current index eke id eka ganno
        var id = array[i].id;
        // Append option to combo box
        comboBox.append($('<option>', {value: id, text: id}));
    }
}1

    $('#placeOrder-link').click(function () {  //place order link eka ebuwama witharak meka load wenna ona e nisaii header link ekata id dunne ntm mulinma load unoth arraya nisa data na
        console.log("main method");

        loadComboBoxes(customers, '#orderCusId'); // meken method ekata array ekai cmb id ekai yawanoo
        loadComboBoxes(items, '#O-itemID');
    });


    function loadCusData(cusId) {

        console.log("loaded the loadCusData");
        for (var i = 0; i < customers.length; i++) {
            if (cusId === customers[i].id) {
                console.log("cusName", customers[i].Name)
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
            console.log("itemNsame", items[i].Name)
            $('#O-itemName').val(items[i].Name);
            $('#O-itemPrice').val(items[i].price);
            $('#O-itemQty').val(items[i].qty);
        }
    }


}

$('#O-itemID').change(function () {
    console.log("clicke cmb");
    var itemId = $(this).val();
    console.log("cusId:", itemId);
    loadItemData(itemId);
});

/*==============================save to the cart=======================*/


$("#btnAddItem").on('click', () => {
    var OrderItemId = $('#O-itemID').val();
    var OrderItemName = $('#O-itemName').val();
    var OrderItemPrice = $('#O-itemPrice').val();
    var OrderQty = $('#O-orderQty').val();

    var total=OrderQty*OrderItemPrice;
    console.log("total:"+total);

    // Create an object to store item data
    const orderItem = {
        id: OrderItemId,
        name: OrderItemName,
        qty: OrderQty,
        price: OrderItemPrice,
        total:total
    };

    // Push the object to the itemCart array

    itemCart.push(orderItem);

    updateItemQty();

    console.log(itemCart);

})


function updateItemQty() {

    var OrderItemId = $('#O-itemID').val();

    for (var i = 0; i < items.length; i++) {
        if (OrderItemId === items[i].id) {
            var currentItemQty = items[i].qty;
            console.log("currentItemQty : "+currentItemQty);
            var OrderQty = $('#O-orderQty').val();
            console.log("currentOrderQty : "+OrderQty);
            var updatedQty = currentItemQty - OrderQty;
            console.log("updateQty : "+updatedQty);

            items[i].qty = updatedQty;
            console.log(" items[i].qty"+ items[i].qty);
        }

    }
}


/*===========================load into the table==================*/



