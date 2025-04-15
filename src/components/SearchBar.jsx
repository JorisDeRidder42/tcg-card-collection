import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Icon library

const SearchBar = () => {
  return (
    <InputGroup className="mt-3">
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Search..."
        aria-label="Search"
      />
    </InputGroup>
  );
};

export default SearchBar;
