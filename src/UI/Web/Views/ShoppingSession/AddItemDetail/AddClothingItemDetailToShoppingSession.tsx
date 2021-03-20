import * as React from 'react'
import { TextField } from '@material-ui/core'
import IItemClothing from '../../../../../Interfaces/Entities/IItemClothing'

interface AddItemProps {
  item?: IItemClothing
}

interface AddItemState {
  material: string,
  timeOfProduction: string,
}

class AddClothingItemDetailToShoppingSession extends React.Component<AddItemProps, AddItemState> {

  constructor (props: AddItemProps) {
    super(props)

    let timeOfProduction = ''
    if (props.item?.timeOfProduction) {
      const date: Date = props.item?.timeOfProduction

      let dateOfMonth = `${date.getDate()}`
      if (dateOfMonth.length === 1) dateOfMonth = `0${dateOfMonth}`

      let month = `${date.getMonth() + 1}`
      if (month.length === 1) month = `0${month}`

      timeOfProduction = `${date.getFullYear()}-${month}-${dateOfMonth}`
    }

    this.state = {
      material: props.item?.material || '',
      timeOfProduction: timeOfProduction
    }
  }

  onMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ material: e.target.value })
  }

  onTimeOfProductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ timeOfProduction: e.target.value })
  }

  get details () {
    const dateInputValue: string = this.state.timeOfProduction
    const dateParts: string[] = dateInputValue.split('-')
    let timeOfProduction: Date | null = null
    if (dateParts.length === 3) timeOfProduction = new Date(`${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`)

    return {
      material: this.state.material,
      timeOfProduction: timeOfProduction
    }
  }

  render() {
    return <div className='AddClothingItemDetailToShoppingSession itemDetails'>
        <TextField value={this.state.material} onChange={this.onMaterialChange} id='materialField' className='formInput' label='Material' variant='outlined' fullWidth />
        <TextField value={this.state.timeOfProduction} onChange={this.onTimeOfProductionChange} InputLabelProps={{shrink: true}} type='date' id='timeOfProductionField' className='formInput' label='Time of Production' variant='outlined' fullWidth />
    </div>
  }
}

export default AddClothingItemDetailToShoppingSession
