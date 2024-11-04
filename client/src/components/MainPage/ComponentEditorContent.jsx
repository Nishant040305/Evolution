import React from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { setAttribute, setContent, setProperty } from '../../Store/webElementSlice';

const ComponentEditorContent = ({ id }) => {
  const webElements = useSelector(state=>state.webElement.present);
  const element = webElements[id];
  const dispatch = useDispatch();
  const handleContentChange = (property, value) => {
    dispatch(setContent({id:id,property:property,value:value}));
  };
  const handleAttributeChange=(property,value)=>{
   dispatch(setAttribute({id:id,property:property,value:value}))
  }
  return (
    <div className="content-editor p-4 border border-gray-300 rounded-lg space-y-3">
      <h3 className="font-semibold text-lg">Content Properties</h3>

      {/* Textarea Content */}
      {element.type === 'textarea' && (
        <label>
          Content:
          <textarea
            value={element.attributes.placeholder || ''}
            onChange={(e) => handleAttributeChange('placeholder', e.target.value)}
            className="ml-2 p-1 border border-gray-300 rounded w-full"
            placeholder="Enter text content here"
          />
        </label>
      )}

      {/* Input Placeholder */}
      {element.type === 'input' && (
        <label>
          Placeholder:
          <input
            type="text"
            value={element.attributes.placeholder || ''}
            onChange={(e) => handleAttributeChange('placeholder', e.target.value)}
            className="ml-2 p-1 border border-gray-300 rounded w-full"
            placeholder="Enter placeholder text"
          />
        </label>
      )}
        {/* Input Placeholder */}
        {element.type === 'label' && (
            <label>
            content:
            <input
                type="text"
                value={element.content || ''}
                onChange={(e) => handleContentChange('content', e.target.value)}
                className="ml-2 p-1 border border-gray-300 rounded w-full"
                placeholder="Enter placeholder text"
            />
            </label>
        )}
{/* work in progress */}
{/* {element.type === 'select' && (
    <div>
        <label>Options:</label>
        {(element.attributes.content || []).map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
                <input
                    type="text"
                    value={option.label} // Accessing label directly from the option object
                    onChange={(e) => {
                        const updatedOptions = [...element.attributes.content];
                        updatedOptions[index] = { ...updatedOptions[index], label: e.target.value }; // Update the label
                        handleAttributeChange('content', updatedOptions);
                    }}
                    className="p-1 border border-gray-300 rounded w-full"
                />
                <button
                    onClick={() => {
                        const updatedOptions = element.attributes.content.filter((_, i) => i !== index);
                        handleAttributeChange('content', updatedOptions);
                    }}
                    className="p-1 bg-red-500 text-white rounded"
                >
                    Remove
                </button>
            </div>
        ))}
        <button
            onClick={() => handleAttributeChange('content', [...(element.attributes.content || []), { label: '', value: '' }])} // Adding an empty option
            className="mt-2 p-1 bg-blue-500 text-white rounded"
        >
            Add Option
        </button>
    </div>
)}

         */}

      {/* Button Text */}
      {element.type === 'button' && (
        <label>
          Button Text:
          <input
            type="text"
            value={element.content || ''}
            onChange={(e) => handleContentChange('content', e.target.value)}
            className="ml-2 p-1 border border-gray-300 rounded w-full"
            placeholder="Enter button text"
          />
        </label>
      )}
    </div>
  );
};

export default ComponentEditorContent;
