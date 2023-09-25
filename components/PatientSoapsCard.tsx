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
import { format, parseISO } from 'date-fns';
import SoapDetails from './SoapDetails';

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
        {
          <CardContent className="flex flex-col items-center">
            <CardDescription className="text-sm mb-4">
              Is this a follow up visit?
            </CardDescription>
            <Link
              href={`/dashboard/new/soap/${id}`}
              className={buttonVariants({ variant: 'default' })}
            >
              New SOAP <ChevronRight className="h-4 w-4" />
            </Link>
            {/* </CardContent>
        
          <CardContent className="flex flex-col items-center"> */}
            <div className="w-full py-5 mx-auto flex flex-col">
              <h2 className="text-lg font-semibold">Past SOAPs</h2>
              <ul>
                {soapAssessmentsExist &&
                  soapAssessments.map((soapAssessment: SOAP) => {
                    return (
                      <li key={soapAssessment.id}>
                        <CardDescription className="text-sm my-2"></CardDescription>
                        <Button
                          variant={'secondary'}
                          onClick={() => setIsExamDetailsOpen(true)}
                        >
                          {soapAssessment.exam_date &&
                            format(parseISO(soapAssessment.exam_date), 'PP')}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </CardContent>
        }
      </Card>
      {soapAssessmentsExist
        ? null
        :  <SoapDetails
             isOpen={isExamDetailsOpen}
             onClose={() => setIsExamDetailsOpen(false)}
             soapAssessment={}
             patientData={patientData}
           />
          null}
    </>
  );
}
