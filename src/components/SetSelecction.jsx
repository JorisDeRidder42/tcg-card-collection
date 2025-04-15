// components/SetSelection.js
import React from 'react';
import { Form } from 'react-bootstrap';

const SetSelection = ({ sets, selectedSetId, setSelectedSetId }) => {
  return (
    <Form.Select value={selectedSetId} onChange={(e) => setSelectedSetId(e.target.value)}>
      <option value="">Select a set</option>
      {sets?.map((set) => (
        <option key={set.id} value={set.id}>
          {set.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default SetSelection;
