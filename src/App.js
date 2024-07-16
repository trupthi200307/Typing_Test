// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import PlayGame from './components/PlayGame';
import EndGame from './components/EndGame';
import {useEffect, useState} from 'react';


function App() {

  const [statusGame,setStatusGame] = useState(null);
  // To calculate the score :
  const [score,setScore] = useState(null);  
  useEffect(() =>{
    if(statusGame === 'playGame'){
      // To initialize score to 0 when user starts the game
      setScore({
        right : 0,
        wrong : 0
      });
      
      // to determine when the game ends
      const timeOutGame = setTimeout(()=>{
        setStatusGame('endGame');

      },60000)
      return ()=> clearTimeout(timeOutGame)

    }
  },[statusGame])

  
  // Allows user to change the status
const handleStatusChange = (status) =>{
  setStatusGame(status);
}

const handleChangesScore = (type)=>{
  if(type === 'right'){
    setScore({
      ...score,
      right:score.right+1
    })

  }
  else{
    setScore({
      ...score,
      wrong:score.wrong+1
    })

  }
    
}

  let layout ;
  switch(statusGame){
    case 'playGame' :
      layout =<PlayGame onChangeScore={handleChangesScore}/>
      break;
    case 'endGame':
      layout=<EndGame score={score} onGame={handleStatusChange}/>
      break;
    default :
      layout = <Home onGame = {handleStatusChange}/>
      break;
    

  }
  return (
    <div className="App">
      {layout}
    </div>
  );
}

export default App;
