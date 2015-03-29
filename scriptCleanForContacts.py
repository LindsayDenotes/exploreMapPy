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
        firstLastList = list( data.values()[5] ) # list not returning the 5 empty strings and that's okay because the other 3 list won't return them either so they will all be zippable
        # print "\nfirstLastList", len(firstLastList) # len137 with set, len 274 without set

        titleList = list( data.values()[2] )
        # print "\ntitleList", len(titleList) #len127, should be 137, but there must be dup titles.len274 without set

        phoneList = list( data.values()[6] )
        # print "\nphoneList", len(phoneList) #len135, should be 137, but there must be dup phones. len274 without set

        emailList = list( data.values()[7] )
        # print "\nemailList", emailList #len134, should be 137, but there must be dup emails. len 274 withoutset
        
        
        abbsList = list(set( data.values()[0] ))
        # print "\nabbsList",abbsList
        # print data.values()[4] 
        agencyList = list(set( data.values()[4] )) 
        # print "\nagencyList", agencyList
        
        # Create dict from abbsList where item becomes key, separate empty dicts become values. I used a dictionary comprehension instead of .dict()
        abbsDict = {k: {} for k in abbsList[0:51]}  # Goal 1 completed. Goal 2: insert agency header and agency values into the 51 empty dicts being created by this line
        # print "\nabbsDict",abbsDict

        idx = 0
        for state in abbsDict: # this gives keys
            abbsDict[state] = {'agency': agencyList[idx]}
            idx += 1

        contacts = [] # Goal 3: add contacts to stateDicts. Goal 3 completed by adding empty contacts list to stateDicts by modifying for loop beneath this while loop.
        # Next, loop through column key and values to make dicts holding zipped keys and values for firstLast, title, phone, email. Will make productTypes last.
        # for blah in blahList: # no list items yet. within this while loop, append, update, or somehow populate the firstLast dicts into this contacts list 
        
    # Outside while loop
    fLtpeList = zip(data.values()[5], data.values()[2], data.values()[6], data.values()[7])
    # print "fLtpeList", fLtpeList
    fLtpeSets = set(fLtpeList) # removed dups
    # [0] abb, [1] Last, [2] title, [3] product, [4] agency, [5] firstLast, [6] phone (correct), [7] email (correct), [8] first
    firstLastDict = {} 
    for fLtpeGroup in fLtpeSets: # this gives keys
        firstLastDict[fLtpeGroup[0]] = {"firstLast": fLtpeGroup[0], "title": fLtpeGroup[1], "phone": fLtpeGroup[2], "email": fLtpeGroup[3]}
    print "\nfirstLastDict", firstLastDict

    
    # print "\nabbsDict",abbsDict # the agency is mismatched to main state abb key. Fixed below by zipping each list, then removing dups 
    abAg = zip(data.values()[0], data.values()[4])
    # print "abAg", abAg  
    abAgSets = set(abAg) # removed dups
        
    stateDict = {}
    for abAgPair in abAgSets:
        stateDict[abAgPair[0]] = {"agency": abAgPair[1], "contacts": contacts} 
    # print "\nstateDict",stateDict      
        
        
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
    


