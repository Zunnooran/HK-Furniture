import mongoose from "mongoose";
import ProductsModal from "../../models/Product.js";

class ProductController {
    static createProduct = async (req, res) => {
        const { heading, image, description, pricing, rating, category, color, size } = req.body;
        if(!heading && !image && !description && !pricing && !rating && !category && !color && !size) return res.send({ status: 'failed', message: 'At field are required' });

        try {
            const newProduct = new ProductsModal({ heading, image, description, pricing, rating, category, color, size });
            await newProduct.save();

            res.status(201).send({ status: "success", message: "Product saved successfully", data: newProduct });
        } catch (error) {
            console.log(error);
            res.status(409).send({ status: "failed", message: "Failed to Save" });
        }
    };
    
    static getProducts = async (req, res) => {
        try {
            const productData = await ProductsModal.find();
            res.status(200).send({ status: "success", data: productData });
        } catch (error) {
            res.status(404).send({ status: "failed", message: "Failed to get Data" });
        }
    };

    static getProduct = async (req, res) => {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({status: "failed", message: `No Product with id: ${id}`});
        try {
            const getProductById = await ProductsModal.findById(id);
            res.status(200).send({ status: "success", data: getProductById });
        } catch (error) {
            res.status(404).send({ status: "failed", message: "Failed to get Data" });
        }
    };

    static updateProduct = async (req, res) => {
        const { id } = req.params;
        const { heading, image, description, pricing, rating, category, color, size } = req.body;
        if(!heading && !image && !description && !pricing && !rating && !category && !color && !size) return res.send({ status: 'failed', message: 'At least one field is required to update' });

        if(!id) return res.status(400).send({status: "failed", message: `Id is required`});

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({status: "failed", message: `No Product with id: ${id}`});

        const updateProduct = { heading, image, description, pricing, rating, category, color, size, _id: id };
        try {
            await ProductsModal.findByIdAndUpdate(id, updateProduct, {new: true});

            res.status(200).send({ status: "success", message: "Product Updated successfully", data: updateProduct });
        } catch (error) {
            res.status(404).send({ status: "failed", message: "Failed to Update" });
        }
    };

    static deleteProduct = async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({ status: "failed", message: `No Product with id: ${id}` });
        
        try {
            await ProductsModal.findByIdAndRemove(id);
        
            res.status(200).send({ status:"success", message: "Product deleted successfully." });
        } catch (error) {
            res.status(404).send({ status:"failed", message:"Product failed to delete." });
        }
    };

};

export default ProductController;