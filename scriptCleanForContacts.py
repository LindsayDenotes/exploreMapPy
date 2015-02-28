#!/usr/bin/env python

import xlrd     # Library that processes excel files
import json     # Library for processing / writing JSON

from slugify import slugify  # Library to slugify strings
from pprint import pformat   # Pretty print output

# File to be processed
IMPORT_FILE = 'ntpepInfo.xlsx'
OUTPUT_FILE = 'processed_data.json'

def process_data():
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
    print '\nHeaders are: %s' % pformat(headers)
    
    # Exract values from the rest of rows of worksheet
    values = make_values(worksheet)
    print '\nValues are: %s' % pformat(values)




    # Output will be a list of dictionaries which will be written to JSON. ~Does this apply only to the make_headers function? I'd like it to include make_values function, too.
    output = []

    
    # Main processing loop, starts with second row
    row_idx = 1 # ~ 1 means there is a value there, right? doesn't mean second row? unaltered code from Eads didn't include any function for what to do with rows 1 through 52, right?

    # Loop over rows
    while row_idx < worksheet.nrows:
        cell_idx = 0 # ~ this is the header cell, agency, or is it the first row down value, Alabama Department of Transportation? 
        row_dict = {}
        while cell_idx < worksheet.ncols:
            header = headers[cell_idx]
            value = worksheet.cell_value(row_idx, cell_idx) # ~ what does this line do? 2/28 this line 46 is first time 'cell_value' is mentioned

            # Example of processing a specific column
            if header == 'polymer_concrete_overlays_pco': # crf: store each productType header such as this one into a var
                if value == 'No':
                    value = 0
                else:
                    value = 1


            # Example of splitting a column for json
            # if header == 'producttypes':
            #     value = value.split(',')

            row_dict[header] = value
            cell_idx += 1

        #print 'Processed row: %s' % pformat(row_dict)

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
        cell_value = slugify(cell_value).replace('-', '_')
        if cell_type == 1:
            headers[cell_idx] = cell_value
        cell_idx += 1

    return headers


def make_values(worksheet):
    """Make values"""
    values = {}
    cell_idx = 1 # ~ 1 refers to the 2nd column; 1 = asphalt_release_agents_ara
    while cell_idx < worksheet.ncols:
        cell_type = worksheet.cell_type(1, cell_idx)
        cell_value = worksheet.cell_value(1, cell_idx)
        #cell_value = slugify(cell_value).replace('-', '_')
        if cell_type == 1:
            values[cell_idx] = cell_value
        cell_idx += 1

    return values


# This allows the script to be run from the command line
if __name__ == "__main__":
    process_data()


