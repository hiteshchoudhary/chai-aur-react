    import {useEffect, useState} from "react"


    function useCurrencyInfo(currency){
        const [data, setData] = useState({})
        useEffect(() => {
            // fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`) <- previous link
            //Updated api link here v
            fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`) //<- Added updated link
            //Note: I only updated the api link so that it works, everything else is same and works same :) 
            //BONUS: Look at comment at end :)
            .then((res) => res.json())
            .then((res) => setData(res[currency]))
            console.log(data);
        }, [currency])
        console.log(data);
        return data
    }

    export default useCurrencyInfo;

    /*
    //  To make it more fail-safe we wrote a function and used in our custom hook
    //  Working: if primary url (purl) is down then we use a Secondary url (surl)
    //  [If you want to use this then just replace with this whole comment and remove "/*" comment 

    //===================================================================================================
    //Fail-Safe-fetch function for currency API:

        import {useEffect, useState} from "react"

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
    //====================================================================================================
    // Using our custom function in our hook.

            function useCurrencyInfo(currency){
                const [data,setData] = useState({})
                        //to call api
                        useEffect(() => {

                            //new using safe fetch:
                            const purl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
                            const surl = `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`

                            safeFetch(purl,surl).then((res) => setData(res[currency]))

                            console.log(data)

                        },[currency])

                        console.log(data)

                        return data;
                    }

            export default useCurrencyInfo;

    //=======================================================================================================
    */