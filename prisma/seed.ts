import { PrismaClient, QuestionType } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create a user
  const user = await prisma.user.upsert({
    where: { email: 'johndoe@gmail.com' },
    update: {},
    create: {
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: await bcrypt.hash('admin123', 10),
    },
  })

  // Create a form with different types of questions
  const form = await prisma.form.upsert({
    where: {
      id: 'seed-form',
    },
    update: {},
    create: {
      id: 'seed-form',
      title: 'Customer Feedback Form',
      description: 'Help us improve our services by providing your feedback',
      isPublished: true,
      isDraft: false,
      userId: user.id,
      questions: {
        create: [
          {
            type: QuestionType.SHORT_ANSWER,
            title: 'What is your name?',
            helpText: 'Please enter your full name',
            required: true,
            order: 1,
            minLength: 2,
            maxLength: 50,
          },
          {
            type: QuestionType.LONG_ANSWER,
            title: 'Please describe your experience with our service',
            helpText: 'Be as detailed as possible',
            required: true,
            order: 2,
            minLength: 10,
            maxLength: 500,
          },
          {
            type: QuestionType.SINGLE_SELECT,
            title: 'How would you rate our service?',
            required: true,
            order: 3,
            options: {
              create: [
                { value: '1', label: 'Poor', order: 1 },
                { value: '2', label: 'Fair', order: 2 },
                { value: '3', label: 'Good', order: 3 },
                { value: '4', label: 'Excellent', order: 4 },
              ],
            },
          },
          {
            type: QuestionType.NUMBER,
            title: 'How many times have you used our service?',
            required: true,
            order: 4,
            minValue: 0,
            maxValue: 100,
          },
          {
            type: QuestionType.URL,
            title: 'What is your website?',
            helpText: 'Please enter a valid URL',
            required: false,
            order: 5,
            urlPattern: 'https?://.+',
          },
          {
            type: QuestionType.DATE,
            title: 'When did you first use our service?',
            required: true,
            order: 6,
            dateFormat: 'DD-MM-YYYY',
            minDate: '01-01-2020',
            maxDate: '31-12-2024',
          },
        ],
      },
    },
  })

  // Get the created questions and rating options for submission
  const questions = await prisma.question.findMany({
    where: { formId: form.id },
    include: { options: true },
  })

  // Create a submission
  const submission = await prisma.submission.create({
    data: {
      formId: form.id,
      answers: {
        create: [
          {
            questionId: questions[0].id, // Short answer (name)
            value: 'John Doe',
          },
          {
            questionId: questions[1].id, // Long answer (experience)
            value: 'I had a great experience using your service. The customer support was excellent and the product quality exceeded my expectations.',
          },
          {
            questionId: questions[2].id, // Single select (rating)
            value: '4',
            optionId: questions[2].options.find(opt => opt.value === '4')?.id,
          },
          {
            questionId: questions[3].id, // Number (usage count)
            value: '5',
          },
          {
            questionId: questions[4].id, // URL (website)
            value: 'https://example.com',
          },
          {
            questionId: questions[5].id, // Date (first use)
            value: '15-06-2023',
          },
        ],
      },
    },
  })

  // Update form submission count
  await prisma.form.update({
    where: { id: form.id },
    data: { submissions: 1 },
  })

  console.log({
    user: { id: user.id, email: user.email },
    form: { id: form.id, title: form.title },
    submission: { id: submission.id },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })