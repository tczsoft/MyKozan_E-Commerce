import { Cart } from "../../models/CartModel.js"

// export const savecart = async (req, res, next) => {
//     try {
//       const resdata = await new Cart(req.body).save()
//       res.send(resdata)
//     } catch (err) {
//       console.error(err)
//     }
//   }


export const savecart = async (req, res, next) => {
  try {
    const { Email, productId, Quantity } = req.body;
    const existingCartItem = await Cart.findOne({ Email, productId });
    if (existingCartItem) {
      existingCartItem.Quantity += Quantity;
      await existingCartItem.save();
      return res.send({ message: "Product quantity updated in cart", cart: existingCartItem });
    }
    const newCartItem = new Cart({
      Email,
      productId,
      Quantity,
    });

    const resdata = await newCartItem.save();
    return res.send({ message: "Product added to cart", cart: resdata });

  } catch (err) {
    console.error("Error saving cart:", err);
    return res.send({ message: "Server error" });
  }
};

  export const getAllCart = async (req, res, next) => {
    try {
      const { Email } = req.query;
      const response = await Cart.find({ Email }).populate('productId');
      const totalLength = response.length;
      res.send({ response, totalLength });
    } catch (err) {
      console.error(err);
      res.send({ message: 'Error fetching wishlist items' });
    }
  };

  export const updateCart = async (req, res, next) => {
    try {
      const { productId, Quantity, Email } = req.body;
      console.log(req.body);
      const updatedCartItem = await Cart.findOneAndUpdate({ productId, Email }, { $set: { Quantity } }, { new: true } );
      if (!updatedCartItem) {
        return res.send({ message: 'Cart item not found.' });
      }
      res.send({ message: 'Quantity updated successfully', updatedCartItem });
    } catch (error) {
      console.error('Error updating Cart quantity:', error);
      res.send({ message: 'An error occurred while updating quantity' });
    }
};


  export const deletecartone = async (req, res, next) => {
    try {
        const { _id } = req.query; 
        const resdata = await Cart.deleteOne({ _id });
        res.send({ message: 'Cart deleted successfully', resdata });
      } catch (err) {
        console.error(err);
        res.send({ message: 'An error occurred while deleting the Cart item' });
      }
    };
    
  
    export const deleteAllcart = async (req, res, next) => {
      try {
          const { Email } = req.query; 
          console.log(Email);
          const resdata = await Cart.deleteMany({ Email });
          res.send({ message: 'All cart items deleted successfully', resdata });
      } catch (err) {
          console.error(err);
          res.send({ message: 'An error occurred while deleting all cart items' });
      }
  };
  


