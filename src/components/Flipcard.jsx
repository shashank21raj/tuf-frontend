import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RegularContent = ({ question }) => {
  return (
    <div className="flex items-center justify-center h-full bg-blue-200 rounded-lg text-blue-900 p-4">
      <p>{question}</p>
    </div>
  );
};

const FlippedContent = ({ answer }) => {
  return (
    <div className="flex items-center justify-center h-full bg-teal-200 rounded-lg text-blue-900 p-4">
      <p>{answer}</p>
    </div>
  );
};
const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipCard,setFlipCard]=useState([{id:"",question:"",answer:""}])
  useEffect(()=>{
    const fetchData=async()=>{
        const result=await axios.get('/qna');
        // console.log("the result is ",result);
        const res=result.data.data
        setFlipCard(res);
        // console.log(res);
    }
    fetchData();
  },[]);

  const handlePress = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flipCard.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flipCard.length - 1 : prevIndex - 1
    );
    setIsFlipped(false)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-80 perspective-1000">
        <div
          className={`absolute w-full h-full transition-transform duration-700 ease-in-out transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          <div className="absolute w-full h-full backface-hidden rounded-lg">
            <RegularContent question={flipCard[currentIndex].question} />
          </div>
          <div
            className={`absolute w-full h-full backface-hidden rounded-lg rotate-y-180 ${
              isFlipped ? 'block' : 'hidden'
            }`}
          >
            <FlippedContent answer={flipCard[currentIndex].answer} />
          </div>
        </div>
      </div>
      <div className="mt-4 space-x-4">
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded-full"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full"
          onClick={handlePress}
        >
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </button>
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded-full"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default FlipCard;
