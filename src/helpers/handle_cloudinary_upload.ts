import cloudinary from 'cloudinary';
import makeRandom from './random_string';

export const uploadToCloudinary = async (path:any) => {
    const name = makeRandom(20);
    const resp = await cloudinary.v2.uploader.upload(
        path.tempFilePath,
        {public_id:`${name}`},
        (err:any, result:any) => {
            if( err !== undefined ) return err;
            result.name = 'success';
            return result;
        }
    );

    return resp;
};