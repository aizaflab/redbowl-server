import { Types } from "mongoose"

export type TCategory = {
    title: string,
    slug: string,
    user: Types.ObjectId
    isBlocked: boolean,
}
