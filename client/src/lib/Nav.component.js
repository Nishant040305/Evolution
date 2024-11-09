const Nav = (id, canvasEvents) => ({
    id: `${id}`,
    type: "nav",
    styles: {
        display: "flex",
        gap: "15px",
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        fontFamily: "Arial, sans-serif",
    },
    position: { x: 0, y: 50 },
    HTMLAttributes: {
        onclick: "alert('Nav clicked!')",
    },
    attributes: {
        ...canvasEvents(id),
        className: "canvas-component-dark",
    },
    content: `Navigation ${id}`,
});

export default Nav;
