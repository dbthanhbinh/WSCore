export const currencyFormat = (num, toFixed = 2, type = '$', first = false) => {
    if(first)
        return type + num.toFixed(toFixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return num.toFixed(toFixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + type
}