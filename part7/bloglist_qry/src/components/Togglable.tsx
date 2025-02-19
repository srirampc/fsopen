import { forwardRef, useImperativeHandle, useState } from 'react'
import { IPropsTogglable, IHandleTogglable } from '../ifx'
import PropTypes from 'prop-types'

//const Togglable = (props: IPropsTogglable) => {
const Togglable = forwardRef<IHandleTogglable, IPropsTogglable>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
