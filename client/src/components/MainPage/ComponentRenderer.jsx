import React from 'react';
import PropTypes from 'prop-types';
import components from '../../../components';

const ComponentRenderer = ({ instance }) => {
  const prototype = components[instance.type] || {};

  const style = {
    position: 'absolute',
    left: instance.position.x,
    top: instance.position.y,
    ...prototype.styles, // class styles
    ...instance.styles, // object styles
  };

  return React.createElement(
    instance.type,
    { 
      ...prototype.attributes, // class attributes
      ...instance.attributes, // object attributes
      style 
    },
    instance.content || prototype.content
  );
};

ComponentRenderer.propTypes = {
  instance: PropTypes.shape({
    type: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    styles: PropTypes.object,
    attributes: PropTypes.object,
    content: PropTypes.string,
  }).isRequired,
};

export default ComponentRenderer;
