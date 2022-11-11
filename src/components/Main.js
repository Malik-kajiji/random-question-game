import React, { useEffect, useState } from "react";
import Question from "./Question";
import Footer from "./Footer";
const Main = ({questionsNum,sound}) => {
    const [start,setStart] = useState(false)
    const [btnTxt,setBtnTxt] = useState('START')
    const [questions,setQuestion]=useState();
    const [gameEndede,setGameEnded] = useState(false)
    const [score,setScore]=useState('0')
    const [timing,setTiming]=useState('0')
    const [gameReseter,setGameReseter]=useState(false)

    function handleClick(){
        setStart(true)
        setBtnTxt(3)
    }
    useEffect(()=>{
        if(start){
            let TimeOut = 3;
            let Timer = setInterval(() => {
                setBtnTxt(prev=>prev-1)
                TimeOut--;
                if(TimeOut <=0){
                    clearInterval(Timer)
                }
            }, 1000);
        }
    },[start])
    useEffect(()=>{
        if(btnTxt === 0){
            fetch(`https://opentdb.com/api.php?amount=${questionsNum}`)
            .then(res=>res.json())
            .then(data=>setQuestion(data.results))
        }
    },[btnTxt])

    function resetGame(){
        setStart(false)
        setBtnTxt('START')
        setQuestion(undefined)
        setGameEnded(false)
        setScore('0')
        setTiming('0')
        setGameReseter(prev=>!prev)
    }
    return ( 
        <section className="start-section container">
            <button
                className={`start-btn TXT-heading ${start?'started':''}`}
                onClick={handleClick}>{btnTxt}
                </button>
            {gameEndede && <article className="end-game">
                                    <button className="TXT-heading" onClick={resetGame}>play again</button>
                                    <div>
                                        <h2 className="TXT-heading2">your score is {score}</h2>
                                        <p className="TXT-normal">timing : {timing}</p>
                                    </div>
                            </article>}
            <Question 
                sound={sound}
                gameReseter={gameReseter}
                Allquestions={questions} 
                questionsNum={questionsNum}
                Timer={(Num)=>setBtnTxt(Num)}
                gameEndede={()=>setGameEnded(prev=>!prev)}
                setScore={(score)=>setScore(score)}
                setTiming={(timing)=>setTiming(timing)}
            />
            <Footer />
        </section>
    );
}

export default Main;