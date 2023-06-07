import { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';

const Searchbox = () => {
  const [inputItems, setInputItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState([]);

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
    getComboProps,
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
      <ul>
        {users.map(user => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </>
  );
};

export default Searchbox;
