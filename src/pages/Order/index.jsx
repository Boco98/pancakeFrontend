import React, { useState, useEffect } from "react";
import orderService from "../../services/order.service";
import { useTranslation } from "react-i18next";
import { Button, message, Popconfirm, Space, Typography } from "antd";
import OrderModal from "./components/OrderModal";
import {
    Content,
    StyledTable,
    Toolbar,
} from "../../components/BasicStyledComponents";
import {
    handleDeleteError,
    handleInsertError,
    handleUpdateError,
} from "../../util.js/errorHandlers";

const Order = () => {
    const { t } = useTranslation();
    const [orders, setOrders] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    useEffect(() => {
        orderService.getAll().then((res) => setOrders(res.data));
    }, []);
    const columns = [
        {
            title: "id",
            dataIndex: "id",
        },
        {
            title: t("order.datetime"),
            dataIndex: "datetime",
            render: (date_time) => {
                return String(date_time);
            },
        },
        {
            title: t("odred.discount_id"),
            dataIndex: "discount_id",
        },
        {
            title: t("order.description"),
            dataIndex: "description",
        },
        {
            title: t("actions"),
            key: "actions",
            // eslint-disable-next-line react/display-name
            render: (_text, record) => (
                <Space size="middle">
                    <a href="/orders#" onClick={() => openEditModal(record)}>{t("edit")}</a>
                    <Popconfirm
                        title={t("areYouSure")}
                        okText={t("yes")}
                        cancelText={t("no")}
                        onConfirm={() => onDelete(record)}
                    >
                        <a href="/#">{t("delete")}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const openAddModal = () => {
        setEditMode(false);
        setModalVisible(true);
    };
    const openEditModal = (order) => {
        setSelectedOrder(order);
        setEditMode(true);
        setModalVisible(true);
    };
    const closeModal = () => {
        setSelectedOrder(null);
        setConfirmLoading(false);
        setEditMode(false);
        setModalVisible(false);
    };

    const saveData = (order) => {
        setConfirmLoading(true);
        if (editMode) {
            orderService
                .update(order)
                .then((res) => {
                    message.success(t("editSuccess"));
                    closeModal();
                    setOrders(
                        orders.map((el) => (el.id === res.id ? { ...el, ...res } : el))
                    );
                })
                .catch((err) => {
                    setConfirmLoading(false);
                    handleUpdateError(err, t);
                });
        } else {
            orderService
                .insert(order)
                .then((res) => {
                    closeModal();
                    message.success(t("insertSuccess"));
                    setOrders([...orders, res]);
                })
                .catch((err) => {
                    setConfirmLoading(false);
                    handleInsertError(err, t);
                });
        }
    };

    const onDelete = (order) => {
        orderService
            .remove(order.id)
            .then(() => {
                message.success(t("deleteSuccess"));
                setOrders(orders.filter((el) => el.id !== order.id));
            })
            .catch((err) => {
                handleDeleteError(err, t);
            });
    };


    return (
        <Content>
            <Toolbar>
                <Typography.Title level={3}>{t("order.title")}</Typography.Title>
                <Button type="primary" onClick={() => openAddModal()}>
                    {t("order.addBtn")}
                </Button>
            </Toolbar>
            <StyledTable
                key="id"
                dataSource={orders}
                columns={columns}
                scroll={{ y: "calc(100vh - 250px)" }}
            />
            <OrderModal
                editMode={editMode}
                visible={modalVisible}
                confirmLoading={confirmLoading}
                order={selectedOrder}
                onCancel={closeModal}
                onOk={saveData}
            />
        </Content>
    );
};

export default Order;