import React, { useEffect, useState ,useRef} from 'react'

const Typingtest = () => {

  const sampleText = [
    "Practice makes a person perfect in everything they do",
    "Typing fast is not just about speed, but accuracy too",
    "Code is like humor when ypu have to explain it it",
    "Learning react is a fun when you actually build projects"

  ]

  const[text,setText] = useState("")
  const[input,setInput] = useState("")
  const[startTime,setStartTime] = useState(null)
  const[endTime,setEndTime] = useState(null)
  const[wpm,setWpm] = useState(0)
  const[accuracy,setAccuracy] = useState(0)
  const[isFinished,setIsFinished] = useState(false)
  const[time,setTime] = useState(0)

  const timeRef = useRef(null)

  useEffect (()=>{
    setText(sampleText[Math.floor(Math.random() * sampleText.length)])
  },[])

  const handleChange =(e) =>{
    const value = e.target.value
    if(!startTime) setStartTime(Date.now())
      setInput(value) 
    if(value === text) {
      finishTest()
    }
  }

  useEffect(()=>{
    if(startTime && !isFinished){
      timeRef.current = setInterval(()=>{
        setTime((prev) => prev +1)
      },1000)
    }
    return () => clearInterval(timeRef.current)
  },[startTime,isFinished])

  const finishTest= () =>{
    clearInterval(timeRef.current)
    const timeTaken = (Date.now() - startTime) /60000
    const wordTypes = input.trim().split(/\s+/).length
    const wpmCalc = Math.round(wordTypes / timeTaken)

    const correctChars = input.split("").filter((ch,i) => ch === text[i]).length
    const accCalc = Math.round((correctChars / text.length) * 100)

    setWpm(wpmCalc)
    setAccuracy(accCalc)
    setIsFinished(true)
  }

  const Reset = () => {
    setText(sampleText[Math.floor(Math.random() * sampleText.length)])
    setInput("")
    setWpm("")
    setAccuracy("")
    setIsFinished(false)

  }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 text-white'>
      <div className='bg-gray-800/80 p-8 rounded-2xl shadow-2xl maz-w-2xl w-full'>
        <h1 className='text-3xl font-bold text text-center text-yellow-400 mb-4'>Typing Speed Checker</h1>

        <p className='text-lg mb-6 leadding-relaxed text-gray-300'>
          {text.split("").map((char,i)=>{
             let color = "";
             if(i<input.length){
              color = char===input[i] ? "text-green-400" :"text-red-400"
             }
             return(
              <span key={i} className={`${color}`}>{char}</span>
             )
          })}
        </p>

        <textarea name="" id=""
        row="4"
        value={input}
        disabled={isFinished}
        onChange={handleChange}
        className='w-full p-3 rounded-xl bg-gray-900 border border-gray-600 text-white'
        placeholder='Start typing here...'>
        
        </textarea>

        <div className='flex justify-around mb-4 text-lg'>
          <div><span className='text-yellow-400'>{time}S</span></div>
          <div><span className='text-green-400'>WPM:{wpm}</span></div>
          <div><span className='text-blue-400'>Accuracy{accuracy}%</span></div>
        </div>
     
      <div className='flex justify-center gap-4'>
        <button
        onClick={finishTest}
        className='bg-yellow-500 text-black px-5 py-2 rounded-full font-bold mt-3'
        >Finish Test</button>

         <button
         onClick={Reset}
        className='bg-green-500 text-black px-5 py-2 rounded-full font-bold mt-3'
        >Try Again</button>
      </div>
    </div>
     </div>
  )
}

export default Typingtest