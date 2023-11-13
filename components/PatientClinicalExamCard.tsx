"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button, buttonVariants } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { ChevronRight } from "lucide-react";
import ExamDetails from "./ExamDetails";
import { format, parseISO } from "date-fns";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function PatientClinicalExamCard({
  clinicalAssessment,
  patientData,
}: {
  clinicalAssessment: ClinicalRecord[];
  patientData: Patient;
}) {
  const [isExamDetailsOpen, setIsExamDetailsOpen] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const clinicalAssessmentExists =
    clinicalAssessment !== undefined && clinicalAssessment.length > 0;

  const { id } = patientData;

  useEffect(() => {
    const channel = supabase
      .channel("clinical exams")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "clinical_records",
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
              className={buttonVariants({ variant: "default" })}
            >
              Clerk Now <ChevronRight className="h-4 w-4" />
            </Link>
          </CardContent>
        ) : (
          <CardContent className="flex flex-col items-center">
            {clinicalAssessmentExists ? (
              <CardDescription className="text-sm mb-4">
                Exam Date:{" "}
                {format(parseISO(clinicalAssessment[0].exam_date!), "PPP")}
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
