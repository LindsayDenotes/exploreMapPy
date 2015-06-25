/*problems with this version: 6/23/15
clicked not assigning when a selected state is clicked - this is semi-important aspect of the condition I have yet to code: keep selectedClass if the clicked state is one of the selectedClass states. Now, clicked attr isn't showing up within selected group. Why this isn't dire: text under map indicates which state was last clicked.
To do: whenever selectedClass discards clicked, remove text under map; i.e., if clicked class doesn't exist, remove, hide, or detach txtDOT which is associated with the clicked state.
To do: whenever clicked discards selectedClass, reset drop down menu to default value; i.e., if selectedClass doesn't exist, reset menu.
*/

$( document ).ready( function(){
    var json = {};
      $.getJSON( "stateInfoList.json", function( data ) {
//        console.log ( data );//whole JSON object loads on document ready

        //WHEN USER SELECTS FROM DROP DOWN MENU
        $( "#productOptions" ).on( "change", function(e) {

        //WHEN USER SELECTS FROM THE DROP DOWN MENU - ATTRIBUTES FUNCTION. Always discard existing clicked class first.
            $(".clicked").attr("class","");
            $(".selectedClass").attr("class", function(index, classNames) {
                // if the selectedClass elements already have other existing classes. ¸
                if (typeof classNames != "undefined") {
                    // return the list of class names and just remove the .selectedClass
                    return classNames.replace("selectedClass", "");
                }
                else {
                    // otherwise, if the selectedClass elements don't already have other classes, i.e., the clicked class, remove the selected class
                    $(".selectedClass").attr("class", "");//Not sure if working 6/24/15. attr takes 2 args so this is ok. wipes out all (or just selectedClass) classes on the element.
                }
            });//closing for $(".selectedClass").attr("class", function(index, classNames) {

            //HIDE TEXT BOX - 6/24 look again at failed code in discardClicked1st...
            $(this).attr("class", function(index,classNames){
                if (typeof classNames != "undefined") {
//                if ( $("g").hasClass("clicked") ) {
                console.log("clicked exists so show txtDOT");//logged 8 (8 out of 51 state DOTs)
                $("#txtDOT").show();//but unfortunately, the text stays off even after click class returns!
//                });
                }
                else {
                console.log("clicked doesn't exist so hide txtDOT");//43 (43 out of 51 state DOTs)
                $("txtDOT").hide();
                }
            });

            //THE DROP DOWN MENU TEXT OBJECT CREATION AND FILTER FUNCTIONALITY
            var selected = $( "#productOptions option:selected" ).text();
              console.log( "user selected " + selected );
        //      console.log( typeof selected );//string

            $.each ( data, function( key, val ){//parse JSON. Note: I wish I could wrap lines 48-60 into an IIFE (Immediately Invoked Function Expression) so I could access the productTypes array in my on click event handler without rewriting these lines. But I'm too retarded or sleepy to figure it out now.
                console.log ( key, val.contacts );//key is "nh" or "fl", val is whats inside json's { }s

        //      var jsonKey = ( key );
        //          console.log ( "this is a state key: " + jsonKey );

                var contacts = [];
                contacts = ( val.contacts );
        //          console.log ( "Referenced by val.contacts, contacts are " + contacts );//returns contacts are [object object]. So crack into those with a forEach loop

                    contacts.forEach( function( obj ){

                        var productTypes = [];
                        productTypes = ( obj.productTypes );
        //                      console.log( productTypes );//an array of strings. For Array objects, the toString method joins the array and returns one string containing each array element separated by commas.
        //                      console.log( typeof productTypes );//object

                        if( Object.prototype.toString.call( productTypes ) === "[object Array]" ) {//test to make sure it is a true array, not array-like object. a prototype function.
        //                   console.log ( "Array" );
                        }

                        //Iterate over each item in array and make object out of match
                        productTypes.forEach( function( entry ) { //replaced the every method - executed the provided callback function once for each element present in the array ONLY until it found one where callback returned a falsy value (a value that becomes false when converted to a Boolean). If such an element was found, the every method immediately returned false.
        //                          console.log( entry );//entry is the element(s) from array
        //                          console.log ( typeof entry );//string
        //                          console.log ( selected );//my var, option the user selected from drop down menu
        //                          console.log ( typeof selected );//string

                            if (selected.indexOf( entry ) == -1 ) {//if element doesn't exist.//returns either the index/number of the start point for the string or a -1 meaning it isn’t there.
        //                      console.log( "element doesn't exist" );
                            }
                            else {//else, if element exists
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
//                            console.log ( $productStates );
//                            console.log ( typeof $productStates );//object; i.e., a jQuery collection of matched elements

                            //$productStates.attr( "class", "selectedClass" );//add selectedClass to the matched elements
                            $productStates.attr("class", function(index, classNames) {
//                                // if there are existing classes
//                                if (typeof classNames != "undefined") {
//                                    // return the existing classes and add selectedClass to the end of the list
//                                    return classNames + " selectedClass";
//                                }
//                                else {
                                    // otherwise, just add selectedClass
                                    $productStates.attr("class", "selectedClass");
//                                }

                            });//closing for $productStates.attr( "class", function( index, classNames ) {

                            }//closing for else {//else, if element exists

                        });//closing for productTypes.forEach( function( entry ) { //iterates over each item in productTypes and make obj out of each match


                    });//closing for contacts.forEach( function( obj ){

            });//closing for $.each ( data, function( key, val ){

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
        //       });

               });//closing for $( "#productOptions" ).on( "change", function (e){

        //WHEN USER CLICKS ON A STATE
        $("g").on( "click", function ( e ) {

        //WHEN USER CLICKS ON A STATE - ATTRIBUTES FUNCTION. Always discard existing clicked class first
        //$( this ).off( "click" );//this line only lets user click on a state one time. try some other method.
        $(this).attr("class", function(index, classNames) {
            if ( typeof classNames != "undefined" ) { // if there are existing classes
//                return classNames + " clicked";//comment this line out and clicked won't accrue on selected states

                //function that removes previously clicked class instances from sibling states. gets the ~returned clicked~ class attribute and checks for existing classes on the "g" element
                $(this).siblings("g").attr("class", function(index, classNames) {
                    if (typeof classNames != "undefined") {// if there are existing classes on the siblings
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
        });//closing for $(this).attr("class", function(index, classNames) {

            //PARSE DATA, CREATE TEXT OBJECTS
            clickedState = ( this.id );
//          console.log( "so var clickedState is " + clickedState );

            $.each ( data, function( key, val ){
//                console.log ( key, val );//key is "nh" or "fl", val is whats inside json's { }s

                var jsonKey = ( key );
//                console.log ( "this is a state key: " + jsonKey );

                if ( jsonKey == clickedState ){
//                      console.log( "clickedState ID " + clickedState + " MATCHES key: " + jsonKey + ". Return that val." );

                      var contacts = [];
                      contacts = ( val.contacts );
//                      console.log ( "Referenced by val.contacts, contacts are " + contacts );

                      //CONCATENATE TEXT OBJs WITH HTML - START
                      var theText = "<dl class ='agency " + key + "'>" + val.agency + "</dl>";//<dl> tag defines a description list

                        contacts.forEach( function( obj ){//The forEach() method executes a provided function once per array element.

                            var productTypes = [];//is an array
                            productTypes = ( obj.productTypes );//make the array into an object
                            console.log( productTypes );
//                            console.log( typeof productTypes );//logged object

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

                            //CONCATENATE TEXT OBJs WITH HTML - FINISH
                            theText += "<dt class='contacts'>" + firstLast + ", " + title + ", " + phone + ", " + email + "</dt>";//<dt> tag defines a term/name in the <dl> description list
                            theText += "<dd class='productTypes'>" + productTypesText + "</dd>";//<dd> tag describes each <dt> term/name
                            }

                            else {//else, if firstLast obj is an empty string, then...

                            var theMessage = ( obj.productTypes );//place a message where the productTypes obj would have been
                                console.log( theMessage );
                            theText += "<dt class='contacts'>" + theMessage + "</dt>";//yes, I want the message I wrote into the productTypes cell in Excel to be displayed in the contacts class.
                            }

                        });

                      $( "#txtDOT" ).html( theText );

                }

                else {//else, if jsonKey does not match the clickedState
                //console.log( "clickedState ID " + clickedState + " does NOT match key: " + jsonKey + " , so don't return that val." )
                }

            });//closing for $.each(data,function(key,val){

        });//closing for $( "g" )on( "click", function(e){


      });//closing for $.getJSON( "stateInfoList.json", function( data ){

    //});//closing for var showEventMessage = function(options){

});//closing for $(document).ready(function(){



/* removed from lines 17-27
if (typeof classNames != "undefined") {//if there are existing classes on the g elements
            $(".selectedClass").attr("class","");//discard the existing selectedClass instances
            return classNames + " selectedClass";//return the existing classes and add selectedClass to the end of the list
        }
        else {//else, if there are not existing classes on the g elements
            $("selectedClass").attr("class", "selectedClass");//just add selectedClass
        }

*/