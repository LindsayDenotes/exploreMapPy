#!/usr/bin/env python

import xlrd     # Library that processes excel files
import json     # Library for processing / writing JSON

from slugify import slugify  # Library to slugify strings
from pprint import pformat   # Pretty print output

# File to be processed
IMPORT_FILE = 'ntpepData.xlsx'
OUTPUT_FILE = 'processed_data.json'

def process_data():
    """
    The main processing function.
    """

    # Open the file
    workbook = xlrd.open_workbook(IMPORT_FILE)

    # Datemode is required for processing dates in Excel files
    datemode = workbook.datemode

    worksheet = workbook.sheet_by_name('ntpepData')

    # Extract headers from first row of worksheet
    headers = make_headers(worksheet)
    print 'Headers are: %s' % pformat(headers)

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
            if header == 'polymer_concrete_overlays_pco':
                if value == 'No':
                    value = 0
                else:
                    value = 1

            row_dict[header] = value
            cell_idx += 1

        print 'Processed row: %s' % pformat(row_dict)

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

# This allows the script to be run from the command line
if __name__ == "__main__":
    process_data()


