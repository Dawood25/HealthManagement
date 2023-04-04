import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const medList = [
    "AspirAin",
    "Ibuprofen",
    "Acetaminophen",
    "Naproxen",
]

const AddItemsComponet = () => {
    const [selectedItem, setSelectedItem] = useState('');

    const handleSelect = (eventKey) => {
        console.log(eventKey)
        setSelectedItem(eventKey);
    }
    return (
    <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select Item
        </Dropdown.Toggle>

        <Dropdown.Menu> 
            {
                   medList.map((item)=> (
                    <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                   )
                  
                )

            }
         
        </Dropdown.Menu>

        <div>Selected Item: {selectedItem}</div>
    </Dropdown>
);
}

export default AddItemsComponet;