export interface UserInterface {
    id:string,
    name:string, 
    last_name: string, 
    email:string,
    phone:string, 
    account:string,
    verify:number,
    profile:string,
    addresses:[],
    store:object
}