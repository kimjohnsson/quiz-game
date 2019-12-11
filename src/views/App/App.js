import React, { useState, useEffect } from 'react';
import Quiz from '../Quiz/Quiz'
import Footer from '../../components/Footer/Footer'
import './StyledApp.scss'

const App = () => {

  const [data, setData] = useState()
  const [game, setGame] = useState({ play: false })


  // Fetch quiz data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=50&category=28&type=multiple')
      const json = await response.json()
      setData(json.results);
    };
    fetchData();
  }, []);


  const playGame = () => {
    setGame({ play: true })
  }


  return (
    <React.Fragment>
      {game.play ?
        <Quiz data={data} /> :
        <main>
          <h1>Quiz Game</h1>
          <p>This is a 10 question quiz about vehicles, you will have 15 seconds on every question to select an answer.</p>
          <p>you will have 2 lifelines one "50/50" where two of the wrong answers will disappear, and one "+ 10sec" where you will get 10 seconds more to answer the current question.</p>
          <p>After the quiz is finished your score will be displayed on the screen.</p>
          <p>Good Luck!</p >
          <button onClick={playGame}>Play</button>
        </main >
      }
      <Footer />
    </React.Fragment >
  );
}

export default App;
