/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addElement, setContent, setProperty } from "../Store/webElementSlice";
import components from "../lib";
const {
  Button,
  TextArea,
  Label,
  Input,
  Select,
  Div,
} = components;

// eslint-disable-next-line react/prop-types
const RelativeChildrenTest = ( { canvasEvents } ) => {
    const dispatch = useDispatch();
    const webElements = useSelector(state=>state.webElement.present);
    const [placed, setPlaced] = useState(false);

    const relativeTest = () => {
        const parentDiv = Div("parentDiv", canvasEvents);
        const childLabel = Label("childLabel", "TEST", canvasEvents);
        parentDiv.childrenId = [childLabel.id];
        childLabel.parent = parentDiv.id;
        delete childLabel.position;
        dispatch(addElement({ hash: childLabel.id, value: childLabel }));
        dispatch(addElement({ hash: parentDiv.id, value: parentDiv }));
    
        // Absolute div and child
        const div = Div("div", canvasEvents);
        div.content = "absolute";
        const childofdiv = Label("childofdiv", "HELLO", canvasEvents);
        div.childrenId = [childofdiv.id];
        childofdiv.parent = div.id;
        childofdiv.position.x = 15;
        childofdiv.position.y = 15;
        dispatch(addElement({ hash: childofdiv.id, value: childofdiv }));
        dispatch(addElement({ hash: div.id, value: div }));
    
        if (placed) return;
        setInterval(() => {
            console.log("relative test");
            dispatch(setContent({
                id: "parentDiv",
                property: "content",
                value: "relative ".slice(0, Math.random() * 10)
            }));
            console.log("relative test");
            dispatch(setProperty({
                id: "parentDiv",
                property: "padding",
                value: Math.random() * 100 + "px"
            }));
        }, 1000);
    
        if (!placed) setPlaced(true);
    };

    return (
        <div>
            <button onClick={relativeTest}>Relative Children TEST</button>
        </div>
    );
}

export default RelativeChildrenTest;