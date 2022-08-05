import React, { useState, useMemo, useRef } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import { Card, CardContent, CardMedia, CardActionArea, Grid, Typography, Tooltip, Box, Stack, CardActions, styled } from '@mui/material';

import { motion } from "framer-motion";


const StyledCardActionArea = styled(CardActionArea)(({ theme }) => `
    .MuiCardActionArea-focusHighlight {
        background: transparent;
    }
`);

// Database Imports
// import { ref, set, get, onValue, query, orderByChild, equalTo, child }
//   from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
// import database from '../../backend/Database/DBInstance'

const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'
  },
  {
    name: 'Monica Hall',
    url: 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'
  },
  {
    name: 'Jared Dunn',
    url: 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'
  }
]

function Advanced () {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <Card 
              sx={{ maxWidth: 415 }} 
              elevation={2}> 
              <CardMedia
                  component="img"
                  height="300"
                  image={character.url}
                  alt="product picture"
              />
              <div className='price'>
                <Typography variant="h5" color="white">
                    {/* If the price's first digit is not dollar sign, add it */}
                    {"$50"}
                </Typography>
              </div>
              <CardContent className='product-card'>
                  <Typography gutterBottom variant="h5" component="div">
                      {/* If name exceeds limit, replace with ellipsis */}
                      {character.name.length > 25 ? character.name.substring(0, 20) + "..." : character.name}
                  </Typography>
                  {/* Set character limit so all cards are uniform */}
                  <Typography variant="body2" color="text.secondary">
                      {/* If description exceeds on line, replace with ellipsis */}
                      {character.name.length > 50 ? character.name.substring(0, 50) + " [...]" : character.name}    
                  </Typography>
              </CardContent> 
            </Card>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  )
}

export default Advanced