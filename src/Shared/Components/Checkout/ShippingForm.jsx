import { Dialog } from 'primereact/dialog';

export default function ShippingForm(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata } = props;

    return (
        <Dialog header="Shipping Address" visible={visible} onHide={() => setVisible(false)} className="!w-full lg:!w-[40rem]">
            <form onSubmit={handlesave}>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                    <div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>First Name</label>
                            </div>
                            <input type="text" name="First_Name" value={formdata?.First_Name || ''} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Last Name</label>
                            </div>
                            <input type="text" name="Last_Name" value={formdata?.Last_Name || ''} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Mobile Number</label>
                            </div>
                            <input type="text" name="Mobilenumber" value={formdata?.Mobilenumber || ''} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Address</label>
                            </div>
                            <input type="text" name="Address" value={formdata?.Address || ''} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>City</label>
                            </div>
                            <input type="text" name="City" value={formdata?.City || ''} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>State</label>
                            </div>
                            <input type="text" name="State" value={formdata?.State || ''} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Country</label>
                            </div>
                            <input type="text" name="Country" value={formdata?.Country || ''} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Zipcode</label>
                            </div>
                            <input type="text" name="Zipcode" value={formdata?.Zipcode || ''} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                        </div>
                        <div className="mb-2">
                            <div className="mb-2">
                                <label>Address Type</label>
                            </div>
                            <select name="Address_Type" value={formdata?.Address_Type || ''} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                <option value="" disabled>---select---</option>
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-2">
                    <button type="submit" className="py-2 px-4 rounded-md border w-full bg-[rgb(227,135,52)] text-white">
                        {loading ? (
                            <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                        ) : formdata?._id ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </Dialog>
    );
}
