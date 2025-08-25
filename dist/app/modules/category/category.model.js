"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    isBlocked: {
        type: Boolean,
        require: false,
        default: false
    }
}, { timestamps: true });
exports.CategoryModel = (0, mongoose_1.model)('Category', categorySchema);
