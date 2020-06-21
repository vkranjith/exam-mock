import React from 'react';

const PageComponent = ({containerClass = "", children}) => {
    containerClass += " exam-area";
    return (
        <div className={containerClass}>
            {children}
        </div>
    );
};

export default PageComponent;