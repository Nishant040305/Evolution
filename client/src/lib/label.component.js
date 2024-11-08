const Label = (id, text = "Label", canvasEvents) => {
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
        attributes: {
            ...canvasEvents(id),
        },
    };
};

export default Label;