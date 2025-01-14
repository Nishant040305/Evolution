const Button = (id, canvasEvents) => {
  return {
    id: `${id}`,
    type: 'button',
    styles: {
      backgroundColor: '#000000',
      color: '#FFFFFF',
      paddingTop: '10px',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingBottom: '10px',
      width: 'auto',
      height: 'auto',
      fontFamily: 'Arial Black',
      borderWidth: '1px',
      borderColor: '#000000',
      borderStyle: 'solid',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'inline-block',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
      textAlign: 'center',
      boxShadow: '2px 2px 5px #000000',
      transition: 'all 0.3s ease', // Smooth transition for all properties
      outline: 'none', // Removes default outline on focus
      letterSpacing: '1px', // Adds slight spacing between letters
      transform: 'rotate(0deg)', // Default scale for hover effect
    },
    position: { x: 100, y: 100 },
    HTMLAttributes: {
      onclick: "alert('Hello World!')",
    },
    attributes: {
      ...canvasEvents(id),
      className: 'canvas-component-dark no-scrollbar',
    },
    content: `Button ${id}`,
    view: true,
  };
};

export default Button;
