import { myAxios,privateAxios } from "./helper";

export const signup=(user)=>{
    return myAxios.post('/api/users/register',user)
    .then((response)=>response.data);
}
export const login=(loginDetails)=>{
    return myAxios.post('/api/users/login',loginDetails)
    .then((response)=>response.data)

}
export const getUserById=(userId)=>{
    return privateAxios.get(`/api/users/${userId}`).then((response)=>response.data);
}