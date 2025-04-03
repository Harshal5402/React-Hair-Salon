import serviceModel from "../models/serviceModel.js";
import fs from "fs";

// add service item
const addService = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const service = new serviceModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await service.save();
        res.json({
          success: true,
          message: "Service Added Successfully",
        });
    } 
    catch (error) {
        console.log(error);
        res.json({
          success: false,
          message: "Error",
        });
    }

};

// all service list
const listService = async (req, res) => {
    try {
        const service = await serviceModel.find({});
        res.json({
            success: true,
            data: service
        })
    } 
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

// remove food item
const removeService = async (req, res) => {
    try {
        const service = await serviceModel.findById(req.body.id)
        fs.unlink(`uploads/${service.image}`, () => {})

        await serviceModel.findByIdAndDelete(req.body.id)
        res.json({
            success: true,
            message: "Service Remove Successfully"
        })
    } 
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

export {addService, listService, removeService}

