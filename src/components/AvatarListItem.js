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
    price: {
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
        width: 400,
        display: 'flex',
        margin: '10px',
    },
    delete: {
        minWidth: 50,
        minHeight: 50,
        size: 'medium',
    },
}));

const AvatarListItem = ({ removeItem, index, itemDetails: { productTitle, productPrice, productAvailability } }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <ListItem className={classes.items}>
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
                            </Typography>
                            <br />
                            <Typography component="span" className={classes.price}>
                                {productAvailability}
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