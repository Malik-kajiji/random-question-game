import React, { useState } from 'react'
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [toggleNav,setToggleNav] = useState(false)
  const [questionsNum,setGuestionsNum] = useState(5)
  const [sound,setSound]=useState(true)

  function handleToggleNav(){
    setToggleNav(prev=>!prev)
  }

  function handlePlus(){
    if(questionsNum<10){
        setGuestionsNum(prev=>prev+1)
    }
}

function handleMines(){
    if(questionsNum>1){
        setGuestionsNum(prev=>prev-1)
    }
}

  return (
    <section className='main-section'>
      <Header 
        handleToggleNav={handleToggleNav} 
        toggleNav={toggleNav} 
        questionsNum={questionsNum} 
        setGuestionsNum={setGuestionsNum} 
        handlePlus={handlePlus}
        handleMines={handleMines}
        sound={sound}
        setSound={()=>setSound(prev=>!prev)}
      />
      <section className='secondry-section'>
        <Main questionsNum={questionsNum} sound={sound}/>
      </section>
      <div 
        className={`overlay ${toggleNav?'active':''}`}
        onClick={handleToggleNav} 
      ></div>
    </section>
  );
}

export default App;
