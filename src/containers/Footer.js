import React,{Component} from 'react';
import PropTypes from 'prop-types';

import FilterLink from '../containers/FilterLink';

const Footer = () => {
    return (
        <p>
            Show:
            {' '}
            <FilterLink
                filter='SHOW_ALL'
            >
                All
            </FilterLink>
            {', '}
            <FilterLink
                filter='SHOW_ACTIVE'
            >
                Active
            </FilterLink>
            {', '}
            <FilterLink
                filter='SHOW_COMPLETED'
            >
                Completed
            </FilterLink>
        </p>
    );
};

export default Footer;

Footer.contextTypes = {
    store: PropTypes.object
}