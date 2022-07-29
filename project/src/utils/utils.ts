export const getStars = ( rating: number ): string => {
  const stars = Math.round( rating )*20
  return `${stars}%`
}