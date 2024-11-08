
  const onDragStart = (event, elementId) => {
    const handleClick = ()=>{
      setId(elementId);
      toggleRight(true);
    }
    document.getElementById(`canvas-element ${elementId}`).addEventListener("click",handleClick)
    event.stopPropagation();
    console.log("Dragging.... ", elementId);
    setId(elementId);
    const rect = event.currentTarget.getBoundingClientRect();
    
    // Calculate the offset between the mouse position and the top-left corner of the element
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    
    // Store both the element ID and the offset in dataTransfer
    event.dataTransfer.setData("text/plain", JSON.stringify({
      id: elementId,
      offsetX,
      offsetY
    }));
    event.dataTransfer.effectAllowed = "move";
  };
  
  const onDragEnter = (event, targetId) => {
    event.preventDefault(); // Allow the drop by preventing default behavior
    console.log("Entered:", targetId);
  };
  
  const onDragOver = (event, targetId) => {
    event.preventDefault(); // Allow the drop by preventing default behavior
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

    event.stopPropagation(); // Stop propagating as target found

    const element = webElementsRef.current[draggedElementId];
    const target = webElementsRef.current[targetId];

    if (element && target) {
      // Get the bounding box of the drop target (main canvas or div)
      const rect = event.currentTarget.getBoundingClientRect();
      
      // Calculate the new position based on the drop location and offset
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

  const openProperties = (event, elementId) => {
    setId(elementId);
  };

export const canvasEvents = (id, container) => {
    const dragTarget = container ? {
      onDragEnter: (event) => onDragEnter(event, id),
      onDragOver: (event) => onDragOver(event, id),
      onDragLeave: (event) => onDragLeave(event, id),
      onDrop: (event) => onDrop(event, id),
    } : {};
    return {
      onDragStart: (event) => onDragStart(event, id),
      onClick: (event) => openProperties(event, id),
      ...dragTarget,
    };
  };