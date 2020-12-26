import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';


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
}));

const AvatarListItem = ({ removeItem, index, itemDetails: { productTitle, productPrice, productAvailability, productImg, productUrl } }) => {
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
                                ${productPrice}
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
            <Fab className={classes.delete} color="secondary" aria-label="delete" size="medium" onClick={() => removeItem(index)}>
                <DeleteIcon />
            </Fab>
        </Paper>
    );
};

export default AvatarListItem;