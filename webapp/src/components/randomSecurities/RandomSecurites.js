import React, {useState, useEffect} from 'react'
import { TrendingUp, TrendingDown } from 'react-ionicons'

function RandomSecurities ({allStocks}) {
    const [etfs, setEtfs] = useState(null)
    console.log(allStocks)
    useEffect(() => {
        if(allStocks){
            setEtfs([allStocks[2], allStocks[3]])
        }
    },[allStocks, setEtfs])
    console.log(etfs)
    return(
        <div className="security-display-container">
        {etfs && etfs.map(etf => {
            const { name, symbol, current_price_change_percent: percent} = etf
            const formattedPercent = `${percent.toFixed(2)}%`
            const isPositive = parseFloat(formattedPercent) > 0
            const isNegative = parseFloat(formattedPercent) < 0
            const isFlat = parseFloat(formattedPercent) === 0.00
            let portfolioClassName = "portfolio-daily-value"
            if (isNegative) portfolioClassName = "portfolio-daily-negative"
            if (isFlat) portfolioClassName = "portfolio-daily-flat"
            return(
                <p className="security-display">{name}({symbol}) <span className={portfolioClassName}>
                    {isPositive && <TrendingUp color='green'  />}
                    {isNegative && <TrendingDown color='red' />}
                 {formattedPercent}</span></p>
            )
        }
        )}
        </div>
    )
}

export default RandomSecurities