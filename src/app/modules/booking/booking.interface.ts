import { Types } from "mongoose";

export type TBooking = {
    user: {
        name: string;
        email: string;
        phone: string;
    };
    room: Types.ObjectId;
    city: string;
    guests: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    payment_info?: {
        type?: string;
        transactionId?: string;
        paid?: boolean;
    };
}
