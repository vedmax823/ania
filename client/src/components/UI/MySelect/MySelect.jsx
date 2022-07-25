import React from 'react';
import { Form } from 'react-bootstrap';

const MySelect = ({data, value, onChange}) => {
    return (
        <Form.Select aria-label="Default select example" value={value} onChange={e => onChange(e.target.value)}>
            <option value={-1}></option>
            {data.map(one => <option value={one.id} key={one.id}>{one.name}</option>)}
        </Form.Select>
    );
};

export default MySelect;