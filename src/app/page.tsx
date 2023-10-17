'use client';
import React, {useState} from "react";
import {TreeNode} from "@/components/tree/tree";
import Node from "@/components/tree/node";
import {HiOutlineMinus, HiPlus} from "react-icons/hi";
import DragMove from "@/components/DragMove";
import {HiMiniPaperAirplane} from "react-icons/hi2";


interface Points {
    pos3: number,
    pos4: number
}

export default function Home() {
    const [zoom, setZoom] = useState(1);
    const [rootNode, setRootNode] = useState(new TreeNode(null, 'Category'));

    const [rootStyle, setRootStyle] = useState<object>({});

    function handleChangeZoom() {
        setZoom(prevState => prevState + 0.1);
    }

    function handleCenter() {
        setTranslate({
            x: 0,
            y: 0
        });
    }


    const [translate, setTranslate] = useState({x: 0, y: 0});

    const handleDragMove = (e: React.PointerEvent) => {
        setTranslate({
            x: translate.x + e.movementX,
            y: translate.y + e.movementY
        });
    };

    const zoomValues = [25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];

    function increaseZoom() {
        const index = zoomValues.findIndex(value => value === zoom * 100);

        if (index < zoomValues.length - 1) {
            setZoom(zoomValues[index + 1] / 100);
        }
    }

    function decreaseZoom() {
        const index = zoomValues.findIndex(value => value === zoom * 100);
        console.log(index);
        console.log(zoomValues.length)
        if (index > 0) {
            setZoom(zoomValues[index - 1] / 100);
        }
    }

    return (
        <main>
            <header>
                <button onClick={handleCenter}><HiMiniPaperAirplane size={'1.3rem'}/></button>
                <button><HiPlus size={'1.3rem'} onClick={increaseZoom}/></button>
                <ul>
                    <li>{zoom * 100}%
                        <ul className="dropdown" aria-label="submenu">
                            {zoomValues.map((value) => (
                                <li onClick={() => setZoom(value / 100)}>{`${value}%`}</li>))}
                        </ul>
                    </li>
                </ul>
                <button onClick={decreaseZoom}><HiOutlineMinus size={'1.3rem'}/></button>
            </header>
            <DragMove onDragMove={handleDragMove} setStyle={setRootStyle}>
                <div className="treeSection">
                    <ul className="tree"
                        style={
                            {
                                transform: `translateX(${translate.x}px) translateY(${translate.y}px) scale(${zoom})`,
                                transformOrigin: '0% 0% 0px'
                            }}>
                        <Node node={rootNode} root={rootNode} setRoot={setRootNode} style={rootStyle} nodeLevel={0}/>
                    </ul>
                </div>
            </DragMove>
        </main>
    );
}
