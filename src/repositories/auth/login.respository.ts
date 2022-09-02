/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseRepository from '../base.repository';

class LoginRepository extends BaseRepository {
    constructor(readonly user:any) {
        super(user);
    }

    login = async(email:string)=>{
        return this.user.findOne({ 
            'email': email,
            //'status':'active', 
            //'suspended':false 
        });
    };

    newCode = async (email:string, confirmToken:number )=> {
        return this.user.update({confirmToken:confirmToken},{where:{'email':email}});
    };
}

export default LoginRepository;