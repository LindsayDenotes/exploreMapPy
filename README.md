# exploreMapPy

NTPEP is a public-private partnership run by my current employer, AASHTO. This tool allows NTPEP's state DOT members and private industry participants to retrieve product type information about every state DOT that participates in the program. It also displays contact information for the appropriate subject matter expert at each state DOT. I conducted the survey to gather this information from the 52 state DOTs. I created this interactive map from concept through to implementation to reduce the high volume of phone call inquiries NTPEP's staff of 5 employees was struggling to keep up with. This second version of the interactive map, completed in July 2015, includes click functionality as opposed to hover, and a drop down menu through which users can select a product type and then those states which use NTPEP for that product type are indicated by turning white. The first version of the map had no drop down menu and so prevented users from discovering which states used a certain product type unless they had the time to click on each state one-by-one. Prior to my interactive map, NTPEP used 15 or so static separate maps on separate web pages to convey the product usage information displayed in this single page web application. Further, the static maps did not contain contact information for the subject matter experts at each state DOT.

To see the first version of my interactive map, please visit denotetoday.com. I began building the second version in a project on my GitHub account entitled "exploreMap,"which served as a proof of concept. I hardcoded the JSON for two test state DOTs. In order to organize my data for all 52 states DOTs, I joined HearMeCode, a group that teaches Python to women in Washington, DC, and I used Python to read from the Excel workbook and write to a JSON file.

In future versions of this interactive map, if time permits, I will create an SQL database. As far as the SQL approach, I need to ask iEngineering more about what version of SQL they are using before I attempt to create my own SQL database.
