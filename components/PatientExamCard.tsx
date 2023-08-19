'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button, buttonVariants } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from './ui/card';
import { ChevronRight } from 'lucide-react';
import { formatDate } from '@/utils/textFormatters';
import ExamDetails from './ExamDetails';

export default function PatientExamCard({
  clinicalAssessment,
  patientData,
}: {
  clinicalAssessment: ClinicalRecord[];
  patientData: Patient;
}) {
  const [isExamDetailsOpen, setIsExamDetailsOpen] = useState(false);

  const clinicalAssessmentExists =
    clinicalAssessment !== undefined && clinicalAssessment.length > 0;

  const { id } = patientData;

  return (
    <>
      <Card className="max-w-xs w-full ">
        <CardHeader>
          <CardTitle className="text-xl">Clinical Exam</CardTitle>
        </CardHeader>
        {!clinicalAssessmentExists ? (
          <CardContent className="flex flex-col items-center">
            <CardDescription className="text-sm mb-4">
              There are no records for this patient.
            </CardDescription>
            <Link
              href={`/dashboard/new/exam/${id}`}
              className={buttonVariants({ variant: 'default' })}
            >
              Clerk Now <ChevronRight className="h-4 w-4" />
            </Link>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col items-center">
            {clinicalAssessmentExists ? (
              <CardDescription className="text-sm mb-4">
                Exam Date: {formatDate(clinicalAssessment[0].exam_date!)}
              </CardDescription>
            ) : null}
            <Button onClick={() => setIsExamDetailsOpen(true)}>
              View Exam <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        )}
      </Card>
      {clinicalAssessmentExists ? (
        <ExamDetails
          isOpen={isExamDetailsOpen}
          onClose={() => setIsExamDetailsOpen(false)}
          clinicalAssessment={clinicalAssessment[0]}
          patientData={patientData}
        />
      ) : null}
    </>
  );
}
