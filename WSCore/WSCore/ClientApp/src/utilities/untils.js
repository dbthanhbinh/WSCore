export const currencyFormat = (num, toFixed = 2, type = '$', first = false) => {
    if(first)
        return type + num.toFixed(toFixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return num.toFixed(toFixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + type
}

// Database: the date time = Datetime UTC Now
export const convertDatetimeUtcnowTo = (utcNow) => {
    return utcNow ? new Date(utcNow).toLocaleDateString() : ''
}