import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addElement } from "../Store/webElementSlice";
import components from "../lib";
const {
  Button,
  TextArea,
  Label,
  Input,
  Select,
  Div,
} = components;

const RelativeChildrenTest = ( { startDrag } ) => {
    const dispatch = useDispatch();
    const webElements = useSelector(state=>state.webElement.present);

    const relativeTest = () => {
        const parentDiv = Div("parentDiv", startDrag);
        parentDiv.content = "";
        const childLabel = Label("childLabel", "TEST", startDrag);
        parentDiv.childrenId = [childLabel.id];
        childLabel.parent = parentDiv.id;
        delete childLabel.position;
        dispatch(addElement({hash:childLabel.id,value:childLabel}))
        dispatch(addElement({hash:parentDiv.id,value:parentDiv}))
    
        // div test
        const div = Div("div", startDrag);
        div.content = "absolute";
        const childofdiv = Label("childofdiv", "HELLO", startDrag);
        div.childrenId = [childofdiv.id];
        childofdiv.parent = div.id;
        childofdiv.position.x = 15;
        childofdiv.position.y = 15;
        dispatch(addElement({hash:childofdiv.id,value:childofdiv}))
        dispatch(addElement({hash:div.id,value:div}));

        console.log(webElements);
    };

    return (
        <div>
            <button onClick={relativeTest}>Children TEST</button>
        </div>
    );
}

export default RelativeChildrenTest;