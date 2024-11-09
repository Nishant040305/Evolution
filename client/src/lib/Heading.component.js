const Heading = (id, text, level, canvasEvents) => {
    const tag = `h${level}`; // Dynamically set the tag (h1, h2, etc.)
    
    const headingStyles = {
        color: "black",
        fontSize: `${24 - (level - 1) * 2}px`,  // Decrease font size with each level (h1 to h6)
        fontWeight: "bold",
        marginBottom: "10px",
        display: "inline-block",
        cursor: "pointer",
        transition: "color 0.3s ease",
    };

    return {
        id: `${id}`,
        type: tag,
        styles: headingStyles,
        position: { x: 100, y: 100 },
        content: text,
        attributes: {
            ...canvasEvents(id),
            className: "no-scrollbar",
        },
    };
};

const H1 = (id, canvasEvents, text = "Heading 1") => Heading(id, text, 1, canvasEvents);
const H2 = (id, canvasEvents, text = "Heading 2") => Heading(id, text, 2, canvasEvents);
const H3 = (id, canvasEvents, text = "Heading 3") => Heading(id, text, 3, canvasEvents);
const H4 = (id, canvasEvents, text = "Heading 4") => Heading(id, text, 4, canvasEvents);
const H5 = (id, canvasEvents, text = "Heading 5") => Heading(id, text, 5, canvasEvents);
const H6 = (id, canvasEvents, text = "Heading 6") => Heading(id, text, 6, canvasEvents);

export { H1, H2, H3, H4, H5, H6 };
