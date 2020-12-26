import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AvatarListItem from './AvatarListItem';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fetchApi } from './api/api';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: theme.palette.background.paper,
    },

    inline: {
        display: 'inline',
    },
    formControl: {
        width: '100%',
        margin: theme.spacing(1),
        marginBottom: '50px',
        minWidth: 120,
    },
    extendedIcon: {
        margin: '10px',
        marginRight: theme.spacing(1),
    },
}));

// will be asynchronous function to api 
async function fetchItemDetails(url) {
    let data = await fetchApi(url);
    return data;
};


export default function AvatarList() {
    const classes = useStyles();
    const [url, setUrl] = useState('');
    const [itemDetails, setItemDetails] = useState({});
    const [items, setItems] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setItemDetails(await fetchItemDetails(url)); // will be asynchronous
        console.log(itemDetails);
        addItem(itemDetails);
    };


    const addItem = (itemDetails) => {
        const newItems = [...items, itemDetails];
        setItems(newItems);
    };


    let updateUrl = (e) => {
        setUrl(e.target.value);
    };

    let removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    return (
        <div>
            <form className={classes.formControl} onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="Amazon Url" variant="outlined" name='newItem' value={url} onChange={updateUrl} />
                <Button variant="contained" color="primary" type="submit" value="Submit">
                    <AddIcon className={classes.extendedIcon} />
                </Button>
            </form>

            <List className={classes.root}>
                {items.map((item, index) => (
                    <>
                        <AvatarListItem
                            itemDetails={item}
                            key={index}
                            removeItem={removeItem}
                        />
                        <Divider variant="middle" component="li" />
                    </>
                ))}
            </List>
        </div >
    );
}