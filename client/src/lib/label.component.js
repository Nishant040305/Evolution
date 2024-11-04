const Label = (id, text = "Label",startDrag) => {
    return {
        id: `${id}`,
        type: "label",
        styles: {
            color: "black",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "5px",
            display: "inline-block",       // Ensures label displays correctly with inputs
            cursor: "pointer",
            transition: "color 0.3s ease",  // Smooth color transition
        },
        position: { x: 100, y: 100 },
        content: text,
        attributes:{
            onMouseDown: (event) => startDrag(event, id)
        }
    };
};

export default Label;