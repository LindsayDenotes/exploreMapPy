with open("productTypes.csv", "r") as products_file:
	products = products_file.read().replace("\r","\n")
	products = products.replace("_"," ")
	products = products.replace("and", "&")
	products = products.split("\n")
	# print products # printed ['ARA,Asphalt_Release_Agents_(ARA)', 'CADD,Concrete_Admixtures_(CADD)',...
	for index, product in enumerate(products):
		products[index] = product.split(",")
	print products #printed [['ARA', 'Asphalt_Release_Agents_(ARA)'], ['CADD', 'Concrete_Admixtures_(CADD)'],...
	
with open("productMenu.html", "w") as writeMenu_file:
	writeMenu_file.write("<select id='productOptions'>\n")
	writeMenu_file.write("<option selected='selected'>Select a product type to see which states use NTPEP data to evaluate it.</option>\n")
	for abb, productType in products:
		writeMenu_file.write("<option id={0}> {1} </option>\n".format(abb, productType))
	writeMenu_file.write("</select>")

