/*problems with this version: Use as template. Copy, cut, and paste from discardClicked1stInBothHandlerFuncs6-15-15 and clkRemainsAsStatesWiSelectedAreClked_5-24-15NotPushed.js
clicked overwriting selected even when user clicked a shape within the selected group
selected states won't light up unless a click has occurred first
selected class failing to overwrite clicked that isn't part of the selected group
selected class instances are remaining when user selects new product types
selected class instances are bubbling on state els
*/

$( document ).ready( function(){
    var json = {};
      $.getJSON( "stateInfoList.json", function( data ) {
//        console.log ( data );//whole JSON object loads on document ready
        $("g").on( "click", function ( e ) {//when user clicks on a state - text functionality, then attr functionality further below

            clickedState = ( this.id );
//          console.log( "so var clickedState is " + clickedState );

            //PARSE DATA
            $.each ( data, function( key, val ){
//                console.log ( key, val );//key is "nh" or "fl", val is whats inside json's { }s

                var jsonKey = ( key );
//                console.log ( "this is a state key: " + jsonKey );

                if ( jsonKey == clickedState ){
//                      console.log( "clickedState ID " + clickedState + " MATCHES key: " + jsonKey + ". Return that val." );

                      //CONCATENATE JSON KEY AND OBJECT WITH HTML TO POPULATE TEXT BOX
                      var theText = "<dl class ='agency " + key + "'>" + val.agency + "</dl>";//<dl> tag defines a description list in HTML5

                      //DRILL DOWN INTO JSON
                      var contacts = [];
                      contacts = ( val.contacts );
//                      console.log ( "Referenced by val.contacts, contacts are " + contacts );
//                      console.log ( typeof ( val.contacts ) );//logged object

                        contacts.forEach( function( obj ){
                            var productTypes = [];
                            productsTypes = ( obj.productTypes );//make the array into an object
//                                console.log( productTypes );//an array of strings. For Array objects, the toString method joins the array and returns one string containing each array element separated by commas.
//                                console.log( typeof productTypes );//logged object

                            //CREATE TEXT OBJECTS
                            var productTypesText = " ";//is string
                            productTypesText += productTypes;//the addition assignment operator adds the value of the right operand to a variable and assigns the result to the variable.
                            productTypesText = productTypesText.replace( /,/g , "<br/>" );//g stands for global, replace all matches, not just the first one. makes it a regular expression
                            console.log( productTypesText );
//                            console.log ( typeof productTypesText );//logged string

                            var firstLast = ( obj.firstLast );
                            console.log( firstLast );//empty string for 5 non-participating states

                            if ( firstLast !== " " ){//if firstLast obj is not an empty string, then...

                                var title = ( obj.title );
                                console.log ( title );//empty string for 5 non-participating states

                                var phone = ( obj.phone );
                                console.log ( phone );//empty string for 5 non-participating states

                                var email = ( obj.email );
                                console.log ( email );//empty string for 5 non-participating states

                                //CONCATENATE TEXT OBJECTS WITH HTML - FINISH
                                theText += "<dt class='contacts'>" + firstLast + ", " + title + ", " + phone + ", " + email + "</dt>";//<dt> tag defines a term/name in the <dl> description list
                                theText += "<dd class='productTypes'>" + productTypesText + "</dd>";//<dd> tag describes each <dt> term/name
                            }

                            else {//if firstLast obj is an empty string, then...

                                var theMessage = ( obj.productTypes );//place a message where the productTypes obj would have been
                                    console.log( theMessage );
                                theText += "<dt class='contacts'>" + theMessage + "</dt>";//yes, I want the message I wrote into the productTypes cell in Excel to be displayed in the contacts class.
                            }

                        });//closure for contacts.forEach( function( obj ){//the forEach() method executes a provided function once per array element.//CONCATENATE TEXT OBJs WITH HTML - START

                      $( "#txtDOT" ).html( theText );

                }

                else {//else, if jsonKey does not match the clickedState
                //console.log( "clickedState ID " + clickedState + " does NOT match key: " + jsonKey + " , so don't return that val." )
                }

            });//closure for $.each( data, function( key, val ){


        //The drop down menu text object creation and filter functionality
        $( "#productOptions" ).on( "change", function(e) {//when user selects from drop down menu
            var selected = $( "#productOptions option:selected" ).text();
        //      console.log( "user selected " + selected );
//              console.log( typeof selected );//string

//6/22 if you're going to keep this filter functionality outwith the $.each scope or lexical scope of theText, then you need to somehow call the product types array. maybe make it global up there.

                        if( Object.prototype.toString.call( productTypes ) === "[object Array]" ) {//test to make sure it is a true array, not array-like object. a prototype function.
        //                   console.log ( "Array" );
                        }

        //              Iterate over each item in array and make object out of match
                        productTypes.forEach( function( entry ) { //replaced the every method - executed the provided callback function once for each element present in the array ONLY until it found one where callback returned a falsy value (a value that becomes false when converted to a Boolean). If such an element was found, the every method immediately returned false.
        //                          console.log( entry );//entry is the element(s) from array
        //                          console.log ( typeof entry );//string
        //                          console.log ( selected );//my var, option the user selected from drop down menu
        //                          console.log ( typeof selected );//string

                            if (selected.indexOf( entry ) == -1 ) {//if element doesn't exist.//returns either the index/number of the start point for the string or a -1 meaning it isn’t there.
        //                      console.log( "element doesn't exist" );
                            }
                            else {//else, if element exists.
        //                      console.log( "element found" );

                            var productKey = ( key );
                                console.log ( "productKey " + productKey );//presence of a productKey means that corresponding state shapes (#g's) should get styled.

                            var $productStates =  $( "g" )//the $ in the var name indicates the var contains jQuery object(s) or is a jQuery collection

                                  .filter( function( index ) {//within the filter function, this refers to each DOM element in turn.
                                    if ( $( this ).attr( "id" ) == productKey ){//if the id of a g el matches a productKey
                                        console.log ( this.id );//GOOD. logged or, mn, etc., i.e., the states that have the product type which user selected in the drop down menu
                                        return ( this.id );//running slowly. I think each created object has its own function. constructor method of object creation inefficient.
                                    }
                                  })
                            console.log ( $productStates );
                            console.log ( typeof $productStates );//object; i.e., a jQuery collection of matched elements

                            //$productStates.attr( "class", "selectedClass" );//add selectedClass to the matched elements

                            $productStates.attr( "class", function( index, classNames ) {//Check $productStates for existing classes
                                if ( typeof classNames != "undefined") {//if there are existing classes on the productStates (selectedClass added by line 139)
                                    return classNames + " selectedClass";//THIS WILL ACCRUE //return the existing classes and add selectedClass to the end of the list
                                    //$( ".clicked" ).removeAttr( "class" );//Default select behavior is to discard the existing clicked class instance
                                }
                                else {//else, if there are not existing classes on the productStates
                                $productStates.attr( "class", "selectedClass" );//just add selectedClass
                                }
                            });//closure for $productStates.attr( "class", function( index, classNames ) {

                            }//closure for else {//else, if element exists.

                        });//closure for productTypes.forEach( function( entry ) { //iterates over each item in productTypes and make obj out of each match


                    //});//closure for the second, removed contacts.forEach( function( obj ){

//            });//closure for the second, removed $.each ( data, function( key, val ){

            //WHEN USER SELECTS FROM THE DROP DOWN MENU - ATTRIBUTES FUNCTION. Always discard existing clicked class first.
//            $( ".clicked" ).removeAttr( "class" );
            $( ".selectedClass" ).attr( "class", function( index, classNames ) {//look for elements with .selectedClass and check for other existing classes
                if ( typeof classNames != "undefined" ) {//if the element does have other existing classes
                    return classNames.replace( "clicked", "" );//return the list of class names but remove the clicked class
                }
                else {//else, if the element does not have other existing classes
                    $( ".selectedClass" ).attr( "class", "selectedClass" );//add the selectedClass
                }
            });


        });//closure for $( "productOptions" ).on( "change", function (e){//when user selects from drop down menu

            //WHEN USER CLICKS ON A STATE - ATTRIBUTES FUNCTION. Always discard existing clicked class first
//            $( this ).off( "click" );//this line only lets user click on a state one time. try some other method.
            $(this).attr("class", function(index, classNames) {
                 if ( typeof classNames != "undefined" ) { // if there are existing classes
    //                 console.log ( classNames + " <-classNames");//logged clicked clicked clicked selectedClass after I clicked MS 3x and selected multiple product types for MS
                    // return the existing classes and just add the clicked class to them

                    // Does classNames contain clicked already?
                    // if it does, remove it
                    // if it doesn't, add it
                     return classNames + " clicked";

                     // function that removes previously clicked class instances from sibling states. gets the ~returned clicked~ class attribute and checks for existing classes on the "g" element
                     $(this).siblings("g").attr("class", function(index, classNames) {
    //                    console.log ( typeof classNames );//logged nothing no matter what combo of clicks and selects
                        if (typeof classNames != "undefined") {// if there are existing classes on the siblings
    //                        console.log ( typeof classNames );//logged nothing no matter what combo of clicks and selects ~so I changed condition in line above~
                            return classNames.replace("clicked", "");// return the existing classes and remove just the clicked class
                        }
                        else {// if there are not existing classes on the siblings
                            return classNames;
                        }
                     });
                 }

                 else {

                     // if typeof classNames is undefined, meaning there aren't any existing classes, add the class clicked outright to the selected g element and remove the class from its siblings
                    $(this).attr("class", "clicked").siblings("g").removeAttr("class");//removeAttr only takes one arg, says Reed

                }
            });

//        $( this ).attr( "class", function( index, classNames ) {//gets the class attribute of clicked el and checks for existing classes
//            if ( typeof classNames != "undefined"  && //if the clicked state does have other existing classes AND
////                $( ".selectedClass" ) == $( this ).attr( "id" ) ) {//the selectedClass contains the id of the clicked state. This line based on syntax from filter function conditional: ( $( this ).attr( "id" ) == productKey ){
//               $( this ).hasClass( "selectedClass" ) ) {
////                do stuff
//                console.log( "selectedClass contains the id of the clicked state" );
//                //return classNames + " selectedClass";
//            }
//            else{
//            $( this ).attr( "class", "clicked" ).siblings( "g" ).removeAttr( "class" );//Default click behavior is to add clicked class to currently selected el and remove it from all other elements
//            }
//      Stop Propagation Event Handler Arguments - commented out
//        console.log( "user clicked " + this.id );
//            if(!event.isPropagationStopped() &&
//            if(!event.isImmediatePropagationStopped() &&
//            if(!event.isDefaultPrevented())
//            {   showEventMsg.call(this,{eventType: event.type});
//                event.stopPropagation();
//            }
//      Show Messages Function - commented out. works as of 2:41 on 6/15/15
//        $(function (){
//            var showEventMessage = function(options){
//                options=$.extend(//defining options obj
//                {
//                eventType: "on",
//                eventTarget: this,
//                suffix: "<br/>"
//                },options);
//                var message = options.eventType + ": " +
//                                (options.eventTarget.nodeName || "unknown") +
//                                options.suffix;
//                $("#Messages").append(message);
//             };
//
//        $( ".eventable" )
//            .on( "click change",(function(event){
//                showEventMessage.call(this);
//                defaultOff.call();
//            }))
//            console.log("write your exceptions functions chain here");
//        });
//       });//i removed whatever this was closure for on 6/20/15

       });//closure for $( "g" )on( "click", function(e){

      });//closure for $.getJSON( "stateInfoList.json", function( data ){

    //});//closure for var showEventMessage = function(options){

});//closure for $(document).ready(function(){


/*
if (typeof classNames != "undefined") {//if there are existing classes on the g elements
            $(".selectedClass").attr("class","");//discard the existing selectedClass instances
            return classNames + " selectedClass";//return the existing classes and add selectedClass to the end of the list
        }
        else {//else, if there are not existing classes on the g elements
            $("selectedClass").attr("class", "selectedClass");//just add selectedClass
        }




*/