import { model, Schema } from "mongoose";
import { TCity } from "./city.interface";

    const CitySchema = new Schema<TCity>({
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

export const CityModel = model<TCity>('City', CitySchema)