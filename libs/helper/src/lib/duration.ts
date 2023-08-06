const SecondsInOneMinute = 60

export const formatMinutesSeconds = (durationInSecs: number) => {
  'worklet' // indicate to reanimated library that we're using it inside an animation
  // Ideally we would have liked to use an external library such as
  // format-duration but reanimated doesn't like to use external libraries
  // (likely the external lib would need to be marked as a worklet)
  // so have to create a local function for this formatting.
  // this is only for seconds, we can add additional time format here

  if (durationInSecs > (SecondsInOneMinute - 1)) {
    durationInSecs = durationInSecs % SecondsInOneMinute
  }
  return `${durationInSecs}`
  
}

export const formatMinutes = (durationInSecs: number) => {
  'worklet' // indicate to reanimated library that we're using it inside an animation
  // Ideally we would have liked to use an external library such as
  // format-duration but reanimated doesn't like to use external libraries
  // (likely the external lib would need to be marked as a worklet)
  // so have to create a local function for this formatting.
  // this is only for seconds, we can add additional time format here
  const durationInMins = Math.floor(durationInSecs / SecondsInOneMinute)
  if (durationInSecs > (SecondsInOneMinute - 1)) {
    durationInSecs = durationInSecs % SecondsInOneMinute
  }
  return `${("00"+durationInMins).slice(-2)}:${("00"+durationInSecs).slice(-2)}`
  
}