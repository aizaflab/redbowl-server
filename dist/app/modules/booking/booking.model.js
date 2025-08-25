"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    user: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Proprietary',
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    guests: {
        type: String,
        trim: true,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    payment_info: {
        type: {
            type: String,
            trim: true,
        },
        transactionId: {
            type: String,
            trim: true,
        },
        paid: {
            type: Boolean,
            trim: true,
        },
    }
}, {
    timestamps: true
});
exports.BookingModel = (0, mongoose_1.model)('Booking', BookingSchema);
