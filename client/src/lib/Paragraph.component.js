const Paragraph = (id, text = "Paragraph", canvasEvents) => {
    return {
        id: `${id}`,
        type: "p",
        styles: {
            color: "black",
            fontSize: "16px",
            fontWeight: "normal",
            lineHeight: "1.5",
            marginBottom: "10px",
            display: "inline-block",
            cursor: "pointer",
            transition: "color 0.3s ease",
        },
        position: { x: 100, y: 100 },
        content: text,
        attributes: {
            ...canvasEvents(id),
        },
    };
};