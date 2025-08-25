import { Types } from "mongoose";

export type TProprietary = {
    title: string;
    slug: string;
    internal_name: string;
    cleaning_fee: number;
    sub_title?: string;
    photo: {
        path: string;
        title?: string;
        details?: string;
    }[];
    amenities: {
        id?: string;
        name?: string;
    }[];
    rating?: number;
    about: string;
    accommodation_overview: string;
    room_details: {
        bed_room?: string;
        total_bed: number;
        bathroom?: string;
        max_guests?: number;
    };
    status: boolean;
    timeframe: {
        prices: number;
        period: string;
    };
    location: {
        cityId: Types.ObjectId;
        address?: string;
    };
    total_booking?: number;
}
