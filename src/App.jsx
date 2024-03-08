import { useState , useCallback , useEffect, useRef } from 'react'


function App() {
  const [length , setlength]  = useState(8)
  const [numberAllowed , setnumberAllowed] = useState(false)
  const [charAllowed , setcharAllowed] = useState(false)
  const [password , setpassword]  = useState("")

  const passwordgenerator = useCallback(
    () => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if (numberAllowed)  str += "1234567890"
      if (charAllowed) str += "!@#$%&*"

      for (let i = 1;  i<= length; i++) {
        let char =  Math.floor(Math.random()* str.length + 1)
        pass += str.charAt(char)  
      }
      setpassword(pass)


    },
    [length , numberAllowed , charAllowed ],
  )
  
  const passwordRef = useRef(null)
  useEffect( () => {
    passwordgenerator()
  },
    [length , numberAllowed , charAllowed ,passwordgenerator]
  )

  const copypasswordtoclipboard = useCallback(()=> {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,10)         //here we are fixing the range of password which is to be copied
    window.navigator.clipboard.writeText(password)
  }
  ,[password])

  return (
    <>
   
    <div className='w-full max-w-md mx-auto shadow-md
      rounded-lg my-8  py-5 px-4 text-orange-500 bg-gray-600 text-center 
      '>
        <h1 className='text-center text-white my-3'>Password Generator</h1>
       <div className=' flex shadow overflow-hidden mb-4 rounded-lg'>
           <input type="text"
           placeholder='password'
           readOnly
           value={password}
           className='w-full py-1 px-3 outline-none'
           ref={passwordRef}
            />
            <button className='bg-blue-700 text-white outline-none px-3 py-0.5 shrink-0 '
            onClick={copypasswordtoclipboard}
            >
              Copy
            </button>
       </div>
       <div className='flex text-sm gap-x-2 '>
       <div className='flex items-center gap-x-1 '>
          <input type="range"
          min={6}
          max={50}
          value={length}
          className='cursor-pointer'
         
          onChange={(e) => {setlength(e.target.value)}} />
          <label >length: {length}</label>
        </div>
       <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {numberAllowed}
        id='numberInput'
        onChange={ ()=> 
          {setnumberAllowed( (prev) => !prev);
        }} />
        <label >Number</label>

     </div>
     <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {charAllowed}
        id='numberInput'
        onChange={ ()=> 
          {setcharAllowed( (prev) => !prev);
        }} />
        <label >Character</label>

     </div>
       </div>
      </div>
    </>
  )
}

export default App
