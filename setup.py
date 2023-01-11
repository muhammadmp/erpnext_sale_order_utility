from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in erpnext_sale_order_utility/__init__.py
from erpnext_sale_order_utility import __version__ as version

setup(
	name="erpnext_sale_order_utility",
	version=version,
	description="Frappe App to Facilitate ERPNext Functionalities  of sale order",
	author="muhammad mp",
	author_email="mammuz77@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
