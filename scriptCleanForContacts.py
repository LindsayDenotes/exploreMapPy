#!/usr/bin/env python

#import csv
import xlrd

# from slugify import slugify # where is slugify defined?

# from util import make_headers, clean_data #not needed because:
#  a) I'm skipping clean_data function
#  b) instead of importing make_headers, I copied, cut, and pasted from it. source: https://github.com/nprapps/leso/blob/master/util.py 

# Ready to quit on this Python script on 2/22/15 at 11:53 AM b/c there is too much I do not understand in this venture to use Python to consolidate product type columns into one column. 
    # What would I do with all the first, last, title, phone, email headers currently in ntpepInfo.xlsx?
    # It would take more time to strategize an automated solution and learn a function for getting rid of duplicate individuals than to copy, cut, and paste manually.
        # If I pick this back up: 
            # maybe use .zip() below the function def
            # maybe use .join() inside the function def
            # Riaz said "explore APIs." Try Google Refine.

#IMPORT_FILE = "ntpepInfo.xlsx" # maybe this line should instead be deleted and a with open statement should go below funtion definition

def make_headers(worksheet):
    """Make headers"""
    dictHeaders = {}
    cell_idx = 0
    while cell_idx < worksheet.ncols:
        
        if header == "Asphalt_Release_Agents_(ARA)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ") # I replaced "slugify(cell_value)" with "cell_value" b/c Where is slugify defined?
        
            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Concrete_Admixtures_(CADD)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Concrete_Curing_Compounds_(CCC)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Erosion_Control_Products_(ECP)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Geotextiles_and_Reinforced_Geosynthetics_(GTX/REGEO)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "High_Density_Polyethylene_Plastic_Pipe_(HDPE)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Hot-Mix_Asphalt_Crack_Sealers_(HMA_CS)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Pavement_Marking_Materials_(PMM)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Portland_Cement_Concrete_Joint_Sealants_(PCC_JS)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Portable_Changeable_Message_Signs and Flashing_Arrow_Panels_(PCMS-FAP)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Polymer_Concrete_Overlays_(PCO)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Protective_Coatings: Structural_Steel_Coatings and Concrete_Coating_Systems_(SSC-CCS)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Concrete_Coatings_Systems_(CCS)_ONLY":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Polypropylene_Pipe_(PPP)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Polyvinyl_Chloride_Drainage_Pipe_(PVC)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Raised_Pavement_Markers__Snowplowable_Raised_Pavement_Markers_(RPM-SRPM)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Rapid_Set_Concrete_Patch_Materials_(RSCPM)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Reinforcing_Steel and Welded_Wire_Reinforcement_(REBAR-WWR)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Sign_Sheeting_Materials_ and Roll_Up_Signs_(SSM-RUP)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        elif header == "Temporary_Traffic_Control_Devices_(TTCD)":
            cell_type = worksheet.cell_type(0, cell_idx)
            cell_value = worksheet.cell_value(0, cell_idx)
            cell_value = cell_value.replace("_"," ")

            if cell_type == 1:
                headers[cell_idx] = cell_value
            cell_idx += 1

        #else: # else is optional
            #whether here in the else statement or in a separate function, find a way to zip the twenty sets of first, last, title, email, and info into one set.

    # return headers #I'm too tired to figure out how to catch headers into var and put into dict.
    # print headers

        row_dict[header] = cell_value
        cell_idx += 1

    writer.writerow(row_dict)
    row_idx += 1

    return headers
    print headers

# with open("ntpepInfo.xlsx", "r") as ntpepInfo_file:
#     dictHeaders = make_headers(ntpepInfo_file) # ~ do i need to put in 2nd argument?
#     print "\ndictHeaders is", dictHeaders
#     print "\n"


# below: what's left in clean.py that I may use
   # f = open("src/leso.csv", "w")
   #  writer = csv.DictWriter(f, fieldnames=headers.values())
   #  writer.writeheader()
   #  for worksheet in worksheets:
   #      sheet = workbook.sheet_by_name(worksheet)
   #      clean_data(sheet, writer, headers, datemode)
