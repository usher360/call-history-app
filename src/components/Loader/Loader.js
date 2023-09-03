import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

function Loader({active}) {
    return (
        <>
            {active &&
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress/>
                </Box>
            }
        </>
    );
}

Loader.propTypes = {
    active: PropTypes.bool
};

export default Loader;