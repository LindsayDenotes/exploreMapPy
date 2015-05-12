$( document ).ready( function(){

    var json = {};
    $.getJSON( "stateInfoList.json", function( data ) {
//      console.log ( data );//whole JSON object

        $( "#productOptions" ).change( function( e ) {//.on can only bind to one function and .on is used on clicked g already. use .bind to bind ~?an el~? to multiple functions. Can .change do multiple events? it better or replace it.
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

                        if( Object.prototype.toString.call( productTypes ) === "[object Array]" ) {//test to make sure it is a true array, not array-like object. a prototype function.
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

                            else {
    //                            console.log( "element found" );
//                            console.log ( key );
                            var productKey = ( key );
                                console.log ( "productKey " + productKey );//presence of a productKey means that corresponding state shapes (#g's) should get styled.

                                $( "g" ).filter( function( index ) {
                                    if ( $( this ).attr( "id" ) == productKey ){//Within the filter function, this refers to each DOM element in turn.
//                                        console.log ( this.id );//GOOD. returned or mn etc, ie, the states that have that product type user selected in the dropdown
//                                        console.log ( this );//returned <g id="mo">...</g> for each of the matching states. I think this creates new DOM elements.
                                        return ( this.id );//running slowly. I think each object has own function. constructor method of object creation inefficient.
                                    }
                                    else {
                                    .css( "fill-opacity", "1.0");
                                    }
                                 })
                                    .css( "fill-opacity", "0.1" );//SUCCESS

//                                    $(this.id).addClass(“selectedClass”);//temporary success
//                                    $(this.id).removeClass(“selectedClass”);//How to remove .css when productKey ids change?

//                                    $( "g" ).addClass( "selectedClass" );did not add class to mo
//                                    $(" g ").attr( "class", "selectedClass");
//                                    $( "g" ).attr( "class", "selectedClass" ).siblings( "g" ).removeAttr( "class","selectedClass" );

//                                    .addClass( "selectedClass" );//didn't do anything
//                                    $( this ).addClass( "selectedClass" );//returns array of all g's like below. attributes of g#ga: NamedNodeMap
//                                    $( "g" ).addClass( "selectedClass" );
//                                    $( "g" ).attr( "class", "selectedClass" ).siblings( "g" ).removeAttr( "class","selectedClass" ); //remove styling from the unselected svg shapes


//                                console.log( $( "g" ).get( 0 ) );//THIS IS PROMISING. DEF LOOP THROUGH, SET CONDITION FOR MATCH, RETURN MATCHED INDEX OR ID. returned the header g, the first in the set of g elements
//                                console.log( $( "g" ).match( productKey ) );//returned Uncaught TypeError: $(...).match is not a function

//                                $( this ).attr( "class", "selectedClass" );//does this add the selectedClass to all g els? [g#Header, g#ok, g#ga, g#va, g#ny, g#fl, g#nm, g#md, g#tx, g#ks, g#ne, g#sd, g#nd, g#mt, g#wy, g#co, g#ut, g#id, g#az, g#nv, g#wa, g#ca, g#or, g#ky, g#me, g#pa, g#mi, g#ma, g#ri, g#ct, g#wv, g#oh, g#in, g#il, g#nc, g#tn, g#sc, g#al, g#ms, g#ar, g#la, g#mo, g#ia, g#mn, g#wi, g#nj, g#vt, g#nh, g#de, g#dc, g#hi, g#ak]
//                                console.log($("#g").attr("id"));//returned undefined
//                                console.log($("#svg.g").attr("id"));//returned undefined
//                                console.log($("#svg").attr("id"));//returned undefined

//                                $("g").attr("id",function(){
//                                    return g.id;
                            }

                        });
                });
            });

            //can i set second function for .change here?
//            $( "g" ).css( "fill-opacity", "0.1" );//changed all states to .01 opacity
            var styling = $("#g").addClass("selectedClass");//temporary success. not sure why it stopped working.

        })

//        .trigger( "change ");//this allows me to unindent the .css( "fill-opacity", "0.1" ); line
    });
});

