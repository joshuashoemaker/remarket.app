import React from 'react'
import history from '../history'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

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

export default function ShoppingSessionPlaceholder () {
  const classes = useStyles();

  return (
    <Card onClick={() => history.push(`/shoppingSession/add`)} className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://designshack.net/wp-content/uploads/placeholder-image.png"
          title='Add Item'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            Its Empty Here
          </Typography>

          <Typography gutterBottom variant="subtitle1" component="h5">Start Adding Items</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}