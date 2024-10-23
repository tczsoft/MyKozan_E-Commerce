/* eslint-disable react/prop-types */

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { useEffect, useState } from 'react';

import { getFilterOptions } from '../../services/apiproducts/apiproducts';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import moment from 'moment-timezone';
import apiurl from '../../../../Shared/Services/api/apiendpoint';

const Tableview = (props) => {
  const { tabledata, editfrom, handledelete, cusfilter, filtervalues, onPage, page } = props

  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    setTempFilterValues(filtervalues);
  }, [filtervalues]);

  const actionbotton = (rowData) => {
    return (
      <div className="flex gap-2">
        <button onClick={() => editfrom(rowData)} className="inline-flex items-center text-xl font-medium text-blue-600 gap-x-1 decoration-2 " >
          <i className="fi fi-rr-pen-circle"></i>
        </button>
        <button onClick={() => handledelete(rowData?._id)} className="inline-flex items-center text-xl font-medium text-red-600 gap-x-1 decoration-2 " >
          <i className="fi fi-rr-trash"></i>
        </button>
      </div>
    )
  }

  const image = (rowData) => {
    return (
      <div className="flex gap-4 ">
        <img src={`${apiurl()}/${rowData['Images'][0]}`} className='rounded-xl  object-cover' />
      </div>
    )
  }

  const description = (rowData) => {
    return (
      <div className='p-2' dangerouslySetInnerHTML={
        { __html: rowData.Product_Description }
      } />
    )
  }

  const name = (rowData) => {
    return (
      <div>
          {rowData.Product_Name}
      </div>
    )
  }







  const handleApplyFilters = (key) => {
    cusfilter(key, tempFilterValues[key]);
    onPage(page);
  };

  const handleClearFilters = (key) => {
    setTempFilterValues(prev => ({ ...prev, [key]: null }));
    cusfilter(key, null);
    onPage(page);
  };

  const getOption = async (key) => {
    var filterOptions = await getFilterOptions(key.field);
    var formatoption = filterOptions[key.field].map(val => ({ label: val, value: key.format == "Date" ? moment(val).format('YYYY-MM-DD') : val }));
    setFilterOptions(formatoption);
  }

  const Filter = (key) => (
    <div onClick={() => getOption(key)}>
      <MultiSelect value={tempFilterValues[key.field]} options={filterOptions} optionLabel="value" className="p-column-filter" virtualScrollerOptions={{ itemSize: 43 }} maxSelectedLabels={1}
        filter onChange={(e) => setTempFilterValues(prev => ({ ...prev, [key.field]: e.value }))} placeholder={`Select ${key.field.charAt(0).toUpperCase() + key.field.slice(1)}`}
        panelFooterTemplate={
          <div className="flex justify-between p-2 mt-2">
            <Button label="Clear" onClick={() => handleClearFilters(key.field)} className="p-1 text-white bg-blue-500 w-[45%]" />
            <Button label="Apply" onClick={() => handleApplyFilters(key.field)} className="p-1 mx-1 text-white bg-blue-500 w-[45%]" />
          </div>
        }
      />
    </div>
  );

  const columns = [
    // { field: 'Product_Name', header: 'Product Name', filter: true },
    // { field: 'Product_Description', header: 'Description', },
    { field: 'Regular_Price', header: 'Regular Price' },
    { field: 'Sale_Price', header: 'Sale Price' },
    { field: 'Discount', header: 'Discount' },
    { field: 'TAX_Percentage', header: 'TAX Percentage' },
    { field: 'Avail_Stock', header: 'Avail Stock' },
    { field: 'Item_Code', header: 'Item_Code' },
    { field: 'Status', header: 'Status', filter: true }
  ];

  return (
    <div >
      <div >
        <DataTable rowClassName={() => 'border-b border-secondary'} selectionMode="single" value={tabledata} scrollable scrollHeight="680px" className='!text-sm' stateStorage="session" stateKey="dt-state-demo-local" >
          <Column header="Action" body={actionbotton} />
          <Column header="Images" body={image} />
          <Column header="Product Name" body={name} />
          <Column header="Description" body={description} />


          {columns.map((col, i) => (
            <Column key={i} field={col.field} header={col.header} filter={col.filter} filterElement={Filter(col)} showFilterMenuOptions={false} showApplyButton={false} showClearButton={false} showFilterMatchModes={false} />
          ))}

        </DataTable>
      </div>
    </div>
  )
}

export default Tableview;