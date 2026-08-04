import React from 'react'

import { BrandMark } from './BrandMark'

/**
 * Panelin üst çubuğunda / sol menü başlığında görünen küçük marka işareti.
 * Veritabanına gitmez; her sayfada render edildiği için bilinçli olarak statiktir.
 */
export const AdminIcon = () => <BrandMark size={26} idPrefix="dg-admin-icon" />

export default AdminIcon
