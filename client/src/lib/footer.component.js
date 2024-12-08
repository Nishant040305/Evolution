const Footer = (id, canvasEvents) => ({
    id: `${id}`,
    type: "footer",
    styles: {
        backgroundColor: "#000000",
        color: "#FFFFFF",
        paddingTop: "10px",
        paddingLeft: "10px",paddingRight: "10px",paddingBottom: "10px",
        width:"1470px",
        height:"auto",
        fontFamily:"Arial Black",
        borderWidth: "1px",
        borderColor: "#000000",
        borderStyle: "solid",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        display: "inline-block",
        borderTopLeftRadius:"5px",
        borderTopRightRadius:"5px",
        borderBottomLeftRadius:"5px",
        borderBottomRightRadius:"5px",
        textAlign: "center",
        boxShadow: "2px 2px 5px #000000",
        transition: "all 0.3s ease",      // Smooth transition for all properties
        outline: "none",                 // Removes default outline on focus
        letterSpacing: "1px",            // Adds slight spacing between letters
        transform: "rotate(0deg)",           // Default scale for hover effect

    },
    position: { x: 0, y: 600 },
    HTMLAttributes: {
        onclick: "alert('Footer clicked!')",
    },
    attributes: {
        ...canvasEvents(id,true),
        className: "canvas-component-dark",
    },
    content: `Footer ${id}`,
    children: [],
});

export default Footer;
