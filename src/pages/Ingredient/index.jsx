import React, { useState, useEffect } from "react";
import ingredientService from "../../services/ingredient.service";
import { useTranslation } from "react-i18next";
import { Button, message, Popconfirm, Space, Table, Typography } from "antd";
import IngredientModal from "./components/IngredientModal";
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

const Ingredient = () => {
    const { t } = useTranslation();
    const [ingredients, setIngredients] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    useEffect(() => {
        ingredientService.getAll().then((res) => setIngredients(res.data));
    }, []);
    const columns = [
        {
            title: "id",
            dataIndex: "id",
        },
        {
            title: t("ingredient.name"),
            dataIndex: "name",
        },
        {
            title: t("ingredient.price"),
            dataIndex: "price",
        },
        {
            title: t("ingredient.healthyIngredient"),
            dataIndex: "healthyIngredient",
            render: (text) => {
                text = String(text);
                return text;
            },
        },
        {
            title: t("ingredient.ingredientCategoriesName"),
            dataIndex: "ingredientCategoriesName",
        },
        {
            title: t("actions"),
            key: "actions",
            // eslint-disable-next-line react/display-name
            render: (_text, record) => (
                <Space size="middle">
                    <a href="/#" onClick={() => openEditModal(record)}>{t("edit")}</a>
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
    const openEditModal = (ingredient) => {
        setSelectedIngredient(ingredient);
        setEditMode(true);
        setModalVisible(true);
    };
    const closeModal = () => {
        setSelectedIngredient(null);
        setConfirmLoading(false);
        setEditMode(false);
        setModalVisible(false);
    };

    const saveData = (ingredient) => {
        setConfirmLoading(true);
        if (editMode) {
            ingredientService
                .update(ingredient)
                .then((res) => {
                    message.success(t("editSuccess"));
                    closeModal();
                    setIngredients(
                        ingredients.map((el) => (el.id === res.id ? { ...el, ...res } : el))
                    );
                })
                .catch((err) => {
                    setConfirmLoading(false);
                    handleUpdateError(err, t);
                });
        } else {
            ingredientService
                .insert(ingredient)
                .then((res) => {
                    closeModal();
                    message.success(t("insertSuccess"));
                    setIngredients([...ingredients, res]);
                })
                .catch((err) => {
                    setConfirmLoading(false);
                    handleInsertError(err, t);
                });
        }
    };

    const onDelete = (ingredient) => {
        ingredientService
            .remove(ingredient.id)
            .then(() => {
                message.success(t("deleteSuccess"));
                setIngredients(ingredients.filter((el) => el.id !== ingredient.id));
            })
            .catch((err) => {
                handleDeleteError(err, t);
            });
    };


    return (
        <Content>
            <Toolbar>
                <Typography.Title level={3}>{t("ingredient.title")}</Typography.Title>
                <Button type="primary" onClick={() => openAddModal()}>
                    {t("ingredient.addBtn")}
                </Button>
            </Toolbar>
            <StyledTable
                key="id"
                dataSource={ingredients}
                columns={columns}
                scroll={{ y: "calc(100vh - 250px)" }}
            />
            <IngredientModal
                editMode={editMode}
                visible={modalVisible}
                confirmLoading={confirmLoading}
                ingredient={selectedIngredient}
                onCancel={closeModal}
                onOk={saveData}
            />
        </Content>
    );
};

export default Ingredient;