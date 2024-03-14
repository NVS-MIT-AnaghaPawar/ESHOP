import axios from "axios";

const USERS_REST_API_URL =   'http://localhost:8080/contacts';

class ContactService{

    insertdata(userData){
        return axios.post(USERS_REST_API_URL, userData);
    }
}

export default new ContactService();