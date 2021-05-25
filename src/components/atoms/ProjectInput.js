// import react libraries
import React, { useEffect, useState } from 'react'

// import modules
import { InputBase } from '@material-ui/core'

// import project files
import { useStyles } from './styles'

export default function ProjectInput({ clearText, handleChange, handleDone, placeholder }) {
  const classes = useStyles()
  const [inputText, setInputText] = useState('')

  const handleKeyPress = (event) => {
    // only do anything if the enter key was pressed
    if (handleDone && event.charCode === 13 && inputText.length > 0) {
      handleDone(inputText)
      setInputText('')
    }
  }
  const handleInputChange = (event) => {
    setInputText(event.target.value)
    if (handleChange) handleChange(event.target.value)
  }

  useEffect(() => {
    if (clearText === true) setInputText('')
  }, [clearText])

  return (
    <div className={classes.root}>
      <InputBase
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        value={inputText}
        onChange={handleInputChange}
        classes={{
          root: classes.inputRoot,
          input: classes.inputText,
        }}
        inputProps={{ 'aria-label': 'New Project' }}
      />
    </div>
  )
}
