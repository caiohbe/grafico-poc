import * as d3 from "d3"

export default async function getData() {
  const csvPath = "src/assets/dadosGerados.csv"
  try {
    const csvData = await d3.csv(csvPath)
    console.log(csvData)
    return csvData
  } catch (error) {
    console.log(error)
  }
}
