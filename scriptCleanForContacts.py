#!/usr/bin/env python

import xlrd     # Library that processes excel files
import json     # Library for processing / writing JSON

from slugify import slugify  # Library to slugify strings
from pprint import pformat, pprint   # Pretty print output

# File to be processed
IMPORT_FILE = 'ntpepInfo.xls' # not .xlsx
OUTPUT_FILE = 'stateInfoList.json'

def process_data():
    """
    The main processing function.
    """
    # Open the file
    workbook = xlrd.open_workbook(IMPORT_FILE)
    # Datemode is required for processing dates in Excel files
    datemode = workbook.datemode

    worksheet = workbook.sheet_by_name('contacts')
       
    # Extract headers from first row of worksheet
    # headers = make_headers(worksheet)
    # print '\nHeaders are: %s' % pformat(headers)
    # print 'headers.values()',headers.values()
    
    # getting number or rows and setting current row as 0 -e.g first
    num_rows, curr_row = worksheet.nrows - 1, 0
    # retrieving keys values(first row values)
    keys = [x.value for x in worksheet.row(0)] # creates [u'abb', u'agency', u'firstLast', u'first', u'Last', u'title', u'phone', u'email', u'productTypes']
    # print "keys",keys
    # building dict, the whole JSON object
    data = dict((x, []) for x in keys)
    # iterating through all rows and fulfilling our dictionary
    while curr_row < num_rows:
        curr_row += 1
        for idx, val in enumerate(worksheet.row(curr_row)):
            if val.value.title():
                data[keys[idx]].append(val.value) # this would have been final line in unaltered function followed by print and return data
                colValuesList = []
                colValuesList = data[keys[idx]]
                colValuesList.append(val.value)
            # print "colValuesList idx:{0} len:{1} {2}".format(idx,len(colValuesList),colValuesList) # def don't delete this line and block above, even if you comment out
            # Note: I had to put spaces in cells without values and replace .strip with .title in order to have empty strings returned
    
    # Why aren't column indices in the order they appear in the Excel worksheet? Liz said proly something goofy in my data. 
    # [0] abb (correct), [1] Last, [2] title, [3] productType, [4] agency, [5] firstLast, [6] phone (correct), [7] email (correct), [8] first
    abbsList = data.values()[0]
    # print "\nabbsList",len(abbsList) #len284 without set. len51 set.
    agencyList = data.values()[4]
    # print "\nagencyList", len(agencyList) #len284 without set. len51 set.
    firstLastList = data.values()[5]  # list not returning the 5 empty strings and that's okay because the other 3 lists won't return them either so these 4 can be zipped
    # print "\nfirstLastList", len(firstLastList) # len 274 without set. len137 with set
    titleList = data.values()[2] 
    # print "\ntitleList", len(titleList) #len274 without set. len127 set, should be 137, there must be dup titles.
    phoneList = data.values()[6] 
    # print "\nphoneList", len(phoneList) #len274 without set. len135 set, should be 137, there must be dup phones. 
    emailList = data.values()[7] 
    # print "\nemailList", len(emailList) #len274 without set. len134 set, should be 137, there must be dup emails. 
    productTypes = data.values()[3]

        
    allHeaders = zip(abbsList,agencyList,firstLastList,titleList,phoneList,emailList,productTypes)
    # print allHeaders
    allHeaders = set(allHeaders)

    dotDict = {}

    for row in allHeaders:
        abb,agency,firstLast,title,phone,email,productsString = row
        if abb not in dotDict:
            dotDict[abb] = {"agency": agency, "contacts":[]}
        contact = {"firstLast": firstLast, "title": title, "phone": phone, "email": email}
        products = productsString.split(",")
        contact["productTypes"] = products
        dotDict[abb]["contacts"].append(contact)

    # print dotDict
    pprint(dotDict)
    return dotDict
 
# data = process_data() 
# output = []
# output = output.append(data)


# This allows the script to be run from the command line
if __name__ == "__main__":
    data = process_data()
    # Write the data to JSON
    with open(OUTPUT_FILE, 'w') as f: 
        json.dump(data, f)    



