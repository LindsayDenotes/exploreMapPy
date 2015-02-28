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
    # print '\nHeaders are: %s' % pformat(headers)
    print 'headers.values()',headers.values()
    
    # ~ Extract values from the rest of rows of worksheet
    values = make_values(worksheet)
    # print '\nValues are: %s' % pformat(values)
    print '\nvalues.values()',values.values()

    # ~headersList = [] # ~ I thought I had to instantiate new lists for headers and values in order to zip them, but no needed so far
    # ~valuesList = []
    # ~keysValsList = []

    for (key,val) in zip( headers.values(),values.values() ):
        print "key:{0}\tval:{1}".format(key,val)

        # ~keysValsList = keysValsList.extend(key,val) # ~ no success b/c extend only takes one argument, said console
        # ~print 'keysValsList',keysValsList


    # Output will be a list of dictionaries which will be written to JSON.    # ~ Does this apply only to the make_headers function? I'd like it to include all functions I create including make_values function
    output = [] # ~ dicts produced by this script so far (2/28/15): headers, values

    
    
    # Main processing loop, starts with second row
    row_idx = 1

    # Loop over rows
    while row_idx < worksheet.nrows:
        cell_idx = 0 # ~ this is the header cell, agency, or is it the first row down value, Alabama Department of Transportation? 
        row_dict = {}
        while cell_idx < worksheet.ncols:
            header = headers[cell_idx] # ~ does this put headers into a list?
            value = worksheet.cell_value(row_idx, cell_idx) # ~ what does this line do? 2/28 this line is first time 'cell_value' is mentioned

            # Example of processing a specific column 
            # ~ crf: store each productType header such as this one into a var # ~if stuck in loop, check your conditions
            # ~ for purpose telling python not to return a value for empty cells, the make_headers and make_values functions already do that.
            # ~ if I wanted to do that here in the main processing loop instead, I could replace all these if statements with...nothing
            # ~ if I wanted to create the contacts tab using a python script, maybe I can read from ntpepData and use these if statements to push productType into a new list

            
            # if header == 'portland_cement_concrete_joint_sealants_pcc_js': 
            #     if value == 'No':
            #         value = 0
            #     else:
            #         value = 1

            # if header == 'portable_changeable_message_signs_and_flashing_arrow_panels_pcms_fap': 
            #     if value == 'No':
            #         value = 0
            #     else:
            #         value = 1

            # if header == 'polymer_concrete_overlays_pco': 
            #     if value == 'No':
            #         value = 0
            #     else:
            #         value = 1

            # if header == 'concrete_coatings_systems_ccs_only': 
            #     if value == 'No':
            #         value = 0
            #     else:
            #         value = 1

            # if header == 'polypropylene_pipe_ppp': 
            #     if value == 'No':
            #         value = 0
            #     else:
            #         value = 1

            #  if header == 'polyvinyl_chloride_drainage_pipe_pvc': 
            #     if value == 'No':
            #         value = 0
            #     else:
            #         value = 1       




            # Example of splitting a column for json
            # if header == 'producttypes':
            #     value = value.split(',')

            row_dict[header] = value
            cell_idx += 1

        # print 'Processed row: %s' % pformat(row_dict)
    
    # Write the data to JSON
    with open(OUTPUT_FILE, 'w') as f: #~do I need to rename OUTPUT_FILE to processed_data?
        json.dump(output, f)



def make_headers(worksheet):
    """Make headers"""
    headers = {}
    cell_idx = 0
    while cell_idx < worksheet.ncols:
        cell_type = worksheet.cell_type(0, cell_idx) # ~ cell type 0 is cell with no value, cell type 1 is cell with value
        cell_value = worksheet.cell_value(0, cell_idx)
        cell_value = slugify(cell_value).replace('-', '_')
        if cell_type == 1:
            headers[cell_idx] = cell_value
        cell_idx += 1

    return headers


def make_values(worksheet):
    """Make values"""
    values = {}
    cell_idx = 0 # ~ 1 refers to the 2nd column; 1 = asphalt_release_agents_ara
    while cell_idx < worksheet.ncols:
        cell_type = worksheet.cell_type(0, cell_idx) # ~ cell type 0 is cell with no value, cell type 1 is cell with value
        cell_value = worksheet.cell_value(1, cell_idx)
        #cell_value = slugify(cell_value).replace('-', '_')
        if cell_type == 1:
            values[cell_idx] = cell_value
        cell_idx += 1

    return values



# This allows the script to be run from the command line
if __name__ == "__main__":
    process_data()


