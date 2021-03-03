interface IItem {
  id: string,
  label?: string,
  brand?: string,
  type?: string,
  cost?: number,
  descriptiveTags?: string[]
  addDescriptiveTag(tag: string): void,
  removeDescriptiveTag(tag: string): void
}

export default IItem
