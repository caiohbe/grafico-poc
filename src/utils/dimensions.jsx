let dimensions = {
  width: window.innerWidth * 0.9,
  height: 400,
  margins: {
    top: 15,
    right: 15,
    bottom: 40,
    left: 60,
  },
}

dimensions.boundedWidth =
  dimensions.width - dimensions.margins.left - dimensions.margins.right
dimensions.boundedHeight =
  dimensions.height - dimensions.margins.top - dimensions.margins.bottom

export default dimensions
