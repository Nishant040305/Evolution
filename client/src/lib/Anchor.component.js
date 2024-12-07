const Anchor = (id, canvasEvents) => ({
    id: `${id}`,
    type: "a",
    styles: {
        backgroundColor: "#FFFFFF",
        color: "#0000FF",
        paddingTop: "10px",
        paddingLeft: "10px",paddingRight: "10px",paddingBottom: "10px",
        width:"auto",
        height:"auto",
        fontFamily:"calibri",
        borderWidth: "0px",
        borderColor: "#000000",
        borderStyle: "solid",
        fontSize: "16px",
        fontWeight: "400",
        cursor: "pointer",
        display: "inline-block",
        borderTopLeftRadius:"0.5px",
        borderTopRightRadius:"0.5px",
        borderBottomLeftRadius:"0.5px",
        borderBottomRightRadius:"0.5px",
        textAlign: "left",
        boxShadow: "0px 0px 0px 0px #FFFFFF",
        transition: "all 0.3s ease",      // Smooth transition for all properties
        outline: "none",                 // Removes default outline on focus
        letterSpacing: "0px",            // Adds slight spacing between letters
        transform: "rotate(0deg)",           // Default scale for hover effect
        textDecoration: "underline", // Adds underline to the link
    },
    position: { x: 100, y: 100 },
    HTMLAttributes: {
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
