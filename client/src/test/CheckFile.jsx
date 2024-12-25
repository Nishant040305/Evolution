import React, { useState } from 'react';
import SelectModal from '../components/utility/SelectModal';

const CheckFile = () => {
    const selectOption = "multiple";
    const [show, setShow] = useState(false);
    const [dummyData, setDummyData] = useState([
        { name: "file1.js", checked: false },
        { name: "file2.html", checked: false },
        { name: "file3.css", checked: false },
        { name: "file4.css", checked: false },
        { name: "file5.css", checked: false },
        { name: "file6.css", checked: false },
        { name: "file7.css", checked: false },
    ]);
    const [selectedOption, setSelectedOption] = useState([]);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    // Handle the selected options passed from the modal
    const handleSelect = (options) => {
        setSelectedOption(options);
    }

    return (
        <div>
            <button onClick={handleShow} className="bg-black text-white">Show</button>

            {show && (
                <SelectModal
                    handleClose={handleClose}
                    handleSelect={handleSelect}
                    options={dummyData}
                    selectOption={selectOption}  // Pass selectOption for single or multiple select
                />
            )}

            <div>
                <h3>Selected Options:</h3>
                <ul>
                    {selectedOption.map((option, index) => (
                        <li key={index}>{option}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CheckFile;
