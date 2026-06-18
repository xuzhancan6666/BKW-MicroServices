import blocks from "./blocks"
import layout from "./layout"
import media from "./media"
import basicComponents from "./basic-components"
import textComponents from "./text-components"

const all = { blocks, layout, media, basicComponents, textComponents }

function getBlocks(keys, canvasMode) {
  let output = []
  keys.forEach(key => {
    output = output.concat(all[key](canvasMode))
  })
  return output
}

export default getBlocks
