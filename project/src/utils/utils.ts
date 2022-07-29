const RAITING_COUNT = 20
const FIRST_LETTER = 0
const FIRST_INDEX = 1

export const getStars = ( rating: number ): string => {
  return `${Math.round(rating)*RAITING_COUNT}%`
}

export const capitalizeFirstLetter = (text: string):string => {  
  return text.charAt(FIRST_LETTER).toUpperCase() + text.slice(FIRST_INDEX) 
}
