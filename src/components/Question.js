import React, { useEffect, useState } from "react";
import {useSound} from 'use-sound'
import failSound from '../sounds/fail.mp3'
import successSound from '../sounds/success.mp3'
const Question = ({Allquestions,questionsNum,Timer,gameEndede,setScore,setTiming,gameReseter,sound}) => {
    const [index,setIndex] = useState(questionsNum-1)
    const [correctNum,setCorectNum] = useState(0)
    const [currentSecCounter,setCurrentSecCounter] = useState(0)
    const [currentMlsCounter,setcurrentMlsCounter] = useState(0)
    const [secTimerId,setSecTimerId] = useState(null)
    const [mlsTimerId,setMlsTimerId] = useState(null)
    const [question,setQuestions] = useState({
        category:'',
        difficulty:'',
        question:'',
        correct_answer:'',
        answers:[]
    })
    const [successPlay] = useSound(successSound)
    const [failPlay] = useSound(failSound)

    //to reset the game 
    useEffect(()=>{
        setIndex(questionsNum-1)
        setCorectNum(0)
        setCurrentSecCounter(0)
        setcurrentMlsCounter(0)
        setQuestions({
            category:'',
            difficulty:'',
            question:'',
            correct_answer:'',
            answers:[]
        })
    },[gameReseter,questionsNum])

    // to display timer
    useEffect(()=>{
        if(Allquestions){
            Timer(`${currentSecCounter}.${currentMlsCounter}`)
            if(currentMlsCounter >= 9){
                setcurrentMlsCounter(0)
            }
        }
    },[currentSecCounter,currentMlsCounter])

    // timing counter
    useEffect(()=>{
        if(Allquestions){
            if(index === questionsNum-1){
                let secCounter=setInterval(() => {
                    setCurrentSecCounter(prev=>prev+1)
                }, 1000);
                let mlsCounter=setInterval(() => {
                    setcurrentMlsCounter(prev=>prev+1)
                }, 100);
                setSecTimerId(secCounter)
                setMlsTimerId(mlsCounter)
            } 
        }
    },[Allquestions,index])

    //to set the questions
    useEffect(()=>{
        if(Allquestions){
            setQuestions(()=>{
                let type = Allquestions[index].type === 'multiple'? 4: 2;
                let randomNum = Math.floor(Math.random()*type);
                let allAnswers = Allquestions[index].incorrect_answers
                if(allAnswers.length === type-1){
                    allAnswers.splice(randomNum,0,Allquestions[index].correct_answer)
                }
                return {
                    category:Allquestions[index].category,
                    difficulty:Allquestions[index].difficulty,
                    question:Allquestions[index].question,
                    correct_answer:Allquestions[index].correct_answer,
                    answers:allAnswers
                }
            }
            )
        }
    },[index,Allquestions])

    //to handle clicking on answers
    function handleClick(e){
        if(Allquestions[index].correct_answer === e.target.innerHTML){
            setCorectNum(prev=>prev+1);
            if(sound){
                successPlay()
            }
        }else {
            if(sound){
                failPlay()
            }
        }
        increaseIndex()
    }

    function increaseIndex(){
        if(index > 0){
            setIndex(prev=>prev-1)
        }else if(index === 0){
            gameEndede()
            setTiming(`${currentSecCounter}.${currentMlsCounter}`)
            setScore(`${correctNum}/${questionsNum}`)
            clearInterval(secTimerId)
            clearInterval(mlsTimerId)
        }
    }

    //to set new high score
    useEffect(()=>{
            if(index === 0){
                document.querySelectorAll('.answers button').forEach((BTN)=>{
                    BTN.addEventListener('click',()=>{
                    if(parseInt(localStorage.getItem('score'))<correctNum || localStorage.getItem('score') === null ){
                        localStorage.setItem('score',correctNum)
                        localStorage.setItem('timing',`${currentSecCounter}.${currentMlsCounter}`)
                    }
                })
                })
            }
    },[index])
    
    return ( 
        <article className='question-box'>
            <nav className='question-nav'>
                <div>
                    <h2 className="TXT-heading2">Category</h2>
                    <p className="TXT-normal">{question.category}</p>
                </div>
                <div>
                    <h2 className="TXT-heading2">difficulty</h2>
                    <p className="TXT-normal">{question.difficulty}</p>
                </div>
            </nav>
            <p className='question TXT-normal'>{question.question}</p>
            <div className="answers">
                {question.answers.map((answer,key)=>{
                    return <button 
                            key={key}
                            onClick={(event)=>handleClick(event)}
                            >{answer}
                    </button>})}
            </div>
        </article>
    );
}

export default Question;