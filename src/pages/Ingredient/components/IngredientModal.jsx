import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const IngredientModal = (props) => {
    const { t } = useTranslation();
    const { editMode, visible, onOk, onCancel } = props;
    const onSubmit = () => {
        onOk();
    };
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
        ></Modal>
    );
};

IngredientModal.propTypes = {
    editMode: PropTypes.bool,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
};

export default IngredientModal;