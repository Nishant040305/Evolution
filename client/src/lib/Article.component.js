const Articles = (id, canvasEvents) => ({
  id: `${id}`,
  type: 'article',
  styles: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
    width: 'auto',
    height: 'auto',
    fontFamily: 'calibri',
    borderWidth: '0px',
    borderColor: '#000000',
    borderStyle: 'solid',
    fontWeight: '400',
    cursor: 'text',
    display: 'inline-block',
    borderTopLeftRadius: '0.5px',
    borderTopRightRadius: '0.5px',
    borderBottomLeftRadius: '0.5px',
    borderBottomRightRadius: '0.5px',
    textAlign: 'left',
    boxShadow: '0px 0px 0px 0px #FFFFFF',
    transition: 'all 0.3s ease', // Smooth transition for all properties
    outline: 'none', // Removes default outline on focus
    letterSpacing: '0px', // Adds slight spacing between letters
    transform: 'rotate(0deg)', // Default scale for hover effect
    padding: '15px',
    fontSize: '18px',
    lineHeight: '1.6',
  },
  position: { x: 50, y: 150 },
  HTMLAttributes: {
    onclick: "alert('Article clicked!')",
  },
  attributes: {
    ...canvasEvents(id),
    className: 'canvas-component-light',
  },
  content: `Article ${id}`,
  view: true,
});

export default Articles;
