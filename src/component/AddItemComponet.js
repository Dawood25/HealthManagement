import React, { useState,useEffect } from 'react';

import { Dropdown,Form,Button} from 'react-bootstrap';
const medList = [
    "AspirAin",
    "Ibuprofen",
    "Acetaminophen",
    "Naproxen",
]



const AddItemsComponet = (props) => {
  const [selectedItems, setSelectedItems] = useState(props.items);

  const items = [
    "AspirAin",
    "Ibuprofen",
    "Acetaminophen",
    "Naproxen",
  ];
  
  useEffect(()=>{

    props.onSelect(selectedItems);
  },[selectedItems])

  const handleItemClick = (item) => {
    const isSelected = selectedItems.includes(item);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Select Items
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ minWidth: '15rem' }}>
        <div className="d-flex flex-wrap">
          {selectedItems.length > 0 && (
            <div className="w-100 mb-1">
              <Form.Control type="text" placeholder="Search selected items" />
            </div>
          )}
          {selectedItems.map((selected) => (
            <div key={selected} className="w-100 d-flex justify-content-between align-items-center p-2">
              <div>{selected}</div>
              <div onClick={() => handleItemClick(selected)}>&#10006;</div>
            </div>
          ))}
          {selectedItems.length > 0 && <hr />}
          {items.map((item) => {
            const isSelected = selectedItems.includes(item);
            return (
              <div
                key={item}
                className={`w-100 d-flex justify-content-between align-items-center p-2 ${isSelected && 'bg-light'}`}
                onClick={() => handleItemClick(item)}
              >
                <div>{item}</div>
                {isSelected && <div>&#10004;</div>}
              </div>
            );
          })}
        </div>
        <Button variant="primary" onClick={props.onSubmit} className="w-100 mt-2">
          Add new item
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};



export default AddItemsComponet;