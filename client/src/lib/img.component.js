const ImageElement = (id, src, alt = "Image", canvasEvents) => {
  return {
    id: `${id}`,
    type: "img",  // Indicate this is an image element
    styles: {
      width: "100px",             // Set a default width for the image
      height: "auto",             // Maintain aspect ratio
      cursor: "pointer",         // Set cursor to pointer on hover
      transition: "transform 0.3s ease", // Smooth transition for transform properties
    },
    position: { x: 100, y: 100 },  // Default position
    attributes: {
      src: src,                  // The source URL for the image
      alt: alt,                  // Alt text for the image
      ...canvasEvents(id),       // Include any additional event handlers
    }
    ,
  };
};

export default ImageElement;
