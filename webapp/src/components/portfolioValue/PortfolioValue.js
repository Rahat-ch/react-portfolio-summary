import React from 'react';

function PortFolioValue({portfolioValue}) {
    return (
        <div>
            <p>Portfolio Value</p>
            <p className="portfolio-value-display" >{portfolioValue}</p>
        </div>
    );
}

export default PortFolioValue;
