$( document ).ready( function(){

    var json = {};
    $.getJSON( "stateInfoList.json", function( data ) {
      console.log ( data );//whole JSON object

        $('#productOptions').change(function() {
            var val = $("#productOptions option:selected").text();
            alert(val);
        });


    });

});