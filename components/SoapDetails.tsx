import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { capitalizeWord } from "@/utils/textFormatters";
import { calculateAge } from "@/utils/calculators";
import { format, parseISO } from "date-fns";

type SoapDetailsProps = {
  soapAssesment: SOAP;
  patientData: Patient;
  isOpen: boolean;
  onClose?: () => void;
};

export default function SoapDetails({
  soapAssesment,
  patientData,
  isOpen,
  onClose,
}: SoapDetailsProps) {
  const { first_name, surname, date_of_birth, sex } = patientData;
  const {
    exam_date,
    subjective_findings,
    objective_findings,
    assessment,
    plan,
    blood_pressure,
    heart_rate,
    respiratory_rate,
    temperature,
    oxygen_saturation,
    random_blood_sugar,
    urine,
  } = soapAssesment;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {first_name} {surname}
          </DialogTitle>
          <DialogDescription>
            {capitalizeWord(sex as string)},{" "}
            {date_of_birth && calculateAge(date_of_birth)} years
          </DialogDescription>
          <DialogDescription>
            {/* Exam date: {exam_date && format(parseISO(exam_date), 'PPP')} */}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="soap" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="soap">SOAP</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
          </TabsList>
          <TabsContent value="soap">
            <h3 className="font-semibold">Subjective Findings</h3>
            <p className="text-sm my-4">{subjective_findings}</p>
            <h3 className="font-semibold">Objective Findings</h3>
            <p className="text-sm my-4">{objective_findings}</p>
            <h3 className="font-semibold">Assessment</h3>
            <p className="text-sm my-4">{assessment}</p>
            <h3 className="font-semibold">Plan</h3>
            <p className="text-sm my-4">{plan}</p>
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
            <p className={`text-sm my-4 ${{ random_blood_sugar } && "italic"}`}>
              {random_blood_sugar
                ? `${random_blood_sugar} mg/dL`
                : "not recorded"}
            </p>
            <h3 className="font-semibold">Urine</h3>
            <p className={`text-sm my-4 ${{ urine } && "italic"}`}>
              {urine || "not recorded"}
            </p>
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
