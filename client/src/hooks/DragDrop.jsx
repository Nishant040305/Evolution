import { useState, useRef ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addChild,
  removeChild,
  addElement
} from "../Store/webElementSlice";

export const useCanvasEvents = (setId, toggleRight, webElements) => {
  const dispatch = useDispatch();
  const webElementsRef = useRef(webElements);

  // Keep the webElements up-to-date
  useEffect(() => {
    webElementsRef.current = webElements;
  }, [webElements]);

  const onDragStart = (event, elementId) => {
    const handleClick = () => {
      setId(elementId);
      toggleRight(true);
    };
    document
      .getElementById(`canvas-element ${elementId}`)
      .addEventListener("click", handleClick);
    event.stopPropagation();
    console.log("Dragging.... ", elementId);
    setId(elementId);
    const rect = event.currentTarget.getBoundingClientRect();

    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        id: elementId,
        offsetX,
        offsetY
      })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragEnter = (event, targetId) => {
    event.preventDefault();
    console.log("Entered:", targetId);
  };

  const onDragOver = (event, targetId) => {
    event.preventDefault();
    console.log("Dragging over:", targetId);
  };

  const onDragLeave = (event, targetId) => {
    console.log("Left:", targetId);
  };

  const onDrop = (event, targetId) => {
    event.preventDefault();

    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const { id: draggedElementId, offsetX, offsetY } = data;

    if (draggedElementId === targetId) return;

    event.stopPropagation();

    const element = webElementsRef.current[draggedElementId];
    const target = webElementsRef.current[targetId];

    if (element && target) {
      const rect = event.currentTarget.getBoundingClientRect();

      const dx = event.clientX - rect.left - offsetX;
      const dy = event.clientY - rect.top - offsetY;

      // Handle parent-child relationship
      if (element.parent) {
        dispatch(removeChild({ id: element.parent, child: draggedElementId }));
      }
      dispatch(addChild({ id: targetId, child: draggedElementId }));
    }

    console.log("Dropped on:", targetId);
  };

  const canvasEvents = (id, container) => {
    const dragTarget = container
      ? {
          onDragEnter: (event) => onDragEnter(event, id),
          onDragOver: (event) => onDragOver(event, id),
          onDragLeave: (event) => onDragLeave(event, id),
          onDrop: (event) => onDrop(event, id)
        }
      : {};
    return {
      onDragStart: (event) => onDragStart(event, id),
      ...dragTarget
    };
  };

  return { canvasEvents };
};
