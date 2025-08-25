import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const BookingSchema = new Schema<TBooking>({
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
        type: Schema.Types.ObjectId,
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

export const BookingModel = model<TBooking>('Booking', BookingSchema)