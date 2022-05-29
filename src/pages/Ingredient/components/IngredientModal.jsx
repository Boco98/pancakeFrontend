import React, { useEffect } from "react";
import { Form, Input, InputNumber, Modal } from "antd";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const IngredientModal = (props) => {
    const { t } = useTranslation();
    const { editMode, visible, onOk, onCancel, ingredient, confirmLoading } = props;
    const [form] = Form.useForm();
    const onSubmit = () => {
        form.validateFields().then((values) => {
            onOk({ ...ingredient, ...values });
        });
    };
    useEffect(() => {
        if (ingredient) form.setFieldsValue(ingredient);
        else form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredient]);
    return (
        <Modal
            title={
                editMode ? t("ingredient.editModalTitle") : t("ingredient.addModalTitle")
            }
            okText={t("save")}
            cancelText={t("cancel")}
            onOk={() => onSubmit()}
            destroyOnClose
            onCancel={() => onCancel()}
            visible={visible}
            confirmLoading={confirmLoading}
        >
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                labelAlign="left"
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: t("fieldRequired") }]}
                    label={t("ingredient.name")}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    rules={[{ required: true, message: t("fieldRequired") }]}
                    label={t("ingredient.price")}
                >
                    <InputNumber min={0} max={100} precision={2} />
                </Form.Item>
                <Form.Item
                    name="healthyIngredient"
                    rules={[{ required: true, message: t("fieldRequired") }]}
                    label={t("ingredient.healthyIngredient")}
                >
                    <InputNumber min={0} max={1} precision={0} />
                </Form.Item>
                <Form.Item
                    name="ingredientCategoriesId"
                    rules={[{ required: true, message: t("fieldRequired") }]}
                    label={t("ingredient.ingredientCategoriesId")}
                >
                    <InputNumber min={1} max={4} precision={0} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

IngredientModal.propTypes = {
    editMode: PropTypes.bool,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
};

export default IngredientModal;