
import { useState,useCallback,useEffect,useRef} from 'react'

import './App.css'
import './index.css'

function App() {
  const[length,setlength] = useState(8);
  const[numberAlowed,setnumberaAlowed] = useState(false);
  const[CharAllowed,setCharAllowed] = useState(false);
  const[password,setpassword] = useState('');

  const Genertepassword = useCallback(()=>{
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAlowed) str +="0123456789"
    if(CharAllowed) str +="!#$%&()*+,-./:;<=>?@[]^_{|}~"
    for(let i=1;i<length;i++){
      const char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char);
    }
    setpassword(pass);
  },[length,numberAlowed,CharAllowed]);
  useEffect(()=>{
      Genertepassword();
  },[length , numberAlowed , CharAllowed]);
  const copyPasswordToClipboard = ()=>{
    window.navigator.clipboard.writeText(password);
    passwordref.current.select();
  }
  const passwordref =useRef(null);

  return (
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
    <h1 className=' text-white text-center my-3'>Password Genertor</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordref}
      />
      <button
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      onClick={copyPasswordToClipboard}
      >Copy</button>
    </div>
    <div className='flex items-center gap-x-1'>
      <input 
        type="range"
        min={6}
        max={100}
        className='cursor-pointer'
        onChange={(e) => setlength(e.target.value)}
        name="" 
        id="" />
        <label htmlFor="length">length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
       <input 
        type="checkbox" 
        defaultChecked={numberAlowed}
        onChange={()=>{
          setnumberaAlowed((prev)=>!prev);
        }}
        name="" 
        id="" />
        <label htmlFor="number">Numbers</label>
    </div>
    <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox" 
        defaultChecked={CharAllowed}
        onChange={()=>{
          setCharAllowed((prev)=> !prev);
        }}
        name="" 
        id="" />
        <label htmlFor="charInput">Characters</label>
        </div>


   </div>
  )
}

export default App
