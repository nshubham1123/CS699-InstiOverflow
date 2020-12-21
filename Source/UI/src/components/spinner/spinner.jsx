

import React from 'react';
import './spinner.scss';

import { ReactComponent as PageSpinner } from '../../assets/PageSpinner.svg';
import { ReactComponent as ComponentSpinner } from '../../assets/ComponentSpinner.svg';

/**
 * Spinner Component
 * @component 
 * @param type - type of spinner
 * @param width - width of spinner
 * @param height - height of spinner
 */

const Spinner = ({ type, width, height }) => {
    return (
        <div className='spinner' style={{width: `${width}`, height: `${height}`}}>
            { type === 'page' ? <PageSpinner/> : <ComponentSpinner/> }
        </div>
    );
};

export default Spinner;