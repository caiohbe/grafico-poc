import { useState } from "react"
import generateRandomNum from "./utils/generateRandomNum"

export default function Button() {
  const [array, setArray] = useState([])
  console.log(array)
  function updateArray() {
    if (array.length >= 6) {
      array.shift()
    }
    setArray([...array, generateRandomNum()])
  }

  return <button onClick={() => updateArray()}>button</button>
}
