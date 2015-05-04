$( document ).ready( function(){

    var json = {};
    $.getJSON( "stateInfoList.json", function( data ) {
//      console.log ( data );//whole JSON object

        $('#productOptions').change(function() {
            var selected = $("#productOptions option:selected").text();  //$spans.eq( 3 ).text( jQuery.inArray( "Pete", arr, 2 ) );
//            console.log( "user selected " + selected );
//            console.log( typeof selected );//string

//          $( this ).attr( "class", "selectedProduct" ).siblings( "g" ).removeAttr( "class","selectedProduct" ); //styling the selected svg shapes

            $.each ( data, function( key, val ){
                console.log ( key, val.contacts );//key is "nh" or "fl", val is whats inside json's { }s

//                var jsonKey = ( key );
//                console.log ( "this is a state key: " + jsonKey );

                var contacts = [];
                contacts = ( val.contacts );
//                console.log ( "Referenced by val.contacts, contacts are " + contacts );//returns contacts are [object object]. So crack into those with a forEach loop


                contacts.forEach( function( obj ){// The forEach() method executes a provided function once per array element.

                    var productTypes = [];
                    productTypes = ( obj.productTypes );
//                    console.log( productTypes );//an array of strings. How to iterate over each item and make object out of match? BTW, for Array objects, the toString method joins the array and returns one string containing each array element separated by commas.
//                    console.log( typeof productTypes );//object

                    if( Object.prototype.toString.call( productTypes ) === '[object Array]' ) {
//                        console.log ( "Array" );
                    }

                    productTypes.every( function( entry ) { //every returns same as forEach
//                        console.log( entry );//the element from array
//                        console.log ( typeof entry );//string
//                        console.log ( selected );//option the user selected
//                        console.log ( typeof selected );//string

                        if (selected.indexOf( entry ) == -1 ) {//returns either the index/number of the start point for the string or a -1 meaning it isn’t there.
//                            console.log( "element doesn't exist" );
                        }
                        else {
//                            console.log( "element found" );
                            var found = ( selected.indexOf( entry )!==-1 );
                            console.log ( found );//true for KY when tested for ARA, for example

                            console.log ( key );
                            var productKey = ( key );
                            console.log ( productKey );
                        }
                    });
                });

            });
        });
    });
});
