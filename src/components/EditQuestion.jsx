import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function EditQuestion({ id, question, answer, setOpen, open }) {
  const [newQuestion, setNewQuestion] = useState(question);
  const [newAnswer, setNewAnswer] = useState(answer);

  // Use useEffect to update the state if the question or answer props change
  useEffect(() => {
    setNewQuestion(question);
    setNewAnswer(answer);
  }, [question, answer]);

  const handleOpen = () => setOpen(!open);

  const handleSubmit =async () => {
    console.log("Question:", newQuestion);
    console.log("Answer:", newAnswer);
    const formdata={
      question: newQuestion,
      answer: newAnswer
    }
    try {      
      await axios.put(`/qna/${id}`,formdata);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete=async()=>{
    try {
      await axios.delete(`/qna/${id}`);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Question
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Question
              </label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your question"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Answer
              </label>
              <input
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter the answer"
              />
            </div>
            <div className="flex  justify-between space-x-4">
              <button
                onClick={handleOpen}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
