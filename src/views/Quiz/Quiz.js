import React, { useState, useEffect } from 'react'
import Answer from '../../components/Answer/Answer';
import './StyledQuiz.scss'

const Quiz = (props) => {

  const [questions, setQuestions] = useState([])
  const [questionNumbers, setQuestionNumbers] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)


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
      return (
        answerAlternatives.map((answer, key) => {
          return <Answer answer={answer} key={key} onClick={nextQuestion} />
        })
      )
    }
  }


  // display next question and update score
  const nextQuestion = (e) => {
    if (questions[index].correct_answer.replace(/(&amp;)/g, " & ") === e.target.innerText) {
      setScore(score + 1)
    }
    setIndex(index + 1)
  }


  return (
    index < 10 ?
      <main>
        {renderQuestions()}
        < div className="answers">
          {renderAnswers()}
        </div>
      </main > : <main><h1>score: {score}/10</h1></main>
  )
}

export default Quiz;