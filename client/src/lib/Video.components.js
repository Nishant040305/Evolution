const VideoElement = (id, src, alt = "Video", canvasEvents) => {
  return {
    id: `${id}`,
    type: "video",  // Indicate this is a video element
    styles: {
      width: "100px",             // Set a default width for the video
      height: "auto",             // Maintain aspect ratio
      cursor: "pointer",         // Set cursor to pointer on hover
      transition: "transform 0.3s ease", // Smooth transition for transform properties
    },
    position: { x: 100, y: 100 },  // Default position
    attributes: {
      src: src,                  // The source URL for the video
      alt: alt,                  // Alt text for the video
      ...canvasEvents(id),       // Include any additional event handlers
    }
    ,
  };
};
