$( document ).ready( function(){

    var json = {};
    $.getJSON( "stateInfoList.json", function( data ) {
//      console.log ( data );//whole JSON object

        $( "#productOptions" ).change( function( e ) {//.on can only bind to one function and .on is used on clicked g already. use .bind to bind ~?an el~? to multiple functions. Can .change do multiple events? it better or replace it.
            // look for elements with .selectedClass and check for other existing classes
        	$(".selectedClass").attr("class", function(index, classNames) {
        	    // if the element does have other existing classes
				if (typeof classNames != "undefined") {
				    // return the list of classnames and just remove the .selectedClass
					return classNames.replace("selectedClass", "");
				} else {
				    // otherwise, remove the class
					$(".selectedClass").attr("class", "");
				}
			});
            
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
//                      console.log( productTypes );//an array of strings. How to iterate over each item and make object out of match? BTW, for Array objects, the toString method joins the array and returns one string containing each array element separated by commas.
//                      console.log( typeof productTypes );//object

                        if( Object.prototype.toString.call( productTypes ) === "[object Array]" ) {//test to make sure it is a true array, not array-like object. a prototype function.
//                          console.log ( "Array" );
                        }


                        productTypes.every( function( entry ) { //every returns same as forEach from what I've tested so far. The every method executes the provided callback function once for each element present in the array until it finds one where callback returns a falsy value (a value that becomes false when converted to a Boolean). If such an element is found, the every method immediately returns false.
//                          console.log( entry );//entry is the element(s) from array
//                          console.log ( typeof entry );//string
//                          console.log ( selected );//my var, option the user selected
//                          console.log ( typeof selected );//string

                            if (selected.indexOf( entry ) == -1 ) {//returns either the index/number of the start point for the string or a -1 meaning it isn’t there.
//                              console.log( "element doesn't exist" );
                            }

                            else {
//                              console.log( "element found" );

                            var productKey = ( key );
                                console.log ( "productKey " + productKey );//presence of a productKey means that corresponding state shapes (#g's) should get styled.

                            var $productStates =  $( "g" )

                                  .filter( function( index ) {
                                    if ( $( this ).attr( "id" ) == productKey ){//Within the filter function, this refers to each DOM element in turn.
                                        console.log ( this.id );//GOOD. returned or mn etc, ie, the states that have that product type user selected in the dropdown
                                        return ( this.id );//running slowly. I think each object has own function. constructor method of object creation inefficient.
                                    }
                                  })
                                    console.log ($productStates);

//                                        $productStates.css( "fill-opacity", "0.1" );//SUCCESS, but how to remove styling from unselected g's?
//                                        $productStates = $productStates.attr("class","selectedClass");//class appears on tag but not actually styled with opacity change
//                                        $productStates = $productStates.attr("class","selectedClass").siblings( "g" ).removeAttr( "class","selectedClass" );//class appears but quickly removes itself
                                       
                                       // check $productStates for existing classes
                                       	$productStates.attr('class', function(index, classNames) {
                                       	    // if there are existing classes
											if (typeof classNames != 'undefined') {
											    // return the existing classes and add selectedClass to the end of the list
												return classNames + ' selectedClass';
											} else {
											    // otherwise, just add selectedClass
												$productStates.attr('class', 'selectedClass');	
											}
										});
                                       
                                       // $productStates.attr("class","selectedClass");//.siblings( "g" ).removeAttr( "class","selectedClass" );//class appears on tag but not actually styled with opacity change
                                        //for line above, I indented one more tab in from where it was and now selectedClass is again appearing on tags but not actually styling the g's.
//                                        $productStates = $productStates.addClass( "selectedClass" );//nothing. earlier today, style=("fill-opacity","0.1") got tacked onto appropriate g tags


//                                    $productStates = $productStates.toggleClass( "selectedClass" );//does nothing
//                                    $productStates.toggleClass( "selectedClass" );//does nothing
//                                    $productStates = $productStates.attr( "class", "selectedClass" ).siblings( "g" ).removeAttr( "class","selectedClass" );//does nothing

                            }

                        });
                });
            });

        })

    });
});

