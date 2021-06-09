import React from 'react';
import Slide from '@material-ui/core/Slide';

const SlideTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide 
            ref={ref} 
            {...props}
            timeout={{ enter: 150, exit: 300,}} />;
});

export default SlideTransition