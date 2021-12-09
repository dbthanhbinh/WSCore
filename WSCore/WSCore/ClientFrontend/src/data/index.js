
import {layouts} from "./enums"

// ==============
export const globalConfigs = {
    layout: {
        layout: layouts.RIGHT_SB,
        enableTopHeader: true,
        enableHeader: true,
        enableMenu: true,
        enableBreadcrumb: true,
        enableSlideshow: true,
        enableFooter: true,
        enableCopyright: true
    }
}

export const providers = [
    {
        id: 1, slug: 'viettel', name: 'Viettel',
        thumb: 'https://simcuatui.com/images/viettel.gif'
    },
    {
        id: 2, slug: 'vinaphone', name: 'Vinaphone',
        thumb: 'https://simcuatui.com/images/vinaphone.gif'
    },
    {
        id: 3, slug: 'mobifone', name: 'Mobifone',
        thumb: 'https://simcuatui.com/images/mobifone.gif'
    },
    {
        id: 4, slug: 'vietnammobile', name: 'Vietnammobile',
        thumb: 'https://simcuatui.com/images/vietnamobile.gif'
    },
    {
        id: 5, slug: 'gmobile', name: 'Gmobile'
    },
    {
        id: 6, slug: 'itelecom', name: 'ITelecom'
    }
]

export const types = [
    {id: 1, slug: 'sim-loc-phat', name: 'Sim Lộc Phát'},
    {id: 2, slug: 'sim-tam-hoa', name: 'Sim Tam Hoa'},
    {id: 3, slug: 'sim-tu-quy', name: 'Sim Tứ Quý'},
    {id: 4, slug: 'sim-taxi', name: 'Sim Taxi'},
    {id: 5, slug: 'sim-ong-dia', name: 'Sim Ông Địa'},
    {id: 6, slug: 'sim-tien-len', name: 'Sim Tiến Lên'}
]