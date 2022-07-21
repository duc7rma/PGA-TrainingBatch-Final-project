import axios from "axios";
import { IUser } from "models/user";
import {urlLoginAPI} from 'utils/constants'

interface IAPIRes {
    user: IUser ;
    error: boolean;
    success: boolean;
    user_cookie: string | object;
    data: [];

}



export const handleLoginAPI = (email: string, password: string): IAPIRes => {
    return <IAPIRes>(
        (<unknown>
            (axios.post(urlLoginAPI, { email, password })
            .then(response => response.data)
            .catch(error => console.log(error.response))
        ))
    )
};




