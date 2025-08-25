import { model, Schema } from "mongoose";
import { TProprietary } from "./proprietary.interface";

const ProprietarySchema = new Schema<TProprietary>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    internal_name: {
        type: String,
        trim: true,
        required: true,
    },
    cleaning_fee: {
        type: Number,
        trim: true,
        required: true,
    },
    sub_title: {
        type: String,
        trim: true
    },
    photo: [
        {
            path: {
                type: String,
                required: true
            },
            title: {
                type: String,
                trim: true
            },
            details: {
                type: String,
                trim: true
            }
        }
    ],
    amenities: [
        {
            id: {
                type: String,
                trim: true
            },
            name: {
                type: String,
                trim: true
            },
        }
    ],
    rating: {
        type: Number, // Changed from String to Number for easier calculations
        default: 4.2
    },
    about: {
        type: String,
        trim: true,
        required: true,
    },
    accommodation_overview: {
        type: String,
        trim: true,
        required: true,
    },
    room_details: {
        bed_room: {
            type: String,
            trim: true
        },
        total_bed: {
            type: Number,
            required: true,
            default: 1
        },
        bathroom: {
            type: String,
            trim: true
        },
        max_guests: {
            type: Number,
            trim: true,
        }
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    timeframe: {
        prices: {
            type: Number,
            required: true
        },
        period: {
            type: String,
            required: true,
            default: "night"
        }
    },
    location: {
        cityId: {
            type: Schema.Types.ObjectId,
            ref: 'City',
            required: true
        },
        address: {
            type: String,
            trim: true,
        }
    },
    total_booking: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

export const ProprietaryModel = model<TProprietary>('Proprietary', ProprietarySchema)