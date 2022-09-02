import { ObjectId } from 'mongoose';

export interface CityInterface {
    name: string,
    country: ObjectId | null
}