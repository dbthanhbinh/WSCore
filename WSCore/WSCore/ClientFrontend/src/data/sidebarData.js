export const data = [
    {id: 1, parentId: null, slug: 'home', url: '/', name: 'Trang chủ'},
    {id: 2, parentId: null,  slug: 'gioi-thieu', url: 'p/gioi-thieu', name: 'Giới thiệu'},
    {id: 3, parentId: null,  slug: 'tin-tuc', url: 'p/tin-tuc', name: 'Tin tức'},
    {id: 4, parentId: null,  slug: 'lien-he', url: 'p/lien-he', name: 'Liên hệ'},
    {id: 5, parentId: null,  slug: 'danh-muc-1', url: 'cat/danh-muc-1', name: 'Danh mục'},
    {id: 6, parentId: 2,  slug: 'gioi-thieu', url: 'p/gioi-thieu1', name: 'Giới thiệu1'},
    {id: 7, parentId: 2,  slug: 'gioi-thieu', url: 'p/gioi-thieu2', name: 'Giới thiệu2'},
    {id: 8, parentId: 2,  slug: 'gioi-thieu', url: 'p/gioi-thieu3', name: 'Giới thiệu3'},
    {id: 9, parentId: 2,  slug: 'gioi-thieu', url: 'p/gioi-thieu4', name: 'Giới thiệu4'},
    {id: 10, parentId: 2,  slug: 'gioi-thieu', url: 'p/gioi-thieu5', name: 'Giới thiệu5'},
    {id: 11, parentId: 8,  slug: 'gioi-thieu', url: 'p/gioi-thieu3', name: 'Giới thiệu31'},
    {id: 12, parentId: 8,  slug: 'gioi-thieu', url: 'p/gioi-thieu3', name: 'Giới thiệu32'},
    {id: 13, parentId: 8,  slug: 'gioi-thieu', url: 'p/gioi-thieu3', name: 'Giới thiệu33'},
]

export const sidebarData = [
    {
        header: 'Image widget',
        headerIcon: null,
        description: 'Description',
        objectType: 'ImageWidget',
        showHeader: true,
        showDescription: true,
        order: 0,
        content: {
            showType: 'Image',  // Image, Gallery, slider
            data: data, // Array
        }
    },
    {
        header: 'YouTubeEmb',
        headerIcon: null,
        description: 'YouTubeEmb',
        objectType: 'YouTubeEmb',
        showHeader: true,
        showDescription: true,
        order: 1,
        content: {
            data: data, // Array
        }
    },
    {
        header: 'PopularWidget',
        headerIcon: null,
        description: 'PopularWidget',
        objectType: 'PopularWidget',
        showHeader: true,
        showDescription: true,
        order: 3,
        content: {
            typeof: 'post',
            postType: 'article',
            showType: 'Grid',  // Grid, List, item
            categoryIds: [],
            excludePostId: [],
            showItemThumb: true,
            showItemExcerpt: true,
            showItemExcerptLength: 150,
            data: data, // Array
        }
    }
]