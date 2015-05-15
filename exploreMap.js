$( document ).ready( function(){

    var json = {};
    $.getJSON( "stateInfoList.json", function( data ) {
      console.log ( data );//whole JSON object

        $( "g" ).on( "click", function (e) {
          console.log( "user clicked " + this.id );

        // gets the class attribute and checks for existing classes
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

