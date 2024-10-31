export const Textarea = (id,startDrag) => {
    return {
        id: `${id}`,
        type: "textarea",
        styles: {
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            borderWidth: "1px",
            borderColor: "#ccc",
            borderStyle: "solid",
            borderRadius: "5px",
            fontSize: "16px",
            lineHeight: "1.5",           // Improves readability of text
            width: "200px",
            height: "100px",
            boxSizing: "border-box",
            outline: "none",
            resize: "vertical",          // Allows vertical resizing only
            transition: "all 0.3s ease",
            boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
            // Define interactive styles
            ":focus": {
                borderColor: "#007BFF",
                boxShadow: "0 0 8px rgba(0, 123, 255, 0.5)"
            },
            ":hover": {
                borderColor: "#888"
            },
            // ":disabled": {
            //     backgroundColor: "#f0f0f0",
            //     color: "#888",
            //     cursor: "not-allowed"
            // }
        },
        position: { x: 100, y: 100 },
        attributes: {
            placeholder: "write something",
            onChange: (event) => {
                console.log("Textarea content:", event.target.value); // Log changes
            },
            onMouseDown: (event) => startDrag(event, id)
        }
    };
};
