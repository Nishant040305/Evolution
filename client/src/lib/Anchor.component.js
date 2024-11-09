const Anchor = (id, canvasEvents) => ({
    id: `${id}`,
    type: "a",
    styles: {
        color: "blue",
        textDecoration: "none",
        cursor: "pointer",
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
        transition: "color 0.3s ease",
    },
    position: { x: 100, y: 100 },
    HTMLAttributes: {
        href: "#",
        onclick: "alert('Link clicked!')",
    },
    attributes: {
        ...canvasEvents(id),
        className: "canvas-component-link no-scrollbar",
        href: "https://www.example.com"
    },
    content: `Link ${id}`,
});

export default Anchor;
