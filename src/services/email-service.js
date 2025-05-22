import { myAxios } from "./helper";

export const sendEmail=(mail)=>{

    return myAxios.post('/api/email/send',mail)
    .then((response)=>response.data);

}