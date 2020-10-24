export const UPDATE_CURRENT_USER = 'update.current.user'
export const updateCurrentUser = userData => ({
  type: UPDATE_CURRENT_USER,
  payload: userData
})

export const REMOVE_CURRENT_USER = 'remove.current.user'
export const removeCurrentUser = userData => ({
  type: REMOVE_CURRENT_USER,
  payload: userData
})