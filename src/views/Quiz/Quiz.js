import React, { useState, useEffect } from 'react'

const Quiz = (props) => {

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)

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

  const renderQuestions = () => {
    if (questions.length) {
      return (
        <div>
          <h1>{questions[index].question.replace(/(&quot;)/g, "\"").replace(/(&#039;)/g, "'")}</h1>
        </div>
      )
    }
  }

  const nextQuestion = () => {
    setIndex(index + 1)
    console.log(index)
  }

  return (
    <main>
      {renderQuestions()}
      <button onClick={nextQuestion}>Next</button>
    </main>
  )
}

export default Quiz;