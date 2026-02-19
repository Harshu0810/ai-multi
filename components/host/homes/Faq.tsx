import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQ() {
  const faqList = [
    {
      question: 'Is my place right for Spotly?',
      answer:
        'Spotly guests are interested in all kinds of places – spare rooms, flats, houses, holiday homes, even treehouses.',
    },
    {
      question: 'Do I have to host all the time?',
      answer: 'No – you control your calendar. You can host once a year, a few nights a month or more often.',
    },
    {
      question: 'What are Airbnb’s fees?',
      answer:
        'It’s free to create a listing, and Airbnb typically collects a service fee of 3% of the reservation subtotal once you get paid. In many areas, Airbnb automatically collects and pays sales and tourism taxes on your behalf. Learn more about fees.',
    },
    {
      question: 'How do I get started?',
      answer:
        'You can create a listing in just a few steps, all at your own pace. Start by telling us about your home, take some photos and add details about what makes it unique. Start your listing.',
    },
    {
      question: 'How do I get my home ready for guests?',
      answer:
        'Make sure your home is clean, clutter-free, and that everything is working properly. Items like fresh linen and stocked toiletries help create a comfortable and inviting place to stay. Check out our guide to getting your home ready.',
    },
    {
      question: 'How am I protected when I host?',
      answer:
        'AirCover for Hosts provides top-to-bottom protection every time you host your home on Airbnb. Learn more about AirCover for Hosts and what’s included.',
    },
  ]

  return (
    <div>
      <h1 className="text-6xl font-bold text-center">
        Your questions, <br /> answered
      </h1>

      <div className="max-w-xl my-20 flex w-full mx-auto justify-center items-center">
        <Accordion type="single" collapsible className="w-full">
          {faqList.map((faq, indx) => (
            <AccordionItem value={`item-${indx + 1}`} key={indx + 1}>
              <AccordionTrigger className="text-xl">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-lg">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}