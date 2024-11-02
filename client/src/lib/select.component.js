import React from "react";

const Select = (id, options = [], startDrag) => {
    return {
        id: `${id}`,
        type: "select",
        styles: {
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            borderWidth: "1px",
            borderColor: "#ccc",
            borderStyle: "solid",
            borderRadius: "5px",
            fontSize: "16px",
            width: "100%",
            boxSizing: "border-box",
            outline: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            // Define interactive styles
            ":focus": {
                borderColor: "#007BFF",
                boxShadow: "0 0 8px rgba(0, 123, 255, 0.5)"
            },
            ":hover": {
                borderColor: "#888"
            },
            ":disabled": {
                backgroundColor: "#f0f0f0",
                color: "#888",
                cursor: "not-allowed"
            }
        },
        position: { x: 100, y: 100 },
        attributes: {
            onChange: (event) => {
                // Handle selection change (future functionality)
            },
            onMouseDown: (event) => startDrag(event, id)
        },
        content: options.map((option, index) =>
            React.createElement(
                'option',
                {
                    key: `SELECT ${id} OPTION ${index}`,
                    value: `SELECT ${id} OPTION ${index}`
                },
                option
            )
        ),
    };
};

export default Select;