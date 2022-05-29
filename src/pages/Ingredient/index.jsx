import React, { useState, useEffect } from "react";
import ingredientService from "../../services/ingredient.service";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button, Table, Typography } from "antd";
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
    const [editMode, setEditMode] = useState(false);
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
    ];

    const openAddModal = () => {
        setEditMode(false);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
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
                    dataSource={ingredients}
                    columns={columns}
                    scroll={{ y: "calc(100vh - 250px)" }}
                />
            </Content>
            <IngredientModal
                editMode={editMode}
                visible={modalVisible}
                onCancel={closeModal}
                onOk={closeModal}
            />
        </Page>
    );
};

export default Ingredient;