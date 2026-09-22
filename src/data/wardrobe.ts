import type { Category, ClothingItem, Occasion, Season, StyleId } from '../types'

const packImage = (folder: string, file: string) => `/style-packs/${folder}/${file}`

const packItems = (styleId: StyleId, folder: string, files: string[], categories: Category[], useSourceIds = false): ClothingItem[] =>
  files.map((file, index) => {
    const category = categories[index % categories.length]
    return {
      id: useSourceIds ? `${styleId}-${file.replace(/\.jpeg$/i, '')}` : `${styleId}-${String(index + 1).padStart(2, '0')}`,
      name: '',
      styleId,
      category,
      color: 'Segun la imagen',
      secondaryColor: 'Paleta del estilo',
      season: ['spring', 'summer', 'autumn', 'winter'] as Season[],
      occasion: ['casual', 'party', 'formal', 'weekend'] as Occasion[],
      material: ['shoes', 'bags', 'accessories'].includes(category) ? 'Material reciclado y sintético' : 'Algodón, denim o fibra natural',
      image: packImage(folder, file),
    }
  })

export const wardrobe: ClothingItem[] = [
  ...packItems('gothic', 'Gotico', [
    'blusa/Blusa1.jpeg', 'blusa/Blusa2.jpeg', 'blusa/Blusa3.jpeg', 'blusa/Blusa4.jpeg', 'blusa/Blusa5.jpeg',
    'falda/Falda1.jpeg', 'falda/Falda2.jpeg', 'falda/Falda3.jpeg', 'falda/Falda4.jpeg', 'falda/Falda5.jpeg',
    'guantes/Guantes1.jpeg', 'guantes/Guantes2.jpeg', 'guantes/Guantes3.jpeg',
    'zapatos/Zapatos1.jpeg', 'zapatos/Zapatos2.jpeg', 'zapatos/Zapatos3.jpeg', 'zapatos/Zapatos4.jpeg',
    'accesorios/Accesorios1.jpeg', 'accesorios/Accesorio2.jpeg', 'accesorios/Accesorio3.jpeg', 'accesorios/Accesorio4.jpeg',
    'accesorios/Accesorio5.jpeg', 'accesorios/Accesorio6.jpeg', 'accesorios/Accesorio7.jpeg', 'accesorios/Accesorio8.jpeg',
  ], ['blouses', 'blouses', 'blouses', 'blouses', 'blouses', 'skirts', 'skirts', 'skirts', 'skirts', 'skirts', 'gloves', 'gloves', 'gloves', 'shoes', 'shoes', 'shoes', 'shoes', 'accessories', 'accessories', 'accessories', 'accessories', 'accessories', 'accessories', 'accessories', 'accessories']),
  ...packItems('old-money', 'Oldmoney', [
    'Blusa1.jpeg', 'Blusa2.jpeg', 'Blusa3.jpeg', 'Blusa5.jpeg', 'Blusa8.jpeg', 'Blusa9.jpeg', 'Blusa11.jpeg', 'Blusa12.jpeg', 'Blusa14.jpeg', 'Blusa15.jpeg',
    'Falda1.jpeg', 'Falda2.jpeg', 'Pantalón1.jpeg', 'Pantalón2.jpeg', 'Pantalón3.jpeg', 'Pantalon5.jpeg', 'Short1.jpeg', 'Short3.jpeg',
    'Vestido1.jpeg', 'Vestido2.jpeg', 'Vestido3.jpeg', 'Vestido4.jpeg',
  ], ['blouses', 'blouses', 'blouses', 'blouses', 'blouses', 'blouses', 'blouses', 'blouses', 'blouses', 'blouses', 'skirts', 'skirts', 'pants', 'pants', 'pants', 'pants', 'shorts', 'shorts', 'dresses', 'dresses', 'dresses', 'dresses'], true),
  ...packItems('vintage', 'y2k', [
    'WhatsApp Image 2026-09-18 at 6.21.03 PM (1).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.03 PM (2).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.03 PM (3).jpeg',
    'WhatsApp Image 2026-09-18 at 6.21.03 PM (4).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.03 PM.jpeg', 'WhatsApp Image 2026-09-18 at 6.21.04 PM (1).jpeg',
    'WhatsApp Image 2026-09-18 at 6.21.04 PM (2).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.04 PM (3).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.04 PM (4).jpeg',
    'WhatsApp Image 2026-09-18 at 6.21.04 PM (5).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.04 PM.jpeg', 'WhatsApp Image 2026-09-18 at 6.21.05 PM (1).jpeg',
    'WhatsApp Image 2026-09-18 at 6.21.05 PM (2).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.05 PM (3).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.05 PM (4).jpeg',
    'WhatsApp Image 2026-09-18 at 6.21.05 PM (5).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.05 PM (6).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.05 PM.jpeg',
    'WhatsApp Image 2026-09-18 at 6.21.06 PM (1).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.06 PM (2).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.06 PM (3).jpeg',
    'WhatsApp Image 2026-09-18 at 6.21.06 PM (4).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.06 PM (5).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.06 PM (6).jpeg',
    'WhatsApp Image 2026-09-18 at 6.21.06 PM (7).jpeg', 'WhatsApp Image 2026-09-18 at 6.21.06 PM.jpeg', 'WhatsApp Image 2026-09-18 at 6.21.07 PM.jpeg',
  ], ['tops', 'skirts', 'dresses', 'blouses', 'shoes', 'accessories', 'tops', 'skirts', 'dresses', 'blouses', 'shoes', 'bags']),
  ...packItems('casual', 'Casual', [
    'WhatsApp Image 2026-09-18 at 6.20.24 PM (1).jpeg', 'WhatsApp Image 2026-09-18 at 6.20.24 PM (2).jpeg', 'WhatsApp Image 2026-09-18 at 6.20.24 PM (3).jpeg',
    'WhatsApp Image 2026-09-18 at 6.20.24 PM (4).jpeg', 'WhatsApp Image 2026-09-18 at 6.20.24 PM (5).jpeg', 'WhatsApp Image 2026-09-18 at 6.20.24 PM.jpeg',
    'WhatsApp Image 2026-09-18 at 6.20.25 PM (1).jpeg', 'WhatsApp Image 2026-09-18 at 6.20.25 PM (2).jpeg', 'WhatsApp Image 2026-09-18 at 6.20.25 PM (3).jpeg',
    'WhatsApp Image 2026-09-18 at 6.20.25 PM (4).jpeg', 'WhatsApp Image 2026-09-18 at 6.20.25 PM (5).jpeg', 'WhatsApp Image 2026-09-18 at 6.20.25 PM.jpeg',
    'WhatsApp Image 2026-09-18 at 6.20.26 PM.jpeg',
  ], ['tops', 'jeans', 'jackets', 'shoes', 'shirts', 'pants', 'bags', 'tops', 'jeans', 'jackets', 'shoes', 'shirts', 'accessories']),
]
