# notes for currency converter app

## api link

```javascript
let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`

```

## input box

```javascript

function InputBox({
    label,
    
    className = "",
}) {
   

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex `}>
            <div className="w-1/2">
                <label  className="text-black/40 mb-2 inline-block">
                    label
                </label>
                <input
                    
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    
                >
                    
                        <option value="usd">
                            usd
                        </option>
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;

```


## app js

```javascript
function App() {
    

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('${BackgroundImage}')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                           
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert 
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

```
==============================================================================================================
# Bonus Fail-safe mechanism for currency api
To **make fetching api fail-safe** we **wrote a function** for safe fetching api and **used it in our hook.**

## Contents:
**1. Create function for safe-fetching api defined in our Hook itself.
2. Implementing in our hook and done. Ps: for use, just copy and paste this code block.**

## 1. Create function for safe-fetching api defined in our Hook itself:
- **Working:** if primary url (purl) is down then we use a Secondary url (surl)
```javascript

//=======================custom-function-start==============================
        async function safeFetch(purl, surl){
            try{
                const resp = await fetch(purl);
                if(!resp.ok) throw new Error (`Fetching from Primary URL ${purl} failed.....`)

                return await resp.json()
            }
            catch(e){
                console.error("Primary URL failed: ",e)

                try{
                    const resp = await fetch(surl)
                    if(!resp.ok) throw new Error (`Fetching from Secondary URL ${surl} too failed.....`)

                    console.warn("Working with secondary URL...")
                    return await resp.json()
                }
                catch(e){
                    console.error("Secondary URL failed: ",e)
                }
            }
        }
//=======================custom-function-start==============================
```

## 2. Implementing in our hook and done:
- **Working:**  Add primary-url and secondary-url in purl and surl respectively and then fetched data.
- You can just copy and paste this **final code** in hook file useCurrencyInfo.js
```javascript

    import {useEffect, useState} from "react"

//=======================custom-hook-start====================================

        function useCurrencyInfo(currency){
             const [data,setData] = useState({})
                    //to call api
                    useEffect(() => {

                        //using our custom function safeFetch:
                        const purl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
                        const surl = `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`

                        safeFetch(purl,surl).then((res) => setData(res[currency]))

                        console.log(data)

                    },[currency])

                    console.log(data)

                    return data;
                }

        export default useCurrencyInfo;
//=======================custom-hook-end=====================================

//=======================custom-function-start==============================
        async function safeFetch(purl, surl){
            try{
                const resp = await fetch(purl);
                if(!resp.ok) throw new Error (`Fetching from Primary URL ${purl} failed.....`)

                return await resp.json()
            }
            catch(e){
                console.error("Primary URL failed: ",e)

                try{
                    const resp = await fetch(surl)
                    if(!resp.ok) throw new Error (`Fetching from Secondary URL ${surl} too failed.....`)

                    console.warn("Working with secondary URL...")
                    return await resp.json()
                }
                catch(e){
                    console.error("Secondary URL failed: ",e)
                }
            }
        }
//=======================custom-function-end==============================

```

