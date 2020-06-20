function sorting (sortType, items) {
  if (sortType === 'alphabetical') {
    return items.sort((a, b) => {
      return a.breed.localeCompare(b.breed)
    })
  } else if (sortType === 'random') {
    return items.sort(() => Math.random() - 0.5)
  }
}
export default sorting
