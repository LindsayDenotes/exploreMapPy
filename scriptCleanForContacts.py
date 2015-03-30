#!/usr/bin/env python

import xlrd     # Library that processes excel files
import json     # Library for processing / writing JSON

from slugify import slugify  # Library to slugify strings
from pprint import pformat   # Pretty print output

# File to be processed
IMPORT_FILE = 'ntpepInfo.xls' # not .xlsx
OUTPUT_FILE = 'processed_data.json'

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
            if val.value.strip():
                data[keys[idx]].append(val.value) # this would have been final line in unaltered function followed by print and return data
                colValuesList = []
                colValuesList = data[keys[idx]]
                colValuesList.append(val.value)
            # print "colValuesList idx:{0} len:{1} {2}".format(idx,len(colValuesList),colValuesList) # def don't delete this line and block above, even if you comment out
    # print "data.values()[0]",data.values()[0]
    # return data.values()[0] # wrote to processed_data.json

        # ~~~~~Why aren't column indices in their proper order? Liz said proly something goofy in my data~~~~~
        # [0] abb, [1] Last, [2] title, [3] product, [4] agency, [5] firstLast, [6] phone (correct), [7] email (correct), [8] first
        firstLastList = list( data.values()[5] ) # list not returning the 5 empty strings and that's okay because the other 3 lists won't return them either so these 4 can be zipped
        # print "\nfirstLastList", len(firstLastList) # len 274 without set. len137 with set
        titleList = list( data.values()[2] )
        # print "\ntitleList", len(titleList) #len274 without set. len127 set, should be 137, there must be dup titles.
        phoneList = list( data.values()[6] )
        # print "\nphoneList", len(phoneList) #len274 without set. len135 set, should be 137, there must be dup phones. 
        emailList = list( data.values()[7] )
        # print "\nemailList", len(emailList) #len274 without set. len134 set, should be 137, there must be dup emails. 
        
        abbsList = list( data.values()[0] )
        # print "\nabbsList",len(abbsList) #len284 without set. len51 set.
        agencyList = list( data.values()[4] ) 
        # print "\nagencyList", len(agencyList) #len284 without set. len51 set.
        
    # Create dict from abbsList where item becomes key, separate empty dicts become values. I used a dictionary comprehension instead of .dict()
        # abbsDict = {k: {} for k in abbsList[0:51]}  # Goal 1 completed. 51 empty dicts being created by this line
        # print "\nabbsDict",abbsDict
    # Goal 2: insert agency header and agency values into the 51 empty dicts
        # problem with the loop below is agency doesn't match with main key. Fixed beneath this while loop by zipping the abb and agency lists together, then removing dups
        # idx = 0
        # for state in abbsDict: # this gives keys
        #     abbsDict[state] = {'agency': agencyList[idx]}
        #     idx += 1
        # print "\nabbsDict", abbsDict
              
    # Outside while loop - zipping and then setting of lists made inside while loop, creating dicts
    # in first attempt loop above to create a dict, the agency was mismatched to main state abb key.  
    abAg = zip(data.values()[0], data.values()[4]) # this zip associates abb col with agency col; creates proper pairing
    # print "abAg", len(abAg)  #len 284
    abAgSets = set(abAg) # removed dups
    # print "abAgSets", len(abAgSets) #len 51   
    
    # Below is loop that creates dict with agency matched to main state abb key. possibly later, I'll add contactslist into this dictionary block
    stateDict = {}
    for abAgPair in abAgSets: # like saying, to create a key val pair from the set, zip list of abbs and agencies
        stateDict[abAgPair[0]] = {"agency": abAgPair[1]} # position 0 of this zipped list is abb, position 1 is agency. I removed "contactsList": contactsList
    # print "\nstateDict",stateDict      
        
    fLtpeList = zip(data.values()[5], data.values()[2], data.values()[6], data.values()[7]) # this zip associates these 4 cols with each other for the sub dict firstLastDict
    # print "fLtpeList", len(fLtpeList) # len 274
    fLtpeSets = set(fLtpeList) # removed dups
    # print "fLtpeSets", len(fLtpeSets) # len 137, which is number of rows exluding the 5 rows that don't have values. good.
    
    # Below is the loop that creates firstLastDicts that will be wrapped by contactsList
    firstLastDict = {} 
    for fLtpeGroup in fLtpeSets: # like saying, to create a key val pair from the zipped and set list of 4 cols
        firstLastDict[fLtpeGroup[0]] = {"firstLast": fLtpeGroup[0], "title": fLtpeGroup[1], "phone": fLtpeGroup[2], "email": fLtpeGroup[3]}
    print "\nfirstLastDict.values()", firstLastDict.values() #len137
    contactsList = firstLastDict.values() # maybe don't rename the list
    print "contactsList", len(contactsList)

    # Above, we linked agency to abb by zipping the two lists. Now try to link firstLastDict.values() len137 to agencyList len284
    agContacts = zip(agencyList,firstLastDict.values()) # HOLD IT! You can't count on a list made from a dict staying in order, right?
    print "agContacts", agContacts

    # for contact in agencyList:
    #     = firstLastDict.values()
    
    data = stateDict
    return data
            
    # {x: x**2 for x in (2, 4, 6)} # This line and what it returns on next line is food for thought
    # {2: 4, 4: 16, 6: 36}



    # failed block below. transform into a dictionary with the function dict(). but this only returned first letter of each abb.
    # abbs_dict = {}
    # abbs_dict = dict(data.values()[0])
    # print "abbs_dict", abbs_dict

    # failed block below.
    # print "abbs_dict",abbs_dict
    # for key,val in abbsList:
    #     item = key
    #     single_col_dict.update(item)
    # print "single_col_dict",single_col_dict

    # this block below may work for creating firstLast, title, phone, email, productTypes dicts, which may entail .zip( )
    # num_rows = worksheet.nrows - 1
    # curr_row = -1
    # while curr_row < num_rows:
    #     curr_row += 1
    #     row = worksheet.row(curr_row)
    #     rowValuesList = []
    #     rowValuesList.append(row)
    #     # print "\nrowValuesList", rowValuesList

        # single_col_dict = {} # create dict
        # # print "\nzip(keys,rowValuesList",zip(keys,rowValuesList)
        # for key, value in zip(keys,rowValuesList): #looping through zip list, returns keys and values as strings
        #     print "key is {0} and value[0] is {1}".format(key, value[0]) # prints key is abb and value is AL
            
        # abbVals = []
        # for abb in key,value[0]:
        #     value[0] = abb
        # # print "abb",abb
        # abbVals.append(abb)
        # print "abbVals",abbVals
                # single_col_dict.update(abb)
            # print "single_col_dict",single_col_dict
        

            # One abandoned attempt to narrow dict to include just rowValuesList[0], aka, 'abb' values
            # if key == 'abb':
            #     single_line_dict[value] = key #returns properties (key, value pairs, i.e., "labels" and "details") as dict
            # print "single_line_dict",single_line_dict

            

        
    # return data



                # print "idx,val.value", idx,val.value

                # abbsLists = []
                # if keys[idx] =='abb': # if condition
                #     abbsLists.append(val.value)
                # print "abbsLists",abbsLists
                # # uniqueAbbLists = list(set(abbsLists))
                # # print "uniqueAbbLists", uniqueAbbLists
                # # if val not in abbs: # The in operator can be used to check if an item is present in the 
                
                # single_line_dict = {} # create 
                # print "zip(keys,valValuesList",zip(keys,valValuesList) #keys not matching with vals # zip method returns as list
            
                # attempt to delete dups from dict that has dups
                # result = {}
                # for key,value in data():
                #     if value not in result.values():
                #         result[key] = value
                # print "value", value
                # print "result",result
                # return result



    # print "data",data
    # return data    
 
data = process_data() 
# output = []
# output = output.append(data)

# Write the data to JSON
with open(OUTPUT_FILE, 'w') as f: #~do I need to rename OUTPUT_FILE to processed_data?
    json.dump(data, f) # replaced output 


# def make_headers(worksheet):
#     """Make headers"""
#     headers = {}
#     cell_idx = 0
#     while cell_idx < worksheet.ncols:
#         cell_type = worksheet.cell_type(0, cell_idx) # ~ cell type 0 is cell with no value, cell type 1 is cell with value
#         cell_value = worksheet.cell_value(0, cell_idx)
#         cell_value = slugify(cell_value).replace('-', '_')
#         if cell_type == 1:
#             headers[cell_idx] = cell_value
#         cell_idx += 1

#     return headers


# def make_values(worksheet): # consider adding 2nd arg, num_rows as iter var here and cell_val line below
#     """Make values"""
#     values = {}
#     cell_idx = 0 # ~ 1 refers to the 2nd column; 
#     while cell_idx < worksheet.ncols:
#         cell_type = worksheet.cell_type(0, cell_idx) # ~ cell type 0 is cell with no value, cell type 1 is cell with value
#         cell_value = worksheet.cell_value(1, cell_idx) # ~ don't hardcode a number into first argument, make a var such as row_num or key
#         #cell_value = slugify(cell_value).replace('-', '_')
#         if cell_type == 1:
#             values[cell_idx] = cell_value
#         cell_idx += 1

#     return values


# This allows the script to be run from the command line
if __name__ == "__main__":
    process_data()
    


