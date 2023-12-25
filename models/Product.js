import mongoose from "mongoose";

//Defining Schema
const ProductSchema = new mongoose.Schema({
    heading: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: [{ type: String,required:true, trim: true}],
    pricing: { type: Number, required: true, trim: true},
    rating: { type: Number, required: true, trim: true},
    category: { type: String, required: true, trim: true},
    color: [{ type: String, required: true, trim: true}],
    size: [{ type: String, required: true, trim: true}],
},{ 
    timestamps: true 
 });

//Modal
const ProductsModal = mongoose.model('Products', ProductSchema);
export default ProductsModal;