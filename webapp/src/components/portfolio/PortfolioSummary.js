import React, {useEffect, useState} from 'react';
import PortFolioValue from '../portfolioValue/PortfolioValue'
import DayChange from '../dayChange/DayChange'
import RandomSecurities from '../randomSecurities/RandomSecurites'
import { getPortfolioProps } from '../../utils/APIRequests'
import { Refresh } from 'react-ionicons'
import './PortfolioSummary.css';

function PortfolioSummary() {
    const [loading, setLoading] = useState(true)
    const [portfolioProps, setPortfolioProps] = useState({})
    useEffect(() => {
        getPortfolioProps(setLoading, setPortfolioProps, loading )
    },[loading])
    if (loading) return <p>Loading...</p>
    const { portfolioValue, dailyPriceChange, dailyPercentChange, allStocks } = portfolioProps
    console.log({portfolioProps})
    return (
        <div className="portfolio-summary-container">
            <div className="portfolio-value-wrapper">
            <PortFolioValue portfolioValue={portfolioValue} />
            <DayChange dailyPercentChange={dailyPercentChange} dailyPriceChange={dailyPriceChange} />
            </div>
            <RandomSecurities allStocks={allStocks} />
            <button className="portfolio-summarry-refresh" onClick={() => setLoading(true)}><Refresh /></button>
        </div>
    );
}

export default PortfolioSummary;
