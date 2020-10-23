export const getPath = (routeName, params = {}) => {
  switch (routeName) {
    case 'home':
      return '/'
    case 'quiz':
      return '/quiz'
    default:
      return routeName
  }
}

export default {}