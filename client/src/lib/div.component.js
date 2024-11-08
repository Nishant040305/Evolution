const Div = (id, canvasEvents) => {
    return {
        id: `${id}`,
        type: "div",
        styles: {
            backgroundColor: "white",
            color: "black",
            padding: "40px",
            borderWidth: "1px",
            borderColor: "#ccc",
            borderStyle: "solid",
            borderRadius: "5px",
            fontSize: "16px",
            width: "300px",                 // Full width for flexibility in layouts
            boxSizing: "border-box",       // Ensures padding doesn’t affect width
            outline: "none",               // Removes default outline
            transition: "all 0.3s ease",   // Smooth transition for all properties
            boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",  // Subtle shadow for depth
        },
        position: { x: 100, y: 100 },
        attributes: {
            ...canvasEvents(id, true),
        },
        children: [],
    };
};

export default Div;