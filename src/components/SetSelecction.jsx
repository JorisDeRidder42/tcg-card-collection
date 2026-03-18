// components/SetSelection.js
import React from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

const SetSelection = ({ sets, selectedSetId, setSelectedSetId }) => {
  const options = sets.map((set) => ({
    value: set.id,
    label: set.name,
    logo: set.logo + ".png",
  }));

  const formatOptionLabel = ({ label, logo }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <img src={logo} alt={label} style={{ width: 100, height: "auto" }} />
      <span>{label}</span>
    </div>
  );

  return (
    <Select
      options={options}
      value={options.find((o) => o.value === selectedSetId)}
      onChange={(selected) => setSelectedSetId(selected.value)}
      formatOptionLabel={formatOptionLabel}
      placeholder="Select a set"
    />
  );
};
export default SetSelection;
