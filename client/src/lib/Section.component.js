const Section = (id, canvasEvents) => ({
    id: `${id}`,
    type: "section",
    styles: {
        padding: "10px",
        backgroundColor: "#f0f0f0",
        fontFamily: "Arial, sans-serif",
    },
    position: { x: 0, y: 300 },
    HTMLAttributes: {
        onclick: "alert('Section clicked!')",
    },
    attributes: {
        ...canvasEvents(id),
        className: "canvas-component-light",
    },
    content: `Section ${id}`,
});

export default Section;
