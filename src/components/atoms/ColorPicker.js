// import react libraries
import React from 'react'

// import modules
import { Grid, Input, Slider, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

// import project files
import { useStyles } from './styles'
import { updateProjectColor } from '../../features/projects/projectSlice'

const MIN_SLIDER = 0 // minimum value of HSL color hue
const MAX_SLIDER = 360 // maximum value of HSL color hue

export default function ColorPicker({ projectId }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const projectColor = useSelector(
    (state) => state.projects.list.find((project) => project.id === projectId).color.h
  )

  const handleSliderChange = (_event, newValue) => {
    dispatch(updateProjectColor({ projectId, newColor: newValue }))
  }
  const handleColorInputChange = (event) => {
    const temp = parseInt(event.target.value, 10)
    if (isNaN(temp)) return

    let inputNumber = temp
    if (inputNumber < MIN_SLIDER) inputNumber = MIN_SLIDER
    if (inputNumber > MAX_SLIDER) inputNumber = MAX_SLIDER

    dispatch(updateProjectColor({ projectId, newColor: inputNumber }))
  }

  return (
    <div className={classes.colorPicker}>
      <Typography id='color-picker' gutterBottom>
        Change Color
      </Typography>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs>
          <Slider
            value={projectColor}
            step={1}
            min={MIN_SLIDER}
            max={MAX_SLIDER}
            onChange={handleSliderChange}
            aria-labelledby='color-picker'
          />
        </Grid>
        <Grid item>
          <Input
            value={projectColor}
            margin='dense'
            onChange={handleColorInputChange}
            inputProps={{
              step: 1,
              min: MIN_SLIDER,
              max: MAX_SLIDER,
              type: 'number',
              'aria-labelledby': 'color-picker',
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}
