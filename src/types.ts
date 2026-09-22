export type StyleId = 'gothic' | 'old-money' | 'vintage' | 'casual'

export type Category =
  | 'tops'
  | 'shirts'
  | 'blouses'
  | 'pants'
  | 'jeans'
  | 'skirts'
  | 'dresses'
  | 'shorts'
  | 'jackets'
  | 'blazers'
  | 'sweaters'
  | 'shoes'
  | 'bags'
  | 'accessories'
  | 'gloves'
  | 'other'

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'
export type Occasion = 'casual' | 'party' | 'formal' | 'weekend' | 'work'

export interface StyleDefinition {
  id: StyleId
  name: string
  description: string
  colorPalette: string[]
  characteristicClothing: string[]
  characteristicAccessories: string[]
  rules: string[]
  image: string
}

export interface ClothingItem {
  id: string
  name: string
  styleId: StyleId
  category: Category
  color: string
  secondaryColor: string
  season: Season[]
  occasion: Occasion[]
  material: string
  image: string
}

export interface OutfitResult {
  styleId: StyleId
  title: string
  score: number
  explanation: string
  pieces: ClothingItem[]
}
