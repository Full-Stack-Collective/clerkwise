
import BackButton from '@/components/BackButton'
import { PatientDetails } from '@/components/PatientDetails'
import React from 'react'

async function PatientChart() {
  return (
    <div className='max-w-2xl w-full'>
    <h1 className='text-xl font-semibold text-center mb-7'>Patient Chart</h1>
    <PatientDetails/>
    </div>
  )
}

export default PatientChart