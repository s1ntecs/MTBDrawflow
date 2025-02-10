import React from 'react';
import { BaseEdge, getSmoothStepPath, EdgeLabelRenderer } from '@xyflow/react';
import './PetrolPipeEdge.css'; // Подключаем стили

export function AnimatedSVGEdge({
                                    id,
                                    sourceX,
                                    sourceY,
                                    targetX,
                                    targetY,
                                    sourcePosition,
                                    targetPosition,
                                    data, // Данные, содержащие текст
                                }) {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    // Рассчитываем длину трубы (размер пути)
    const distance = Math.sqrt((targetX - sourceX) ** 2 + (targetY - sourceY) ** 2);

    // Количество точек (чем длиннее труба, тем больше точек, но не менее 3)
    const numParticles = Math.max(3, Math.floor(distance / 50));

    return (
        <>
            {/* Основная черная труба */}
            <BaseEdge
                id={id}
                path={edgePath}
                style={{
                    stroke: '#000',
                    strokeWidth: 5,
                    strokeLinecap: 'round',
                    strokeDasharray: '10,6',
                }}
            />

            {/* Анимация потока */}
            {Array.from({ length: numParticles }).map((_, i) => (
                <circle key={i} r="5" fill="black">
                    <animateMotion
                        dur={`${2 + i * 0.5}s`}
                        repeatCount="indefinite"
                        path={edgePath}
                        begin={`${i * 0.5}s`}
                    />
                </circle>
            ))}

            {/* Красивый текст на линии */}
            <EdgeLabelRenderer>
                <div
                    className="edge-label nodrag nopan"
                    style={{
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                    }}
                >
                    {data?.label}
                </div>
            </EdgeLabelRenderer>
        </>
    );
}