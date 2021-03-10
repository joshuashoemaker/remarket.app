import ItemConstructor from './ItemConstructor'

interface ItemClothingConstructor extends ItemConstructor {
  material?: string,
  timeOfProduction?: Date
}

export default ItemClothingConstructor
