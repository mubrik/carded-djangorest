import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import IconButton from '@material-ui/core/IconButton';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ClearIcon from '@material-ui/icons/Clear';
import {selectAllCards} from '../cards/cardsSlice'
import {updateDeckCards, selectActiveDeck, selectCardsByDeckId} from './deckSlice'
import {getArrayDifference} from '../utils/utilities'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '210px',
        maxHeight: `58vh`,
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    listHeader: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    buttonForm: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'nowrap',
    },
}));

const DeckListForm = (props) => {
    // selected deck
    const selectedDeckId = useSelector(selectActiveDeck);
    // redux
    const dispatch = useDispatch()
    const allCardsArray = useSelector(selectAllCards);
    const deckCardsArrayById = useSelector((state) => selectCardsByDeckId(state, selectedDeckId));
    let AddCardsArray = selectedDeckId ? allCardsArray.filter(card => !deckCardsArrayById.includes(card['id'])) : [];
    let RemoveCardsArray = selectedDeckId ? allCardsArray.filter(card => deckCardsArrayById.includes(card['id'])) : [];
    // react 
    const [checked, setChecked] = React.useState([]);
    const [deleteChecked, setDeleteChecked] = React.useState([]);
    const [removeList, setRemoveList] = React.useState(true);
    // material
    const classes = useStyles();
    
    const handleUpdate = () => {
        dispatch(updateDeckCards({
            deckId: selectedDeckId,
            cards: checked.concat(deckCardsArrayById)
        }));
        setChecked([]);
    }
    
    const handleRemove = () => {
        let diff = getArrayDifference(deckCardsArrayById, deleteChecked)
        dispatch(updateDeckCards({
            deckId: selectedDeckId,
            cards: diff
        }));
        setDeleteChecked([]);
    }

    const listProps = {
        checked,
        setChecked,
        deleteChecked,
        setDeleteChecked,
        handleUpdate,
        handleRemove,
        AddCardsArray,
        RemoveCardsArray,
        removeList
    }

    return(
        <>
        {   selectedDeckId && 
            <>
            <List 
            className={classes.root}
            subheader={
                <ListSubheader className={classes.listHeader} component="div" id="nested-list-subheader">
                    {removeList ? 'Remove Cards' : 'Add Cards'}
                    <IconButton onClick={() => setRemoveList(state => !state)}>
                        <SwapHorizIcon/>
                    </IconButton>
                </ListSubheader>
            }
            >   
                {removeList && <RemoveDeckList {...listProps}/>}
                {!removeList && <AddDeckList {...listProps}/>}
            </List>
            <ListButtons {...listProps}/>
            </>
        }
        </>
    )
}

const AddDeckList = (props) =>  {

    const {checked, setChecked, AddCardsArray} = props;

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <>
        {AddCardsArray ? AddCardsArray.map((card) => {
            const labelId = `checkbox-list-label-${card.id}`;

            return (
            <ListItem key={card.id} role={undefined} dense button onClick={handleToggle(card.id)}>
                <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked.indexOf(card.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${card.title}`} />
            </ListItem>
            );
        }) : null }
        </>
    );
}

const RemoveDeckList = (props) =>  {

    const {deleteChecked, setDeleteChecked, RemoveCardsArray} = props;

    const handleToggle = (value) => () => {
        const currentIndex = deleteChecked.indexOf(value);
        const newChecked = [...deleteChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setDeleteChecked(newChecked);
    };

    return (
        <>
        {RemoveCardsArray ? RemoveCardsArray.map((card) => {
            const labelId = `checkbox-list-label-${card.id}`;

            return (
            <ListItem key={card.id} role={undefined} dense button onClick={handleToggle(card.id)}>
                <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={deleteChecked.indexOf(card.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${card.title}`} />
            </ListItem>
            );
        }) : null }
        </>
    );
}

const ListButtons = (props) => {

    const {
        removeList, handleUpdate,
        handleRemove, setDeleteChecked,
        setChecked
    } = props;

    // material
    const classes = useStyles();

    const handleClear = () => {
        if (removeList) {
            setDeleteChecked([])
        } else {
            setChecked([])
        }
    }

    return(
        <div className={classes.buttonForm}>
            <Button 
                aria-label="accept"
                startIcon={<DoneAllIcon />}
                size="small"
                onClick={removeList ? handleRemove : handleUpdate }
            >
                {removeList ? 'remove' : 'update' }
            </Button>
            <Button 
                aria-label="accept"
                startIcon={<ClearIcon />}
                size="small"
                onClick={handleClear}
            >
                clear
            </Button>
        </div>
    )
}

export default DeckListForm