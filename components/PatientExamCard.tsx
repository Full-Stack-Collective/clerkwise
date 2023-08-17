import Link from 'next/link';

import { buttonVariants } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from './ui/card';
import { ChevronRight } from 'lucide-react';

function PatientExamCard({
  clinicalAssessment,
  id,
}: {
  clinicalAssessment: ClinicalRecord[];
  id: string;
}) {
  const clinicalAssessmentExists = clinicalAssessment.length > 0;

  return (
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
        <div>PatientExamCard</div>
      )}
    </Card>
  );
}

export default PatientExamCard;
