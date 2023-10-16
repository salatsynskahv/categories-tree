'use client';
import Tree from "@/components/tree";
import React, {useState} from "react";
import {redirect} from "next/navigation";


interface Points {
    pos3 :number,
    pos4: number
}
export default function Home() {
    const [zoom, setZoom] = useState(1);
    const[pos, setPos] = useState<Points>({pos3: 0, pos4: 0})

    function handleChangeZoom() {
        setZoom(prevState => prevState + 0.1);
    }

    function handleCenter() {

    }

    const [treeStyle, setTreeStyle] = useState({
        position: "relative"
    });

    function handleDragStart(e: React.DragEvent) {
        setPos({pos3: e.clientX, pos4: e.clientY});
    }
    function handleDropOver(e: React.DragEvent) {
        e.preventDefault();
        const mouseX = pos.pos3 - e.clientX;
        const mouseY = pos.pos4  - e.clientY;
        setPos({pos3: e.clientX, pos4: e.clientY});

        setTreeStyle({
            position: 'fixed',
            left: `${e.nativeEvent.offsetX - mouseX}px`,
            top: `${e.nativeEvent.offsetY - mouseY}px`
        });
    }

    return (
        <main>
            <header>
                <button onClick={handleChangeZoom}>Change Zoom</button>
                <button onClick={handleCenter}>Center</button>
            </header>
            <div className="treeSection"
                 style={{transform: `scale(${zoom}`}}
                 onDragStart={handleDragStart}
                 onDragOver={handleDropOver}>
                <Tree treeStyle={treeStyle}/>
            </div>
        </main>
    );
}
