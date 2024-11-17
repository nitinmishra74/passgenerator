import { useCallback, useState,useEffect ,useRef } from 'react'


function App() {
  const [lenght, setLenght] = useState(6);
  const [noAllowed , setNoAllowed]=useState(false);
  const [charAllowed , setCharAllowed]=useState(false);
  const [password , setPassword]=useState("");

  const passwordRef= useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(noAllowed) str+="0123456789"
    if(charAllowed) str+="~!@#$%^&*<>?/{}[]"
     for(let i=1; i<=lenght ;i++){
      let char= Math.floor(Math.random()*str.length+1)

      pass+= str.charAt(char)
     }
     setPassword(pass)
  },[lenght,noAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()//select pe blue effect
    window.navigator.clipboard.writeText(password)
  },[password])
    
  useEffect(()=>{
    passwordGenerator()
  },[lenght,noAllowed,charAllowed,passwordGenerator])

  return (
    <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-black bg-amber-300'><h1 className='text-black text-center my-3 text-lg'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-2'>
      <input
      type='text'
      value={password} 
      className='outline-none w-full py-1 px-3'
      placeholder="Password"
      readOnly 
      ref={passwordRef}
      />
      <button 
      onClick={copyPasswordToClipboard}
      className='outline-none bg-pink-500 text-white px-3 py-0.5 shrink-0 cursor-pointer'>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'> 
        <input type="range"
        min={6}
        max={100}
        value={lenght}
        className='cursor-pointer'
        onChange={(e)=>{setLenght(e.target.value)}}/>
          <label>lenght:{lenght}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={noAllowed}
        id='numberInput'
        onChange={()=>{
          setNoAllowed((prev)=>!prev);
        }}/>
        <label>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={charAllowed}
        id='characterInput'
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}/>
        <label>Characters</label>
      </div>
    </div>
   </div>
    </>
  )
}

export default App
