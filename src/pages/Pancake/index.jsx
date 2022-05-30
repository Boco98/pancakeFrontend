import React, { useState, useEffect } from "react";
import pancakeService from "../../services/pancake.service";
import { useTranslation } from "react-i18next";
import { Button, message, Popconfirm, Space, Table, Typography } from "antd";
import PancakeModal from "./components/PancakeModal";
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

const Pancake = () => {
    const { t } = useTranslation();
    const [pancakes, setPancakes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedPancake, setSelectedPancake] = useState(null);
    useEffect(() => {
        pancakeService.getAll().then((res) => setPancakes(res.data));
    }, []);
    const columns = [
        {
            title: "id",
            dataIndex: "id",
        },
        {
            title: t("pancake.name"),
            dataIndex: "name",
        },
        {
            title: t("actions"),
            key: "actions",
            // eslint-disable-next-line react/display-name
            render: (_text, record) => (
                <Space size="middle">
                    <a href="/pancakes#" onClick={() => openEditModal(record)}>{t("edit")}</a>
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
    const openEditModal = (pancake) => {
        setSelectedPancake(pancake);
        setEditMode(true);
        setModalVisible(true);
    };
    const closeModal = () => {
        setSelectedPancake(null);
        setConfirmLoading(false);
        setEditMode(false);
        setModalVisible(false);
    };

    const saveData = (pancake) => {
        setConfirmLoading(true);
        if (editMode) {
            pancakeService
                .update(pancake)
                .then((res) => {
                    message.success(t("editSuccess"));
                    closeModal();
                    setPancakes(
                        pancakes.map((el) => (el.id === res.id ? { ...el, ...res } : el))
                    );
                })
                .catch((err) => {
                    setConfirmLoading(false);
                    handleUpdateError(err, t);
                });
        } else {
            pancakeService
                .insert(pancake)
                .then((res) => {
                    closeModal();
                    message.success(t("insertSuccess"));
                    setPancakes([...pancakes, res]);
                })
                .catch((err) => {
                    setConfirmLoading(false);
                    handleInsertError(err, t);
                });
        }
    };

    const onDelete = (pancake) => {
        pancakeService
            .remove(pancake.id)
            .then(() => {
                message.success(t("deleteSuccess"));
                setPancakes(pancakes.filter((el) => el.id !== pancake.id));
            })
            .catch((err) => {
                handleDeleteError(err, t);
            });
    };


    return (
        <Content>
            <Toolbar>
                <Typography.Title level={3}>{t("pancake.title")}</Typography.Title>
                <Button type="primary" onClick={() => openAddModal()}>
                    {t("pancake.addBtn")}
                </Button>
            </Toolbar>
            <StyledTable
                key="id"
                dataSource={pancakes}
                columns={columns}
                scroll={{ y: "calc(100vh - 250px)" }}
            />
            <PancakeModal
                editMode={editMode}
                visible={modalVisible}
                confirmLoading={confirmLoading}
                pancake={selectedPancake}
                onCancel={closeModal}
                onOk={saveData}
            />
        </Content>
    );
};

export default Pancake;