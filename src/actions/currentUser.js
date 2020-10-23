export const UPDATE_CURRENT_USER = 'update.current.user'
export const updateCurrentUser = user => ({
  type: UPDATE_CURRENT_USER,
  payload: { user }
})

export const REMOVE_CURRENT_USER = 'entities.remove'
export const removeCurrentUser = user => ({
  type: REMOVE_CURRENT_USER,
  payload: { user }
})