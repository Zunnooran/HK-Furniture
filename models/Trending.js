import mongoose from "mongoose";

//Defining Schema
const TrendingSchema = new mongoose.Schema({
    trend: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    },
},{ 
    timestamps: true 
 });

//Modal
const TrendingModal = mongoose.model('Trending', TrendingSchema);
export default TrendingModal;