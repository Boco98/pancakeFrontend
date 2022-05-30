import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Form, Input, Modal, Select } from "antd";
import ingredientService from "../../../services/ingredient.service";

const PancakeModal = (props) => {
    const { t } = useTranslation();
    const { editMode, visible, onOk, onCancel, pancake, confirmLoading } = props;
    const [form] = Form.useForm();
    const [ingredient, setIngredients] = useState([]);


    const onSubmit = () => {
        form.validateFields().then((values) => {
            onOk({ ...pancake, ...values });
        });
    };
    useEffect(() => {
        if (pancake) form.setFieldsValue(pancake);
        else form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pancake]);
    useEffect(() => {
        ingredientService.getAll().then((res) => setIngredients(res.data));
    }, []);
    return (
        <Modal
            title={editMode ? t("pancake.editModalTitle") : t("pancake.addModalTitle")}
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
                    label={t("pancake.name")}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="ingredientId"
                    rules={[{ required: true, message: t("fieldRequired") }]}
                    label={t("pancake.ingredient")}
                >
                    <Select>
                        {ingredient.map((e) => (
                            <Select.Option key={e.id} value={e.id}>
                                {e.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <Select>
                        {ingredient.map((e) => (
                            <Select.Option key={e.id} value={e.id}>
                                {e.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <Select>
                        {ingredient.map((e) => (
                            <Select.Option key={e.id} value={e.id}>
                                {e.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

PancakeModal.propTypes = {
    editMode: PropTypes.bool,
    visible: PropTypes.bool,
    confirmLoading: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    asset: PropTypes.object,
};

export default PancakeModal;
