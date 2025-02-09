// NVKButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './NVKNode.css';

/**
 * Компонент кнопки с иконкой.
 * Иконка обёрнута в контейнер с белым прямоугольным фоном.
 *
 * @param {Object} props
 * @param {string} props.icon - Путь к .png файлу иконки
 * @param {string} props.label - Текст кнопки
 * @param {function} props.onClick - Обработчик клика
 */
const NVKButton = ({ icon, label, onClick }) => {
    return (
        <button className="nvk-node__button" onClick={onClick}>
            {/* Контейнер для иконки с белым фоном */}
            {icon && (
                <div className="nvk-node__button-icon-container">
                    <img src={icon} alt="icon" className="nvk-node__button-icon" />
                </div>
            )}
            <span className="nvk-node__label">{label}</span>
        </button>
    );
};

NVKButton.propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

NVKButton.defaultProps = {
    onClick: () => {},
};

export default NVKButton;