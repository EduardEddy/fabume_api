//db.neighborhoods.findOne({ geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] } } } })

import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Product } from '../models/product';
import { Store } from '../models/store';

//const storeCtrl = new StoreCtrl;
const router = Router();

router.get('/',async (req:Request, res:Response) => {

const pro = new mongoose.Types.ObjectId('62f6aa1637a154407ac15203');
/*Store.findByIdAndUpdate(
    '62f709698f80dec1110fd382',
    {
        $push:{
            products:[pro]
        }
    }, 
    {upsert: true} 
);*/
// https://www.youtube.com/watch?v=4WxROtjrOt0
    /**
     * Casa
     */
    // const lng = -74.0814293;
    // const lat = 4.7539873;
    /**
     * Llinktic
     */
    // const lng = -74.0559387;
    // const lat = 4.6680731;
    /**
     * Easy Multiplaza
     */
     const lng = -74.1269337;
     const lat = 4.6501583;

    const names = 'pastilla';
    const country = 'VE';

    /*const list = await Store.find({    
        location: {
            $near: {
                $geometry: {
                    type:'Point',
                    coordinates: [
                        lng,lat
                    ]
                },
                $maxDistance: 1000*1000,
            },
        },
        is_open:true,
        
    });*/

    const list = await Store.find({
        location: {
            $near: {
                $geometry: {
                    type:'Point',
                    coordinates: [
                        lng,lat
                    ]
                },
                $maxDistance: 1000*1000,
            },
        },
        is_open:true,
        country,
    }).populate([
        {
            path:'products',
            match:{
                $or:[
                    {
                        name:{ 
                            $regex: new RegExp('^' + '.*' +names.toLowerCase() + '.*' , 'i' ) 
                        }
                    },
                    {
                        components:{ 
                            $regex: new RegExp('^' + '.*' +names.toLowerCase() + '.*' , 'i' ) 
                        }
                    },
                ],
                $and:[
                    {
                        cant:{
                            $gte:1
                        }
                    }
                ]
            }
        }
    ]);

    /*const products = await Product.find({
        $or:[
            {
                name:{ 
                    $regex: new RegExp('^' + '.*' +names.toLowerCase() + '.*' , 'i' ) 
                }
            },
            {
                components:{ 
                    $regex: new RegExp('^' + '.*' +names.toLowerCase() + '.*' , 'i' ) 
                }
            },
        ],
        $and:[
            {
                cant:{
                    $gte:1
                }
            }
        ]
    }).populate([
        {
            path:'store', match: {
                location: {
                    $near: {
                        $geometry: {
                            type:'Point',
                            coordinates: [
                                lng,lat
                            ]
                        },
                        $maxDistance: 1000*1000,
                    },
                },
                is_open:true,
            } 
        }
    ]);*/
    
    return res.json({data:list});
} );

export default router;