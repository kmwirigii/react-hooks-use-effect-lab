import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // Add useEffect for the timer
  useEffect(() => {
    if (timeRemaining > 0) {
        const timeout = setTimeout(() => {
            setTimeRemaining(timeRemaining - 1);
        }, 1000);
        return () => clearTimeout(timeout); // Cleanup
    } else {
        setTimeRemaining(10); // Reset timer
        onAnswered(false);    // Trigger callback
    }
}, [timeRemaining, onAnswered]); // Ensure dependency array is correct


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;