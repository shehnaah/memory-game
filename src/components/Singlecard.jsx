// import React from 'react'
import './Singlecard.css'

export default function Singlecard({card,handleChoice,flipped,disabled}) {
    const handleClick = ()=>{
        if(!disabled){
            handleChoice(card)
        }
        
    }
    
  return (
    <div>
                  <div className='card' >
              <div className={flipped? "flipped" : ""}>
                <img className='front' src={card.src} alt="card front" width={'100px'} height={'100px'} />
                <img className='back' src='/img/cover.jpg' alt="card back" width={'100px'} height={'100px'} onClick={handleClick} />
  
              </div>
            </div>

    </div>
  )
}

// export default Singlecard
