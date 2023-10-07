import { useEffect, useState } from 'react';
import './App.css';
import Singlecard from './components/Singlecard';

const cardImages = [
  {"src": "/img/aplle.jpg",matched:false},
  {"src": "/img/Banana.jpg",matched:false},
  {"src": "/img/grape.jpg",matched:false},
  {"src": "/img/orange.jpg",matched:false},
  {"src": "/img/pineapple.jpg",matched:false},
  {"src": "/img/strawberry.jpg",matched:false}
  
]

function App() {
  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled,setDisabled] = useState(false)

  // shuffle card
  const shuffle =()=>{
    const shuffleCards = [...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  //  compare 2 selected cards
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src === choiceOne.src){
              return {...card, matched:true}
            }
            else{
              return card
            }
          })
        })
        resetTurn()
        
      }
      else{
       setTimeout(()=>resetTurn(),1000) 
      }
    }
  },[choiceOne,choiceTwo])
  console.log(cards);
  // reset choices & increase turn
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }
// start new game
useEffect(()=>{
shuffle()
},[])

  return (
    <div className="App">
      <h1 className='text-success fw-5 mt-5'>Magic Match</h1>
      <button className='btn btn-warning mt-3' onClick={shuffle}>New Game </button>
<div className='row'>
  <div className="col-lg-3"></div>
  <div className="col-lg-6">
        <div className="card-grid">  
          {cards.map(card=>(
            <Singlecard key={card.id} card={card} handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}/>
          ))}
          
        </div><label htmlFor="" className='text-warning me-2 fw-4 fs-5'>Turns :</label>
        <input type="text" className='rounded shadow mt-4 p-2 text-warning' placeholder='Turns' value={turns} readOnly style={{backgroundColor:'black',border:'1px solid grey'}}/>
        {/* <p>Turns:{turns}</p> */}
        </div>
        <div className="col-lg-3"></div>

  
</div>    </div>
  );
}

export default App;
