const Footer = (id, canvasEvents) => ({
    id: `${id}`,
    type: "footer",
    styles: {
        backgroundColor: "gray",
        color: "white",
        padding: "15px",
        fontSize: "18px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
    },
    position: { x: 0, y: 500 },
    HTMLAttributes: {
        onclick: "alert('Footer clicked!')",
    },
    attributes: {
        ...canvasEvents(id),
        className: "canvas-component-dark",
    },
    content: `Footer ${id}`,
});

export default Footer;
