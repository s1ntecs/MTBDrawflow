// NVKNode.jsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NVKButton from './NVKButton';
import InfoBoard from './InfoBoard';
import './NVKNode.css';

// Импорт изображений (убедитесь, что файлы находятся в указанном пути)
import optimizationIcon from './assets/optimization.png';
import showGraphIcon from './assets/showGraph.png';
import showInfoIcon from './assets/showInfo.png';
import distributeFlowsIcon from './assets/distributeFlows.png';

const NVKNode = ({ data }) => {
    const { loadPercentage, year, balanceStatus } = data;
    const panelColor = loadPercentage < 100 ? '#28a745' : '#dc3545';

    // Обработчики нажатия кнопок
    const handleBuildChart = () => {
        console.log('Построить График clicked');
    };

    const handleViewData = () => {
        console.log('Просмотр данных clicked');
    };

    const handleDistributeFlows = () => {
        console.log('Распределить потоки clicked');
    };

    return (
        <div className="nvk-node">
            <div className="nvk-node__header">НПС Поповка</div>
            <div className="nvk-node__body">
                <InfoBoard
                    loadPercentage={loadPercentage}
                    year={year}
                    balanceStatus={balanceStatus}
                    loadIconPath={optimizationIcon}
                />
                <div className="nvk-node__buttons">
                    <NVKButton
                        icon={showGraphIcon}
                        label="Построить График"
                        onClick={handleBuildChart}
                    />
                    <NVKButton
                        icon={showInfoIcon}
                        label="Просмотр данных"
                        onClick={handleViewData}
                    />
                    <NVKButton
                        icon={distributeFlowsIcon}
                        label="Распределить потоки"
                        onClick={handleDistributeFlows}
                    />
                </div>
            </div>
            {/* Входные соединители слева (тип "target") */}
            {Array.from({ length: 4 }).map((_, idx) => (
                <Handle
                    key={`left-${idx}`}
                    id={`left-${idx}`}
                    type="target"
                    position={Position.Left}
                    className="nvk-node__handle"
                    // Размещаем соединители равномерно (20%, 40%, 60%, 80% от высоты узла)
                    style={{ top: `${(idx + 1) * 20}%` }}
                />
            ))}
            {/* Выходные соединители справа (тип "source") */}
            {Array.from({ length: 4 }).map((_, idx) => (
                <Handle
                    key={`right-${idx}`}
                    id={`right-${idx}`}
                    type="source"
                    position={Position.Right}
                    className="nvk-node__handle"
                    style={{ top: `${(idx + 1) * 20}%` }}
                />
            ))}
        </div>
    );
};

export default NVKNode;