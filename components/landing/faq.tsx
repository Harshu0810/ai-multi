// components/landing/faq.tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const faqs = [
  {
    question: 'How do I list my property?',
    answer:
      'Simply sign up as a seller, click on "List a Property", and follow the step-by-step guide. You can add photos, description, pricing, and more.',
  },
  {
    question: 'What types of properties can I list?',
    answer:
      'You can list flats/apartments, marriage gardens, restaurants, and other venues. We support various property types to cater to different needs.',
  },
  {
    question: 'How do I get paid?',
    answer:
      'Payments are processed securely through our platform. You can withdraw your earnings to your bank account or preferred payment method.',
  },
  {
    question: 'Is there a fee for listing?',
    answer:
      'Listing is free! We only charge a small commission on successful bookings.',
  },
  {
    question: 'How are disputes handled?',
    answer:
      'We have a dedicated support team to help resolve any issues between hosts and guests. Our platform includes secure messaging and documentation features.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left bg-background hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-300 ease-in-out',
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
              >
                <div className="overflow-hidden">
                  <div className="p-4 pt-0 text-muted-foreground border-t">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}