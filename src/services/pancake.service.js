
import base from "./base.service";

const instance = base.service();

export const getAll = () => {
    return instance.get("/pancakes");
};


export const insert = (pancake) => {
    return instance.post("/pancakes", pancake).then((res) => res.data);
};

export const update = (pancake) => {
    return instance
        .put(`/pancakes/${pancake.id}`, pancake)
        .then((res) => res.data);
};

export const remove = (id) => {
    return instance.delete(`/pancakes/${id}`);
};

let exportMe = {
    getAll,
    insert,
    remove,
    update,
};

export default exportMe;
