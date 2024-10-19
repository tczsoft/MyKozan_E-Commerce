/* eslint-disable react/prop-types */

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { useEffect, useState } from 'react';

import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { getFilterOptions } from '../../services/apicategory/apicategory';
import moment from 'moment-timezone';
import apiurl from '../../../../Shared/Services/api/apiendpoint';

const Tableview = (props) =>{

  const { tabledata,editfrom,handledelete,cusfilter,filtervalues,onPage,page }=props

  const [tempFilterValues, setTempFilterValues] = useState(filtervalues);
  const [filterOptions,setFilterOptions] = useState([]);

  useEffect(() => {
    setTempFilterValues(filtervalues);
  }, [filtervalues]);

  const actionbotton = (rowData) => {
    return (
      <div className="flex gap-2">
        <button onClick={()=>editfrom(rowData)} className="inline-flex items-center text-xl font-medium text-blue-600 gap-x-1 decoration-2 " >
        <i className="fi fi-rr-pen-circle"></i>
        </button>
        <button onClick={()=>handledelete(rowData?._id)} className="inline-flex items-center text-xl font-medium text-red-600 gap-x-1 decoration-2 " >
        <i className="fi fi-rr-trash"></i>
        </button>
      </div>
    )
  }

  const array = (rowData) => {
    return (
      <div className="flex gap-4">
        {rowData['Subcategories'] && rowData['Subcategories'].length > 0 && (
          <span>{rowData['Subcategories'].join(', ')}</span>
        )}
      </div>
    );
  };

  const image = (rowData) => {
    return (
      <div className="flex gap-4 ">
        <img src={`${apiurl()}/${rowData['Images'][0]}`}  className='rounded-xl h-[100px] w-[150px] object-cover' />
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

  const getOption = async (key)=>{
    var filterOptions = await getFilterOptions(key.field);
    var formatoption = filterOptions[key.field].map( val =>({ label:val,value: key.format == "Date"? moment(val).format('YYYY-MM-DD') :val}));
    setFilterOptions(formatoption);
  }

  const Filter = (key) => (
    <div onClick={()=>getOption(key)}>
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
    {field: 'Brand_Name', header: 'Brand Name',filter: true},
    {field: 'Category_Name', header: 'Category Name',filter: true},
    {field: 'Subcategories', header: 'Sub Categories', width: "200px", formattype:'array'},
    {field: 'Card_color', header: 'Card Color',filter: true},
    {field: 'Status', header: 'Status', filter: true}
  ];

  return(
    <div >
      <DataTable rowClassName={() => 'border-b border-secondary'}  selectionMode="single"  value={tabledata} scrollable scrollHeight="680px" className='!text-sm' stateStorage="session" stateKey="dt-state-demo-local" > 
        <Column header="Action"  body={actionbotton} />
        <Column header="Images"  body={image} />
        {columns.map((col, i) => (
          col.formattype == "array"?
          <Column key={i} header={col.header} field={col.field} style={{minWidth: col.width}} body={array} />:
          <Column key={i} field={col.field} header={col.header} filter={col.filter} filterElement={Filter(col)} showFilterMenuOptions={false} showApplyButton={false} showClearButton={false} showFilterMatchModes={false} />
        ))}
      </DataTable>
    </div>
  )
}

export default Tableview;