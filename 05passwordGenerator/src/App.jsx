import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  // random number generator

  function getRandomExcluding(min, max, excludes) {
    let num;
    do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excludes.includes(num)); // Keep looping if num is in the exclude list
    return num;
  }

const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_-+=[]{}~`";
    
    if (numberAllowed && charAllowed) {
        let saprator1 = getRandomExcluding(1,6,[]);
        let numIdx = getRandomExcluding(52, 61, []);
        let charIdx = getRandomExcluding(62, 79, []);
        if(saprator1 === 1){
            pass += str.charAt(numIdx);
            pass += str.charAt(charIdx);
            for(let i = 1;i<=(length-2);i++){
                let strIdx = getRandomExcluding(0,79,[numIdx,charIdx]);
                pass += str.charAt(strIdx);
            }
        }else if(saprator1===2){
            pass += str.charAt(numIdx);
            for(let i = 1;i<=(length-2);i++){
                let strIdx = getRandomExcluding(0,79,[numIdx,charIdx]);
                pass += str.charAt(strIdx);
            }
            pass += str.charAt(charIdx);
        }else if(saprator1===3){
            pass += str.charAt(charIdx);
            pass += str.charAt(numIdx);
            for(let i = 1;i<=(length-2);i++){
                let strIdx = getRandomExcluding(0,79,[numIdx,charIdx]);
                pass += str.charAt(strIdx);
            }
        }else if(saprator1===4){
            pass += str.charAt(charIdx);
            for(let i = 1;i<=(length-2);i++){
                let strIdx = getRandomExcluding(0,79,[numIdx,charIdx]);
                pass += str.charAt(strIdx);
            }
            pass += str.charAt(numIdx);
        }else if(saprator1===5){
            for(let i = 1;i<=(length-2);i++){
                let strIdx = getRandomExcluding(0,79,[numIdx,charIdx]);
                pass += str.charAt(strIdx);
            }
            pass += str.charAt(numIdx);
            pass += str.charAt(charIdx);
        }else if(saprator1===6){
            for(let i = 1;i<=(length-2);i++){
                let strIdx = getRandomExcluding(0,79,[numIdx,charIdx]);
                pass += str.charAt(strIdx);
            }
            pass += str.charAt(charIdx);
            pass += str.charAt(numIdx);
        }
    }else if(numberAllowed && !charAllowed) {
        let numIdx = getRandomExcluding(52, 61, []);
        let saprator1 = getRandomExcluding(1,2,[]);
        if(saprator1 === 1){
            pass += str.charAt(numIdx);
            for(let i = 1;i<=(length-1);i++){
                let strIdx = getRandomExcluding(0,61,[numIdx]);
                pass += str.charAt(strIdx);
            }
        }else if(saprator1 === 2){
            for(let i = 1;i<=(length-1);i++){
                let strIdx = getRandomExcluding(0,61,[numIdx]);
                pass += str.charAt(strIdx);
            }
            pass += str.charAt(numIdx);
        }
    }else if(!numberAllowed && charAllowed){
        let charIdx = getRandomExcluding(52,69,[]);
        let saprator1 = getRandomExcluding(1,2,[]);
        if(saprator1 === 1){
            pass += str.charAt(charIdx);
            for(let i = 1;i<=(length-1);i++){
                let strIdx = getRandomExcluding(0,69,[charIdx]);
                pass += str.charAt(strIdx);
            }
        }else if(saprator1 === 2){
            for(let i = 1;i<=(length-1);i++){
                let strIdx = getRandomExcluding(0,69,[charIdx]);
                pass += str.charAt(strIdx);
            }
            pass += str.charAt(charIdx);
        }
    }else{
        for(let i = 1;i<=(length);i++){
            let strIdx = getRandomExcluding(0,51,[]);
            pass += str.charAt(strIdx);
        }
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    
  )
}

export default App
