import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import { AppBar, Toolbar } from '@material-ui/core'
import { Cancel, Check, ArrowForward, ArrowBack } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      position: 'fixed',
      bottom: 40,
      backgroundColor: 'white',
      zIndex: 100
    },
    backButton: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
)

function getSteps() {
  return ['Basic Info', 'Process', 'Review']
}

export default function HorizontalLabelPositionBelowStepper(props: {moveToSection(section: number): void}) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      const nextSection = prevActiveStep + 1
      props.moveToSection(nextSection)
      return nextSection
    })
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      const previousSection = prevActiveStep - 1
      props.moveToSection(previousSection)
      return previousSection
    })
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <AppBar position='fixed' className='footer'>
        <Toolbar>
          <Button onClick={handleBack} className='footerButton'>
            {activeStep === 0
              ? <Cancel htmlColor='#ff6868' fontSize='large' />
              : <ArrowBack htmlColor='#ff6868' fontSize='large' />}
            
          </Button>
          <Button onClick={handleNext} className='footerButton'>
            {activeStep === steps.length - 1
              ? <Check htmlColor='#03DAC5' fontSize='large' />
              : <ArrowForward htmlColor='#03DAC5' fontSize='large' />}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}