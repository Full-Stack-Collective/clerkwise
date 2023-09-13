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
import { format } from 'date-fns';

export default function PatientSoapsCard({
  soapAssessments,
  patientData,
}: {
  soapAssessments: SOAP[] | null;
  patientData: Patient;
}) {
  const [isExamDetailsOpen, setIsExamDetailsOpen] = useState(false);

  const soapAssessmentsExist = soapAssessments && soapAssessments.length > 0;

  const { id } = patientData;
  return (
    <>
      <Card className="max-w-xs w-full ">
        <CardHeader>
          <CardTitle className="text-xl">SOAP Assessments</CardTitle>
        </CardHeader>
        {!soapAssessmentsExist ? (
          <CardContent className="flex flex-col items-center">
            <CardDescription className="text-sm mb-4">
              Is this a follow up visit?
            </CardDescription>
            <Link
              href={`/dashboard/new/soap/${id}`}
              className={buttonVariants({ variant: 'default' })}
            >
              Create New SOAP <ChevronRight className="h-4 w-4" />
            </Link>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col items-center">
            {soapAssessments.map((soapAssessment: SOAP) => {
              return (
                <>
                  <CardDescription key={soapAssessment.id} className="text-sm mb-4">
                    Exam Date:{' '}
                    {soapAssessment.exam_date &&
                      format(new Date(soapAssessment.exam_date), 'PPP')}
                  </CardDescription>
                  <Button onClick={() => setIsExamDetailsOpen(true)}>
                    View SOAP <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              );
            })}
          </CardContent>
        )}
      </Card>
      {soapAssessmentsExist
        ? null
        : // <ExamDetails
          //   isOpen={isExamDetailsOpen}
          //   onClose={() => setIsExamDetailsOpen(false)}
          //   soapAssessments={soapAssessments[0]}
          //   patientData={patientData}
          // />
          null}
    </>
  );
}
