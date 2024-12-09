'use client'
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Trash2 } from "lucide-react";
import Link from 'next/link';
import LongAnswerIcon from '@/components/Icons/LongAnswerIcon';

interface Form {
  id: string;
  title: string;
  isDraft: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function FormsDashboard() {
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('/api/forms');
      const data = await response.json();
      setForms(data.forms);
    } catch (error) {
      console.error('Failed to fetch forms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteForm = async (formId: string) => {
    try {
      await fetch(`/api/forms/${formId}`, {
        method: 'DELETE',
      });
      fetchForms(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete form:', error);
    }
  };

  const FormsTable = ({ forms, isDraft }: { forms: Form[], isDraft: boolean }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {forms
          .filter(form => isDraft ? form.isDraft : form.isPublished)
          .map((form) => (
            <TableRow key={form.id}>
              <TableCell className="font-medium">{form.title}</TableCell>
              <TableCell>{new Date(form.updatedAt).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(form.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/forms/${form.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteForm(form.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  if (isLoading) {
    return <div className="flex justify-center items-start mt-[20vh] h-screen animate-pulse transition-all ease-in-out "><LongAnswerIcon className='h-9 w-9 text-primary'/></div>;
  }

  return (
    <div className="container mx-auto py-10 px-2 max-w-[640px]">
      <div className="flex justify-between items-center mb-8">
        <div className="text-base md:text-2xl font-semibold">All Forms </div>
        <Button asChild>
          <Link href="/forms/create">Create New Form</Link>
        </Button>
      </div>

      <Tabs defaultValue="drafts" className="max-w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
        </TabsList>
        <TabsContent value="drafts">
          <FormsTable forms={forms} isDraft={true} />
        </TabsContent>
        <TabsContent value="published">
          <FormsTable forms={forms} isDraft={false} />
        </TabsContent>
      </Tabs>
    </div>
  );
}