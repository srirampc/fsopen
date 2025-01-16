import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'
import { EFeedback, IAppState } from './ifx'

describe('unicafe reducer', () => {
  const initialState: IAppState = {
    good: 0,
    ok: 0,
    bad: 0,
  }

  test('should return a proper initial state when called with undefined state', () => {
    // const state = {}
    const action = {
      type: EFeedback.DO_NOTHING,
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: EFeedback.GOOD,
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: EFeedback.OK,
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: EFeedback.BAD,
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    })
  })

  test('stats reset to zero', () => {
    const action = {
      type: EFeedback.ZERO,
    }
    const state = {
      good: 3,
      ok: 5,
      bad: 8,
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    })
  })
})
