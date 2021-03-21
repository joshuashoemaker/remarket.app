import * as React from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, MenuItem } from '@material-ui/core'
import './styles.css'
import ItemTypes from '../../../../StaticDataStructures/ItemTypes'

interface InventoryQueryBuilderProps {
  showQueryBuilder: boolean,
  toggleQueryBuilder: any,
  onQuery: any
}

interface InventoryQueryBuilderState {
  showQueryBuilder: boolean,
  brand?: string,
  type?: ItemTypes,
  isSold?: boolean,
  isProcessed?: boolean
}

class InventoryQueryBuilder extends React.Component<InventoryQueryBuilderProps, InventoryQueryBuilderState> {
  constructor(props: InventoryQueryBuilderProps) {
    super(props)
    this.state = {
      showQueryBuilder: false,
      brand: '',
      type: ItemTypes.NA,
      isSold: undefined,
      isProcessed: undefined
    }
  }

  componentWillReceiveProps = (nextProps: InventoryQueryBuilderProps) => {
    if (nextProps.showQueryBuilder !== this.state.showQueryBuilder) this.setState({ showQueryBuilder: nextProps.showQueryBuilder })
  }

  onBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ brand: e.target.value })
  }

  onCancel = () => {
    this.props.toggleQueryBuilder()
  }

  onStatusChange = (e: any) => {
    const status = e.target.value
    if (status === 'processed') this.setState({ isSold: false, isProcessed: true })
    else if (status === 'sold') this.setState({ isSold: true, isProcessed: true })
    else this.setState({ isSold: false, isProcessed: false })
  }

  onSubmit = () => {
    const { isSold, isProcessed, type, brand } = this.state

    let query: any = { }

    if (isSold !== undefined) query.isSold = isSold
    if (isProcessed !== undefined) query.isProcessed = isProcessed
    if (type !== ItemTypes.NA) query.type = type
    if (brand) query.brand = brand

    this.setState({ isSold: undefined, isProcessed: undefined })

    this.props.onQuery(query)
  }

  onTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value as ItemTypes
    this.setState({ type })
  }

  render() {
    return <div className='InventoryWueryBuilder'>
      <Dialog fullScreen open={this.state.showQueryBuilder} onClose={this.props.toggleQueryBuilder} color='primary'>
        <DialogTitle>Query Inventory</DialogTitle>
        <DialogContent>

          <FormControl component='fieldset' onChange={this.onStatusChange}>
            <FormLabel component='legend'>Item Status</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value='intake'
                control={<Radio color='default' />}
                label='Intake'
                labelPlacement='bottom'
              />
              <FormControlLabel
                value='processed'
                control={<Radio color='primary' />}
                label='Processed'
                labelPlacement='bottom'
              />
              <FormControlLabel
                value='sold'
                control={<Radio color='secondary' />}
                label='Sold'
                labelPlacement='bottom'
              />
            </RadioGroup>
          </FormControl>

          <TextField fullWidth onChange={this.onBrandChange} margin='dense' label='Brand' variant='outlined'/>

          <TextField value={this.state.type} onChange={this.onTypeChange} id='typeField' className='formInput' label='Type' margin='dense' variant='outlined' select fullWidth defaultValue={ItemTypes.NA}>
            <MenuItem value={ItemTypes.NA}><em>None</em></MenuItem>
            <MenuItem value={ItemTypes.Clothing}>Clothing</MenuItem>
            <MenuItem value={ItemTypes.Other}>Other</MenuItem>
          </TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancel} color='secondary'>Cancel</Button>
          <Button onClick={this.onSubmit} variant='contained' color='primary'>Query</Button>
        </DialogActions>
      </Dialog>
    </div>
  }
}

export default InventoryQueryBuilder
