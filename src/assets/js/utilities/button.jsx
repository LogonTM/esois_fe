import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ label, type, uiType, className, ...DOMProps }) => {
    const cssClasses = classNames(
        'btn btn-outline-secondary',
        { [` ${uiType}`]: uiType },
        className.split(' ')
    )
    
    return (
        <button
            type={type}
            className={cssClasses}
            {...DOMProps}
        >
            {label}
        </button>
    )
}

Button.propTypes = {
    type: PropTypes.string,
    uiType: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string.isRequired
}

Button.defaultProps = {
    type: 'button',
    uiType: '',
    className: ''
}

export default Button;