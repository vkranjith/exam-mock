import React from 'react';

const PageComponent = ({containerClass = "", children, match}) => {
    containerClass += " exam-area";
    return (
        <div className={containerClass}>
            {children}
        </div>
    );
};

export default PageComponent;