export const Button = (id, startDrag) => {
    return {
        id: `${id}`,
        type: "button",
        styles: {
            backgroundColor: "black",
            color: "white",
            paddingTop: "10px",
            paddingLeft: "10px",paddingRight: "10px",paddingBottom: "10px",
            width:"auto",
            height:"auto",
            fontFamily:"Arial Black",
            borderWidth: "1px",
            borderColor: "white",
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
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",      // Smooth transition for all properties
            outline: "none",                 // Removes default outline on focus
            letterSpacing: "1px",            // Adds slight spacing between letters
            transform: "rotate(0deg)",           // Default scale for hover effect
            // Define hover and active state effects
            ":hover": {
                backgroundColor: "#333",    // Darken background on hover
                color: "#f0f0f0",           // Lighten text color on hover
                boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.4)", // Increase shadow on hover
                transform: "scale(1.05)",   // Slightly increase size on hover
            },
            ":active": {
                backgroundColor: "#555",    // Change background on click
                boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.6)", // Inset shadow for press effect
                transform: "scale(0.98)",   // Slightly shrink for pressed effect
            },
            ":focus": {
                outline: "2px dashed #fff", // Custom outline on focus for accessibility
            }
        },
        position: { x: 100, y: 100 },
        attributes: {
            onClick: () => { 
                // TODO: Implement future functionality
            },
            onMouseDown: (event) => startDrag(event, id)
        },
        content: `Button ${id}`
    };
};
