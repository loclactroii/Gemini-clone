import { createContext, useState } from "react";
import run from "../config/config";

export const Context = createContext()

const ContextProvider = (props) => {
    const [input, setInput] = useState("")
    const [showResult, setShowResult] = useState(false)
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompts, setPrevPrompts] = useState([])
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        if(prompt) {
            var data = await run(prompt)
            setRecentPrompt(prompt)
        }
        else {
            var data = await run(input)
            setRecentPrompt(input)
            setPrevPrompts(prev=>[...prev, input])
        }

        // Data processing
        let splitArray = data.split("**")
        let newData = ""
        for(let i=0; i<splitArray.length; i++) {
            if(i === 0 || i%2 !== 1) {
                newData += splitArray[i]
            }
            else {
                newData += '<b>' +splitArray[i]+ '</b>'
            }
        }
        newData = newData.split("*").join("<br>")
        let splitSpace = newData.split(" ")
        for(let i=0; i<splitSpace.length; i++) {
            delayParam(i, splitSpace[i])
        }

        setLoading(false)
        setInput("")
    }

    function delayParam(index, nextWord) {
        setTimeout(()=> {
            setResultData(prev=>prev+nextWord+" ") 
        }, 75*index)
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        setLoading,
        setShowResult
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider