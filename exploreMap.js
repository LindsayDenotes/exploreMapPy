/*
Comments in all caps describe the event handler conditionals dealt with in that specific line or in the whole code block beneath the comment
Comments to the right of a line pertain to that line only and are usually an interpretation in plain English of what that line does
 
1) add functionality to show upon click only the one contact at that state who matches the selected product type.
2) perhaps name and wrap functions in immediately invoked function expressions (doesn't count as hoisting bc the fnc and the self-invoking fn would be in same lexical scope)  
3) avoid pyramid of doom (select event handler has 4 levels of indentations; click has 5 levels. Eek! )

Please visit denotetoday.com to see the responsive CSS version of this project

IDENTIFY FUNC INVOCATIONS, HIGHER ORDER FUNCS ($.getJSON), AND THEIR CALLBACK FUNCS ($.each). Identify functions-as-values and where you already were using closures
*/
$( document ).ready( function(){
  var json = {};
  $.getJSON( "stateInfoList.json", function( data ){
    // console.log ( data );//whole JSON object loads on document ready
    // var ol = Object.keys( data );//how many keys does data contain?
    // console.log(ol.length);//logged 51

    var get = (function GetModule() { //for now, this closing is at bottom of program until I figure stuff out
        
        $.each ( data, function( key, val ){

            // console.log ( key, val.contacts );//key is "nh" or "fl", val is whats inside json's { }s
            
            //PARSE JSON MODULE MAKER
            function ParseJsonModule(){
                // var jsonKey = ""; Keep this commented out. Will log as undefined if you uncomment
                // var contacts = []; Keep this commented out. Will log as undefined if you uncomment
                                
                //CREATE MODULE MAKER FOR JSONKEY - TO INVOKE IN CLICK HANDLER BEFORE PARSE DATA AS WELL AS IN ON CHANGE HANDLER BEFORE...
                function jsonKeyF(){
                    jsonKey = ( key );
                    console.log ( "a state key: ", jsonKey );
                }
                //CREATE MODULE MAKER FOR CONTACTS - TO INVOKE IN CLICK HANDLER BEFORE COMEONEORALL MODULE MAKER AS WELL AS IN ON CHANGE HANDLER BEFORE...
                function contactsF(){
                    contacts = ( val.contacts );
                    console.log ( "the state's contacts: ", contacts );//logs [object Object] etc. Later, crack into those with a forEach loop.
                }
                
                return {
                    jsonKeyF: jsonKeyF,
                    contactsF: contactsF
                };
            
            }//closing for ParseJsonModule(){

            var fetch = ParseJsonModule();

            fetch.jsonKeyF();
            fetch.contactsF();
            
            var theJsonKey = jsonKey;
            console.log("theJsonKey",theJsonKey);

            var theContacts = contacts;
            console.log("theContacts",theContacts);

                     
            //-----EVENT HANDLER FUNCTION (1 of 2): USER SELECTS FROM DROP DOWN MENU-----
            $( "#productOptions" ).on( "change", function(e) {    
                var selected = $( "#productOptions option:selected" ).text();
                //DOM MANIPULATION AND SVG MANIPULATION ON CHANGE EVENT
                $( this ).css({ "border-style": "solid", "border-color": "#333", "border-width": "1px", "outline": "1px dotted #333"});

                //Add or discard attributes on class selectors on change event.
                $( ".clicked" ).attr( "class", "" );//DEFAULT BEHAVIOR: discard existing clicked class (should happen on click event handler, too)
                $( ".selectedClass" ).attr( "class", "" );//discard the existing selected class on change event.

                //Show or hide text box on change event (inner functions in blocks below)
                $( "g" ).attr( "class", function( index, classNames ){
                    if ( typeof classNames != "undefined" ) {//~~~~~~~~add 2nd =?~~~~~~~if any g has the clicked class instance on it...
                        // console.log( "clicked exists so show txtDOT" );
                        $( "#txtDOT" ).show();//show the text box
                    }
                    else {
                        // console.log( "clicked doesn't exist so hide txtDOT" );
                        $( "#txtDOT" ).hide();//hide the text box; comes back when clicked class comes back
                    }
                });

                //PRODUCTTYPES MODULE MAKER 
                function ProductTypesModule(){

                    // var productTypes = [];//Keep this commented out. Will log as undefined if you uncomment   
                    //I think I need to do something here in order to get back all productTypes when I invoke this later, not just the last item in productTypes
                    theContacts.forEach( function( obj ){//The forEach() method executes a provided function once per array element.
                        
                        var productTypes = [];                 
                        productTypes = ( obj.productTypes );//make the array into an [object Array] so we can compare it with the string value of var selected
                         // console.log( "line37 (outside event handlers) Array.isArray(productTypes): ", Array.isArray(productTypes) );//logged true
                         // console.log( "line38 (outside event handlers) Object.prototype.toString.call(productTypes): ",Object.prototype.toString.call(productTypes) );//logged [object Array]
                        console.log ( "productTypes are: ", productTypes );
                    }); 
                    return {
                        productTypesModule: productTypesModule
                    };                   

                }//closing for ProductTypesModule(){
                
                //INVOKE PRODUCTTYPES MODULE MAKER HERE
                ProductTypesModule();
                // var forage = ProductTypesModule();

                // forage.productTypesF();

                var theProductTypes = productTypes;
                console.log("theProductTypes",theProductTypes);
                // if ( Object.prototype.toString.call( theProductTypes ) === "[object Array]" ) {//test to make sure it is a true array, not array-like object. a prototype function.
                //     console.log ( "theProductTypes is an array" );//use Array.isArray or Object.prototype.toString.call to differentiate regular objects from arrays
                // }
                             
                //Iterate over each item in array and make jQuery collection, i.e., object out of match
                theProductTypes.forEach( function( entry ) { //.forEach replaced the .every method - executed the provided callback function once for each element present in the array ONLY until it found one where callback returned a falsy value (a value that becomes false when converted to a Boolean). If such an element was found, the every method immediately returned false.
                    // console.log( entry );//entry is the element(s) from array
                    // console.log ( typeof entry );//string
                    
                    if ( selected.indexOf( entry ) == -1 ) {//if element doesn't exist...//returns either the index/number of the start point for the string or a -1 meaning it isn’t there.
                        // console.log( "element doesn't exist" );
                    }
                    else {//else, if element exists...
                        // console.log( "element found" );

                                       
                    var productKey = ( key );
                    // console.log ( "productKey " + productKey );//presence of a productKey means that corresponding state shapes (#g's) should get styled via attr method.
                    
                    //Block below defines the selected states group; i.e., the states that use the product type that the user selected from the drop down menu.
                    var $productStates =  $( "g" )//the $ in the var name indicates the var contains jQuery object(s) or is a jQuery collection.
                        .filter( function( index ) {//within the jQuery filter function, this refers to each DOM element in turn.
                            if ( $( this ).attr( "id" ) == productKey ){//if the id of a g el matches a productKey
                                // console.log ( this.id );//GOOD. logged or, mn, etc., i.e., the states that have the product type which user selected in the drop down menu
                                return ( this.id );
                            }
                        })
                    // console.log ( $productStates );
                    // console.log ( typeof $productStates );//object; i.e., a jQuery collection of matched elements
                    // var len = $.map($productStates, function(n, i) { return i; }).length; // Ignore this line for now
                    $productStates.attr( "class", "selectedClass" );//add selectedClass attribute to the matched elements

                    }//closing for else {//else, if element exists...

                });//closing for productTypes.forEach( function( entry ) {
                        
            });//closing for $( "#productOptions" ).on( "change", function (e){ i.e., CLOSES THE ON CHANGE EVENT HANDLER-----


            //-----EVENT HANDLER FUNCTION (2 of 2): USER CLICKS ON A STATE SHAPE-----
            $( "g" ).on( "click", function ( e ) {
                $( "#txtDOT" ).show();

                //Attributes function
                $( this ).attr( "class", function( index, classNames ) {

                    //CONDITION: IF USER CLICKS ON A STATE THAT IS ONE OF THE SELECTED STATES
                    if ( $( this ).attr( "class" )  == ( "selectedClass" ) ) {//If clicked state has selectedClass...
                        $( ".clicked" ).attr( "class", "selectedClass" );//KEEP SELECTEDCLASS ON CLICKED STATE
                        return classNames + " clicked";//temporarily keep the two clicked class instances
                        //SIBLINGS FUNCTION
                        $( this ).siblings( "g" ).attr( "class", function( index, classNames ) {//gets their class attribute and checks for existing classes on them
                            if ( typeof classNames != "undefined" ) {//if there are existing classes, i.e., selectedClass, on the siblings, then...
                                return classNames.replace( "clicked", "");//DEFAULT BEHAVIOR: discard existing clicked class on both event handlers. this line returns both the selected and clicked classes, then discards just the clicked
                            }
                        });//closing for $( this ).siblings( "g" ).attr( "class", function( index, classNames ) {
                    }

                    //CONDITION: ELSE, IF USER CLICKS ON A STATE THAT IS NOT ONE OF THE SELECTED STATES
                    else {//else, if typeof classNames is undefined, meaning there aren't any existing classes, then...
                        console.log ("TRUE: else, if this clicked state's attr class does not == selectedClass");
                        $( this ).attr( "class", "clicked" ).siblings( "g" ).removeAttr( "class" );//add clicked to this. on siblings, DEFAULT BEHAVIOR: discard existing clicked class on both event handlers, discard existing selected class

                        //CONDITION: IF SELECTED CLASS DOESN'T EXIST (means same as line explanation comment on line 119 but this wording matches wording in EventHandlerConditionals.txt)
                        $( "#productOptions" ).find( "option:first" ).attr( "selected", "selected" );//RESET DROP DOWN MENU TO DEFAULT VALUE
                    }

                });//closing for $( this ).attr( "class", function( index, classNames ) {

                //Continue data parsing which began with $.each so that we can create text objects to display in text box below the map.
                clickedState = ( this.id );
                // console.log( "var clickedState is " + clickedState );
                var selected = $( "#productOptions option:selected" ).text();
                
                //INVOKE JSONKEY MODULE MAKER HERE
                
                if ( jsonKey == clickedState ) {
                    console.log( "clickedState ID " + clickedState + " MATCHES key: " + jsonKey + ". Call contacts module creator." );
                    // console.log("productTypes line 149",productTypes);
                                    
                    //INVOKE MODULE MAKER HERE - Exercise closure. By invoking this function, we create a module whose ~inner property methods can get accessed outside of scope where they were declared.
                    // This module maker is far from working correctly at this time
                    // function seekTheOne( answer ) { //my module maker function is also my loop's helper function that will deliver another function that binds to the current value of i
                        
                    //     var All = "value if...";
                    //     var theOne = "value if...";

                    //     productTypes.forEach( function( entry ) { 

                    //         if ( selected.indexOf( entry ) == -1 ){
                    //             console.log ( "selected " + selected + " doesn't match this contact's productTypes (line 145)" );

                    //             function All(){
                    //                 var allContacts = {};
                    //                 allContacts = contacts;
                    //                 console.log( "line  allContacts", allContacts );//
                    //             }

                    //             var answer = All(); //~~~return All; doesn't return to seekTheOne(). jQuery collection may be needed.
                    //         } //closing for if                    

                    //         else {//else, if element exists...i.e., // else, if productTypes contains selected, return that one contact.
                    //             console.log( "selected IS in productTypes (line )" );   

                    //             function theOne(){                                    
                    //                 var contact = {};
                    //                 contact = ( [obj] );
                    //                 console.log( "line  contact", contact );
                    //             }

                    //             var answer = theOne(); //~~~return theOne; doesn't return to seekTheOne(). jQuery collection may be needed.
                    //         } //closing for else

                    //     }); //closing for productTypes.forEach( function( entry ) {
                        
                    // } //closing for function seekTheOne(){

                    // seekTheOne();

                    // var come1orAll = seekTheOne();

                    // console.log(come1orAll()); 

                    //var obj = come1orAll();
                    // if you end up needing to use an identifier other than obj, you'll need to change obj's below

                    //initialize text object                        
                    var theText = "<dl class ='agency " + key + "'>" + val.agency + "</dl>";//<dl> tag defines a description list

                    //plan a: invoke come1orAll() here
                    //  save returned value to a var. test to see what productTypes is. i hope obj will still reference both theOne and All.; 

                    //plan b: use object.create (Crockford: beget method) to build theText object from come1orAll()'s returned object
                    var productTypesText = " ";//is string
                    productTypesText += productTypes;//~does this reference the given obj?~ the addition assignment operator adds the value of the right operand to a variable and assigns the result to the variable.
                    productTypesText = productTypesText.replace( /,/g , "<br/>" );//g stands for global, replace all matches, not just the first one. makes it a regular expression
                    // console.log( productTypesText );
                    // console.log ( typeof productTypesText );

                    //objects for 5 non-participating states are empty strings.
                    var firstLast = ( obj.firstLast );
                    // console.log( firstLast );

                    if ( firstLast !== " " ){//if firstLast obj is not an empty string, then...

                        var title = ( obj.title );
                        // console.log ( title );
                        var phone = ( obj.phone );
                        // console.log ( phone );
                        var email = ( obj.email );
                        // console.log ( email );

                        //concatenate text objects
                        theText += "<dt class='contacts'>" + firstLast + ", " + title + ", " + phone + ", " + email + "</dt>";//<dt> tag defines a term/name in the <dl> description list
                        theText += "<dd class='productTypes'>" + productTypesText + "</dd>";//<dd> tag describes each <dt> term/name
                    }

                    else {//else, if firstLast obj is an empty string, then...

                        var theMessage = ( obj.productTypes );//place a message where the productTypes obj would have been
                        console.log( theMessage );
                        theText += "<dt class='contacts'>" + theMessage + "</dt>";//yes, I want the message I wrote into ntpepInfo.xlsx's productTypes cell to be displayed in the contacts class.
                    }

                    $( "#txtDOT" ).html( theText );

                }//closing for if ( jsonKey == clickedState ){ 
            
            });//closing for $( "g" )on( "click", function(e){ i.e., CLOSES THE CLICK EVENT HANDLER.-----           
        
        });//CLOSING .EACH HERE   

    })();//closing for var get = (function GetModule() {
  
  });//closing for $.getJSON( "stateInfoList.json", function( data ){

});//closing for $(document).ready(function(){