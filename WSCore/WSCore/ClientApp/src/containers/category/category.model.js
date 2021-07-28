var InitModel = {
    model: function () {
      let fields = {
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
        },
        content: {
            name: 'content',
            label: 'Content',
            value: '',
            validators: []
        },
        excerpt: {
            name: 'excerpt',
            label: 'Excerpt',
            value: '',
            minLength: 3,
            maxLength: 255,
            validators: [
                {
                    isCheckMaxString: true
                }
            ]
        },
        file: {
            name: 'file',
            label: 'File',
            value: '',
            validators: []
        }
      }
      return fields
    },
    initModel: function (initRaw) {
        
    },
    validations: function(){}
}

export default InitModel
  