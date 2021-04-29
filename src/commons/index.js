import PropTypes from 'prop-types'

const splitOutput = (inputs = [], outputs = []) => {
    let target = outputs.map((item, i) => {
        return {[item]: inputs[item]}
    })

    // Two obj to once obj    
    let obj = target.reduce(function(acc, val) {
        return Object.assign(acc, val);
    },{});
    return obj
}

const initReduceIdName = (inputs, key, outputs) => {
    if(!inputs || !Array.isArray(inputs) || inputs.length < 1) return []
    return inputs.reduce((acc, it) => (acc[it[key]] = splitOutput(it, outputs), acc), []) || []
}
initReduceIdName.propTypes = {
    inputs: PropTypes.array,
    key: PropTypes.string,
    outputs: PropTypes.array
}
initReduceIdName.defaultProps = {
    inputs: [],
    key: 'id',
    outputs: ['name']
}

// =====
export {
    initReduceIdName
}