'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

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
import { ScrollArea } from './ui/scroll-area';

export default function PatientSoapsCard({
  soapAssessments,
  patientData,
}: {
  soapAssessments: SOAP[] | null;
  patientData: Patient;
}) {
  const [isSoapDetailsOpen, setIsSoapDetailsOpen] = useState(false);
  const [currentSoap, setCurrentSoap] = useState<SOAP | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const soapAssessmentsExist = soapAssessments && soapAssessments.length > 0;

  useEffect(() => {
    const channel = supabase
      .channel('soap_assessments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'soap_assessments',
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  const handleSoapSelection = (event: Event) => {
    setIsSoapDetailsOpen(true);
  };

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
            {soapAssessmentsExist ? (
              <div className="w-full py-5 mx-auto flex flex-col">
                <h2 className="text-lg font-semibold">Past SOAPs</h2>
                <ScrollArea className="h-[128px]">
                  <ul className="w-full flex flex-col gap-3 items-center">
                    {soapAssessmentsExist &&
                      soapAssessments.map((soapAssessment: SOAP) => {
                        return (
                          <li key={soapAssessment.id}>
                            <Button
                              variant={'secondary'}
                              onClick={() => {
                                setCurrentSoap(
                                  soapAssessments.filter(
                                    (assessment) =>
                                      assessment.id === soapAssessment.id
                                  )[0]
                                );
                                setIsSoapDetailsOpen(true);
                              }}
                            >
                              {soapAssessment.exam_date &&
                                format(
                                  parseISO(soapAssessment.exam_date),
                                  'PP'
                                )}
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </li>
                        );
                      })}
                  </ul>
                </ScrollArea>
              </div>
            ) : null}
          </CardContent>
        }
      </Card>
      {!currentSoap ? null : (
        <SoapDetails
          isOpen={isSoapDetailsOpen}
          onClose={() => setIsSoapDetailsOpen(false)}
          patientData={patientData}
          soapAssesment={currentSoap}
        />
      )}
    </>
  );
}
