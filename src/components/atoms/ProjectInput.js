// import react libraries
import React, { useCallback, useEffect, useState } from 'react'

// import modules
import { InputBase } from '@material-ui/core'

// import project files
import { useStyles } from './styles'
import useEventListener from '../../hooks/useEventListener'

export default function ProjectInput({ clearText, handleChange, handleDone, placeholder }) {
  const classes = useStyles()
  const [inputText, setInputText] = useState('')
  const [hasFocus, setHasFocus] = useState(false)

  const handleFocus = () => {
    setHasFocus(true)
  }
  const handleBlur = () => {
    setHasFocus(false)
  }

  const handleInputChange = (event) => {
    setInputText(event.target.value)
    if (handleChange) handleChange(event.target.value)
  }

  useEffect(() => {
    if (clearText === true) setInputText('')
  }, [clearText])

  const handleFocusTrap = useCallback(
    (event) => {
      // check if we lost focus during keypress
      if (!hasFocus) {
        // if its an enter press, submit the input text
        if (event.key === 'Enter' && handleDone && inputText.length > 0) {
          handleDone(inputText)
          setInputText('')
          return
        }
        // if it was a letter, add the letter
        if (event.key.length < 2) setInputText((prevText) => `${prevText}${event.key}`)
      }
    },
    [handleDone, hasFocus, inputText]
  )
  useEventListener('keydown', handleFocusTrap)

  return (
    <div className={classes.root}>
      <InputBase
        placeholder={placeholder}
        value={inputText}
        onFocus={handleFocus}
        onChange={handleInputChange}
        onBlur={handleBlur}
        classes={{
          root: classes.inputRoot,
          input: classes.inputText,
        }}
        inputProps={{ 'aria-label': 'New Project' }}
      />
    </div>
  )
}
