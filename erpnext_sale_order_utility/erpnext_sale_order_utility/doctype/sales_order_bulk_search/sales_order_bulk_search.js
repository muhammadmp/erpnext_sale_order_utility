// Copyright (c) 2023, muhammad mp and contributors
// For license information, please see license.txt

frappe.ui.form.on("Sales Order Bulk Search", {
	refresh(frm) {
        frm.disable_save();
		frm.page.set_primary_action('Export', () => {
			export_data(frm)
		});
	},
});


const export_data = frm => {
	let get_template_url = '/api/method/frappe.core.doctype.data_export.exporter.export_data';
	var datapass=''
	frappe.call({
		method:'erpnext_sales_order_utility.erpnext_sales_order_utility.doctype.sales_order_bulk_search.sales_order_bulk_search.read_excel_file',
		args:{upload_template:frm.doc.upload_template},
		async:false,
		callback:function(data){
			datapass = data.message
		}

	})
	var export_params = () => {
		
		let columns = {};
		columns = {"Sales Order":["naming_series","customer","customer_name","customer_no","order_type","company","transaction_date","delivery_date","po_no","po_date","tax_id","customer_address","address_display","contact_person","contact_display","contact_phone","contact_mobile","company_address","company_address_display","shipping_address_name","shipping_address","dispatch_address_name","dispatch_address","territory","currency","conversion_rate","selling_price_list","price_list_currency","plc_conversion_rate","ignore_pricing_rule","set_warehouse","posa_notes","notes_title","note_description","total_qty","base_total","base_net_total","total_net_weight","total","net_total","tax_category","shipping_rule","taxes_and_charges","exempt_from_sales_tax","other_charges_calculation","base_total_taxes_and_charges","total_taxes_and_charges","coupon_code","apply_discount_on","base_discount_amount","additional_discount_percentage","discount_amount","base_grand_total","base_rounding_adjustment","base_in_words","grand_total","rounding_adjustment","advance_paid","disable_rounded_total","payment_terms_template","tc_name","terms","is_internal_customer","represents_company","inter_company_order_reference","project","source","campaign","language","letter_head","select_print_heading","group_same_items","status","per_delivered","per_billed","sales_partner","amount_eligible_for_commission","commission_rate","total_commission","from_date","to_date","auto_repeat"],"Sales Order Item":["item_code","ensure_delivery_based_on_produced_serial_no","posa_notes","delivery_date","item_name","posa_row_id","description","qty","stock_uom","uom","conversion_factor","stock_qty","price_list_rate","base_price_list_rate","margin_type","margin_rate_or_amount","rate_with_margin","discount_percentage","discount_amount","base_rate_with_margin","rate","amount","item_tax_template","base_rate","base_amount","stock_uom_rate","is_free_item","grant_commission","net_rate","net_amount","base_net_rate","base_net_amount","billed_amt","valuation_rate","gross_profit","delivered_by_supplier","supplier","weight_per_unit","total_weight","weight_uom","warehouse","prevdoc_docname","against_blanket_order","blanket_order","blanket_order_rate","bom_no","projected_qty","actual_qty","ordered_qty","work_order_qty","delivered_qty","returned_qty","additional_notes","page_break","cost_center","project"],"Packed Item":["parent_item","item_code","item_name","description","warehouse","target_warehouse","conversion_factor","qty","rate","uom","serial_no","batch_no","actual_batch_qty","actual_qty","projected_qty","incoming_rate","page_break"],"Pricing Rule Detail":["pricing_rule","item_code","rule_applied"],"POS Offer Detail":["offer_name","row_id","apply_on","offer","items","give_item","give_item_row_id","offer_applied","coupon_based","coupon"],"POS Coupon Detail":["coupon_code","coupon","type","pos_offer","applied","customer"],"Sales Taxes and Charges":["charge_type","row_id","account_head","description","included_in_print_rate","included_in_paid_amount","cost_center","rate","account_currency","tax_amount","total","tax_amount_after_discount_amount","base_tax_amount","base_total","base_tax_amount_after_discount_amount"],"Payment Schedule":["payment_term","description","due_date","mode_of_payment","invoice_portion","discount_type","discount_date","discount","payment_amount","outstanding","paid_amount","discounted_amount","base_payment_amount"],"Sales Team":["sales_person","allocated_percentage","allocated_amount","commission_rate","incentives"]}
		return {
			doctype: 'Sales Order',
			select_columns: JSON.stringify(columns),
			filters: datapass,
			file_type: "Excel",
			template: true,
			with_data: 1
		};
	};

	open_url_post(get_template_url, export_params());
};
