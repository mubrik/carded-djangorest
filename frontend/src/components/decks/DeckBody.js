import React from 'react';
import {Tab} from 'react-bootstrap';

const DeckBody = (props) => {

    const content = props.deck

    return (
        <Tab eventKey={content.name} title={content.name}/>
    )
}

export default DeckBody