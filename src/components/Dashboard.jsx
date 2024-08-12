import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import EditQuestion from "./EditQuestion";
import axios from "axios";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [flipdata, setFlipdata] = useState([{ id: "", question: "", answer: "" }]);

  const handleOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/qna");
      const res = result.data.data;
      setFlipdata(res);
    };
    fetchData();
  }, []);
  const addQuestion = (newQuestion) => {
    setFlipdata((prevData) => [...prevData, newQuestion]);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4 px-8">
        <div className="flex justify-between w-full items-center mb-8">
          <p className="text-4xl">Flashcard!!!</p>
          <div>
            <QuestionForm onAdd={addQuestion} />
          </div>
        </div>

        <div className="flex flex-wrap justify-start gap-4 w-full">
          {flipdata.map((card) => (
            <div
              key={card.id}
              onClick={() => handleOpen(card)}
              className="bg-purple-500 text-white px-4 py-2 rounded-md w-48 h-48 flex items-center justify-center cursor-pointer"
            >
              {card.question}
            </div>
          ))}
        </div>

        {selectedCard && (
          <EditQuestion
            id={selectedCard.id}
            question={selectedCard.question}
            answer={selectedCard.answer}
            setOpen={setOpen}
            open={open}
          />
        )}
      </div>
    </>
  );
}
