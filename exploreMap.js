$( document ).ready( function(){

    var json = {};
    $.getJSON( "stateInfoList.json", function( data ) {
      console.log ( data );//whole JSON object

        $( "g" ).on( "click", function (e) {
          console.log( "user clicked " + this.id );

          //gets the class attribute and checks for existing classes. Function courtesy of Rebecca.
          $(this).attr("class", function(index, classNames) {
              // if there are existing classes
             if (typeof classNames != "undefined") {
                 // return the existing classes and just add the clicked class to them
                 return classNames + " clicked";
                 // gets the class attribute and checks for existing classes on the "g" element
                 $(this).siblings("g").attr("class", function(index, classNames) {
                     // if there are existing classes
                    if (typeof classNames != "undefined") {
                        // return the existing classes and just remove the clicked class
                        return classNames.replace("clicked", "");
                    } else {
                        // otherwise, remove the class attribute altogether
                        $(this).siblings("g").removeAttr("class", "clicked");
                    }
                 });
             } else {
                 // if there aren't any existing classes, add the class clicked outright to the selected g element and remove the class from its siblings
                $(this).attr("class", "clicked").siblings("g").removeAttr("class","clicked");
             }
          });

          //$( this ).attr( "class", "clicked" ).siblings( "g" ).removeAttr( "class","clicked" ); //remove styling from un-clicked svg shapes

          selectedState = ( this.id );
          console.log( "so var selectedState is " + selectedState );


          $.each ( data, function( key, val ){
                console.log ( key, val );//key is "nh" or "fl", val is whats inside json's { }s

                var jsonKey = ( key );
                console.log ( "this is a state key: " + jsonKey );

                if ( jsonKey == selectedState ){
                      console.log( "selectedState ID " + selectedState + " MATCHES key: " + jsonKey + ". Return that val." );

                      var contacts = [];
                      contacts = ( val.contacts );
                      console.log ( "Referenced by val.contacts, contacts are " + contacts );

                      var theText = "<dl class ='agency " + key + "'>" + val.agency + "</dl>";

                        contacts.forEach( function( obj ){

                            var productTypes = [];
                            productTypes = ( obj.productTypes );
                            console.log( productTypes );//has quotes and brackets on console

                            var productTypesText = " ";
                            productTypesText += productTypes;
                            productTypesText = productTypesText.replace(/,/g , "<br/>" );// g stands for global, replace all matches, and not just the first one. makes it a regular expression
                            console.log( productTypesText );//does not have quotes and brackets on console

                            var firstLast = ( obj.firstLast );
                            console.log( firstLast );//empty string for 5 states

                            if ( firstLast !== " " ){

                            var title = ( obj.title );
                            console.log ( title );//empty string for 5 states

                            var phone = ( obj.phone );
                            console.log ( phone );//empty string for 5 states

                            var email = ( obj.email );
                            console.log ( email );//empty string for 5 states


                            theText += "<dt class='contacts'>" + firstLast + ", " + title + ", " + phone + ", " + email + "</dt>";
                            theText += "<dd class='productTypes'>" + productTypesText + "</dd>";
                            }

                            else{

                            var theMessage = ( obj.productTypes );
                                console.log( theMessage );
                            theText += "<dt class='contacts'>" + theMessage + "</dt>";// yes, I want the message that I wrote into the productTypes cell to be displayed in the contacts class.
                            }

                        });

                      $( "#txtDOT" ).html(theText);
                }

                else {
                //console.log( "selectedState ID " + selectedState + " does NOT match key: " + jsonKey + " , so don't return that val." )
                }

          });

        });


        $( "#productOptions" ).change( function( e ) {//.on can only bind to one function. .on is used for click event already. use .bind to bind ~?an el~? to multiple functions.

                    $('.selectedClass').attr('class','');// 5/13/15 Rebecca discovered that removing a class from SVGs works with empty quotes in arguments. But how to keep the selectedClass (chosen from drop down menu) on their appropriate SVG els despite that user clicked on any state, calling the clicked class.




                    var selected = $("#productOptions option:selected").text();
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
        //                      console.log( productTypes );//an array of strings. For Array objects, the toString method joins the array and returns one string containing each array element separated by commas.
        //                      console.log( typeof productTypes );//object

                                if( Object.prototype.toString.call( productTypes ) === "[object Array]" ) {//test to make sure it is a true array, not array-like object. a prototype function.
        //                          console.log ( "Array" );
                                }

        //                      Iterate over each item and make object out of match
                                productTypes.every( function( entry ) { // .every returns same as .forEach from what I've tested so far. The every method executes the provided callback function once for each element present in the array until it finds one where callback returns a falsy value (a value that becomes false when converted to a Boolean). If such an element is found, the every method immediately returns false.
        //                          console.log( entry );//entry is the element(s) from array
        //                          console.log ( typeof entry );//string
        //                          console.log ( selected );//my var, option the user selected from drop down menu
        //                          console.log ( typeof selected );//string

                                    if (selected.indexOf( entry ) == -1 ) {//returns either the index/number of the start point for the string or a -1 meaning it isn’t there.
        //                              console.log( "element doesn't exist" );
                                    }

                                    else {
        //                              console.log( "element found" );

                                    var productKey = ( key );
                                        console.log ( "productKey " + productKey );//presence of a productKey means that corresponding state shapes (#g's) should get styled.

                                    var $productStates =  $( "g" )//the $ in the var name indicates the var contains jQuery object(s) or is a jQuery collection

                                          .filter( function( index ) {
                                            if ( $( this ).attr( "id" ) == productKey ){//Within the filter function, this refers to each DOM element in turn.
                                                console.log ( this.id );//GOOD. returned or mn etc, ie, the states that have that product type user selected in the dropdown
                                                return ( this.id );//running slowly. I think each object has own function. constructor method of object creation inefficient.
                                            }
                                          })
                                            console.log ($productStates);
        //                                    console.log ( typeof $productStates );//object; i.e., a jQuery collection of matched elements

                                                // 5/13/15 In block below, I struggled to add and remove classes to the SVG g elements as the two classes are affecting each other. Also, SVG has finicky styling rules in which empty quotes may be needed to remove a class (see line 84).
                                                // I have yet to figure out how to make this web app work so that when the user clicks on a state, the selectedClass doesn't go away; i.e., those white states remain white until the user chooses a new product type from the drop down menu.

        //                                        $productStates.css( "fill-opacity", "0.1" );//SUCCESS, but how to remove styling from unselected g's?
        //                                        $productStates = $productStates.attr("class","selectedClass");//class appears on tag but not actually styled with opacity change
        //                                        $productStates = $productStates.attr("class","selectedClass").siblings( "g" ).removeAttr( "class","selectedClass" );//class appears but quickly removes itself
                                                $productStates.attr("class","selectedClass");//.siblings( "g" ).removeAttr( "class","selectedClass" );//class appears on tag but not actually styled with opacity change
                                                //for line above, I indented one more tab in from where it was and now selectedClass is again appearing on tags but not actually styling the g's.
        //                                    $productStates = $productStates.addClass( "selectedClass" );//nothing. earlier today, style=("fill-opacity","0.1") got tacked onto appropriate g tags
        //                                    $productStates.addClass("selectedClass").siblings("g").removeClass("selectedClass");//Rebecca suggested on 5/13/15
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

                /*
                  if firstLast not in contacts:
                          if(firstLast.hasOwnProperty('obj.firstLast')) { ... } // will run
                          if(firstLast.hasOwnProperty('toString')) { ... } // will not run

                $( "#txtDOT" ).append( "<p id='productTypes'>" + productTypes + "</p>" );
                     $( "#txtDOT" ).append( "<p id ='firstLast'>" + firstLast + "</p>" );

                jQuery Selector $() function w optional 2nd parameter to do a search within an event handler
                $("g").on("click", function (e) {//Using e is just a short for event. You can pass any variable name you desire.
                     var $e = $(e.target);//target is #something
                     clicked.css("background", "red");
                });
                */

