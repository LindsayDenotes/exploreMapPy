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

function toggleTextBox(index, classNames ){
    if ( typeof classNames != "undefined" ) {//if any g has the clicked class instance on it...
        $( "#txtDOT" ).show();//show the text box
    } else {
        console.log( "clicked doesn't exist so hide txtDOT" );
        $( "#txtDOT" ).hide();//hide the text box; comes back when clicked class comes back
    }
}

function dropDownHandler(data, e) {
    $(this).css({
        "border-style": "solid",
        "border-color": "#333",
        "border-width": "1px",
        "outline": "1px dotted #333"
    });

    //Attributes methods. Selectors are classes.
    $( ".clicked" ).attr( "class", "" );//DEFAULT BEHAVIOR: discard existing clicked class on both event handlers
    $( ".selectedClass" ).attr( "class", "" );//discard the existing selected class.

    //Hide text box nested function
    $( "g" ).attr( "class", toggleTextBox);

    $.each (data, highlightStates);//closing for $.each ( data, function( key, val ){
}

function highlightStates(key, val){
    var contacts = val.contacts;

    contacts.forEach( function( obj ){

        var productTypes = obj.productTypes;
        productTypes.forEach( function( entry ) {

            var selected = $( "#productOptions option:selected" ).text();

            if ( selected.indexOf( entry ) !== -1 ) {
                var $productStates =  $( "g" ).filter(function(index) {
                    if ( $( this ).attr( "id" ) == key ){
                        return ( this.id );
                    }
                })

                $productStates.attr( "class", "selectedClass" );//add selectedClass attribute to the matched elements
            }
        });//closing for productTypes.forEach( function( entry ) {

    });//closing for contacts.forEach( function( obj ){

}

function handleStateInfo(data) {

    //EVENT HANDLER FUNCTION (1 of 2): USER SELECTS FROM DROP DOWN MENU
    $( "#productOptions" ).on( "change", function(ev) {
        dropDownHandler(data, ev)
    });

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

        $.each( data, function( key, val ) {
            parseStateData(clickedState, key, val)
        });//closing for $.each( data, function( key, val ){

    });//closing for $( "g" )on( "click", function(e){
}

function parseStateData(clickedState, key, val) {

    var jsonKey = ( key );
        console.log ( "this is a state key: " + jsonKey );

    if ( jsonKey == clickedState ){

          var contacts = [];
          contacts = ( val.contacts );


          //text object creation
          var theText = "<dl class ='agency " + key + "'>" + val.agency + "</dl>";//<dl> tag defines a description list

            contacts.forEach( function( obj ){//The forEach() method executes a provided function once per array element.

                var productTypes = [];//is an array
                productTypes = ( obj.productTypes );//make the array into an object


                var productTypesText = " ";//is string
                productTypesText += productTypes;//the addition assignment operator adds the value of the right operand to a variable and assigns the result to the variable.
                productTypesText = productTypesText.replace( /,/g , "<br/>" );//g stands for global, replace all matches, not just the first one. makes it a regular expression

                // if productTypesText contains selected, return val.contact
                if ( $( "#productOptions option:selected" ) == productTypesText ) {

                    function Expert(){

                        var contact = {};
                        contact = ( [obj] );

                        function getExpert(){
                            console.log ( "referenced by [obj], contact is " + contact );
                        }
                        return getExpert;
                    }

                    Expert = obj;

                }

                //obj for 5 non-participating states are empty strings.
                var firstLast = ( obj.firstLast );

                if ( firstLast !== " " ){//if firstLast obj is not an empty string, then...

                var title = ( obj.title );

                var phone = ( obj.phone );

                var email = ( obj.email );

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
}

$( document ).ready( function(){
    $.getJSON( "stateInfoList.json", handleStateInfo);
})
