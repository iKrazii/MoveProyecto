import type { StyleDefinition } from '../types'

const packImage = (folder: string, file: string) => `/style-packs/${folder}/${file}`

export const styles: StyleDefinition[] = [
  {
    id: 'gothic',
    name: 'Gothic',
    description:
      '🖤 ESTILO GÓTICO\n\n¿Dónde y cuándo se creó?\n\nSurgió en Europa, principalmente en Francia, durante el siglo XII, primero en la arquitectura y el arte medieval.\n\n¿A quién se lo recomendaría?\n\nA personas que disfrutan de una estética oscura, misteriosa, elegante y diferente, y que quieren expresar su personalidad mediante la moda y el arte.\n\nPaleta de colores\n\nColor| Código\nNegro| #000000\nRojo sangre| #8B0000\nMorado oscuro| #4B0082\nVerde bosque| #0B3D2E\nAzul noche| #191970\nGris ceniza| #696969\nBlanco hueso| #E8E0D0',
    colorPalette: ['#000000', '#8B0000', '#4B0082', '#0B3D2E', '#191970', '#696969', '#E8E0D0'],
    characteristicClothing: ['Chaquetas largas', 'Botas', 'Faldas', 'Camisas oscuras'],
    characteristicAccessories: ['Collares metálicos', 'Anillos', 'Cinturones', 'Bolsos con textura'],
    rules: ['Priorizar negros y tonos profundos', 'Mantener la estética sobria y contrastada', 'Evitar mezclas con otros estilos'],
    image: packImage('Gotico', 'blusa/Blusa1.jpeg'),
  },
  {
    id: 'old-money',
    name: 'Old Money',
    description:
      '🤎 ESTILO OLD MONEY\n\n¿Dónde y cuándo se creó?\n\nEl estilo Old Money se inspira en la vestimenta clásica de las familias adineradas y tradicionales, especialmente en la moda europea y estadounidense del siglo XX. Se popularizó nuevamente durante los años 2020 gracias a las redes sociales y se caracteriza por una apariencia elegante, clásica y discreta, sin necesidad de prendas llamativas o grandes logotipos.\n\n¿A quién se lo recomendaría?\n\nA personas que disfrutan de la ropa clásica, elegante y sofisticada, especialmente si les gustan las prendas de buena estructura, los colores neutros, las camisas, blazers, pantalones de vestir, faldas y accesorios sencillos.\n\nPaleta de colores\n\nCrema | #F2EBDD\nBeige | #D8C7A8\nBlanco | #F5F3ED\nGris claro | #B8B6B0\nVerde oliva | #5B6047\nAzul marino | #1F3045\nMarrón camel | #A67B5B\nMarrón chocolate | #604B3E\nBorgoña | #641D2D\nNegro | #292522\n\nCaracterísticas del estilo\n\n• Prendas clásicas, elegantes y atemporales.\n• Camisas, blazers, polos, chalecos y suéteres.\n• Pantalones de vestir, chinos, faldas midi y pantalones rectos.\n• Uso de materiales y texturas como lana, algodón, lino y cuero.\n• Colores neutros y tonos sobrios.\n• Accesorios discretos como relojes, cinturones, mocasines y bolsos estructurados.\n• Preferencia por prendas sin logotipos grandes o diseños excesivamente llamativos.\n• Combinación de prendas tradicionales con elementos modernos.',
    colorPalette: ['#F2EBDD', '#D8C7A8', '#F5F3ED', '#B8B6B0', '#5B6047', '#1F3045', '#A67B5B', '#604B3E', '#641D2D', '#292522'],
    characteristicClothing: ['Blazers', 'Camisas', 'Pantalones de vestir', 'Faldas midi'],
    characteristicAccessories: ['Mocasines', 'Bolsos estructurados', 'Cinturones', 'Relojes discretos'],
    rules: ['Usar líneas limpias y cortes formales', 'Priorizar tonos neutros y refinados', 'Combinar prendas tradicionales con elementos modernos'],
    image: packImage('Oldmoney', 'Blusa1.jpeg'),
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description:
      '💗 ESTILO ROMÁNTICO / VINTAGE\n\n¿Dónde y cuándo se creó?\n\nEste estilo combina elementos de la moda romántica y vintage, inspirados principalmente en las décadas de los 90 y 2000. Se caracteriza por mezclar prendas femeninas, detalles delicados y un toque moderno.\n\n¿A quién se lo recomendaría?\n\nA personas que disfrutan de la ropa femenina, delicada y elegante, especialmente si les gustan los lazos, encajes, volantes, prendas drapeadas, faldas y estilos inspirados en épocas pasadas.\n\nPaleta de colores\n\nCrema | #F2EBDD\nGris claro | #B8B6B0\nVerde oliva | #4B4C2F\nRosa malva | #B5A0A8\nMarrón chocolate | #604B3E\nBorgoña | #641D2D\nAmarillo mantequilla | #E9D88D\nMarrón oscuro | #292522\nAzul denim | #526B75\nCiruela | #30233A\n\nCaracterísticas del estilo\n\n* Prendas femeninas y delicadas.\n* Faldas plisadas o largas.\n* Tops drapeados, corsés y halter.\n* Detalles como lazos, encaje y volantes.\n* Mezcla de colores suaves con tonos profundos.\n* Combinación de prendas vintage con elementos modernos.',
    colorPalette: ['#F2EBDD', '#B8B6B0', '#4B4C2F', '#B5A0A8', '#604B3E', '#641D2D', '#E9D88D', '#292522', '#526B75', '#30233A'],
    characteristicClothing: ['Faldas plisadas', 'Tops drapeados', 'Corsés', 'Prendas con volantes'],
    characteristicAccessories: ['Lazos', 'Encaje', 'Bolsos vintage', 'Joyas delicadas'],
    rules: ['Combinar prendas femeninas y delicadas', 'Mezclar tonos suaves con colores profundos', 'Unir piezas vintage con elementos modernos'],
    image: packImage('y2k', 'WhatsApp Image 2026-09-18 at 6.21.06 PM.jpeg'),
  },
  {
    id: 'casual',
    name: 'Casual',
    description:
      'Versátil, cómoda y funcional. Diseñado para el día a día con un equilibrio entre tranquilidad y estilo.',
    colorPalette: ['#f6f3ee', '#dfe7dc', '#b5c6b1', '#5a5d5c', '#d9c7b3'],
    characteristicClothing: ['Jeans', 'Camisetas', 'Overshirts', 'Pantalones cómodos'],
    characteristicAccessories: ['Bolsos simples', 'Gafas', 'Pulseras'],
    rules: ['Mantener piezas fáciles de combinar', 'Priorizar comodidad sin perder estilo', 'Usar capas muy ligeras'],
    image: packImage('Casual', 'WhatsApp Image 2026-09-18 at 6.20.25 PM.jpeg'),
  },
]
