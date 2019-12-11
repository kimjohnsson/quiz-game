import React, { useState, useEffect } from 'react'
import Answer from '../../components/Answer/Answer'
import Timer from '../../components/Timer/Timer'
import ChanceLifeline from '../../components/ChanceLifeline/ChanceLifeline'
import './StyledQuiz.scss'

const Quiz = (props) => {

  const [questions, setQuestions] = useState([])
  const [questionNumbers, setQuestionNumbers] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [unanswerd, setUnanswerd] = useState(0)
  const [usedLifeline, setUsedLifeline] = useState({ chance: 0 }, { time: 0 })


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
  }, [])


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


  // render question
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

      let addedLifeline = 0

      return (
        answerAlternatives.map((answer, key) => {
          if (questions[index].incorrect_answers.includes(answer) && addedLifeline < 2) {
            addedLifeline++
            return <Answer answer={answer} key={key} onClick={nextQuestion} lifeline={usedLifeline.chance} />
          } else {
            return <Answer answer={answer} key={key} onClick={nextQuestion} />
          }
        })
      )
    }
  }


  // eliminate 2 wrong answers
  const chanceLifeline = () => {
    setUsedLifeline({ chance: usedLifeline.chance + 1 })
  }


  // update score and go to next question
  const nextQuestion = (e) => {
    if (e && questions[index].correct_answer.replace(/(&amp;)/g, " & ") === e.target.innerText) {
      setScore(score + 1)
    } else if (!e) {
      setUnanswerd(unanswerd + 1)
    }
    if (usedLifeline.chance > 0) {
      setUsedLifeline({ chance: false })
    }
    setIndex(index + 1)
  }


  return (
    index < 10 ?
      <main>
        <Timer questionNumber={index + 1} nextQuestion={nextQuestion} />
        {renderQuestions()}
        <div className="lifelines">
          {usedLifeline.chance === 0 ? <ChanceLifeline onClick={chanceLifeline} /> : <React.Fragment />}
        </div>
        <div className="answers">
          {renderAnswers()}
        </div>
      </main > : <main><h2>Correct Answers: {score}</h2><br></br><h2>Incorrect Answers: {10 - score - unanswerd}</h2><br></br><h2>Unanswerd: {unanswerd}</h2></main>
  )
}

export default Quiz;