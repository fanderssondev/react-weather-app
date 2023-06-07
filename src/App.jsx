import { useCombobox } from 'downshift';
import React, { useEffect, useState } from 'react';

function App() {
  const [inputItems, setInputItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        users.filter(item =>
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    },
  });

  return (
    <div className='App'>
      <h2>Current User: {singleUser}</h2>
      <div {...getComboboxProps}>
        <input {...getInputProps()} placeholder='Search' />
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <span
              key={item.id}
              {...getItemProps({ item, index })}
              onClick={() => setSingleUser(item.name)}
            >
              <li>
                <h4>{item.name}</h4>
              </li>
            </span>
          ))}
      </ul>
    </div>
  );
}

export default App;
