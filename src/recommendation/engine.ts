import { wardrobe } from '../data/wardrobe'
import type { ClothingItem, OutfitResult, StyleId } from '../types'

const topCategories = ['tops', 'shirts', 'blouses', 'sweaters']
const bottomCategories = ['pants', 'jeans', 'skirts', 'shorts']
const layerCategories = ['jackets', 'blazers', 'sweaters']
const accessoryCategories = ['bags', 'accessories']
const outfitHistory = new Map<StyleId, Set<string>>()

const sourceName = (item: ClothingItem) => item.id.replace(`${item.styleId}-`, '').toLowerCase()
const isDress = (item: ClothingItem) => item.category === 'dresses'

const hardRulesAllow = (top: ClothingItem, bottom: ClothingItem) => {
  if (top.styleId !== 'old-money' || top.category !== 'blouses') return true
  const blouseNumber = sourceName(top).match(/^blusa(\d+)$/)?.[1]
  return !blouseNumber || !['1', '2', '3', '4'].includes(blouseNumber) || bottom.category === 'pants'
}

const visualScore = (top: ClothingItem, bottom: ClothingItem) => {
  let score = 60
  score += bottom.category === 'pants' ? 18 : bottom.category === 'skirts' ? 14 : 8
  if (/blusa(1|2|3|4)/i.test(sourceName(top)) && bottom.category === 'pants') score += 10
  if (/pantal[oó]n/i.test(sourceName(bottom))) score += 4
  return Math.min(98, score)
}

const outfitKey = (pieces: ClothingItem[]) => pieces.map((piece) => piece.id).sort().join('|')

const selectWeighted = <T extends { score: number }>(options: T[]) => {
  const total = options.reduce((sum, option) => sum + Math.max(1, option.score), 0)
  let cursor = Math.random() * total
  for (const option of options) {
    cursor -= Math.max(1, option.score)
    if (cursor <= 0) return option
  }
  return options[options.length - 1]
}

const uniquePieces = (pieces: Array<ClothingItem | undefined>) =>
  pieces.filter((item, index, all) => item && all.findIndex((candidate) => candidate?.id === item.id) === index) as ClothingItem[]

const rememberAndSelect = (styleId: StyleId, candidates: Array<{ pieces: ClothingItem[]; score: number }>) => {
  const history = outfitHistory.get(styleId) ?? new Set<string>()
  const unseen = candidates.filter((candidate) => !history.has(outfitKey(candidate.pieces)))
  const available = unseen.length ? unseen : candidates
  if (!unseen.length) history.clear()
  const selected = selectWeighted(available)
  history.add(outfitKey(selected.pieces))
  outfitHistory.set(styleId, history)
  return selected
}

const buildOldMoneyOutfit = (styleItems: ClothingItem[]) => {
  const dresses = styleItems.filter(isDress)
  const dressCandidates = dresses.map((dress) => ({ pieces: [dress], score: 72 }))
  const tops = styleItems.filter((item) => topCategories.includes(item.category))
  const bottoms = styleItems.filter((item) => bottomCategories.includes(item.category))
  const combinations = tops.flatMap((top) => bottoms
    .filter((bottom) => hardRulesAllow(top, bottom))
    .map((bottom) => ({ pieces: [top, bottom], score: visualScore(top, bottom) })))
  return rememberAndSelect('old-money', [...dressCandidates, ...combinations])
}

export function generateRecommendation(styleId: StyleId, _variation = 0): OutfitResult {
  const styleItems = wardrobe.filter((item) => item.styleId === styleId)

  if (styleId === 'gothic') {
    const categoryPieces = ['blouses', 'skirts', 'shoes'].map((category, index) => {
      const candidates = styleItems.filter((item) => item.category === category)
      return candidates[index % candidates.length]
    })
    const accessories = styleItems.filter((item) => item.category === 'accessories')
    const accessoryCount = accessories.length ? Math.floor(Math.random() * accessories.length) + 1 : 0
    const gothicAccessories = accessories.length
      ? Array.from({ length: accessoryCount }, (_, index) => accessories[(index + Math.floor(Math.random() * accessories.length)) % accessories.length])
      : []
    const pieces = uniquePieces([...categoryPieces, ...gothicAccessories])
    return {
      styleId,
      title: 'GOTHIC • Outfit recomendado',
      score: Math.min(98, 76 + pieces.length * 2 + (pieces.length >= 3 ? 10 : 0)),
      explanation: 'Una blusa, una falda y zapatos construyen la base gótica; los accesorios aportan variedad sin romper la estética.',
      pieces,
    }
  }

  if (styleId === 'old-money') {
    const selected = buildOldMoneyOutfit(styleItems)
    return {
      styleId,
      title: 'OLD-MONEY • Outfit recomendado',
      score: selected.score,
      explanation: selected.pieces.length === 1
        ? 'Vestido individual: una sola pieza mantiene la silueta limpia y elegante del estilo Old Money.'
        : 'La combinación prioriza estructura, proporción y una silueta clásica sin convertir las prendas en una pareja fija.',
      pieces: selected.pieces,
    }
  }

  const top = styleItems.find((item) => topCategories.includes(item.category))
  const bottom = styleItems.find((item) => bottomCategories.includes(item.category))
  const shoe = styleItems.find((item) => item.category === 'shoes')
  const layer = styleItems.find((item) => layerCategories.includes(item.category))
  const accessory = styleItems.find((item) => accessoryCategories.includes(item.category))
  const pieces = uniquePieces([top, bottom, shoe, layer, accessory])
  const explanationMap: Record<StyleId, string> = {
    gothic: 'El negro funciona como base, mientras que los detalles metálicos aportan contraste y mantienen la estética gótica con fuerza y elegancia.',
    'old-money': 'La silueta clásica y los tonos sobrios construyen una propuesta elegante y discreta.',
    vintage: 'La mezcla de prendas femeninas, detalles delicados y piezas inspiradas en los 90 y 2000 crea una propuesta romántica con un toque moderno.',
    casual: 'La combinación sencilla y funcional mantiene comodidad sin perder claridad visual ni versatilidad para el día a día.',
  }
  return {
    styleId,
    title: `${styleId === 'vintage' ? 'VINTAGE' : styleId.toUpperCase()} • Outfit recomendado`,
    score: Math.min(98, 76 + pieces.length * 2 + (top && bottom && shoe ? 10 : 0)),
    explanation: explanationMap[styleId],
    pieces,
  }
}
