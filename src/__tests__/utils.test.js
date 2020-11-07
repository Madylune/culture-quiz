import { getCorrectAnswer } from '../helpers/utils'

describe('Utils - getCorrectAnswer', () => {
  it('should return the correct answer', () => {
    const answers = [
      {id: 101, title: "Steve jobs", isCorrect: true},
      {id: 102, title: "Steve wozniak", isCorrect: false},
      {id: 103, title: "Bill gates", isCorrect: false},
      {id: 104, title: "Jeff bezos", isCorrect: false}
    ]
    expect(getCorrectAnswer(answers)).toEqual({id: 101, title: "Steve jobs", isCorrect: true})
  })

  describe('should return undefined', () => {
    it('missing prop', () => {
      const answers = [
        {id: 101, title: "Steve jobs"},
        {id: 102, title: "Steve wozniak"},
        {id: 103, title: "Bill gates"},
        {id: 104, title: "Jeff bezos"}
      ]
      expect(getCorrectAnswer(answers)).toEqual(undefined)
    })

    it('empty array', () => {
      const answers = []
      expect(getCorrectAnswer(answers)).toEqual(undefined)
    })
  })
})