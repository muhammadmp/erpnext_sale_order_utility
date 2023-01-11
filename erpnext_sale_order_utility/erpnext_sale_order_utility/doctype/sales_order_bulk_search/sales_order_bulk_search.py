# Copyright (c) 2023, muhammad mp and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import pandas

class SalesOrderBulkSearch(Document):
	pass

@frappe.whitelist()
def read_excel_file(upload_template):
	org = frappe.get_site_path()
	excel_data_df = pandas.read_excel(org+upload_template)
	list_so = excel_data_df['SalesOrder'].tolist()
	data = [["name","in",list_so]]
	return data