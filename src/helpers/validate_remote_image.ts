import axios from 'axios';

export const imageExists = async (image_url:string): Promise<boolean> => {
    let resp = true;
    const request = await axios.get(image_url);
    if( request.status !== 200 ) resp=false;
    return resp;
};