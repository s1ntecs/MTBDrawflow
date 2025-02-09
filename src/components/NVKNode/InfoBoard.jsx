import React from 'react';
import PropTypes from 'prop-types';
import loadIconDefault from './assets/warning.png'; // Проверьте корректность пути к иконке

/**
 * Информационное табло, разделённое на:
 * - Верхнюю левую часть: Нагрузка (с иконкой)
 * - Верхнюю правую часть: Год ввода
 * - Нижнюю часть: Баланс
 */
const InfoBoard = ({ loadPercentage, year, balanceStatus, loadIconPath }) => {
    const iconSrc = loadIconPath || loadIconDefault;
    // Фон для панели нагрузки: ниже 100% — зелёный, 100% и выше — красный
    const loadBg = loadPercentage < 100 ? '#28a745' : '#e74c3c';
    // Фиксированный фон для года ввода (например, синий)
    const yearBg = '#3498db';
    // Проверяем, есть ли ошибка в балансе (сравниваем, например, со строкой "ошибка")
    const balanceHasError =
        typeof balanceStatus === 'string' &&
        balanceStatus.trim().toLowerCase() === 'ошибка';
    const balanceBg = balanceHasError ? '#e74c3c' : '#28a745';

    return (
        <div className="info-board">
            {/* Верхняя левая панель: Нагрузка */}
            <div className="info-board__load" style={{ backgroundColor: loadBg }}>
                <div className="info-board__panel-content">
                    <img src={ iconSrc} alt="Load Icon" className="info-board__icon" />
                    <div className="info-board__text">
                        <div className="info-board__title">Нагрузка {loadPercentage} %</div>
                    </div>
                </div>
            </div>

            {/* Верхняя правая панель: Год ввода */}
            <div className="info-board__year" style={{ backgroundColor: yearBg }}>
                <div className="info-board__panel-content">
                    <div className="info-board__text">
                        <div className="info-board__title">Год ввода</div>
                        <div className="info-board__value">{year}</div>
                    </div>
                </div>
            </div>

            {/* Нижняя панель: Баланс */}
            <div className="info-board__balance" style={{ backgroundColor: balanceBg }}>
                <div className="info-board__panel-content">
                    <div className="info-board__text">
                        <div className="info-board__title">Баланс</div>
                        <div className="info-board__value">{balanceStatus}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

InfoBoard.propTypes = {
    loadPercentage: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    balanceStatus: PropTypes.string.isRequired,
    loadIconPath: PropTypes.string,
};

InfoBoard.defaultProps = {
    loadIconPath: null,
};

export default InfoBoard;