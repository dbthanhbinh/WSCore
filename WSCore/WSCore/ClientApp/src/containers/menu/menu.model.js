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
        parentId: {
            name: 'parentId',
            label: 'Parent Id',
            value: '',
            minLength: 3,
            maxLength: 255,
            validators: []
        },
        menuType: {
            name: 'menuType',
            label: 'Menu type',
            value: '',
            validators: []
        },
        customType: {
            name: 'customType',
            label: 'Custom Type',
            value: '',
            validators: []
        },
        customUrl: {
            name: 'customUrl',
            label: 'Custom url',
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
  