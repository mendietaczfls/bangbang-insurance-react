import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { API, graphqlOperation }  from "aws-amplify";
import * as queries from '../graphql/queries';
import EditItem from './editItem'
import DeleteItem from './deleteItem'
const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    padding: '10px'
  },
};
class ListItems extends Component {
state = {
    items: []
  }
componentDidMount = () => {
    this.getItems()
  }
getItems = () => {
    API.graphql(graphqlOperation(queries.listTodos))
    .then(payload => this.setState({items: payload.data.listTodos.items}));
    // .then(payload => console.log(JSON.stringify(payload)));
  };
render(){
    const { classes } = this.props;
    const { items } = this.state;
    const bull = <span className={classes.bullet}>•</span>;
    console.log(items)
    return (
      <div className={classes.root}>
      <Grid container className={classes.root} spacing={16}>
          {items.map(item => (
             <Grid key={item.id} item>
                 <Card className={classes.card}>
                   <CardContent>
                     <Typography className={classes.title} color="textSecondary" gutterBottom>
                       {item.name}
                     </Typography>
                      {/* <Typography component="p">
                      £{item.price}
                      </Typography> */}
                      <br />
                      <Typography component="p">
                      {item.description}
                      </Typography>
                  </CardContent>
                    <CardActions>
                     {/* <Button size="small">Edit Item</Button> */}
                     <EditItem currentItem={item}/>
                     <DeleteItem currentItem={item}/>
                   </CardActions>
                 </Card>
               </Grid>
             ))}
         </Grid>
      </div>
    );
  }
}
ListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ListItems);