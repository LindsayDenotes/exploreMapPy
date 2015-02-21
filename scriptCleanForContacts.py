import xlrd #davideads@gmail.com email the excel workbook when you email him. this function is a starting point for rearranging column values and writing into new file.
# for your twenty headers, write if, and 19 if elif's
# source: https://github.com/nprapps/leso/blob/master/util.py

def clean_data(worksheet, writer, headers, datemode):
    row_idx = 1
    while row_idx < worksheet.nrows:
        cell_idx = 0
        row_dict = {}
        while cell_idx < worksheet.ncols:
            try:
                header = headers[cell_idx]
            except KeyError:
                cell_idx += 1
                continue

            if header == "ship_date":
                # clean date
                try:
                    cell_value = int(worksheet.cell_value(row_idx, cell_idx))
                    if cell_value > 20000000:
                        # turn into string and parse as YYYYMMDD
                        cell_value = str(cell_value)
                        cell_value = datetime.strptime(cell_value, "%Y%m%d")
                    else:
                        parts = xlrd.xldate_as_tuple(cell_value, datemode)
                        cell_value = datetime(*parts)
                except ValueError:
                    cell_value = None

            elif header == 'nsn':
                cell_value = str(worksheet.cell_value(row_idx, cell_idx))
                id_prefix = cell_value.split('-')[0]
                row_dict['federal_supply_class'] = id_prefix

                federal_supply_category = id_prefix[:2]
                row_dict['federal_supply_category'] = federal_supply_category

            elif header == "quantity":
                try:
                    cell_value = int(worksheet.cell_value(row_idx, cell_idx))
                except ValueError:
                    cell_value = None

            else:
                try:
                    # Strings
                    cell_value = worksheet.cell_value(row_idx, cell_idx).strip()
                except AttributeError:
                    # Numbers
                    cell_value = worksheet.cell_value(row_idx, cell_idx)
            row_dict[header] = cell_value
            cell_idx += 1

        writer.writerow(row_dict)
        row_idx += 1