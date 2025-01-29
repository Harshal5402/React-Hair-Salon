import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    serviceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'services' }, // Reference to services
});

const cartModel = mongoose.models.carts || mongoose.model("carts", cartSchema);

export default cartModel;
