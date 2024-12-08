import react from 'react';
import { useState ,useEffect} from 'react';
const ImgContent = ({ handleAttributeChange, handleStyleChange, element }) =>{ 
  const [numerator, setNumerator] = useState(element.styles.aspectRatio ? parseFloat(element.styles.aspectRatio.split('/')[0]) : 16); // Default: 16
  const [denominator, setDenominator] = useState(element.styles.aspectRatio ? parseFloat(element.styles.aspectRatio.split('/')[1]) : 9); // Default: 9
  const handleScaleChange = (value) => {
    // Extract the current transform value
    const currentTransform = element.styles.transform || "";
    
    // Regular expression to match scale() in the transform string
    const scaleRegex = /scale\(([^)]+)\)/;
    
    // If a scale() is found, replace its value with the new one
    let newTransform;
    if (scaleRegex.test(currentTransform)) {
      // Replace the existing scale value
      newTransform = currentTransform.replace(scaleRegex, `scale(${value})`);
    } else {
      // If no scale() exists, add scale to the transform
      newTransform = `${currentTransform} scale(${value})`.trim();
    }
  
    // Update the transform property with the new scale value
    handleStyleChange("transform", newTransform);
  };
  const handleObjectFitChange = (value) => {
    handleStyleChange("objectFit", value);
  };
  
  const handleObjectPositionChange = (value) => {
    handleStyleChange("objectPosition", value);
  };
  
  const handleHoverFilter = (grayscaleValue, brightnessValue) => {
    // Validate grayscale and brightness values
    const grayscale = parseFloat(grayscaleValue);
    const brightness = parseFloat(brightnessValue);
    
    // Ensure valid percentage values
    const validGrayscale = !isNaN(grayscale) && grayscale >= 0 && grayscale <= 100 ? grayscale : 0;
    const validBrightness = !isNaN(brightness) && brightness >= 0 && brightness <= 200 ? brightness : 100;
    
    // Return combined CSS filter string for grayscale and brightness
    return `grayscale(${validGrayscale}%) brightness(${validBrightness}%)`;
  };
  
  // This function will calculate the height from the width based on the aspect ratio
  const calculateHeightFromAspectRatio = (width) => {
    const widthNumber = parseFloat(width);
    if (isNaN(widthNumber) || widthNumber <= 0) return NaN;

    if (denominator === 0) return NaN; // Avoid division by zero

    return (widthNumber * denominator) / numerator;
  };

  const handleNumeratorChange = (e) => {
    const newNumerator = parseFloat(e.target.value);
    if (!isNaN(newNumerator) && newNumerator > 0) {
      setNumerator(newNumerator);
    }
  };

  const handleDenominatorChange = (e) => {
    const newDenominator = parseFloat(e.target.value);
    if (!isNaN(newDenominator) && newDenominator > 0) {
      setDenominator(newDenominator);
    }
  };

  const handleAspectRatioApply = () => {
    const aspectRatio = `${numerator}/${denominator}`;
    handleStyleChange("aspectRatio", aspectRatio);

    // Adjust height based on new aspect ratio if width is set
    if (element.styles.width) {
      const height = calculateHeightFromAspectRatio(Number(element.styles.width.replace('px', '')));
      if (!isNaN(height)) {
        handleStyleChange("height", `${height}px`);
      }
    }
  };

  // When width is changed, we adjust the height based on aspect ratio
  const handleWidthChange = (e) => {
    const width = e.target.value;
    handleStyleChange("width", width);

    // If width is set, calculate the height based on the aspect ratio
    const height = calculateHeightFromAspectRatio(width);
    if (!isNaN(height)) {
      handleStyleChange("height", `${height}px`);
    } else {
      handleStyleChange("height", "auto");
    }
  };
  const handleGrayScale = (property, value) => {
    const [filterType, filterName] = property.split("hoverFilter");
    
    // Get the updated grayscale or brightness value from input
    const newValue = parseFloat(value);
    
    // Validate values and update the corresponding style
    if (filterName === "Grayscale") {
      handleStyleChange("hoverFilterGrayscale", `${newValue}%`);
    } else if (filterName === "Brightness") {
      handleStyleChange("hoverFilterBrightness", `${newValue}%`);
    }
    
    // Generate combined CSS filter string based on both grayscale and brightness
    const newFilter = handleHoverFilter(
      element.styles.hoverFilterGrayscale || "0",
      element.styles.hoverFilterBrightness || "100"
    );
    
    // Update the hoverFilter with the new combined filter string
    handleStyleChange("hoverFilter", newFilter);
  };


  return(
  <div>
    {/* Image Source Input */}
    <label className="block mb-1 font-medium text-gray-600">
      Image Source (URL):
      <input
        type="text"
        value={element.attributes.src || ""}
        onChange={(e) => handleAttributeChange("src", e.target.value)}
        className="w-full p-2 mt-1 border border-gray-300 rounded"
        placeholder="Enter image URL"
      />
    </label>

    {/* Alt Text Input */}
    <label className="block mb-1 font-medium text-gray-600">
      Alt Text:
      <input
        type="text"
        value={element.attributes.alt || ""}
        onChange={(e) => handleAttributeChange("alt", e.target.value)}
        className="w-full p-2 mt-1 border border-gray-300 rounded"
        placeholder="Describe the image (alt text)"
      />
    </label>

    {/* Lazy Loading */}
    <label className="block mb-1 font-medium text-gray-600">
      Loading Behavior:
      <select
        value={element.attributes.loading || "auto"}
        onChange={(e) => handleAttributeChange("loading", e.target.value)}
        className="w-full p-2 mt-1 border border-gray-300 rounded"
      >
        <option value="auto">Auto</option>
        <option value="lazy">Lazy</option>
        <option value="eager">Eager</option>
      </select>
    </label>

    {/* Referrer Policy */}
    <label className="block mb-1 font-medium text-gray-600">
      Referrer Policy:
      <select
        value={element.attributes.referrerPolicy || "no-referrer"}
        onChange={(e) => handleAttributeChange("referrerPolicy", e.target.value)}
        className="w-full p-2 mt-1 border border-gray-300 rounded"
      >
        <option value="no-referrer">No Referrer</option>
        <option value="no-referrer-when-downgrade">No Referrer When Downgrade</option>
        <option value="origin">Origin</option>
        <option value="origin-when-cross-origin">Origin When Cross-Origin</option>
        <option value="unsafe-url">Unsafe URL</option>
      </select>
    </label>

    {/* Picture-In-Picture */}
    <label className="block mb-1 font-medium text-gray-600">
      Enable Picture-in-Picture:
      <select
        value={element.attributes.allowPictureInPicture || "false"}
        onChange={(e) => handleAttributeChange("allowPictureInPicture", e.target.value)}
        className="w-full p-2 mt-1 border border-gray-300 rounded"
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
    </label>

 {/* Object Fit */}
 <label className="block mb-1 font-medium text-gray-600">
      Object Fit:
      <select
        value={element.styles.objectFit || "cover"}
        onChange={(e) => handleObjectFitChange(e.target.value)}
        className="w-full p-2 mt-1 border border-gray-300 rounded"
      >
        <option value="cover">Cover</option>
        <option value="contain">Contain</option>
        <option value="fill">Fill</option>
        <option value="none">None</option>
        <option value="scale-down">Scale Down</option>
      </select>
    </label>

    {/* Object Position */}
    <label className="block mb-1 font-medium text-gray-600">
      Object Position:
      <div className="flex  flex-col">
        <select
          value={element.styles.objectPosition || "center"}
          onChange={(e) => handleObjectPositionChange(e.target.value)}
          className=" p-2 mt-1 border border-gray-300 rounded"
        >
          <option value="center">Center</option>
          <option value="top left">Top Left</option>
          <option value="top center">Top Center</option>
          <option value="top right">Top Right</option>
          <option value="center left">Center Left</option>
          <option value="center right">Center Right</option>
          <option value="bottom left">Bottom Left</option>
          <option value="bottom center">Bottom Center</option>
          <option value="bottom right">Bottom Right</option>
          <option value="custom">Custom (Enter)</option>
        </select>

        {/* Custom Input for Object Position */}
        {element.styles.objectPosition === "custom" && (
          <input
            type="text"
            value={element.styles.customObjectPosition || ""}
            onChange={(e) => handleObjectPositionChange(e.target.value)}
            className=" p-2 mt-1 border border-gray-300 rounded"
            placeholder="e.g., work in progress 10% 50%"
          />
        )}
      </div>
    </label>
      {/* Aspect Ratio Selection */}
      <label className="block mb-1 font-medium text-gray-600">
        Aspect Ratio (Numerator / Denominator):
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          value={numerator}
          onChange={handleNumeratorChange}
          className="w-1/2 p-2 mt-1 border border-gray-300 rounded"
          placeholder="Numerator"
          min="1"
        />
        <span className="p-2 mt-1">/</span>
        <input
          type="number"
          value={denominator}
          onChange={handleDenominatorChange}
          className="w-1/2 p-2 mt-1 border border-gray-300 rounded"
          placeholder="Denominator"
          min="1"
        />
      </div>

      {/* Apply Aspect Ratio */}
      <button
        onClick={handleAspectRatioApply}
        className="w-full p-2 mt-2 bg-blue-500 text-white rounded"
      >
        Apply Aspect Ratio
      </button>

      {/* Width */}
      <label className="block mb-1 font-medium text-gray-600">
        Width:
        <input
          type="text"
          value={element.styles.width || "100px"}
          onChange={handleWidthChange}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
          placeholder="Width in pixels"
        />
      </label>

      {/* Height */}
      <label className="block mb-1 font-medium text-gray-600">
        Height:
        <input
          type="text"
          value={element.styles.height || "auto"}
          onChange={(e) => handleStyleChange("height", e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
          placeholder="Height will adjust based on aspect ratio"
          readOnly
        />
      </label>
    
      <label className="block mb-1 font-medium text-gray-600">
        Hover Effects (CSS Filter) (work in progress):
      </label>
      <div className="flex gap-2">
        {/* Grayscale Percentage */}
        <input
          type="number"
          min="0"
          max="100"
          value={parseFloat(element.styles.hoverFilterGrayscale || "0")}
          onChange={(e) => handleGrayScale("hoverFilterGrayscale", `${e.target.value}%`)}
          className="w-1/2 p-2 mt-1 border border-gray-300 rounded"
          placeholder="Grayscale (%)"
        />
        <span className="p-2 mt-1">%</span>

        {/* Brightness Percentage */}
        <input
          type="number"
          min="0"
          max="200"
          value={parseFloat(element.styles.hoverFilterBrightness || "100")}
          onChange={(e) => handleGrayScale("hoverFilterBrightness", `${e.target.value}%`)}
          className="w-1/2 p-2 mt-1 border border-gray-300 rounded"
          placeholder="Brightness (%)"
        />
        <span className="p-2 mt-1">%</span>
      </div>


    {/* Opacity */}
    <label className="block mb-1 font-medium text-gray-600">
      Opacity:
      <input
        type="number"
        min="0"
        max="1"
        step="0.1"
        value={element.styles.opacity || 1}
        onChange={(e) => handleStyleChange("opacity", e.target.value)}
        className="w-full p-2 mt-1 border border-gray-300 rounded"
        placeholder="e.g., 0.8"
      />
    </label>

    {/* Transform */}
    <label className="block mb-1 font-medium text-gray-600">
      Scale:
      <input
        type="number"
        step="0.1"
        value={parseFloat(element.styles.transform?.match(/scale\(([^)]+)\)/)?.[1] || "1")}
        onChange={(e) => handleScaleChange(e.target.value)}
        className="w-full p-2 mt-1 border border-gray-300 rounded"
        placeholder="e.g., 1.2"
      />
    </label>

    {/* Accessibility - Role */}
    <label className="block mb-1 font-medium text-gray-600">
      Role (for Accessibility):
      <select
        value={element.attributes.role || "img"}
        onChange={(e) => handleAttributeChange("role", e.target.value)}
        className="w-full p-2 mt-1 border border-gray-300 rounded"
      >
        <option value="img">Image</option>
        <option value="presentation">Presentation</option>
        <option value="button">Button</option>
      </select>
    </label>

    {/* Fallback Message */}
    <label className="block mb-1 font-medium text-gray-600">
      Fallback Text (when image fails to load):
      <input
        type="text"
        value={element.attributes.fallbackText || "Image not available"}
        onChange={(e) => handleAttributeChange("fallbackText", e.target.value)}
        className="w-full p-2 mt-1 border border-gray-300 rounded"
        placeholder="e.g., Image not available"
      />
    </label>
  </div>
);}

export default ImgContent;
