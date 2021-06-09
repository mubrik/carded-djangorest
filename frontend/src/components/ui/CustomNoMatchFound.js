import React from 'react';
import {Typography, } from '@material-ui/core';
import {Container} from 'react-bootstrap';

const NoMatchFound = (props) => {

    return(
        <Container>
            <Typography>Error, Page does not exist</Typography>
        </Container>
    )
}

export default NoMatchFound