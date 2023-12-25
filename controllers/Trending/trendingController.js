import mongoose from "mongoose";
import TrendingModal from "../../models/Trending";

class TrendingController {
    static createTrend = async (req, res) => {
        const { trend } = req.body;
        if(!trend) return res.send({ status: 'failed', message: 'All Fields are Required' });

        try {
            const newTrend = new TrendingModal({ trend });
            await newTrend.save();

            res.status(201).send({ status: "success", message: "Saved successfully", data: newTrend });
        } catch (error) {
            console.log(error);
            res.status(409).send({ status: "failed", message: "Failed to Save" });
        }
    };
    
    static getTrends = async (req, res) => {
        try {
            const trendData = await TrendingModal.find();
            res.status(200).send({ status: "success", data: trendData });
        } catch (error) {
            res.status(404).send({ status: "failed", message: "Failed to get Data" });
        }
    };

    static getTrend = async (req, res) => {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({status: "failed", message: `No Trend with id: ${id}`});
        try {
            const getTrendById = await TrendingModal.findById(id);
            res.status(200).send({ status: "success", data: getTrendById });
        } catch (error) {
            res.status(404).send({ status: "failed", message: "Failed to get Data" });
        }
    };

    static updateTrend = async (req, res) => {
        const { id } = req.params;
        const { trend } = req.body;
        if(!trend) return res.send({ status: 'failed', message: 'All Fields are required to update' });

        if(!id) return res.status(400).send({status: "failed", message: `Id is required`});

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({status: "failed", message: `No Trend with id: ${id}`});

        const updateTrend = { trend , _id: id };
        try {
            await TrendingModal.findByIdAndUpdate(id, updateTrend, {new: true});

            res.status(200).send({ status: "success", message: "Trend Updated successfully", data: updateTrend });
        } catch (error) {
            res.status(404).send({ status: "failed", message: "Failed to Update" });
        }
    };

    static deleteTrend = async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({ status: "failed", message: `No Trend with id: ${id}` });
        
        try {
            await TrendingModal.findByIdAndRemove(id);
        
            res.status(200).send({ status:"success", message: "Trend deleted successfully." });
        } catch (error) {
            res.status(404).send({ status:"failed", message:"Trend failed to delete." });
        }
    };

};

export default TrendingController;