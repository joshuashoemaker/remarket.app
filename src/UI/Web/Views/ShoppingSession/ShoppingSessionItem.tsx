import React from 'react'
import history from '../history'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IItem from '../../../../Interfaces/Entities/IItem'
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
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { item.brand }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { `$${item.cost}` }
          </Typography>
        </CardContent>
          { renderDescriptiveTags(item) }
        <CardContent>

        </CardContent>
      </CardActionArea>
    </Card>
  );
}