$('#customer').css({display:'block'});
$('#item').css({display:'none'});


//student click
$('#cus-link').on('click',()=>{
    console.log("student click")

    $('#customer').css({display:'block'});
    $('#item').css({display:'none'});

});

//course click
$('#item-link').on('click',()=>{
    console.log("course click")

    $('#customer').css({display:'none'});
    $('#item').css({display:'block'});
});