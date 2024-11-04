import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ComponentRenderer = ({ instance, recursionDepth = 0 }) => {
  const webElements = useSelector(state=>state.webElement.present)
  // Skip top levelrendering if the element has a parent
  console.log(instance.type, recursionDepth);
  if (instance.parent && recursionDepth === 0) return null;

  const postion = instance.position ? {
    position: 'absolute',
    left: instance.position?.x,
    top: instance.position?.y,
  } : {};

  const style = { ...postion, ...instance.styles };
  const attributes = { ...instance.attributes, style };
  const content = instance.content;

  // Child elements by id
  if (instance.childrenId)
    return React.createElement(
      instance.type,
      attributes,
      content,
      React.Children.map(instance.childrenId,
        child => (
          <ComponentRenderer 
            key={child}
            instance={webElements[child]} 
            webElements={webElements}
            // setWebElements={setWebElements}
            recursionDepth={recursionDepth + 1}
          />)
      )
    );

  // No children
  return React.createElement(
    instance.type,
    attributes,
    content,
  );
};

const ComponentType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  styles: PropTypes.object,
  attributes: PropTypes.object,
  content: PropTypes.string,
  childrenId: PropTypes.arrayOf(PropTypes.string),
  parent: PropTypes.string,
});

ComponentRenderer.propTypes = {
  instance: ComponentType.isRequired,
  webElements: PropTypes.object.isRequired, // [key: string, value: ComponentType]
  // setWebElements: PropTypes.func.isRequired
};

export default ComponentRenderer;
