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
                                console.log ( "productKey " + productKey );//a productKey means that state shape(s) should light up.

                                //find the one g el with ID attr that matches this one productKey. The id attribute specifies a unique id for an HTML element.
//                                console.log ( event.target );//returns that productOptions (the id of the dropdown menu) is the event target. can this refer to more than one delegated target? ie, the multiple state shapes?
//                                productKey = ( this.id );//returns g for Idaho

//                                event delegation. use event.target instead of this, or use a jQ delegation method that maps ~delegated~ event.target to this//
//                                .delegate - works best on pre-existing DOM els that you wrap in a jQ wrapper. works best when called in the head instead of document ready (but that mixes design w logic!)
//                                .delegate looks for all matching descendents. .on works like .bind and .delegate.

//                                console.log ($("#g"));//returned [context: document, selector: "#g", jquery: "1.11.0", constructor: function, toArray: function…]
//                                console.log ($("g"));//returned [g#Header, g#ok, g#ga, g#va, g#ny, g#fl, g#nm, g#md, g#tx, g#ks, g#ne, g#sd, g#nd, g#mt, g#wy, g#co, g#ut, g#id, g#az, g#nv, g#wa, g#ca, g#or, g#ky, g#me, g#pa, g#mi, g#ma, g#ri, g#ct, g#wv, g#oh, g#in, g#il, g#nc, g#tn, g#sc, g#al, g#ms, g#ar, g#la, g#mo, g#ia, g#mn, g#wi, g#nj, g#vt, g#nh, g#de, g#dc, g#hi, g#ak, prevObject: n.fn.init[1], context: document, selector: "g", jquery: "1.11.0", constructor: function…]
//                                console.log( $("g").attr("id"));//returned header. THIS IS PROMISING so work with attr. //get attr syntax and log it

                                $( "g" )
                                  .filter( function( index ) {
                                    return $( this ).attr( "id" ) == productKey;//Within the filter function, this refers to each DOM element in turn.
                                  })
//                                        .css( "fill-opacity", "0.1" );//SUCCESS
//                                        .css.siblings( "fill-opacity", "1.0" );//How to remove .css when productKey ids change?
//
//                                        $( this ).attr( "class", "selectedClass" )
//                                        $( this ).attr( "class", "selectedClass" ).siblings( "g" ).removeAttr( "class","selectedClass" );

//                                        .addClass( "selectedClass" );//didn't do anything
//                                        $( this ).addClass( "selectedClass" );//returns array of all g's like below. attributes of g#ga: NamedNodeMap
//                                        $( "g" ).addClass( "selectedClass" );
//                                        $( "g" ).attr( "class", "selectedClass" ).siblings( "g" ).removeAttr( "class","selectedClass" ); //remove styling from the unselected svg shapes


//                                console.log( $( "g" ).get( 0 ) );//THIS IS PROMISING. DEF LOOP THROUGH, SET CONDITION FOR MATCH, RETURN MATCHED INDEX OR ID. returned the header g, the first in the set of g elements
//                                console.log( $( "g" ).match( productKey ) );//returned Uncaught TypeError: $(...).match is not a function

//                                $( this ).attr( "class", "selectedClass" );//does this add the selectedClass to all g els? [g#Header, g#ok, g#ga, g#va, g#ny, g#fl, g#nm, g#md, g#tx, g#ks, g#ne, g#sd, g#nd, g#mt, g#wy, g#co, g#ut, g#id, g#az, g#nv, g#wa, g#ca, g#or, g#ky, g#me, g#pa, g#mi, g#ma, g#ri, g#ct, g#wv, g#oh, g#in, g#il, g#nc, g#tn, g#sc, g#al, g#ms, g#ar, g#la, g#mo, g#ia, g#mn, g#wi, g#nj, g#vt, g#nh, g#de, g#dc, g#hi, g#ak]
//                                console.log($("#g").attr("id"));//returned undefined
//                                console.log($("#svg.g").attr("id"));//returned undefined
//                                console.log($("#svg").attr("id"));//returned undefined

//                                $("g").attr("id",function(){
//                                    return g.id;
//                                });


//                                forEach loop could be right approach bc jQuery selector $ returns a collection/array that can be iterated through

//                                $.each($("g").attr("id")){
//                                  var $thejQgArray = $("#g");//the $ means find something. this line puts g els into a collection/array of DOM els. cache.
//                                  try to use .filter on the above cache selector. don't use find bc find looks for descendents.
//                                console.log ( $thejQgArray );//returned [context: document, selector: "#g", jquery: "1.11.0", constructor: function, toArray: function…]
//
//                                $.each($("g").attr("id"){
//                                    if ($("g").attr("id") == "productKey") {
//                                        console.log( $("g").attr("id") );
//                                    }
//                                });

//                                for (var i in $thejQgArray) {
//                                    $("#" + $thejQgArray[i]).filter(function() { //.filter?
//                                      for (var j in $thejQgArray ) {
//                                        if ( productKey = $thejQgArray[j] ) {//Uncaught Error: Syntax error, unrecognized expression: #[object SVGGElement]
//                                        console.log( $("g").attr("id") );
//                                        }
//                                      }
//                                    });
//                                }


//                                $thejQgArray.forEach( $thejQgArray, (getElementById) {
//                                    alert ("hi, .forEach get el by id here");
//                                });


//                                $thejQgArray.forEach( function()){
//
//                                    if ( $( "g" ).attr( "id" ) == ( productKey ) ) {
//                                        console.log ( "g's id equals productKey" );//returned nothing
//                                        $( "g" ).addClass( "selectedClass" );
//                                    }


                            }


                        });

                });




            });


        });
    });
});

//this block is a wild shot in the dark
//if ($("#g" + val[productKey]).val().match())
//                                if ($("#" + val["htmlId"]).val().match(/^3\d{9}/|/\d{7}/)))
//                                            match = true;

//if $('svg')[0].attr('id')== productKey ){//returned unexpected identifier

//Removed from lines 45 and 46 because superfluous after test completed
//          var found = ( selected.indexOf( entry )!==-1 );
//                    console.log ( "true - element" + selected + "found" );//true for KY when tested for ARA, for example

//Removed from under var productKey block
//                                if ( productKey = $("g")){//what, are we iterating through an array of g elements? no, but we could make it a jQuery collection and iterate through that.
//                                    $("svg")[0].find("g");//Uncaught TypeError: $(...)[0].find is not a function
//                                    console.log ( "productKey corresponds with this SVG g id: " + $("g") );//when this last val was (this.id), returned productKey corresponds with this SVG g id: [object SVGGElement]
//                                                                                                          when $("g"), returned productKey corresponds with this SVG g id: [object Object]
//                                }
//                                    $( "g" ).css({
//                                    ...
//                                    });

//                              learning: g is the event object receiving the event handler action
//                              if ( productKey == ( "#g" )){
//                                  console.log ( productKey + " equals or corresponds with this g id " + ( "#g" ) );
//                              }

//                              console.log ( " #svg " );
//                              var myDomElement = document.getElementById( " svg " ); // A plain DOM element.
//
//                              $( myDomElement ).find( "g" );//.find gets the children

//                              this block another wild shot in the dark
//                              for(i=0;i<x.length;i++){
//                                att=x.item(i).attributes.getNamedItem("id");
//                                document.write(att.value + "<br>");
//                              }



