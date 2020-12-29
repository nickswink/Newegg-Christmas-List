import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(() => ({
    inline: {
        display: 'inline',
        '& p': {
            color: 'green',
        }
    },
    ship: {
        display: 'inline',
        color: 'green',
    },
    items: {
        display: 'flex',
        alignItems: "flex-start",
        textOverflow: 'wrap',
        marginBottom: '15px',

    },
    paper: {
        display: 'flex',
        width: 700,
        display: 'flex',
        margin: '50px',
    },
    delete: {
        minWidth: 50,
        minHeight: 50,
        size: 'medium',
    },
    itemImg: {
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '5px',
        marginRight: '20px',
        width: '150px',
    },
    quantity: {
        minWidth: 50,
        minHeight: 50,
        height: "25%",
        border: 'none',
        marginRight: '15px',
        backgroundColor: 'rgb(248,248,255)',
    }
}));

const AvatarListItem = ({
    quantityCallBack,
    removeItem,
    index,
    itemDetails: {
        productTitle,
        productPrice,
        productAvailability,
        productImg,
        productUrl,
        productQuantity
    }
}) => {

    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <ListItem className={classes.items}>
                <img className={classes.itemImg} alt="Product" src={productImg}></img>
                <ListItemText
                    primary={productTitle}
                    secondary={
                        <React.Fragment>
                            Price:&nbsp;
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color='error'
                            >
                                {isNaN(productPrice) ? "Unavailable" : `$${(productPrice * productQuantity).toFixed(2)}`}
                                <br />
                                <Typography component="span" className={classes.ship}>
                                    {productAvailability}
                                    <br />
                                    <a href={productUrl}>{productUrl.substr(0, 50)}...</a>
                                </Typography>
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <TextField
                id="outlined-basic"
                type="number"
                variant="outlined"
                name='quantity'
                value={productQuantity}
                onChange={(e) => {
                    e.target.value < 1 ? (e.target.value = 1) :
                        quantityCallBack(index, e.target.value);
                }}
            />
            <Fab className={classes.delete}
                color="secondary"
                aria-label="delete"
                size="medium"
                onClick={() => removeItem(index)}>
                <DeleteIcon />
            </Fab>
        </Paper>
    );
};

export default AvatarListItem;