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
        .append("g") // "g" stands for "Group Element" which is analog of div for svg
        .style(
          // d3.style method allows us to add a css style for given element ("g")
          "transform",
          // translate will shift our graphic for the right and down respectively,
          // you could use negative negative numbers to shift to left and up too
          `translate(
            ${dimensions.margins.left}px, 
            ${dimensions.margins.top}px)
          `
        )

      const yScale = d3
        .scaleLinear() // scaleLinear method will trace a line between points of the chart values
        .domain(d3.extent(data, yAccessor))
        // domain is input space, and d3.extent returns the right range for our domain (an array with the max value and min value),
        // its parameters are the data and a function that handles the data returning a value
        .range([dimensions.boundedHeight, 0]) // range is output space, the image from a function

      const TEMP = yScale(7)
      const TEMPrectangle = bounds
        .append("rect")
        .attr("x", 0)
        .attr("width", dimensions.boundedWidth)
        .attr("y", TEMP)
        .attr("height", dimensions.boundedHeight - TEMP)

      const xScale = d3
        .scaleTime() // scaleTime uses JavaScript date object as parameters, and will determine x-axis
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth])

      const lineGenerator = d3
        // d3 gives you the line method to trivialize drawing paths without having to pass the data manually
        .line()
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale(yAccessor(d)))

      const line = bounds
        .append("path") // for complex shaped svg elements you'll want to use the "path" element
        .attr("d", lineGenerator(data))
        // paths elements have their shapes defined by this "d" attribute,
        // its parameters are "shortcuts" for setting up a path via coordinate,
        // for example if the parameter is "M 0 0" the "M" means "move to" and "0 0" are x and y coordinates respectively,
        // you can concatenate these commands so you can have a longer path like "M 0 0 L 50 100 L 100 100 L 0 15" ("L" means "line to")
        //
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
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
