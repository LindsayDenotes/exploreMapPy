/*discardClicked1stInBothHandlerFuncs_6-15-15
problems with this version:
clicked overwrites selected even if user clicked on a state within the selected group - only one problem with attr functionality is not bad
no text box functionality below the map
*/

$( document ).ready( function(){

   $("#productOptions").on( "change", function( event ) {
    $(".clicked").removeAttr("class");//DEFAULT BEHAVIOR Discard clicked

    $(".selectedClass").attr("class", function(index, classNames) {
            // if the element does have other existing classes
            if (typeof classNames != "undefined") {
                // return the list of classnames and just remove the .selectedClass
                return classNames.replace("selectedClass", "");
            }
            else {
                // otherwise, remove the classes already on el
                $(".selectedClass").attr("class", "");//attr takes 2 so this is ok. wipes out all classes on the element.
            }
        });
    });

   //$( this ).off( "click ");//ehhh...
   $("g").on( "click", function (e) {
    $(this).attr("class", "clicked").siblings("g").removeAttr("class","clicked");//DEFAULT BEHAVIOR Discard clicked
   })
////          console.log( "user clicked " + this.id );
////                if(!event.isPropagationStopped() &&
////                if(!event.isImmediatePropagationStopped() &&
////                if(!event.isDefaultPrevented())
////                {   showEventMsg.call(this,{eventType: event.type});
////                    event.stopPropagation();
////                }
//        });//closure for g.on click
//
//        $( "#productOptions" )
//                    $("g").off("click")
//        };//closure for .on "click change"


//SHOW MESSAGES FUNCTION works as of 2:41 on 6/15/15
//  $(function (){
//    var showEventMessage = function(options){
//        options=$.extend(//defining options obj
//        {
//        eventType: "on",
//        eventTarget: this,
//        suffix: "<br/>"
//        },options);
//        var message = options.eventType + ": " +
//                        (options.eventTarget.nodeName || "unknown") +
//                        options.suffix;
//        $("#Messages").append(message);
//    };
//
//    $( ".eventable" )
//        .on( "click change",(function(event){
//            showEventMessage.call(this);
//            defaultOff.call();
//        }))
//        console.log("write your exceptions functions chain here");
//
//    });

    var json = {};
    $.getJSON( "stateInfoList.json", function( data ) {
//      console.log ( data );//whole JSON object

            //PARSE DATA, CREATE TEXT OBJECTS
            selectedState = ( this.id );
//          console.log( "so var selectedState is " + selectedState );

            $.each ( data, function( key, val ){
//                console.log ( key, val );//key is "nh" or "fl", val is whats inside json's { }s

                var jsonKey = ( key );
//                console.log ( "this is a state key: " + jsonKey );

                if ( jsonKey == selectedState ){
//                      console.log( "selectedState ID " + selectedState + " MATCHES key: " + jsonKey + ". Return that val." );

                      var contacts = [];
                      contacts = ( val.contacts );
//                      console.log ( "Referenced by val.contacts, contacts are " + contacts );

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

                            else {

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

            });//closure for $.each(data,function(key,val){

        // The drop down menu filter functionality
        $( "#productOptions" )

            .on("change", function(e) {

//                if(!event.isPropagationStopped() &&
//                    !event.isImmediatePropagationStopped() &&
//                    !event.isDefaultPrevented())
//                {   showEventMsg.call(this,{eventType: event.type,
//                                        suffix: "<br/>"});
//                    showEventMsg({eventTarget:this});
//                }

    //      $( "#productOptions" ).change( function( e ) {//.on can only bind to one function and .on is used on clicked g function already. use .bind to bind ~?an el~? to multiple functions.
            // look for elements with .selectedClass and check for other existing classes
                $(".selectedClass").attr("class", function(index, classNames) {
                    // if the element does have other existing classes
                    if (typeof classNames != "undefined") {
                        // return the list of classnames and just remove the .selectedClass
                        return classNames.replace("selectedClass", "");
                    }
                    else {
                        // otherwise, remove the classes already on el
                        $(".selectedClass").attr("class", "");//attr takes 2 so this is ok. wipes out all classes on the element.
                    }
                });

                var selected = $("#productOptions option:selected").text();
    //          console.log( "user selected " + selected );
    //          console.log( typeof selected );//string

                $.each ( data, function( key, val ){
                    console.log ( key, val.contacts );//key is "nh" or "fl", val is whats inside json's { }s

    //                var jsonKey = ( key );
    //                  console.log ( "this is a state key: " + jsonKey );

                    var contacts = [];
                    contacts = ( val.contacts );
    //                 console.log ( "Referenced by val.contacts, contacts are " + contacts );//returns contacts are [object object]. So crack into those with a forEach loop

                        contacts.forEach( function( obj ){// The forEach() method executes a provided function once per array element.

                                var productTypes = [];
                                productTypes = ( obj.productTypes );
        //                      console.log( productTypes );//an array of strings. For Array objects, the toString method joins the array and returns one string containing each array element separated by commas.
        //                      console.log( typeof productTypes );//object

                                if( Object.prototype.toString.call( productTypes ) === "[object Array]" ) {//test to make sure it is a true array, not array-like object. a prototype function.
        //                          console.log ( "Array" );
                                }

        //                      Iterate over each item and make object out of match
                                productTypes.forEach( function( entry ) { // Replaced the every method - executed the provided callback function once for each element present in the array until it found one where callback returned a falsy value (a value that becomes false when converted to a Boolean). If such an element was found, the every method immediately returned false.
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

                                            // check $productStates for existing classes
                                            $productStates.attr("class", function(index, classNames) {
                                                // if there are existing classes
                                                if (typeof classNames != "undefined") {
                                                    // return the existing classes and add selectedClass to the end of the list
                                                    return classNames + " selectedClass";

                                                }
                                                else {
                                                    // otherwise, just add selectedClass
                                                    $productStates.attr("class", "selectedClass");
                                                }
                                            });
                                    }

                                });//closure for productTypes.forEach( function(entry) { //iterates over each item in productTypes and make obj out of each match

                        });//closure for contacts.forEach(function(obj){

                    });//closure for $.each (data, function(key,val){

            })//closure for .on("change", function(e){

        });//closure for $.getJSON("stateInfoList.json",function(data){

    //closure for var showEventMessage = function(options){

});//closure for $(document).ready(function(){

                /*

                //remove text if class does not contain selectedClass
                //                      if (!$(this).hasClass("selectedClass")) {
                //                          //do stuff
                //                      }

                                jQuery Selector $() function w optional 2nd parameter to do a search within an event handler
                $("g").on("click", function (e) {//Using e is just a short for event. You can pass any variable name you desire.
                     var $e = $(e.target);//target is #something
                     clicked.css("background", "red");
                });
                */







//
//$( document ).ready( function(){
//
//    var json = {};
//    $.getJSON( "stateInfoList.json", function( data ) {
////      console.log ( data );//whole JSON object
//
////      MESSAGES FOR EVENT HANDLER TESTING 6/7/15
//        $(function (){
//        var showEventMsg=function(options){
//            options=$.extend({
//            eventType: "click",
//            eventTarget: this,
//            suffix: "<br/>"
//            },options);
//            var message = options.eventType + ": " +
//                            (options.eventTarget.nodeName || "unknown") +
//                            options.suffix;
//            $("#Messages").append(message);
//            };
//
//    //      ON CLICK HANDLER
//            $( "g" ).on( "click", function (e) {
//    //          console.log( "user clicked " + this.id );
//                showEventMsg({eventTarget:this});
//                });
//    //          CLICKED EL FUNCTION
//                $( this ).attr( "class", function( index, classList ) {
//
//                    if ( typeof classNames != "undefined" ) { //if there are existing classes ~on the clicked el
//
//                    return classNames + " clicked";
//
//                        // function that removes previously clicked class instances from sibling states. gets the ~returned clicked~ class attribute and checks for existing classes on the "g" element
//                        $(this).siblings("g").attr("class", function(index, classNames) {
//         //                    console.log ( typeof classNames );//logged nothing no matter what combo of clicks and selects
//                            if (typeof classNames == "classNames") {// if there are existing ~clicked~ class instances on the siblings
//         //                        console.log ( typeof classNames );//logged nothing no matter what combo of clicks and selects ~so I changed condition in line above~
//                            return classNames.replace("clicked", "");// return the existing classes and remove just the clicked class
//                            }
//                            else {// if there are not existing ~clicked~ class instances on the siblings
//                             // otherwise, remove the clicked class attribute altogether
//                            $(this).siblings("g").removeAttr("class", "");
//                            }
//                        });
//
//                    }
//
//                    else {
//                     // if typeof classNames is undefined, meaning there aren't any existing classes, add the class clicked outright to the selected g element and remove the class from its siblings
//                    $(this).attr("class", "clicked").siblings("g").removeAttr("class","clicked");//removeAttr only takes one arg
//                    }
//
////                    var hasClass = this.classList.contains("clicked");
////                        console.log (hasClass);//logged true for clicked state. GOOD - now we know how to test for specific class, not just whether or not any class exists
//                });
//
//
//                clickedState = ( this.id );
//    //          console.log( "so var selectedState is " + selectedState );
//
//
//
//                $.each ( data, function( key, val ){
//    //                console.log ( key, val );//key is "nh" or "fl", val is whats inside json's { }s
//
//                    var jsonKey = ( key );
//    //                console.log ( "this is a state key: " + jsonKey );
//
//                    if ( jsonKey == clickedState ){
//    //                      console.log( "clickedState ID " + clickedState + " MATCHES key: " + jsonKey + ". Return that val." );
//
//                          var contacts = [];
//                          contacts = ( val.contacts );
//    //                      console.log ( "Referenced by val.contacts, contacts are " + contacts );
//
//                          var theText = "<dl class ='agency " + key + "'>" + val.agency + "</dl>";
//
//                            contacts.forEach( function( obj ){
//
//                                var productTypes = [];
//                                productTypes = ( obj.productTypes );
//    //                            console.log( productTypes );//an array of strings. For Array objects, the toString method joins the array and returns one string containing each array element separated by commas.
//    //                            console.log( typeof productTypes );//object
//
//                                if( Object.prototype.toString.call( productTypes ) === "[object Array]" ) {//test to make sure it is a true array, not array-like object. a prototype function.
//    //                          console.log ( "Array" );
//                                }
//    //                          Iterate over each item and make object out of match
//                                productTypes.forEach( function( entry ) { // The every method didn't work. It executes the provided callback function once for each element present in the array until it finds one where callback returns a falsy value (a value that becomes false when converted to a Boolean). If such an element is found, the every method immediately returns false.
//        //                          console.log( entry );//entry is the element(s) from array
//        //                          console.log ( typeof entry );//string
//        //                          console.log ( selected );//my var, option the user selected from drop down menu
//        //                          console.log ( typeof selected );//string
//
//                                if (selected.indexOf( entry ) == -1 ) {//returns either the index/number of the start point for the string or a -1 meaning it isn’t there.
//    //                              console.log( "element doesn't exist" );
//                                }
//
//                                else {
//    //                              console.log( "element found" );
//                                    console.log ( "the contact in charge of the selected productType is responsible for " + productTypes.length + " product types." );//.length is like Python's len(list_name)
//
//
//                                var productKey = ( key );
//                                    console.log ( "productKey " + productKey );//presence of a productKey means that corresponding state shapes (#g's) should get styled.
//
//                                var $productStates =  $( "g" )//the $ in the var name indicates the var contains jQuery object(s) or is a jQuery collection
//
//                                      .filter( function( index ) {
//                                        if ( $( this ).attr( "id" ) == productKey ){//Within the filter function, this refers to each DOM element in turn.
//                                            console.log ( this.id );//GOOD. returned or mn etc, ie, the states that have that product type user selected in the dropdown
//                                            return ( this.id );//running slowly. I think each object has own function. constructor method of object creation inefficient.
//                                        }
//                                      })
//    //                                    console.log ($productStates);//logs each state id separately on the console
//    //                                    console.log ( typeof $productStates );//object; i.e., a jQuery collection of matched elements
//
//
//        //                              -----Check $productStates for existing classes-----
//                                        $productStates.attr("class", function(index, classNames) {
//                                            // if there are existing classes
//                                            if (typeof classNames != "undefined") {
//                                                // return the existing classes and add selectedClass to the end of the list
//                                                return classNames + " selectedClass";
//                                            }
//                                            else {
//                                                // otherwise, add selectedClass to the virgin state, remove last clicked state's text, and clicked class
//                                                $productStates.attr("class", "selectedClass");
//                                                $( "#txtDOT" ).detach();//worked, but then when I click TX for 2nd time, no text appears. //PROBLEM IS THAT NO CLICKED STATE GETS txtDOT TEXT
//                                                $( ".clicked" ).attr("class", "");//SUCCESS
//                                            }
//                                        });
//        //                              -----
//
//    //                          CONCATENATION
//                                var productTypesText = " ";
//                                productTypesText += productTypes;
//                                productTypesText = productTypesText.replace(/,/g , "<br/>" );// g stands for global, replace all matches, and not just the first one. makes it a regular expression
//                                console.log( productTypesText );//does not have quotes and brackets on console
//
//                                var firstLast = ( obj.firstLast );
//                                console.log( firstLast );//empty string for 5 states
//
//                                if ( firstLast !== " " ){
//
//                                var title = ( obj.title );
//                                console.log ( title );//empty string for 5 states
//
//                                var phone = ( obj.phone );
//                                console.log ( phone );//empty string for 5 states
//
//                                var email = ( obj.email );
//                                console.log ( email );//empty string for 5 states
//
//
//                                theText += "<dt class='contacts'>" + firstLast + ", " + title + ", " + phone + ", " + email + "</dt>";
//                                theText += "<dd class='productTypes'>" + productTypesText + "</dd>";
//                                }
//
//                                else {
//
//                                var theMessage = ( obj.productTypes );
//                                    console.log( theMessage );
//                                theText += "<dt class='contacts'>" + theMessage + "</dt>";// yes, I want the message that I wrote into the productTypes cell to be displayed in the contacts class.
//                                }
//
//
//
//                            };
//
//                          $( "#txtDOT" ).html(theText);
//                    })
//
//                });
//
//    //        Reset drop down when *state without selectedClass* gets clicked. You need to specify that condition
//    //        if (typeof classNames !== "selectedClass"){
//    //            $("#productOptions").prop('selectedIndex',0);//resets menu
//    //            $("#selectedProduct").detach();// worked to remove "The [CADD] states are:" text BUT BEFORE I EVER SAW IT!
//    //            //~~~~~5/27/15 HOW TO REATTACH txtDOT text??? Rewrite .html(theText) line in each condition?
//    //            //~~~~~5/27/15 when I clicked TX for 2nd time, it already had clicked on it, so it didn't wipe out selectedStates
//    //        }
//
////            });
//
//    //if div.classList.remove("foo");
//
//
//    // drop down menu functionality
//                    // drop down menu event handler function
//                    $( "#productOptions" ).change( function( e ) {//.on can only bind to one function and .on is bound to click function already. use .bind to bind an event(?) to multiple functions.
//                        // look for elements with .selectedClass and check for other existing classes
//                        $(".selectedClass").attr("class", function(index, classNames) {
//                            // if the elements do have existing classes
//                            if (typeof classNames != "undefined") {
//
//                            var productStateHadClicked = this.classList.contains("clicked");
//                                console.log (productStateHadClicked);
//                            if ( productStateHadClicked){
//                                // return the list of class names but remove the existing .selectedClass
//                                return classNames.replace("selectedClass", "");
//                            }
//                            else { //~~~~~~~~5/27/15 WHY ISN'T SELECTED CLASS APPENDING TO $PRODUCT STATES W/O CLICK FIRST?
//                                // otherwise, the elements do not have existing classes, so add class to el.
//                                $(".selectedClass").attr("class","");//attr takes 2 args but this 1 attr arg suffices because value (class) is the selector.CONFUSED about 2nd arg!
//
//                            }
//
//                        };
//
//    //            var selectedProduct = $("#productOptions option:selected").text();
//    //            console.log( "user selected " + selectedProduct );
//    //            console.log( typeof selectedProduct );//string
//
//    //            $.each ( data, function( key, val ){
//    //                console.log ( key, val.contacts );//key is "nh" or "fl", val is whats inside json's { }s
//    //                DUP
//    //                var contacts = [];
//    //                contacts = ( val.contacts );
//    //                console.log ( "Referenced by val.contacts, contacts are " + contacts );//returns contacts are [object object]. So crack into those with a forEach loop
//
//    //                contacts.forEach( function( obj ){// The forEach() method executes a provided function once per array element.
//    //
//    //                        var productTypes = [];
//    //                        productTypes = ( obj.productTypes );
//    ////                      console.log( productTypes );//an array of strings. For Array objects, the toString method joins the array and returns one string containing each array element separated by commas.
//    ////                      console.log( typeof productTypes );//object
//    //
//    //                        if( Object.prototype.toString.call( productTypes ) === "[object Array]" ) {//test to make sure it is a true array, not array-like object. a prototype function.
//    ////                          console.log ( "Array" );
//    //                        }
//
//    //
//
//                                        // check number of states with selectedClass matches the Excel spreadsheet (ntpepInfo.xlsx - read by scriptCleanForContacts.py, which wrote to stateInfoList.json)
//                                        console.log ( $(".selectedClass").length );
//
//                                        // 5/27/15 this is where I was trying to catch the values of each index in $productStates into a var so I could display them below
//                                        $( "#selectedProduct").html("The " + selected + "states are: " );
//
//    //                                    });
//
//                                });
//
//                            });
//                    };
//                });
//
//        })
//
//    });
//});
//
//
//                /*
//
//                5/31/15
//                // CONDITION: CLICKED EL WITH EXISTING CLICKED AND SELECTEDCLASS CLASSES
//                                if ( var hadClickedAndSelectedClass = this.classList.contains("clicked","selectedClass"){//can I put two classes in parameters? I think yes b/c you can classList.add("oneClass","twoClass");
//                                    console.log (hadClickedAndSelectedClass);
//                                    return classList.
//                                }
//
//                5/31/15 //var hasClass = (" " + element.className + " ").indexOf(" some-class ") > -1;//if IE9 still doesn't support classList, use this line
//
//                5/31/15 //trying to test for specific class on an el, not just whether or not classes exist
//                //        var containsClass = function(clickedState, className) {
//                //            return (" " + clickedState.className + " ").indexOf(" " + className + " ") > -1;
//                //        };
//
//
//                5.26.15
//                //remove text if class does not contain selectedClass
//                //                      if (!$(this).hasClass("selectedClass")) {
//                //                          //do stuff
//                //                      }
//
//                .siblings("g").removeAttr( "class" );
//
//                $(".selectedClass").attr("class", "");/*
//
//
//                  if firstLast not in contacts:
//                          if(firstLast.hasOwnProperty('obj.firstLast')) { ... } // will run
//                          if(firstLast.hasOwnProperty('toString')) { ... } // will not run
//
//                $( "#txtDOT" ).append( "<p id='productTypes'>" + productTypes + "</p>" );
//                     $( "#txtDOT" ).append( "<p id ='firstLast'>" + firstLast + "</p>" );
//
//                jQuery Selector $() function w optional 2nd parameter to do a search within an event handler
//                $("g").on("click", function (e) {//Using e is just a short for event. You can pass any variable name you desire.
//                     var $e = $(e.target);//target is #something
//                     clicked.css("background", "red");
//                });
//
//                */
