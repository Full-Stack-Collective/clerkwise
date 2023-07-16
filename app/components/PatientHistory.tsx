import React from 'react'

const PatientHistory = () => {
  return (
    <div>
      <h2>Patient History</h2>
      <form action="">
        
        <div>
          <label htmlFor="pc">Presenting Complaint</label>
          <textarea name="pc" id="pc" />
        </div>

        <div>
          <label htmlFor="hpc">History of Presenting Complaint</label>
          <textarea name="hpc" id="hpc" />
        </div>
        
        <div>
          <label htmlFor="pmh">Past Medical/Surgical History</label>
          <textarea name="pmh" id="pmh" />
        </div>

        <div>
          <label htmlFor="dhx">Drug History</label>
          <textarea name="dhx" id="dhx" />
        </div>
        
        <div>
          <label htmlFor="fhx">Family History</label>
          <textarea name="fhx" id="fhx" />
        </div>
        
        <div>
          <label htmlFor="shx">Social History</label>
          <textarea name="shx" id="shx" />
        </div>


        <div>
          <label htmlFor="sr">Systems Review</label>
          <textarea name="sr" id="sr" />
        </div>

        <button type="submit">Save</button>

      </form>
    </div>
  )
}

export default PatientHistory