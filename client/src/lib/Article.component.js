const Articles = (id, canvasEvents) => ({
    id: `${id}`,
    type: "article",
    styles: {
        padding: "15px",
        fontSize: "18px",
        lineHeight: "1.6",
        fontFamily: "Arial, sans-serif",
    },
    position: { x: 50, y: 150 },
    HTMLAttributes: {
        onclick: "alert('Article clicked!')",
    },
    attributes: {
        ...canvasEvents(id),
        className: "canvas-component-light",
    },
    content: `Article ${id}`,
});

export default Articles;
