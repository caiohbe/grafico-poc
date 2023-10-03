import { useState } from "react"
import * as d3 from "d3"

function generateNumber() {
  const number = Math.random().toFixed(1) * 10
  return number
}

async function getData() {}

getData()

function App() {
  const [array, setArray] = useState([])

  function updateArray() {
    if (array.length >= 6) {
      array.shift()
    }
    setArray([...array, generateNumber()])
  }
  console.log(array)

  return (
    <>
      <button onClick={() => updateArray()}>button</button>
      {array.map((item) => {
        return <h1>{item}</h1>
      })}
    </>
  )
}

//setInterval(generateNumber, 5000)

export default App
