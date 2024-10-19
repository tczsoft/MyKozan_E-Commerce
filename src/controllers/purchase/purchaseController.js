import { Product } from '../../models/ProductModel.js';
import { Purchase, PurchaseMaster } from '../../models/purchaseModel.js';
import moment from 'moment';

export const createPurchase = async (req, res) => {
  try {
    const { purchase, purchasemaster } = req.body; 

    const uniquePurchaseId = `PUR_${moment().format('YYYYMMDD_HHmmss')}`;
    const purchaseWithId = { ...purchase, Purchase_id: uniquePurchaseId };

    const savedPurchase = await new Purchase(purchaseWithId).save();

    const productPurchases = purchasemaster.map((product) => ({...product , Purchase_id: uniquePurchaseId, }));
    await PurchaseMaster.insertMany(productPurchases);

        for (const product of productPurchases) {
        const { Item_Code, Quantity } = product;
  
        await Product.findOneAndUpdate(
          { Item_Code },
          { $inc: { Avail_Stock: +Quantity } } 
        );
      }

    res.send({ message: 'Purchase created successfully', purchase: savedPurchase, products: productPurchases });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating purchase', error });
  }
};

export const getAllPurchase = async (req,res) => {
    try {
        const viewPurchase = await Purchase.find() ;
        const viewPurchase1 = await PurchaseMaster.find() ;
        res.send({purchase : viewPurchase , purchasemaster : viewPurchase1});
    } catch (error) {

      
        console.log({message:'Error fetching purchase details' , error})
    }
};
