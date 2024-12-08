const Heading = (id, text, level, canvasEvents) => {
    const tag = `h${level}`; // Dynamically set the tag (h1, h2, etc.)
    const headingStyles = {
        fontSize: `${24 - (level - 1) * 2}px`,  // Decrease font size with each level (h1 to h6)
        backgroundColor: "#FFFFFF",
        color: "#000000",
        paddingTop: "10px",
        paddingLeft: "10px",paddingRight: "10px",paddingBottom: "10px",
        width:"auto",
        height:"auto",
        fontFamily:"calibri",
        borderWidth: "0px",
        borderColor: "#000000",
        borderStyle: "solid",
        fontWeight: "600",
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
        view:true,
    };
};

const H1 = (id, canvasEvents, text = "Heading 1") => Heading(id, text, 1, canvasEvents);
const H2 = (id, canvasEvents, text = "Heading 2") => Heading(id, text, 2, canvasEvents);
const H3 = (id, canvasEvents, text = "Heading 3") => Heading(id, text, 3, canvasEvents);
const H4 = (id, canvasEvents, text = "Heading 4") => Heading(id, text, 4, canvasEvents);
const H5 = (id, canvasEvents, text = "Heading 5") => Heading(id, text, 5, canvasEvents);
const H6 = (id, canvasEvents, text = "Heading 6") => Heading(id, text, 6, canvasEvents);

export { H1, H2, H3, H4, H5, H6 };
