
import base from "./base.service";

const instance = base.service();

export const getAll = () => {
    return instance.get("/ingredients");
};


let exportMe = {
    getAll,
};

export default exportMe;
