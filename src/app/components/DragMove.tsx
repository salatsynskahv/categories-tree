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

    function stopDragging(): void {
        setIsDragging(false);
        setStyle((prev: object) => {return  {...prev, cursor: 'auto'}});
    }
    const handleMouseLeave = (e: React.MouseEvent): void => {
        stopDragging();
    }

    const handlePointerUp = (e: React.PointerEvent): void => {
       stopDragging();
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (isDragging) onDragMove(e);
    };

    return (
        <div className="section"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
}
