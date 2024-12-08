import { PrismaClient } from '@prisma/client'
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const prisma = new PrismaClient()

async function getForms() {
  const forms = await prisma.form.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  return forms
}

export default async function FormsPage() {
  const forms = await getForms()

  return (
    <div className="container mx-auto py-10">
      <Card className='border-none max-w-2xl mx-auto'>
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold tracking-tight">All Forms</h2>
           
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell className="font-medium">
                    {form.title}
                    {form.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {form.description}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    {form.isPublished ? (
                      <Badge className="bg-green-500">Published</Badge>
                    ) : form.isDraft ? (
                      <Badge variant="secondary">Draft</Badge>
                    ) : (
                      <Badge variant="destructive">Unpublished</Badge>
                    )}
                  </TableCell>
                  <TableCell>{form.submissions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}