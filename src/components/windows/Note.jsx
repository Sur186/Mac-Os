import { useEffect,useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import MacWindow from './MacWindow'
import "./note.scss"


const Note = ({windowsState, windowName,setWindowsState, activeWindow,setActiveWindow}) => {
 
    const [markdown, setMarkDown] = useState(null)

    useEffect(()=>{
        fetch('./note.txt')
        .then(res => res.text())
        .then(text => setMarkDown(text))

    },[])

  return (
    <MacWindow  windowsState={windowsState} windowName={windowName} setWindowsState={setWindowsState} activeWindow={activeWindow} setActiveWindow={setActiveWindow}>
        <div className="note-window">
            {markdown ? <SyntaxHighlighter language='typescript' style={atelierDuneDark}  >{markdown}</SyntaxHighlighter> : <p>Loading....</p> }
        </div>
    </MacWindow>
  )
}

export default Note