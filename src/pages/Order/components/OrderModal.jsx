import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Form, Input, Modal, Select } from "antd";
import pancakeService from "../../../services/pancake.service";

const OrderModal = (props) => {
    const { t } = useTranslation();
    const { editMode, visible, onOk, onCancel, order, confirmLoading } = props;
    const [form] = Form.useForm();
    const [pancake, setPancakes] = useState([]);


    const onSubmit = () => {
        form.validateFields().then((values) => {
            onOk({ ...order, ...values });
        });
    };
    useEffect(() => {
        if (order) form.setFieldsValue(order);
        else form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order]);
    useEffect(() => {
        pancakeService.getAll().then((res) => setPancakes(res.data));
    }, []);
    return (
        <Modal
            title={editMode ? t("order.editModalTitle") : t("order.addModalTitle")}
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
                    name="datetime"
                    rules={[{ required: true, message: t("fieldRequired") }]}
                    label={t("order.datetime")}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="pancake"
                    rules={[{ required: true, message: t("fieldRequired") }]}
                    label={t("pancake.name1")}
                >
                    <Select>
                        {pancake.map((e) => (
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

OrderModal.propTypes = {
    editMode: PropTypes.bool,
    visible: PropTypes.bool,
    confirmLoading: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    asset: PropTypes.object,
};

export default OrderModal;
