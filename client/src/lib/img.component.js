const ImageElement = (id, src, alt = "Image", canvasEvents) => {
  return {
    id: `${id}`,
    type: "img",  // Indicate this is an image element
    styles: {
      backgroundColor: "#000000",
      color: "#FFFFFF",
      paddingTop: "10px",
      paddingLeft: "10px",paddingRight: "10px",paddingBottom: "10px",
      fontFamily:"Arial Black",
      borderWidth: "1px",
      borderColor: "#000000",
      borderStyle: "solid",
      fontSize: "16px",
      fontWeight: "bold",
      display: "inline-block",
      borderTopLeftRadius:"5px",
      borderTopRightRadius:"5px",
      borderBottomLeftRadius:"5px",
      borderBottomRightRadius:"5px",
      textAlign: "center",
      boxShadow: "2px 2px 5px #000000",
      transition: "all 0.3s ease",      // Smooth transition for all properties
      outline: "none",                 // Removes default outline on focus
      letterSpacing: "1px",            // Adds slight spacing between letters
      transform: "rotate(0deg)",           // Default scale for hover effect
      width:"auto",
      height:"auto",            // Maintain aspect ratio
      cursor: "pointer",         // Default cursor on hover
      transition: "transform 0.3s ease", // Default smooth transition for transform
      boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",  // Default box shadow
      opacity: 1,                 // Default opacity (fully opaque)
      transform: "scale(1)",      // Default transform (no scaling)
      hoverFilter: "grayscale(100%) brightness(100%)",  // No grayscale filter by default
      aspectRatio: "16 / 9",      // Default aspect ratio (16:9)
    },
    position: { x: 100, y: 100 },  // Default position
    attributes: {
      src: src,                  // The source URL for the image
      alt: alt,                  // Alt text for the image
      loading: "auto",            // Default lazy loading behavior
      referrerPolicy: "no-referrer",  // Default referrer policy
      allowPictureInPicture: "false", // Default no Picture-in-Picture
      role: "img",                // Default role for accessibility
      fallbackText: "Image not available",  // Default fallback text when image fails to load
      srcset: "",                // Default srcset for responsive images (none)
      sizes: "(max-width: 600px) 100vw, 50vw",  // Default sizes for responsive images
      crossOrigin: "anonymous",   // Default cross-origin handling
      useMap: "",                // Default empty useMap (no client-side image map)
      longDesc: "",              // Default long description (none)
      // Canvas events (can be passed in when calling the function)
      ...canvasEvents(id),       // Include any additional event handlers
    },
  };
};

export default ImageElement;
