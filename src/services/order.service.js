
import base from "./base.service";

const instance = base.service();

export const getAll = () => {
    return instance.get("/orders");
};


export const insert = (order) => {
    return instance.post("/orders", order).then((res) => res.data);
};

export const update = (order) => {
    return instance
        .put(`/orders/${order.id}`, order)
        .then((res) => res.data);
};

export const remove = (id) => {
    return instance.delete(`/orders/${id}`);
};

let exportMe = {
    getAll,
    insert,
    remove,
    update,
};

export default exportMe;
