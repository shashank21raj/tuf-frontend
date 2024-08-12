import axios from "axios";
import React, { useState } from "react";

export default function QuestionForm({onAdd}) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleOpen = () => setOpen(!open);
  const handleSubmit = async () => {
    console.log("Question:", question);
    console.log("Answer:", answer);
    const formdata={
      question: question,
      answer: answer
    }
    try {
      await axios.post('/qna',formdata);
      // const {result}=res.body;
      // const formbody={
      //   question: question,
      //   answer: answer
      // }
      onAdd(formdata);
      setOpen(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Question & Answer
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Question & Answer
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Question
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
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
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter the answer"
              />
            </div>
            <div className="flex justify-end space-x-4">
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
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
