// import { fieldType } from '../../data/enums'

var InitModel = {
    model: function () {
      let fields = {
        modules: {
            name: 'modules',
            label: 'Modules',
            value: null,
            validators: []
        },
        actions: {
          name: 'actions',
          label: 'Actions',
          value: null,
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
  