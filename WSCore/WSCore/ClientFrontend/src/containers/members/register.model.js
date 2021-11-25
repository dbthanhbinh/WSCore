// import { fieldType } from '../../data/enums'

var InitModel = {
    model: function () {
      let fields = {
        fullName: {
            name: 'fullName',
            label: 'Full name',
            value: null,
            validators: [
              {
                  required: true,
                  isCheckLenString: true,
                  isCheckAllowSpecial: true
              }
            ]
        },
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
        },
        repassword: {
          name: 'repassword',
          label: 'Re-Password',
          value: null,
          validators: [
            {
                required: true,
                isCheckLenString: true,
                isCheckAllowSpecial: true
            }
          ]
        },
        iagree: {
          name: 'iagree',
          label: 'I agree',
          value: true,
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
  