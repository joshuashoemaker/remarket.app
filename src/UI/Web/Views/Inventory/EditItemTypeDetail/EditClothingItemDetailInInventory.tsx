import * as React from 'react'
import { MenuItem, TextField } from '@material-ui/core'
import IItemClothing from '../../../../../Interfaces/Entities/IItemClothing'
import { ClothingArticles, ClothingGenders, femaleAccessories, femaleBottoms, femaleDresses, femaleLingerie, femaleOuterwear, femaleShoes, femaleTops, maleAccessories, maleBottoms, maleOuterwear, maleShoes, maleTops, maleUnderwear } from '../../../../../StaticDataStructures/ClothingArticles'

interface EditClothingItemDetailInInventoryProps {
  item?: IItemClothing
}

interface EditClothingItemDetailInInventoryState {
  gender: ClothingGenders,
  article?: ClothingArticles,
  articleDetail: string,
  material: string,
  timeOfProduction: string,
}

class EditClothingItemDetailInInventory extends React.Component<EditClothingItemDetailInInventoryProps, EditClothingItemDetailInInventoryState> {

  constructor (props: EditClothingItemDetailInInventoryProps) {
    super(props)

    let timeOfProduction = ''
    if (props.item?.timeOfProduction) {
      const date: Date = new Date(props.item?.timeOfProduction)

      let dateOfMonth = `${date.getDate()}`
      if (dateOfMonth.length === 1) dateOfMonth = `0${dateOfMonth}`

      let month = `${date.getMonth() + 1}`
      if (month.length === 1) month = `0${month}`

      timeOfProduction = `${date.getFullYear()}-${month}-${dateOfMonth}`
    }

    this.state = {
      gender: props.item?.gender || ClothingGenders.Unisex,
      article: props.item?.article || ClothingArticles.Top,
      articleDetail: props.item?.articleDetail || '',
      material: props.item?.material || '',
      timeOfProduction: timeOfProduction
    }
  }

  onArticleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ article: e.target.value as ClothingArticles })
  }

  onArticleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ articleDetail: e.target.value })
  }

  onGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ gender: e.target.value as ClothingGenders })
  }

  onMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ material: e.target.value })
  }

  onTimeOfProductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ timeOfProduction: e.target.value })
  }

  get details () {
    console.log('getting details')
    const dateInputValue: string = this.state.timeOfProduction
    const dateParts: string[] = dateInputValue.split('-')
    let timeOfProduction: Date | null = null
    if (dateParts.length === 3) timeOfProduction = new Date(`${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`)

    return {
      article: this.state.article,
      articleDetail: this.state.articleDetail,
      gender: this.state.gender,
      material: this.state.material,
      timeOfProduction: timeOfProduction
    }
  }

  renderArticleDetailField = () => {
    const { gender, article } = this.state
    if (!gender || !article) return

    let options: string[] = []
    
    if (gender === ClothingGenders.Male) {
      if (article === ClothingArticles.Top) options = maleTops
      else if (article === ClothingArticles.Bottom) options = maleBottoms
      else if (article === ClothingArticles.Underwear) options = maleUnderwear
      else if (article === ClothingArticles.Accessory) options = maleAccessories
      else if (article === ClothingArticles.Shoes) options = maleShoes
    } else if (gender === ClothingGenders.Female) {
      if (article === ClothingArticles.Top) options = femaleTops
      else if (article === ClothingArticles.Bottom) options = femaleBottoms
      else if (article === ClothingArticles.Underwear) options = femaleLingerie
      else if (article === ClothingArticles.Outerwear) options = femaleOuterwear
      else if (article === ClothingArticles.Accessory) options = femaleAccessories
      else if (article === ClothingArticles.Shoes) options = femaleShoes
      else if (article === ClothingArticles.Dress) options = femaleDresses
      else if (article === ClothingArticles.Lingerie) options = femaleLingerie
    } else {
      if (article === ClothingArticles.Top) options = Array.from(new Set([...femaleTops, ...maleTops]))
      else if (article === ClothingArticles.Bottom) options = Array.from(new Set([...femaleBottoms, ...maleBottoms]))
      else if (article === ClothingArticles.Underwear) options = Array.from(new Set([...femaleLingerie, ...maleUnderwear]))
      else if (article === ClothingArticles.Outerwear) options = Array.from(new Set([...femaleOuterwear, ...maleOuterwear]))
      else if (article === ClothingArticles.Accessory) options = Array.from(new Set([...femaleAccessories, ...maleAccessories]))
      else if (article === ClothingArticles.Shoes) options = Array.from(new Set([...femaleShoes, ...maleShoes]))
      else if (article === ClothingArticles.Dress) options = femaleDresses
      else if (article === ClothingArticles.Lingerie) options = Array.from(new Set([...femaleLingerie, ...maleUnderwear]))
    }

    return <TextField value={this.state.articleDetail} onChange={this.onArticleDetailChange} id='typeField' className='formInput' label='Article Detail' variant='outlined' select fullWidth defaultValue=''>
      {  options.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>) }
    </TextField>
  }

  render() {
    return <div className='AddClothingItemDetailToShoppingSession itemDetails'>
        <TextField value={this.state.material} onChange={this.onMaterialChange} id='materialField' className='formInput' label='Material' variant='outlined' fullWidth />
        <TextField value={this.state.timeOfProduction} onChange={this.onTimeOfProductionChange} InputLabelProps={{shrink: true}} type='date' id='timeOfProductionField' className='formInput' label='Time of Production' variant='outlined' fullWidth />

        <TextField value={this.state.gender} onChange={this.onGenderChange} id='typeField' className='formInput' label='Gender' variant='outlined' select fullWidth defaultValue={ClothingGenders.Unisex}>
        <MenuItem value={ClothingGenders.Female}>Female</MenuItem>
        <MenuItem value={ClothingGenders.Male}>Male</MenuItem>
        <MenuItem value={ClothingGenders.Unisex}>Unisex</MenuItem>
      </TextField>

      <TextField value={this.state.article} onChange={this.onArticleChange} id='typeField' className='formInput' label='Article' variant='outlined' select fullWidth defaultValue={ClothingArticles.Top}>
        <MenuItem value={ClothingArticles.Top}>Top</MenuItem>
        <MenuItem value={ClothingArticles.Bottom}>Bottom</MenuItem>
        <MenuItem value={ClothingArticles.Underwear}>Underwear</MenuItem>
        <MenuItem value={ClothingArticles.Outerwear}>Outerwear</MenuItem>
        <MenuItem value={ClothingArticles.Accessory}>Accessory</MenuItem>
        <MenuItem value={ClothingArticles.Shoes}>Shoes</MenuItem>
        <MenuItem value={ClothingArticles.Dress}>Dress</MenuItem>
        <MenuItem value={ClothingArticles.Lingerie}>Lingerie</MenuItem>
      </TextField>

      { this.renderArticleDetailField() }
    </div>
  }
}

export default EditClothingItemDetailInInventory
