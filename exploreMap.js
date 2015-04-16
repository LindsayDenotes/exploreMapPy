$( document ).ready( function(){

    var json = {};
    $.getJSON( "stateInfoList.json", function( data ) {
      console.log ( data );//whole JSON object //revisiting on 2/1/15 Am I actually "loading" all 52 state DOTs? That sounds expensive for bandwidth. Is this necessary in order to use .each( ) in the loop below?

        $( "g" ).on( "click", function (e) {
          console.log( "user clicked " + this.id );

          $( this ).attr( "class", "clicked" ).siblings( "g" ).removeAttr( "class","clicked" ); //styling the selected svg shape

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


                          if ( jsonKey == co,hi,nm,sd,wy ){
                                console.log( jsonKey + "is one of those 5 empty states");

                                contacts.forEach( function( obj ){

                                    var theMessage = (obj);
                                    console.log( theMessage )

                                    theText += "<dt class='contacts'>" + contacts + "</dt>"
                                });
                          }

                          else {
                                contacts.forEach( function( obj ){

                                    var productTypes = [];
                                    productTypes = ( obj.productTypes );
                                    console.log( productTypes );//

                                    var productTypesText = " ";//how do I say, if empty string, return nothing? I don't want triple quotes.
                                    productTypesText += productTypes;
                                    productTypesText = productTypesText.replace(/,/g , "<br/>" );//Why do I have a triple quote in my HTML? g stands for global, replace all matches, and not just the first one. makes it a regular expression(?)
                                    console.log(productTypesText);//undefined for 5 states


                                    var firstLast = ( obj.firstLast );
                                    console.log( firstLast );//undefined for 5 states

                                    var title = ( obj.title );
                                    console.log ( title );//undefined for 5 states

                                    var phone = ( obj.phone );
                                    console.log ( phone );//undefined for 5 states

                                    var email = ( obj.email );
                                    console.log ( email );//undefined for 5 states

                                    theText += "<dt class='contacts'>" + firstLast + ", " + title + ", " + phone + ", " + email + "</dt>";
                                    theText += "<dd class='productTypes'>" + productTypesText + "</dd>";//make this a </br> to prevent extra space?

                                });
                          }
                $( "#txtDOT" ).html(theText);
                }

                else {
                //console.log( "selectedState ID " + selectedState + " does NOT match key: " + jsonKey + " , so don't return that val." )
                }

          });

        });

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

