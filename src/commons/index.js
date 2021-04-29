const splitOutput = (inputs, outputs = []) => {
    let tamp = []
    let a = outputs.map((item, i) => {
        let aa = {[item]: inputs[item]}
        return aa
    })
    tamp.concat(a)
    return tamp
}

export const initReduceIdName = (intputs = [], key='id', outputs = ['name']) => {
    if(!intputs || intputs.length < 1) return []
    return intputs.reduce((acc, it) => (acc[it[key]] = splitOutput(it, outputs), acc), {}) || []
}