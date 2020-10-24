export const getPath = (routeName, params = {}) => {
  switch (routeName) {
    case 'home':
      return '/'
    case 'quiz':
      return '/quiz'
    case 'results':
      return '/results'
    default:
      return routeName
  }
}

export default {}