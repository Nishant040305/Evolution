export const Input = (id, placeholder = "Enter text...",startDrag) => {
    return {
        id: `${id}`,
        type: "input",
        styles: {
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            borderWidth: "1px",
            borderColor: "#ccc",
            borderStyle: "solid",
            borderRadius: "5px",
            fontSize: "16px",
            width: "300px",                 // Full width for flexibility in layouts
            boxSizing: "border-box",       // Ensures padding doesn’t affect width
            outline: "none",               // Removes default outline
            transition: "all 0.3s ease",   // Smooth transition for all properties
            boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",  // Subtle shadow for depth
            // Define interactive state styles
            ":focus": {
                borderColor: "#007BFF",     // Change border color on focus
                boxShadow: "0 0 8px rgba(0, 123, 255, 0.5)", // Blue glow on focus
            },
            ":hover": {
                borderColor: "#888",        // Darken border on hover
            },
            ":disabled": {
                backgroundColor: "#f0f0f0", // Light gray background when disabled
                color: "#888",              // Dim text color when disabled
                cursor: "not-allowed",      // Change cursor for disabled state
            }
        },
        position: { x: 100, y: 100 },
        attributes: {
            placeholder: placeholder,        // Placeholder text
            onChange: (event) => {
                // Handle input change (future functionality)
            },
            onBlur: (event) => {
                // Handle input blur (future functionality)
            },
            onMouseDown: (event) => startDrag(event, id)
        }
    };
};
