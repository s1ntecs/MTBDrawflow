import React, { memo } from 'react';
import { getSmoothStepPath, getEdgeCenter } from '@xyflow/react';
import './PetrolPipeEdge.css'; // Подключаем стили

const PetrolPipeEdge = ({
                            id,
                            sourceX,
                            sourceY,
                            targetX,
                            targetY,
                            sourcePosition,
                            targetPosition,
                            style = {},
                            markerEnd,
                            data,
                        }) => {
    // Получаем путь ребра (сглаженный "step" путь)
    const edgePath = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    });

    // Центр линии для текста
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    // Метка трубы (если не передана, по умолчанию 'PetrolPipe')
    const label = data?.label || 'PetrolPipe';

    return (
        <>
            {/* Труба */}
            <path
                id={id}
                className="petrol-pipe-edge"
                d={edgePath}
                markerEnd={markerEnd}
            />

            {/* Надпись на трубе */}
            <text className="petrol-pipe-label">
                <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
                    {label}
                </textPath>
            </text>
        </>
    );
};

export default memo(PetrolPipeEdge);