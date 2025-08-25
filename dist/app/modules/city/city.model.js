"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModel = void 0;
const mongoose_1 = require("mongoose");
const CitySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    tax: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
    },
}, {
    timestamps: true
});
exports.CityModel = (0, mongoose_1.model)('City', CitySchema);
