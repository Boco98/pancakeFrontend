import React, { useState, useEffect } from "react";
import ingredientService from "../../services/ingredient.service";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button, message, Popconfirm, Space, Table, Typography } from "antd";
import ApplicationHeader from "../../components/ApplicationHeader";
import IngredientModal from "./components/IngredientModal";
const Page = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Toolbar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  margin: 16px;
  flex-grow: 1;
`;

const IngredientTable = styled(Table)`
  flex-grow: 1;
`;

const Ingredient = () => {
    const { t } = useTranslation();
    const [ingredients, setIngredients] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedIngredient, setSelectedLocation] = useState(null);
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
            render: (text) => String(text),
        },
        {
            title: t("ingredient.ingredientCategoriesId"),
            dataIndex: "ingredientCategoriesId",
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
        setSelectedLocation(ingredient);
        setEditMode(true);
        setModalVisible(true);
    };
    const closeModal = () => {
        setSelectedLocation(null);
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
                    console.error(err);
                    setConfirmLoading(false);
                    message.error(t("editFail"));
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
                    console.error(err);
                    setConfirmLoading(false);
                    message.error(t("insertFail"));
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
                console.error(err);
                message.error(t("deleteFail"));
            });
    };


    return (
        <Page>
            <ApplicationHeader />
            <Content>
                <Toolbar>
                    <Typography.Title level={3}>{t("ingredient.title")}</Typography.Title>
                    <Button type="primary" onClick={() => openAddModal()}>
                        {t("ingredient.addBtn")}
                    </Button>
                </Toolbar>
                <IngredientTable
                    key="id"
                    dataSource={ingredients}
                    columns={columns}
                    scroll={{ y: "calc(100vh - 250px)" }}
                />
            </Content>
            <IngredientModal
                editMode={editMode}
                visible={modalVisible}
                confirmLoading={confirmLoading}
                ingredient={selectedIngredient}
                onCancel={closeModal}
                onOk={saveData}
            />
        </Page>
    );
};

export default Ingredient;