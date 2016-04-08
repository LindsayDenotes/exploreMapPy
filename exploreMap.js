/*
Comments in all caps describe the event handler conditionals dealt with in that specific line or in the whole code block beneath the comment
Comments to the right of a line pertain to that line only and are usually an interpretation in plain English of what that line does
If I were to redo this code: 
1) add functionality to show upon click only the one contact at that state who matches the selected product type.
2) perhaps name and wrap functions in immediately invoked function expressions (not hoisting bc fns would be in same lexical scope)  
3) avoid pyramid of doom (select event handler has 4 levels of indentations; click has 5 levels. Eek! )

Please visit denotetoday.com to see the responsive CSS version of this project

IDENTIFY FUNC INVOCATIONS, HIGHER ORDER FUNCS, AND THEIR CALLBACK FUNCS
*/

$( document ).ready( function(){
    var json = {};
      $.getJSON( "stateInfoList.json", function( data ) {
        //console.log ( data );//whole JSON object loads on document ready

        //EVENT HANDLER FUNCTION (1 of 2): USER SELECTS FROM DROP DOWN MENU
        $( "#productOptions" ).on( "change", function(e) {

        $( this ).css({ "border-style": "solid", "border-color": "#333", "border-width": "1px", "outline": "1px dotted #333"});

        //Attributes methods. Selectors are classes.
            $( ".clicked" ).attr( "class", "" );//DEFAULT BEHAVIOR: discard existing clicked class on both event handlers
            $( ".selectedClass" ).attr( "class", "" );//discard the existing selected class.

        //Hide text box nested function
            $( "g" ).attr( "class", function( index, classNames ){
                if ( typeof classNames != "undefined" ) {//if any g has the clicked class instance on it...
        //          console.log( "clicked exists so show txtDOT" );
                    $( "#txtDOT" ).show();//show the text box
                }
                else {
                    console.log( "clicked doesn't exist so hide txtDOT" );
                    $( "#txtDOT" ).hide();//hide the text box; comes back when clicked class comes back
                }
            });

        //Text object creation and filter functionality for the drop down menu
            var selected = $( "#productOptions option:selected" ).text();
              console.log( "user selected " + selected );
        //      console.log( typeof selected );//string

            $.each ( data, function( key, val ){//parse JSON.
        //        console.log ( key, val.contacts );//key is "nh" or "fl", val is whats inside json's { }s

        //      var jsonKey = ( key );
        //          console.log ( "this is a state key: " + jsonKey );

                var contacts = [];
                contacts = ( val.contacts );
        //          console.log ( "Referenced by val.contacts, contacts are " + contacts );//logs contacts are [object object]. So crack into those with a forEach loop.

                    contacts.forEach( function( obj ){

                        var productTypes = [];
                        productTypes = ( obj.productTypes );
        //                    console.log( productTypes );//an array of strings. For Array objects, the toString method joins the array and returns one string containing each array element separated by commas.
        //                    console.log( typeof productTypes );//object

                        if( Object.prototype.toString.call( productTypes ) === "[object Array]" ) {//test to make sure it is a true array, not array-like object. a prototype function.
        //                   console.log ( "Array" );
                        }

                        //Iterate over each item in array and make object out of match
                        productTypes.forEach( function( entry ) { //.forEach replaced the .every method - executed the provided callback function once for each element present in the array ONLY until it found one where callback returned a falsy value (a value that becomes false when converted to a Boolean). If such an element was found, the every method immediately returned false.
        //                    console.log( entry );//entry is the element(s) from array
        //                    console.log ( typeof entry );//string
        //                    console.log ( selected );//my var, option the user selected from drop down menu
        //                    console.log ( typeof selected );//string

                            if ( selected.indexOf( entry ) == -1 ) {//if element doesn't exist...//returns either the index/number of the start point for the string or a -1 meaning it isn’t there.
        //                      console.log( "element doesn't exist" );
                            }
                            else {//else, if element exists...
        //                      console.log( "element found" );

                            var productKey = ( key );
        //                        console.log ( "productKey " + productKey );//presence of a productKey means that corresponding state shapes (#g's) should get styled via attr method.

                            //Block below defines the selected states group; i.e., the states that use the product type that the user selected from the drop down menu.
                            var $productStates =  $( "g" )//the $ in the var name indicates the var contains jQuery object(s) or is a jQuery collection.
                                .filter( function( index ) {//within the filter function, this refers to each DOM element in turn.
                                    if ( $( this ).attr( "id" ) == productKey ){//if the id of a g el matches a productKey
        //                                console.log ( this.id );//GOOD. logged or, mn, etc., i.e., the states that have the product type which user selected in the drop down menu
                                        return ( this.id );
                                    }
                                  })
        //                      console.log ( $productStates );
        //                      console.log ( typeof $productStates );//object; i.e., a jQuery collection of matched elements

                            $productStates.attr( "class", "selectedClass" );//add selectedClass attribute to the matched elements

                            }//closing for else {//else, if element exists...

                        });//closing for productTypes.forEach( function( entry ) {

                    });//closing for contacts.forEach( function( obj ){

            });//closing for $.each ( data, function( key, val ){

        });//closing for $( "#productOptions" ).on( "change", function (e){


        //EVENT HANDLER FUNCTION (2 of 2): USER CLICKS ON A STATE SHAPE
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


        //Data parsing and text object creation for text box below the map.
        clickedState = ( this.id );
//          console.log( "so var clickedState is " + clickedState );

        $.each( data, function( key, val ){
//            console.log ( key, val );//key is "nh" or "fl", val is whats inside json's { }s

            var jsonKey = ( key );
                console.log ( "this is a state key: " + jsonKey );

            if ( jsonKey == clickedState ){
//                console.log( "clickedState ID " + clickedState + " MATCHES key: " + jsonKey + ". Return that val." );

                  var contacts = [];
                  contacts = ( val.contacts );
//                      console.log ( "Referenced by val.contacts, contacts are " + contacts );


                  //text object creation
                  var theText = "<dl class ='agency " + key + "'>" + val.agency + "</dl>";//<dl> tag defines a description list

                    contacts.forEach( function( obj ){//The forEach() method executes a provided function once per array element.

                        var productTypes = [];//is an array
                        productTypes = ( obj.productTypes );//make the array into an object
//                            console.log( productTypes );
//                            console.log( typeof productTypes );//logged object


                        var productTypesText = " ";//is string
                        productTypesText += productTypes;//the addition assignment operator adds the value of the right operand to a variable and assigns the result to the variable.
                        productTypesText = productTypesText.replace( /,/g , "<br/>" );//g stands for global, replace all matches, not just the first one. makes it a regular expression
//                            console.log( productTypesText );
//                            console.log ( typeof productTypesText );//logged string

                        // if productTypesText contains selected, return val.contact                        
                        if ( $( "#productOptions option:selected" ) == productTypesText ) {
                            
                            function Expert(){
                                
                                var contact = {};
                                contact = ( [obj] );

                                function getExpert(){
                                    console.log ( "referenced by [obj], contact is " + contact );
                                }
                                //return contacts index to make obj for a single contact
                                return getExpert;
                            }

                            Expert = obj;

                        }

                        //obj for 5 non-participating states are empty strings.
                        var firstLast = ( obj.firstLast );
//                            console.log( firstLast );

                        if ( firstLast !== " " ){//if firstLast obj is not an empty string, then...

                        var title = ( obj.title );
//                            console.log ( title );

                        var phone = ( obj.phone );
//                            console.log ( phone );

                        var email = ( obj.email );
//                            console.log ( email );

                        //concatenate text objects
                        theText += "<dt class='contacts'>" + firstLast + ", " + title + ", " + phone + ", " + email + "</dt>";//<dt> tag defines a term/name in the <dl> description list
                        theText += "<dd class='productTypes'>" + productTypesText + "</dd>";//<dd> tag describes each <dt> term/name
                        }

                        else {//else, if firstLast obj is an empty string, then...

                        var theMessage = ( obj.productTypes );//place a message where the productTypes obj would have been
                            console.log( theMessage );
                        theText += "<dt class='contacts'>" + theMessage + "</dt>";//yes, I want the message I wrote into ntpepInfo.xlsx's productTypes cell to be displayed in the contacts class.
                        }

                    });

                  $( "#txtDOT" ).html( theText );
            }

            });//closing for $.each( data, function( key, val ){

        });//closing for $( "g" )on( "click", function(e){

      });//closing for $.getJSON( "stateInfoList.json", function( data ){

});//closing for $(document).ready(function(){