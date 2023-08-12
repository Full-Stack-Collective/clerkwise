import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export default async function RecentPatients() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className='text-xl'>Recent Patients</CardTitle>
        <CardDescription>Your most recently used charts</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
        <li className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$1,999.00</div>
      </li>
        </ul>

      </CardContent>
    </Card>
  );
}
