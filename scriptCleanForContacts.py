#!/usr/bin/env python

import xlrd     # Library that processes excel files
import json     # Library for processing / writing JSON

from slugify import slugify  # Library to slugify strings
from pprint import pformat   # Pretty print output          # ~ which of these two imports, slugify or pformat, are switching uppercase to lowercase?

# File to be processed
IMPORT_FILE = 'ntpepInfo.xlsx'
OUTPUT_FILE = 'processed_data.json' # ~ I changed to 'stateInfoList.json' from 'processed_data.json' then back again

def process_data(): # ~ I'm guessing ntpepInfo.xlsx does not need to be inserted into the brackets
    """
    The main processing function.
    """

    # Open the file
    workbook = xlrd.open_workbook(IMPORT_FILE)

    # Datemode is required for processing dates in Excel files
    datemode = workbook.datemode

    worksheet = workbook.sheet_by_name('ntpepInfo')

    # Extract headers from first row of worksheet
    headers = make_headers(worksheet)
    print 'Headers are: %s' % pformat(headers) # ~ %s tells Python to interpret input as a string. % tells Python to return remainder.

    # Output will be a list of dictionaries which will be written to JSON
    output = []

    # Main processing loop, starts with second row
    row_idx = 1

    # Loop over rows
    while row_idx < worksheet.nrows:
        cell_idx = 0
        row_dict = {}
        while cell_idx < worksheet.ncols:
            header = headers[cell_idx]
            value = worksheet.cell_value(row_idx, cell_idx)

            # Example of processing a specific column
            if header == 'Polymer_Concrete_Overlays_\(PCO\)':
                if value == 'No':
                    value = 0
                else:
                    value = 1 # ~ returned value should = the next 5 cells to the right of 'Yes.' (first, Last, title, phone, and email). Is this already done? How do this? # maybe try testing for null instead. if not null, pull in those 5 values from data dict.

            # Example of splitting a column for json 
            # ~ looking at ntpepInfo.xlsx rather than ntpepData.xlsx (which I erroneously indicated last weekend), I don't want to split any values that are inside the 20 product type columns, 
            # ~ but maybe instead I want to append the product types to a list, as if they were structured as they are in 2nd tab of ntpepData.xlsx (tab is called contacts)
            
            # if header == 'producttypes': # ~ i would need to write this new 'productTypes' list into the dict/json
            #     value = value.split(',')

            #     row_dict[header] = value
            #     cell_idx += 1

          # ~ if header == 'email':
                # ~ if value email is duplicated across the row...delete dups only after cataloguing which product types that individual is associated with.


        print 'Processed row: %s' % pformat(row_dict) # ~ %s means return as string


    # Write the data to JSON
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(output, f)


def make_headers(worksheet):
    """Make headers"""
    headers = {}
    cell_idx = 0
    while cell_idx < worksheet.ncols:
        cell_type = worksheet.cell_type(0, cell_idx)
        cell_value = worksheet.cell_value(0, cell_idx)
        cell_value = slugify(cell_value).replace('_',' ') # ~ I changed from ('-', '_'). ( )'s must be reserved characters. I put \ in front of ( and ) in the xlsx but it made no difference
        if cell_type == 1:
            headers[cell_idx] = cell_value
        cell_idx += 1

    return headers
    

# This allows the script to be run from the command line
if __name__ == "__main__":
    process_data()


