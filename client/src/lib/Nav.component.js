const Nav = (id, canvasEvents) => ({
    id: `${id}`,
    type: "nav",
    styles: {
        backgroundColor: "#000000",
        color: "#FFFFFF",
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
        cursor: "text",
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
        display: "flex",
        gap: "15px",
        padding: "10px",
        display: "flex",
    },
    position: { x: 0, y: 0 },
    HTMLAttributes: {
        onclick: "alert('Nav clicked!')",
    },
    attributes: {
        ...canvasEvents(id, true),
        className: "canvas-component-dark no-scrollbar",
    },
    content: `Navigation ${id}`,
    children: [],
});

export default Nav;
