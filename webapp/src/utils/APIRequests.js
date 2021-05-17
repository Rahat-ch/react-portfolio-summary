import {ServerMock} from './ServerMock'

export const getPortfolioProps = (setIsLoading, setPortfolioProps, loading) => {
    if (!loading) return
    let portfolioValue = 0
    let dailyPriceChange = 0
    let dailyPercentChange = 0
    let allStocks = {}
    ServerMock.getAllSecurities().then(stocks => {
        const securityIdList = stocks.data.map(item => item.id)
        ServerMock.getSecurityPrices(securityIdList).then(prices => allStocks = {...prices.data})
    }).catch(error => console.log(error))
    ServerMock.getPortfolio().then(stocks => {
        const portfolioShares = stocks.data.map(item => { return { id: item.id, share: item.shares}} )
        const portfolioIdList = stocks.data.map(item => item.id)
        ServerMock.getSecurityPrices(portfolioIdList).then(prices => {
            const { data: securityPrices } = prices
            portfolioShares.forEach(share => {
                const {current_price, current_price_change, current_price_change_percent} = securityPrices[share.id]
                portfolioValue = portfolioValue + (current_price * share.share)
                dailyPriceChange = dailyPriceChange + current_price_change
                dailyPercentChange = dailyPercentChange + current_price_change_percent
            })
        ServerMock.getEquity().then(data => {
            portfolioValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(portfolioValue + data.data.cash)
            dailyPriceChange = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dailyPriceChange)
            dailyPercentChange = `${dailyPercentChange.toFixed(2)}%`

            setPortfolioProps({
                portfolioValue,
                dailyPriceChange,
                dailyPercentChange,
                allStocks
            })
        })
            setIsLoading(false)
        })
    }).catch(error => {
        console.log(error)
        setIsLoading(false)
    })
    return portfolioValue
}
