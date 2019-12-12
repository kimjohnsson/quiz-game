import React, { useState, useEffect } from 'react'
import Answer from '../../components/Answer/Answer'
import Timer from '../../components/Timer/Timer'
import ChanceLifeline from '../../components/ChanceLifeline/ChanceLifeline'
import TimeLifeline from '../../components/TimeLifeline/TimeLifeline'
import Score from '../Score/Score'
import './StyledQuiz.scss'

const Quiz = (props) => {

  const [questions, setQuestions] = useState([])
  const [questionNumbers, setQuestionNumbers] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [unanswered, setUnanswered] = useState(0)
  const [lifelineChance, setLifelineChance] = useState(0)
  const [lifelineTime, setLifelineTime] = useState(true)
  const [numberOfGames, setNumberOfGames] = useState(1)


  // reset score, lifeline values and select 10 new questions
  const restartQuiz = () => {
    setIndex(0)
    setScore(0)
    setUnanswered(0)
    setLifelineChance(0)
    setLifelineTime(true)
    setNumberOfGames(numberOfGames + 1)
  }


  useEffect(() => {
    const selectRandomQuestions = () => {
      // create a array of 10 numbers which represents the index of the selected questions
      let randomQuestionNumbers = []

      let num = Math.floor(Math.random() * 49) + 1;
      randomQuestionNumbers.push(num)

      // check so that the same question is not selected multiple times
      while (randomQuestionNumbers.length < 10) {
        let num = Math.floor(Math.random() * 49) + 1;
        if (!randomQuestionNumbers.includes(num)) {
          randomQuestionNumbers.push(num)
        }
      }
      setQuestionNumbers(randomQuestionNumbers)
    }
    selectRandomQuestions()
  }, [numberOfGames])


  // save 10 questions in state
  useEffect(() => {
    const selectQuestions = () => {
      let selectedQuestions = []
      questionNumbers.forEach(questionIndex => {
        selectedQuestions.push(props.data[questionIndex])
      });
      setQuestions(selectedQuestions)
    };

    if (questionNumbers.length) {
      selectQuestions();
    }
  }, [props.data, questionNumbers]);


  // if questions are loaded and selected render question
  const renderQuestions = () => {
    if (questions.length && index < questions.length) {
      return <h1>{questions[index].question.replace(/(&quot;)/g, "\"").replace(/(&#039;)/g, "'")}</h1>
    }
  }


  // render answers
  const renderAnswers = () => {
    if (questions.length && index < questions.length) {

      // place the correct answer in a random place together with the incorrect answers
      let num = Math.floor(Math.random() * 4);
      let answerAlternatives = [...questions[index].incorrect_answers]
      answerAlternatives.splice(num, 0, questions[index].correct_answer)

      // give two incorrect answers 50/50 lifeline
      let addedLifeline = 0
      return (
        answerAlternatives.map((answer, key) => {
          if (questions[index].incorrect_answers.includes(answer) && addedLifeline < 2) {
            addedLifeline++
            return <Answer answer={answer} key={key} onClick={nextQuestion} lifeline={lifelineChance} />
          } else {
            return <Answer answer={answer} key={key} onClick={nextQuestion} />
          }
        })
      )
    }
  }


  // eliminate 2 incorrect answers
  const chanceLifeline = () => {
    setLifelineChance(lifelineChance + 1)
  }


  // give player 10 secods more to answer current question
  const timeLifeline = () => {
    setLifelineTime(false)
  }


  // update score, remove lifelines if used and go to next question
  const nextQuestion = (e) => {
    if (e && questions[index].correct_answer.replace(/(&amp;)/g, " & ") === e.target.innerText) {
      setScore(score + 1)
    } else if (!e) {
      setUnanswered(unanswered + 1)
    }

    if (lifelineChance > 0) {
      setLifelineChance(false)
    }

    setIndex(index + 1)
  }


  return (
    index < 10 ?
      <main>
        <div className="quiz">
          <Timer questionNumber={index + 1} nextQuestion={nextQuestion} lifeline={lifelineTime} />
          {renderQuestions()}
          <div className="lifelines">
            {lifelineChance === 0 ? <ChanceLifeline onClick={chanceLifeline} /> : <React.Fragment />}
            {lifelineTime ? <TimeLifeline onClick={timeLifeline} /> : <React.Fragment />}
          </div>
          <div className="answers">
            {renderAnswers()}
          </div>
        </div>
      </main > : <Score correctAnswers={score} incorrectAnswers={10 - score - unanswered} unanswered={unanswered} restartQuiz={restartQuiz} />
  )
}

export default Quiz;