import get from 'lodash/fp/get'

export const getCurrentUser = state => get('currentUser', state)