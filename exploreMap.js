$( document ).ready( function(){

    var json = {};
    $.getJSON( "stateInfoList.json", function( data ) {
      console.log ( data );//whole JSON object //revisiting on 2/1/15 Am I actually "loading" all 52 state DOTs? That sounds expensive for bandwidth. Is this necessary in order to use .each( ) in the loop below?

        $( "g" ).on( "click", function (e) {
          console.log( "user clicked " + this.id );

        $( this ).attr( "class", "clicked" ).siblings( "g" ).removeAttr( "class","clicked" );

        selectedState = ( this.id );
          console.log( "so var selectedState is " + selectedState );

                 $.each ( data, function( key, val ){
                   console.log ( key, val );//key is "nh" or "fl", val is whats inside json's { }s

                    var jsonKey = ( key );
                      console.log ( "this is a state key: " + jsonKey );

                       if (jsonKey == selectedState){
                        console.log( "selectedState ID " + selectedState + " MATCHES key: " + jsonKey + ". Return that val." );

                        var contacts = [];
                         contacts = ( val.contacts );
                          console.log ( "Referenced by val.contacts, contacts are " + contacts );

                           contacts.forEach(function(obj){
                            //console.log(obj.firstLast);
                            //console.log(obj.productTypes);
                            var productTypes = [];
                             productTypes = ( obj.productTypes );
                              console.log( productTypes );
                            var firstLast = (obj.firstLast);
                             console.log(firstLast);
                            });


                          $( "#txtDOT" ).html( "<p id='agency " + key + "'>" + val.agency + "</p>" ); //2/1/15  changed from state to agency
                          $( "#txtDOT" ).append( "<p id='productTypes'>" + val.contacts.productTypes + "</p>" );
                          $( "#txtDOT" ).append( "<p id ='firstLast'>" + val.contacts.firstLast + "</p>" );

                       }

                       else {
                       console.log( "selectedState ID " + selectedState + " does NOT match key: " + jsonKey + " , so don't return that val." )
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

