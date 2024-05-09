import {items} from "../db/db.js";
import {customers} from "../db/db.js";

/*
function loadComboBoxes(array, comboBoxId) {

    console.log("combo -box loaded" , array,comboBoxId);
    var comboBox = $('#' + comboBoxId); // Get the combo box by ID

    // Clear existing options
    comboBox.empty();

    // Iterate through the array and add options
    $.each(array, function(index, value) {
        comboBox.append($('<option>', {
            value: value,
            text: value
        }));
    });
}
*/




/*------------------------------------------*/

function loadComboBoxes(array, comboBoxId) {
    console.log("combo-box loaded", array, comboBoxId);
    var comboBox = $('#' + comboBoxId); //uda ena comboxId eka tama meken ganne

//clearing the combo 2
    comboBox.empty();

    //udata ena arrya ek aganata iterate krnoo
    for (var i = 0; i < array.length; i++) {
        // array eke current index eke id eka ganno
        var id = array[i].id;
        // Append option to combo box
        comboBox.append($('<option>', {
            value: id,
            text: id
        }));
    }
}

/*===================*/

$('#placeOrder-link').click(function() {  //place order link eka ebuwama witharak meka load wenna ona e nisaii header link ekata id dunne ntm mulinma load unoth arraya nisa data na
    console.log("main method");

    loadComboBoxes(customers, 'orderCusId'); // meken method ekata array ekai cmb id ekai yawanoo
    loadComboBoxes(items, 'O-itemID');
});






