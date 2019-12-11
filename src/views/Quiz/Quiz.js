import React, { useState, useEffect } from 'react'
import Answer from '../../components/Answer/Answer';
import './StyledQuiz.scss'

const Quiz = (props) => {

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)

  // set 10 questions to state
  useEffect(() => {
    const selectQuestions = () => {
      let selectedQuestions = []
      props.selectedQuestions.forEach(questionIndex => {
        selectedQuestions.push(props.data[questionIndex])
      });
      setQuestions(selectedQuestions)
    };
    selectQuestions();
  }, [props.data, props.selectedQuestions]);

  // render question
  const renderQuestions = () => {
    if (questions.length) {
      return <h1>{questions[index].question.replace(/(&quot;)/g, "\"").replace(/(&#039;)/g, "'")}</h1>
    }
  }

  // render answers
  const renderAnswers = () => {
    if (questions.length) {

      // place the correct answer in a random place together with the incorrect answers
      let num = Math.floor(Math.random() * 3) + 1;
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
    if (questions[index].correct_answer === e.target.innerText) {
      setScore(score + 1)
    }
    setIndex(index + 1)
  }

  return (
    <main>
      {renderQuestions()}
      <div className="answers">
        {renderAnswers()}
      </div>
    </main>
  )
}

export default Quiz;