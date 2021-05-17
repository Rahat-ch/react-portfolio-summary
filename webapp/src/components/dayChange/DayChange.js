import React from 'react';
import { TrendingUp, TrendingDown } from 'react-ionicons'

function DayChange({ dailyPercentChange, dailyPriceChange}) {
    let portfolioClassName = "portfolio-daily-value"
    const isNegative = dailyPercentChange && dailyPercentChange.includes('-')
    const isPositive = dailyPercentChange &&  !dailyPercentChange.includes('-')
    const isFlat = dailyPercentChange && parseFloat(dailyPercentChange) === 0
    if (isNegative) portfolioClassName = "portfolio-daily-negative"
    if (isFlat) portfolioClassName = "portfolio-daily-flat"
    return (
        <div className={portfolioClassName}>
            {isPositive && <TrendingUp color='green' className="portfolio-daily-trending" />}
            {isNegative && <TrendingDown color='red' className="portfolio-daily-trending" />}
            <div>
            <p>{dailyPercentChange}</p>
            <p>{dailyPriceChange}</p>
            </div>
        </div>
    );
}

export default DayChange;
