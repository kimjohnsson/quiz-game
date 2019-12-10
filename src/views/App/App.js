import React, { useState, useEffect } from 'react';
import Quiz from '../Quiz/Quiz'
import Footer from '../../components/Footer/Footer'
import './StyledApp.scss'

const App = () => {

  const [data, setData] = useState()
  const [game, setGame] = useState({ newGame: false })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=50&category=28&type=multiple')
      const json = await response.json()
      setData(json.results);
    };
    fetchData();
  }, []);

  const newGame = () => {
    setGame({ newGame: true })
  }

  return (
    <React.Fragment>
      {game.newGame ?
        <Quiz data={data} /> :
        <main>
          <h1>Quiz Game</h1>
          <button onClick={newGame}>New Game</button>
        </main>
      }
      <Footer />
    </React.Fragment>
  );
}

export default App;
