$(document).ready(function(){

    var items = {};
    $.getJSON( "stateInfoList.json", function( data ) {
      console.log (data);//whole JSON object //revisiting on 2/1/15 Am I actually "loading" all 52 state DOTs? That sounds expensive for bandwidth. Is this necessary in order to use .each( ) in the loop below?

        $( "g" ).on( "click", function (e) {
          console.log("user clicked " + this.id);

        $( this ).attr( "class", "clicked" ).siblings( "g" ).removeAttr( "class","clicked" );

        selectedState = ( this.id );
          console.log( "so var selectedState is " + selectedState );

                 $.each ( data, function( key, val ){
                   console.log ( key, val );//key is "nh" or "fl", val is whats inside json's { }s

                    var jsonKey = ( key );
                      console.log ( "this is one state key: " + jsonKey );

                       if (jsonKey == selectedState){
                        console.log( "selectedState ID " + selectedState + " MATCHES key: " + jsonKey + ". Return that value." );
                        console.log( val.contacts );

                        //var productTypes = []
                        productTypes = ( val.contacts.info.productTypes );
                          console.log(productTypes);

                          $("#txtDOT").html("<p id='agency " + key + "'>" + val.agency + "</p>"); //2/1/15  changed from state to agency
                          $("#txtDOT").append("<p id='productTypes'>" + val.contacts.info.productTypes + "</p>");

                       }

                       else {
                       console.log("selectedState ID " + selectedState + " does NOT match key: " + jsonKey)
                       }

                });

                /*jQuery Selector $() function w optional 2nd parameter to do a search within an event handler
                $("g").on("click", function (e) {//Using e is just a short for event. You can pass any variable name you desire.
                     var $e = $(e.target);//target is #txtDOT
                     clicked.css("background", "red");
                });
                */
        });

    });

});

