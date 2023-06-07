import { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';

const Searchbox = () => {
  const [inputItems, setInputItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
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
          item.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
  });

  return (
    <>
      <h2>Current user: {singleUser}</h2>
      <div {...getComboboxProps}>
        <input {...getInputProps()} placeholder='Search' />
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          inputItems.map(item => (
            <span
              key={item.id}
              {...getItemProps(item)}
              onClick={() => setSingleUser(item.name)}
            >
              <li>
                <h4>{item.name}</h4>
              </li>
            </span>
          ))}
      </ul>
    </>
  );
};

export default Searchbox;
