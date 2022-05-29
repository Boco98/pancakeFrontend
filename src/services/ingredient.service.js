
import base from "./base.service";

const instance = base.service();

export const getAll = () => {
    return instance.get("/ingredients");
};


export const insert = (ingredient) => {
    return instance.post("/ingredients", ingredient).then((res) => res.data);
};

export const update = (ingredient) => {
    return instance
        .put(`/ingredients/${ingredient.id}`, ingredient)
        .then((res) => res.data);
};

export const remove = (id) => {
    return instance.delete(`/ingredients/${id}`);
};

let exportMe = {
    getAll,
    insert,
    remove,
    update,
};

export default exportMe;
