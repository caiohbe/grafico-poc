import { useEffect, useRef } from "react"
import * as d3 from "d3"
import getData from "./utils/getData"
import dimensions from "./utils/dimensions"
import Button from "./Button"

export default function Chart() {
  const wrapperRef = useRef()

  useEffect(() => {
    async function TEMP() {
      const data = await getData()

      const yAccessor = (d) => parseFloat(d["Concentração de CO (%)"])

      const parseDate = d3.timeParse("%d/%m/%Y %H:%M")
      function xAccessor(d) {
        return parseDate(d["Data e Hora"])
      }

      const wrapper = wrapperRef.current

      d3.select(wrapper)
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)

      const bounds = d3
        .select(wrapper)
        .append("g")
        .style(
          "transform",
          `translate(
            ${dimensions.margins.left}px, 
            ${dimensions.margins.top}px)
          `
        )

      const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data, yAccessor))
        .range([dimensions.boundedHeight, 0])

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth])

      const lineGenerator = d3
        .line()
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale(yAccessor(d)))

      const line = bounds
        .append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "tomato")
      console.log(yAccessor(data[0]))
    }

    TEMP()
  }, [])

  return (
    <>
      <div ref={wrapperRef}>Conteúdo div</div>
      <Button />
      {/* {array.map((item, index) => {
        return <h1 key={index}>{item}</h1>
      })} */}
    </>
  )
}
