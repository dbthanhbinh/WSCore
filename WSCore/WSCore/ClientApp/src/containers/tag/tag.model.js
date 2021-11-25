var InitModel = {
    model: function() {
        return {
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
    },
    init : function() {
        return this.model()
    },
    reset: function(){
        return this.model()
    }
}
export default InitModel