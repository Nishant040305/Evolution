const Header = (id, canvasEvents) => ({
    id: `${id}`,
    type: "header",
    styles: {
        backgroundColor: "darkblue",
        color: "white",
        padding: "20px",
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
    },
    position: { x: 0, y: 0 },
    HTMLAttributes: {
        onclick: "alert('Header clicked!')",
    },
    attributes: {
        ...canvasEvents(id),
        className: "canvas-component-dark",
    },
    content: `Header ${id}`,
});

export default Header;
