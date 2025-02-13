import cartModel from "../models/cartModel.js";

const addToCart = async (req, res) => {
    const { serviceId } = req.body;
    const userId = req.userId; 

    if (!serviceId) {
        return res.status(400).json({
            success: false,
            message: 'Service ID is required',
        });
    }

    try {
        let cartItem = await cartModel.findOne({ userId, serviceId });

        if (cartItem) {
            return res.status(400).json({
                success: false,
                message: 'Service is already in the cart',
            });
        }

        // Add new item to the cart
        cartItem = new cartModel({ userId, serviceId });
        await cartItem.save();

        res.status(200).json({ success: true, message: 'Service added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add service to cart' });
    }
};



const getCartItems = async (req, res) => {
    const userId = req.userId; 
    console.log("User ID:", userId); 

    try {
        const cartItems = await cartModel.find({ userId }).populate('serviceId', 'name description price category image'); // Populate serviceId to get service details
        console.log("Cart Items:", cartItems); 

        const formattedCartItems = cartItems.map((item) => ({
            id: item._id,
            serviceId: item.serviceId._id,
            name: item.serviceId.name,
            description: item.serviceId.description,
            price: item.serviceId.price,
            category: item.serviceId.category,
            image: item.serviceId.image, 
        }));

        res.status(200).json({ success: true, data: formattedCartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch cart items' });
    }
};

const removeFromCart = async (req, res) => {
    const cartItemId = req.params.id;
    console.log("Cart Item ID:", cartItemId);

    try {
        const deletedItem = await cartModel.findByIdAndDelete(cartItemId);

        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove item from cart',
        });
    }
};


export { addToCart, getCartItems, removeFromCart };
