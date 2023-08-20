import { formatDate } from "@/utils/textFormatters"
import {  columns } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Patient[]> {
  // Fetch data from your API here.
  return [
    {
      first_name:'bally',
      surname:'Ram',
      phone: '868-606-6060',
      email: "m@example.com",
      date_of_birth: formatDate('1980-12-12'),
      city: 'Penal',
      
    },
    // ...
  ]
}
 
export default async function DemoPage() {
  const data = await getData()
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}