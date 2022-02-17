var InitModel = {
    model: function () {
      let fields = {
        seoTitle: {
            name: 'seoTitle',
            label: 'Seo title',
            value: '',
            validators: []
        },
        seoContent: {
            name: 'seoContent',
            label: 'Seo content',
            value: '',
            validators: []
        },
        seoKeyWord: {
            name: 'seoKeyWord',
            label: 'Seo keyword',
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
  