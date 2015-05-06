$( document ).ready( function(){

    var json = {};
    $.getJSON( "stateInfoList.json", function( data ) {
//      console.log ( data );//whole JSON object

        $( "#productOptions" ).change( function( e ) {
            var selected = $("#productOptions option:selected").text();  //$spans.eq( 3 ).text( jQuery.inArray( "Pete", arr, 2 ) );
//            console.log( "user selected " + selected );
//            console.log( typeof selected );//string

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

                        if( Object.prototype.toString.call( productTypes ) === "[object Array]" ) {//test to make sure it is a true array, not array-like object
    //                        console.log ( "Array" );
                        }

                        productTypes.every( function( entry ) { //every returns same as forEach from what I've tested so far. The every method executes the provided callback function once for each element present in the array until it finds one where callback returns a falsy value (a value that becomes false when converted to a Boolean). If such an element is found, the every method immediately returns false.
    //                        console.log( entry );//entry is the element(s) from array
    //                        console.log ( typeof entry );//string
    //                        console.log ( selected );//my var, option the user selected
    //                        console.log ( typeof selected );//string

                            if (selected.indexOf( entry ) == -1 ) {//returns either the index/number of the start point for the string or a -1 meaning it isn’t there.
    //                            console.log( "element doesn't exist" );
                            }

                            else{
    //                            console.log( "element found" );

//                            console.log ( key );
                                var productKey = ( key );
                                console.log ( "productKey " + productKey );//a productKey means that state shape(s) should light up. Now, find g el with ID that matches productKey

                                $( "#g" ).attr( "class", "selectedClass" ).siblings( "g" ).removeAttr( "class","selectedClass" ); //remove styling from the unselected svg shapes

                            }



                        });
                });




            });


        });
    });
});

//Removed from lines 45 and 46 because superfluous after test completed
//          var found = ( selected.indexOf( entry )!==-1 );
//                    console.log ( "true - element" + selected + "found" );//true for KY when tested for ARA, for example

//Removed from under var productKey block
//                                if ( productKey = $("g")){//what, are we iterating through an array of g elements? no.
//                                    $("svg")[0].find("g");//Uncaught TypeError: $(...)[0].find is not a function
//                                    console.log ( "productKey corresponds with this SVG g id: " + $("g") );//when this last val was (this.id), returned productKey corresponds with this SVG g id: [object SVGGElement]
//                                                                                                          when $("g"), returned productKey corresponds with this SVG g id: [object Object]
//                                }
//                                    $( "g" ).css({
//                                    ...
//                                    });

                                    //learning: g is the event object receiving the event handler action

//                                    if ( productKey = ( "#g" )){
//                                        console.log ( productKey + " equals or corresponds with this g id " + ( "#g" ) );
//                                    }
//                                console.log ( " #svg " );
//                                var myDomElement = document.getElementById( " svg " ); // A plain DOM element.
//
//                                $( myDomElement ).find( "g" );



