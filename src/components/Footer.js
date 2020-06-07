import React from 'react'

const getCurrentYear = () => {
    let date = new Date();
    return date.getFullYear();
};

const Footer = () => (
    <footer>
        <small>&copy; Copyright {getCurrentYear()}. All rights are reserved by the developer, Ranjith V K.</small>
    </footer>
);

export default Footer;