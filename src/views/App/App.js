import React, { useState, useEffect } from 'react';
import Quiz from '../Quiz/Quiz'
import Footer from '../../components/Footer/Footer'
import './StyledApp.scss'

const App = () => {

  const [data, setData] = useState()
  const [game, setGame] = useState({ newGame: false })

  // Fetch quiz data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=50&category=28&type=multiple')
      const json = await response.json()
      setData(json.results);
    };
    fetchData();
  }, []);

  const newGame = () => {

    // create a array of 10 numbers which represents the index of the selected questions
    let selectedQuestions = []

    let num = Math.floor(Math.random() * 49) + 1;
    selectedQuestions.push(num)

    // check so that the same question is not selected multiple times
    while (selectedQuestions.length < 10) {
      let num = Math.floor(Math.random() * 49) + 1;
      if (!selectedQuestions.includes(num)) {
        selectedQuestions.push(num)
      }
    }

    setGame({ newGame: true, selectedQuestions: selectedQuestions })
  }

  return (
    <React.Fragment>
      {game.newGame ?
        <Quiz data={data} selectedQuestions={game.selectedQuestions} /> :
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
