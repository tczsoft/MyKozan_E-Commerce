import { Dialog } from 'primereact/dialog';
import apiurl from '../../services/apiendpoint/apiendpoint';
import { Editor } from 'primereact/editor';


export default function Addandeditform(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata, handleupdate ,filteredSubcategories,selectedCategory,handleCategoryChange,categories,imageDataUrl} = props;
  
    return (
        <Dialog header="Product Details" visible={visible} onHide={() => setVisible(false)} className="!w-full lg:!w-[40rem]">
            <form onSubmit={!formdata?._id ? handlesave : handleupdate}>
                   <div className="mb-3">
                    <div className="flex items-center justify-center mb-3">
                    <label className="flex flex-col items-center justify-center w-[80%] h-55 sm:w-[40%] overflow-hidden sm:h-60 rounded-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            {
                                formdata?.Images ?
                                <img src={imageDataUrl?imageDataUrl:`${apiurl()}/${formdata?.Images[0]}`}  className='rounded-xl w-[150px] object-cover' />:
                                <div className="flex flex-col items-center justify-center pt-4 pb-5">
                                    <i className="fi fi-sr-mode-landscape"></i>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                </div>
                                
                            }

                            <input type="file" name="Images" multiple onChange={handlechange} className="hidden" />
                        </label>
                    </div>
                </div>
               {/* Form Fields Section */}
               <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Product Name */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Product Name</label>
                        <input
                            type="text"
                            name="Product_Name"
                            value={formdata?.Product_Name}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Material */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Material</label>
                        <input
                            type="text"
                            name="Material"
                            value={formdata?.Material}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Color */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Color</label>
                        <input
                            type="text"
                            name="Color"
                            value={formdata?.Color}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

   
                    {/* <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Net Weight</label>
                        <input
                            type="text"
                            name="Net_Weight"
                            value={formdata?.Net_Weight}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Battery</label>
                        <input
                            type="text"
                            name="Battery"
                            value={formdata?.Battery}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div> */}

                    {/* Regular and Sale Price */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Regular Price</label>
                        <input
                            type="text"
                            name="Regular_Price"
                            value={formdata?.Regular_Price}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Sale Price</label>
                        <input
                            type="text"
                            name="Sale_Price"
                            value={formdata?.Sale_Price}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Discount */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Discount</label>
                        <input
                            type="text"
                            name="Discount"
                            value={formdata?.Discount}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Tax Percentage */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">TAX Percentage</label>
                        <input
                            type="number"
                            name="TAX_Percentage"
                            value={formdata?.TAX_Percentage}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Available Stock */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Available Stock</label>
                        <input
                            type="number"
                            name="Avail_Stock"
                            value={formdata?.Avail_Stock}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Item Code */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Item Code</label>
                        <input
                            type="text"
                            name="Item_Code"
                            value={formdata?.Item_Code}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div className="flex flex-col">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Status</label>
                        <select
                            name="Status"
                            value={formdata?.Status}
                            onChange={handlechange}
                            className="w-full px-4 py-2 text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="instock">In Stock</option>
                            <option value="outofstock">Out of Stock</option>
                        </select>
                    </div>

                    {/* Product Description */}
                    <div className="flex flex-col lg:col-span-2">
                        <label className="mb-2 text-sm font-semibold text-gray-800">Product Description</label>
                        <Editor
                            style={{ height: '200px' }}
                            value={formdata?.Product_Description}
                            onTextChange={(e) => handlechange({ target: { name: 'Product_Description', value: e.htmlValue } })}
                            className="w-full transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md lg:w-1/2 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400"
                    >
                        {loading && (
                            <span className="inline-block mr-2 w-4 h-4 border-[3px] border-t-transparent border-white rounded-full animate-spin"></span>
                        )}
                        Save
                    </button>
                </div>
            </form>
        </Dialog>
    );
}