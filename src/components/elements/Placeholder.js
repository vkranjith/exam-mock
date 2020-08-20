import React from 'react';
import ContentLoader from "react-content-loader";

const Placeholder = () => (
    <ContentLoader
        height={200}
        width={600}
        speed={2}
        style={{ marginBottom: "4px" }}
    >
        <rect x="20" y="20" rx="10" ry="10" width="500" height="20" />
        <rect x="40" y="60" rx="8" ry="8" width="500" height="16" />
        <rect x="40" y="92" rx="8" ry="8" width="500" height="16" />
        <rect x="40" y="124" rx="8" ry="8" width="500" height="16" />
        <rect x="40" y="156" rx="8" ry="8" width="500" height="16" />
    </ContentLoader>
);

Placeholder.propTypes = {
};

export default Placeholder;