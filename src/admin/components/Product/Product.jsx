import { useCallback, useEffect, useState } from "react"
import { deleteproducts, getallproducts, saveproducts, updateproducts } from "../../shared/services/apiproducts/apiproducts";
import Tableview from "../../shared/components/product/Tableview";
import Tablepagination from "../../shared/others/Tablepagination";
import Tableheadpanel from "../../shared/components/product/Tableheadpanel";
import Addandeditform from "../../shared/components/product/Addandeditform";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { getallcategory } from "../../shared/services/apicategory/apicategory";
export default function Product() {

    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [visible, setVisible] = useState(false);
    const [formdata, setFormdata] = useState({});
    const [loading, setLoading] = useState(false);
    const [tabledata, setTabledata] = useState([]);
    const [colfilter, setcolFilter] = useState({});
    const [globalfilter, setglobalfilter] = useState('');
    const [filtervalues, setfiltervalues] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [imageDataUrl, setImageDataUrl] = useState(null);

    let isMounted = true;

    const getallproduct = useCallback(async () => {
        const res = await getallproducts({ first, rows, globalfilter, colfilter });
        setTabledata(res?.products);
        setTotalRecords(res?.totallength);
    }, [first, rows, globalfilter, colfilter]);

    useEffect(() => {
        if (isMounted) {
            getallproduct();
        }
        return (() => isMounted = false);
    }, [first, rows, globalfilter, colfilter])

    const onPage = (page) => {
        setPage(page)
        setFirst(rows * (page - 1));
        setRows(rows);
    };


    const handlechange = (e) => {
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = function (eve) {
                setImageDataUrl(eve.target.result);
            };

            reader.readAsDataURL(e.target.files[0]);

            const filesArray = Array.from(e.target.files);
            setFormdata({ ...formdata, [e.target.name]: filesArray });
        } else {
            setFormdata({ ...formdata, [e.target.name]: e.target.value });
        }
    }


    const handleCategoryChange = (event) => {
        const selectedCategoryName = event.target.value;
        setSelectedCategory(selectedCategoryName);
        const selectedCategoryObject = categories.find(category => category.Category_Name === selectedCategoryName);
        if (selectedCategoryObject) {
            const subcategories = selectedCategoryObject.Subcategories.map(subcategoryString => subcategoryString.split(',').map(sub => sub.trim()));
            setFilteredSubcategories(subcategories.flat());
        } else {
            setFilteredSubcategories([]);
        }
    };

    const cusfilter = (field, value) => {
        setcolFilter(prev => ({ ...prev, [field]: { $in: value } }));
        setFirst(0)
    };

    const handlesave = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Include the selected category in formdata
        const updatedFormData = {
            ...formdata,
            Category: selectedCategory // Assuming selectedCategory is accessible here
        };

        await saveproducts(updatedFormData);
        toast.success("Successfully saved");
        getallproduct();
        setVisible(false);
        setLoading(false);
    };

    const newform = () => {
        setFormdata({});
        setSelectedCategory(null)
        setVisible(true)
    }

    const editfrom = (data) => {
        console.log(data);
        setFormdata(data);
        setSelectedCategory(data.Category);
        const selectedCategoryName = data.Category;
        setSelectedCategory(selectedCategoryName);
        const selectedCategoryObject = categories.find(category => category.Category_Name === selectedCategoryName);
        if (selectedCategoryObject) {
            const subcategories = selectedCategoryObject.Subcategories.map(subcategoryString => subcategoryString.split(',').map(sub => sub.trim()));
            setFilteredSubcategories(subcategories.flat());
        } else {
            setFilteredSubcategories([]);
        }
        setVisible(true)

    }

    const handleupdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(formdata)
        await updateproducts(formdata)
        toast.success("Sucessfully updated")
        getallproduct()
        setVisible(false)
        setLoading(false)
    }

    const handledelete = (id) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'bg-red-500 ml-2 text-white p-2',
            rejectClassName: 'p-2 outline-none border-0',
            accept: async () => {
                await deleteproducts(id)
                toast.success("Sucessfully deleted")
                getallproduct()
            }
        });
    };

    return (
        <div>
            <div className="bg-white border rounded-3xl">
                <Tableheadpanel newform={newform} setglobalfilter={setglobalfilter} />

                <Tableview tabledata={tabledata} totalRecords={totalRecords} first={first} editfrom={editfrom} handledelete={handledelete}
                    cusfilter={cusfilter} filtervalues={filtervalues} onPage={onPage} page={page} />

                <Tablepagination page={page} first={first} rows={rows} totalRecords={totalRecords} onPage={onPage} setRows={setRows} />
                <Addandeditform visible={visible} setVisible={setVisible} loading={loading} formdata={formdata} setFormdata={setFormdata} imageDataUrl={imageDataUrl}
                    handlechange={handlechange} handlesave={handlesave} handleupdate={handleupdate} handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} filteredSubcategories={filteredSubcategories} categories={categories} />
                <ConfirmDialog />
            </div>

        </div>
    )
}