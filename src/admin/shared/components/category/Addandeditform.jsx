
import { Dialog } from 'primereact/dialog';

export default function Addandeditform(props) {

    const { visible, setVisible, handlesave, handlechange, loading, formdata,handleupdate } = props;



    return (
        <Dialog header="Product Details" visible={visible}  onHide={() => setVisible(false)} className="!w-full lg:!w-[40rem]">
            <form onSubmit={!formdata?._id?handlesave:handleupdate}>
                <div className='mb-3'>
                    <div className='flex items-center justify-center mb-3'>
                        <label className="flex flex-col items-center justify-center w-[80%] h-55 sm:w-[40%] sm:h-60 rounded-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-4 pb-5">
                                <i className="fi fi-sr-mode-landscape"></i>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                            </div>
                            <input type="file" name="Images" multiple onChange={handlechange} className="hidden"  />
                        </label>
                    </div>
                    <div className='hidden'>
                        <img width="50px" src="https://img.freepik.com/free-photo/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv_105762-2173.jpg?t=st=1711361047~exp=1711364647~hmac=71fd55e8418ee7913fe07a5f00af8d93c6db7474a1d71e2d5fbf7d431975180f&w=1380" alt="" />
                    </div>
                </div>
                
                <div className='grid grid-cols-1 gap-3 lg:grid-cols-2 '>
                    
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Category Name</label>
                            </div>
                            <input type="text" name="Category_Name" value={formdata?.Category_Name} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>SubCategories</label>
                            </div>
                            <input type="text" name="Subcategories" value={formdata?.Subcategories} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none"  />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Brand Name</label>
                            </div>
                            <input type="text" name="Brand_Name" value={formdata?.Brand_Name} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Card Color</label>
                            </div>
                            <input type="color" name="Card_color" value={formdata?.Card_color} onChange={handlechange} className="w-full border rounded-md outline-none" required />
                        </div>
                    <div className='col-span-full'>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Status</label>
                            </div>
                            <select  name="Status" value={formdata?.Status} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required >
                            <option selected disabled>---select a status---</option>
                            <option>Active</option>
                            <option>Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-2">

                    <button type="submit" className="w-full px-4 py-2 text-white bg-green-400 border rounded-md" >

                        {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>}  Save
                    </button>
                </div>
            </form>
        </Dialog>
    )
}