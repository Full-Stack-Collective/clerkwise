import React from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { capitalizeWord } from '@/utils/textFormatters';
import { calculateAge } from '@/utils/calculators';
import { format } from 'date-fns';

type ExamDetailsProps = {
  clinicalAssessment: ClinicalRecord;
  patientData: Patient;
  isOpen: boolean;
  onClose?: () => void;
};

export default function ExamDetails({
  clinicalAssessment,
  patientData,
  isOpen,
  onClose,
}: ExamDetailsProps) {
  const { first_name, surname, date_of_birth, sex } = patientData;
  const {
    exam_date,
    presenting_complaint,
    history_presenting_complaint,
    past_medical_history,
    drug_history,
    family_history,
    social_history,
    allergies,
    blood_pressure,
    heart_rate,
    respiratory_rate,
    oxygen_saturation,
    temperature,
    random_blood_sugar,
    urine,
    observations,
    on_examination,
    focused_findings,
    differential_diagnosis,
    diagnosis,
    plan,
  } = clinicalAssessment;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {first_name} {surname}
          </DialogTitle>
          <DialogDescription>
            {capitalizeWord(sex as string)},
            {date_of_birth && calculateAge(date_of_birth)} years
          </DialogDescription>
          <DialogDescription>
            Exam date: {exam_date && format(new Date(exam_date), 'PPP')}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="clinicalExam">Clinical Exam</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
          </TabsList>
          <TabsContent value="history">
            <h3 className="font-semibold">Presenting Complaint</h3>
            <p className="text-sm my-4">{presenting_complaint}</p>
            <h3 className="font-semibold">History of Presenting Complaint</h3>
            <p className="text-sm my-4">{history_presenting_complaint}</p>
            <h3 className="font-semibold">Past Medical History</h3>
            <p className="text-sm my-4">{past_medical_history}</p>
            <h3 className="font-semibold">Drug History</h3>
            <p className="text-sm my-4">{drug_history}</p>
            <h3 className="font-semibold">Family History</h3>
            <p className="text-sm my-4">{family_history}</p>
            <h3 className="font-semibold">Social History</h3>
            <p className="text-sm my-4">{social_history}</p>
            <h3 className="font-semibold">Allergies</h3>
            <p className="text-sm my-4">{allergies}</p>
          </TabsContent>

          <TabsContent value="vitals">
            <h3 className="font-semibold">Blood Pressure</h3>
            <p className="text-sm my-4">{blood_pressure} mmHg</p>
            <h3 className="font-semibold">Heart Rate</h3>
            <p className="text-sm my-4">{heart_rate} beats per minute</p>
            <h3 className="font-semibold">Respiratory Rate</h3>
            <p className="text-sm my-4">
              {respiratory_rate} breaths per minute
            </p>
            <h3 className="font-semibold">SpO2</h3>
            <p className="text-sm my-4">{oxygen_saturation} %</p>
            <h3 className="font-semibold">Temperature</h3>
            <p className="text-sm my-4">{temperature} °C</p>
            <h3 className="font-semibold">Random Blood Sugar</h3>
            <p className={`text-sm my-4 ${{ random_blood_sugar } && 'italic'}`}>
              {random_blood_sugar
                ? `${random_blood_sugar} mg/dL`
                : 'not recorded'}
            </p>
            <h3 className="font-semibold">Urine</h3>
            <p className={`text-sm my-4 ${{ urine } && 'italic'}`}>
              {urine || 'not recorded'}
            </p>
          </TabsContent>

          <TabsContent value="clinicalExam">
            <h3 className="font-semibold">Observations</h3>
            <p className="text-sm my-4">{observations}</p>
            <h3 className="font-semibold">On Examination</h3>
            <p className="text-sm my-4">{on_examination}</p>
            <h3 className="font-semibold">Focused Findings</h3>
            <p className="text-sm my-4">
              {focused_findings || 'None recorded'}
            </p>
          </TabsContent>

          <TabsContent value="diagnosis">
            {differential_diagnosis ?? (
              <>
                <h3 className="font-semibold">Differential Diagnosis</h3>
                <p className="text-sm my-4">{differential_diagnosis}</p>
              </>
            )}
            <h3 className="font-semibold">Diagnosis</h3>
            <p className="text-sm my-4">{diagnosis}</p>
            <h3 className="font-semibold">Plan</h3>
            <p className="text-sm my-4">{plan}</p>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
