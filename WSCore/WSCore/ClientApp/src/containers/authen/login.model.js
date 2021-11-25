// import { fieldType } from '../../data/enums'

var InitModel = {
    model: function () {
      let fields = {
        phone: {
          name: 'phone',
          label: 'Phone',
          value: null,
          validators: [
            {
                required: true,
                isCheckLenString: true,
                isCheckAllowSpecial: true
            }
          ]
        },
        password: {
          name: 'password',
          label: 'Password',
          value: null,
          validators: [
            {
                required: true,
                isCheckLenString: true,
                isCheckAllowSpecial: true
            }
          ]
        }
      }
      return fields
    },
    initModel: function (initRaw) {
        
    },
    validations: function(){}
}

export default InitModel
  