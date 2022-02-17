export const currencyFormat = (num, toFixed = 2, type = '$', first = false) => {
    if(first)
        return type + num.toFixed(toFixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return num.toFixed(toFixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + type
}

export const truncateExcerpt = (str, max, suffix) => {
    if(!max) max = 150
    if(!str) return ''
    return (str.length < max)
            ? str 
            : (!suffix 
                ? `${str.substr(0, str.substr(0, max).lastIndexOf(' '))}`
                : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`)
}