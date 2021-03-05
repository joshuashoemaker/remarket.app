import React from 'react'
import history from '../history'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import IItem from '../../../../Interfaces/Entities/Item/IItem'
import { Chip } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBotton: 10,
    marginTop: 10
  },
  media: {
    height: 140,
  },
  chip: {
    marginLeft: 6
  }
});

export default function ShoppingSessionItem (props: { item: IItem }) {
  const item: IItem = props.item

  const classes = useStyles();

  const renderDescriptiveTags = (item: IItem) => {
    return item.descriptiveTags?.map(t => <Chip className={classes.chip} label={t} key={t} />)
  }

  return (
    <Card onClick={() => history.push(`/shoppingSession/edit/${item.id}`)} className={classes.root} id={item.id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.imageUri || "https://keepmestylish.com/wp/wp-content/uploads/2018/07/silk-dresses-designs-1.jpg"}
          title={item.label}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="span">
            { item.label }
          </Typography>

          {item.brand
            ? <Typography gutterBottom variant="subtitle1" component="span"> - { item.brand } </Typography>
            : ''
          }

          <Typography variant="body2" color="textSecondary" component="p">
            { `$${item.cost}` }
          </Typography>
        </CardContent>
          { renderDescriptiveTags(item) }
      </CardActionArea>
    </Card>
  );
}