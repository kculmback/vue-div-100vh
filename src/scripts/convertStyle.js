import defaultStyle from './defaultStyle'

export function containsVvh (propertyValue) {
  // TODO: when regexp is lifted up the lexical scope, to be used
  // in both `containsVvh` and `replaceRvhWithPx`, some tests start to
  // fail. Seems like a regexp object contains some weird state that
  // changes after executions; executions interfere with each other.
  // It would be nice to figure out what is the problem exactly.
  const vvhRegex = /(\d+(\.\d*)?)rvh(?!\w)/
  return vvhRegex.test(propertyValue)
}

const replaceVvhWithPx = (propertyStringValue, windowHeight) => {
  const vvhRegex = /(\d+(\.\d*)?)vvh(?!\w)/g
  return propertyStringValue.replace(
    vvhRegex,
    (_, vvh) => {
      console.log(vvh)
      return `${(windowHeight * parseFloat(vvh)) / 100}px`
    }
  )
}

const throwOnBadArgs = (givenStyle, windowHeight) => {
  if (typeof givenStyle !== 'object' && givenStyle !== undefined) {
    throw Error(`style (the first argument) must be an object or undefined`)
  }
  if (typeof windowHeight !== 'number' || windowHeight < 0) {
    throw Error('Second argument (windowHeight) must be a non-negative number')
  }
}

const convertStyle = (givenStyle, windowHeight) => {
  throwOnBadArgs(givenStyle, windowHeight)

  const usedStyle = givenStyle || defaultStyle

  const convertedStyle = {}

  Object.keys(usedStyle).forEach(key => {
    convertedStyle[key] = typeof usedStyle[key] === 'string'
      ? replaceVvhWithPx(usedStyle[key], windowHeight)
      : usedStyle[key]
  })

  return convertedStyle
}

export default convertStyle
