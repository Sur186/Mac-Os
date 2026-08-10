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
    <MacWindow
  windowName={windowName}
  windowsState={windowsState}
  setWindowsState={setWindowsState}
  activeWindow={activeWindow}
  setActiveWindow={setActiveWindow}
>
  {markdown ? (
    <SyntaxHighlighter language="javascript" style={atelierDuneDark}>
      {markdown}
    </SyntaxHighlighter>
  ) : (
    "Loading..."
  )}
</MacWindow>
  )
}

export default Note