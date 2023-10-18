import React, { useState } from "react";


interface DragMoveProps {
    onDragMove: (event: React.PointerEvent) => void;
    setStyle: any;
    children: React.ReactNode;
}

export default function DragMove(props: DragMoveProps) {
    const {
        onDragMove,
        setStyle,
        children
    } = props;

    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        setStyle((prev: object) => {return  {...prev, cursor: 'move'}});
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        setStyle((prev: object) => {return  {...prev, cursor: 'auto'}});
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (isDragging) onDragMove(e);
    };

    return (
        <div
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}>
            {children}
        </div>
    );
}
