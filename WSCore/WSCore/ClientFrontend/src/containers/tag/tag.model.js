var InitModel = {
    title: {
        name: 'title',
        label: 'Title',
        value: '',
        validators: [
            {
                required: true,
                isCheckLenString: true,
                isCheckAllowSpecial: true
            }
        ]
    },
    alias: {
        name: 'alias',
        label: 'Alias',
        value: '',
        validators: [
            {
                isCheckMaxString: true
            }
        ]
    }
}
export default InitModel