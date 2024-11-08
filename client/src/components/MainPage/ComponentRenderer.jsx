import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ComponentRenderer = ({ instance, recursionDepth = 0 }) => {
  const webElements = useSelector(state=>state.webElement.present)
  // Skip top levelrendering if the element has a parent
  console.log(instance.type, recursionDepth);
  if (instance.parent && recursionDepth === 0) return null;

  const postion = instance.position && !instance.parent ? {
    position: 'absolute',
    left: instance.position?.x,
    top: instance.position?.y,
  } : {};

  const style = { 
    ...postion, 
    ...instance.styles 
  };

  const classNames = instance.attributes.className 
    ? [ "canvas-component", ...instance.attributes.className.split(" ") ]
    : [ "canvas-component", "canvas-component-light" ];

  const attributes = { 
    ...instance.attributes,
    className: classNames.join(" "),
    style,
    id: "canvas-element " + instance.id,
    draggable: true,
  };

  const content = instance.content;

  // Child elements by id
  let element;

  if (instance.children)
    element = React.createElement(
      instance.type,
      attributes,
      content,
      React.Children.map(instance.children,
        child => (
          <ComponentRenderer 
            key={child}
            instance={webElements[child]}
            recursionDepth={recursionDepth + 1}
          />)
      )
    );
  else
    element = React.createElement(
      instance.type,
      attributes,
      content,
    );

  // console.log(attributes);
  // console.log(instance);

  return element;
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
  HTMLAttributes: PropTypes.object,
  content: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.string),
  parent: PropTypes.string,
});

ComponentRenderer.propTypes = {
  instance: ComponentType.isRequired,
  recursionDepth: PropTypes.number,
};

export default ComponentRenderer;
