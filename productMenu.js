$( document ).ready( function(){

    var json = {};
    $.getJSON( "stateInfoList.json", function( data ) {
      console.log ( data );//whole JSON object

        $('#productOptions').change(function() {
            var selected = $("#productOptions option:selected").text();
            console.log( "user selected " + selected );

//            $( this ).attr( "class", "selectedProduct" ).siblings( "g" ).removeAttr( "class","selectedProduct" ); //styling the selected svg shapes

        });
    });
});

//alert(selected);

//console.log( "user selected " + this.id );//returned productOptions
//console.log( "user selected " + this.val ); //returned undefined
//console.log( "user selected " + this ); //returned [object HTMLSelectElement]