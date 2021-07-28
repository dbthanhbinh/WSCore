/**
 * Get all items without paging
 */
export const getCategories = () => {
    this.props.getListCategories({
        url: 'category/categories',
        body: {}
    })
}