import React, { useRef, useCallback } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Background,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';


import Sidebar from './Sidebar.jsx';
import { DnDProvider, useDnD } from './DnDContext.jsx';
import NVKNode from './components/NVKNode';
import PetrolPipeEdge from './components/PetrolPipe/PetrolPipeEdge.jsx';


const nodeTypes = {
    NVKNode: NVKNode,
};

const edgeTypes = {
    petrolPipe: PetrolPipeEdge,
};

const initialNodes = [
    {
        id: '1',
        type: 'NVKNode',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
    },
    {
        id: '2',
        type: 'NVKNode',
        data: { label: 'second node' },
        position: { x: 480, y: 5 },
    },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, type: 'petrolPipe' },
];


let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({ ...params, animated: true, type: "step" }, eds),
            ),
        [],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!type) {
                return;
            }

            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
    );

    return (
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    style={{ backgroundColor: "#F7F9FB" }}
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
            <Sidebar />
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDProvider>
            <DnDFlow />
        </DnDProvider>
    </ReactFlowProvider>
);