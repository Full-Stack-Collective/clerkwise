import Link from 'next/link';

import { buttonVariants } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

function PatientExamCard({
  clinicalAssessment,
  id,
}: {
  clinicalAssessment: any[];
  id: string;
}) {
  const clinicalAssessmentExists = clinicalAssessment.length > 0;

  return (
    <Card className="max-w-xs w-full ">
      <CardHeader>
        <CardTitle>Clinical Exam</CardTitle>
      </CardHeader>
      {!clinicalAssessmentExists ? (
        <CardContent className="flex flex-col items-center">
          <p className="text-sm mb-4">
            This patient hasn&apos;t yet been examined
          </p>
          <Link
            href={`/dashboard/new/exam/${id}`}
            className={buttonVariants({ variant: 'outline' })}
          >
            Clerk Now
          </Link>
        </CardContent>
      ) : (
        <div>PatientExamCard</div>
      )}
    </Card>
  );
}

export default PatientExamCard;
