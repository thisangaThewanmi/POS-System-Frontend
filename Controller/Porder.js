$(document).ready(function(){
    console.log("order eka load wunooo");

    loadItemComboBoxes();
    loadCusComboBoxes();
    loadCurrentDate();

});

$('#btnPlaceOrder').on('click', () => {
    console.log("place order btn eka ebuwa")
});

$("#btnAddItem").on('click', () => {
    console.log("btn Add Item Clicked")
});


/*------------- load combo boxes -------------------*/

function loadItemComboBoxes(){
    console.log("loadItemCMB");

    $.ajax({
        url:"http://localhost:8080/item",
        type: "GET",
        dataType: "json",

        success: function (results) {
            console.log(results);


            // Clear the existing items in the dropdown or list
            $('#O-itemID').empty();

            // Loop through the results to get all item IDs
            results.forEach(function(item) {


                // Assuming each item has a property named 'itemID'
                const itemID = item.id;

                // Add each itemID to the dropdown or list
                $('#O-itemID').append(`<option value="${itemID}">${itemID}</option>`);
            });


        }
    });
}

/*--------------------------------------------------*/



/*---------------  load Customer ComboBox ------------*/
function loadCusComboBoxes(){
    console.log("loadCusCMB");

    $.ajax({
        url:"http://localhost:8080/customer",
        type: "GET",
        dataType: "json",

        success: function (results) {
            console.log(results);


            // Clear the existing items in the dropdown or list
            $('#orderCusId').empty();

            // Loop through the results to get all item IDs
            results.forEach(function(customer) {


                // Assuming each customer has a property named 'id'
                const cusID = customer.id;

                // Add each itemID to the dropdown or list
                $('#orderCusId').append(`<option value="${cusID}">${cusID}</option>`);
            });


        }
    });
}
/*---------------------------------------------------*/




/*---------------- load current date -----------------*/
function loadCurrentDate() {
    // Create a new Date object representing the current date and time
    const today = new Date();

    // Extract the year, month, and day from the Date object
    const year = today.getFullYear(); // Get the full year (e.g., 2024)
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (0-11), add 1, and pad with a leading zero if necessary
    const day = String(today.getDate()).padStart(2, '0'); // Get the day of the month and pad with a leading zero if necessary

    // Format the date as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    // Display the formatted date (for example, in an input field with ID "dateInput")
    $('#orderDate').val(formattedDate);
}

/*----------------------------------------------------*/


/*--------------- load the Item Data ------------*/

$('#O-itemID').change(function () {
    console.log("clicke cmb");
    var itemId = $(this).val();
    console.log("itemId:", itemId);
    loadItemData(itemId);
});

function loadItemData(itemId){

    $.ajax({
        url:"http://localhost:8080/item",
        type: "GET",
        dataType: "json",

        success: function (results) {
            console.log(results);

            // Loop through the results to get all item IDs
            results.forEach(function(item) {
                if((item.id)==itemId){
                    var itemName = item.name;
                    var itemQty=item.qty;
                    var itemPrice = item.price;


                    console.log("itemName:"+ itemName,"itemQty"+itemQty,"itemPrice"+itemPrice);

                    $('#O-itemName').val(itemName);
                    $('#O-itemPrice').val(itemPrice);
                    $('#O-itemQty').val(itemQty);


                }
            });


        }
    });

}
/*----------------------------------------------------*/


/*--------------- load the Cus Data ------------*/

$('#orderCusId').change(function () {
    console.log("clicke cmb");
    var cusId = $(this).val();
    console.log("cusId:", cusId);
    loadCusData(cusId);
});

function loadCusData(cusId){

    $.ajax({
        url:"http://localhost:8080/customer",
        type: "GET",
        dataType: "json",

        success: function (results) {
            console.log(results);

            // Loop through the results to get all item IDs
            results.forEach(function(customer) {
                if((customer.id)==cusId){
                    var cusName = customer.id;
                    var cusAddress=customer.name;
                    var cusPhone = customer.phone;


                    console.log("cusName:"+ cusName,"cusAddress"+cusAddress,"cusPhone"+cusPhone);

                    $('#orderCusName').val(cusName);
                    $('#orderCusAddress').val(cusAddress);
                    $('#orderCusContact').val(cusPhone);


                }
            });


        }
    });

}
/*----------------------------------------------------*/