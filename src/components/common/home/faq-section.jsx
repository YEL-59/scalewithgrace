import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


// for accrodian
const items = [
  {
    title: "Is Karially AI free to use?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    title: "Are the resumes created ATS-compatible?",
    content:
      "Yes. It comes with default styles that matches the other components' aesthetic.",
  },
  {
    title: "Can I customize my resume with Karially AI?",
    content:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },

  {
    title: "What makes Karially AI different from other resume builders?",
    content:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
  {
    title: "Can I create a cover letter with Karially AI?",
    content:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
  {
    title: "Is my data safe with Karially AI?",
    content:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="container w-11/12 mx-auto flex flex-col lg:flex-row gap-7 lg:gap-10 xl:gap-20">

        {/* FAQ title */}
        <div className="flex-2/5 ">
          <h2 className="text-4xl md:text-[44px] lg:text-[52px] xl:text-[64px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-3">
            FAQs
          </h2>
          <p className="text-[#61656B] text-sm md:text-base lg:text-lg leading-5 md:leading-6 lg:leading-8">
            Find detailed answers to the most commonly asked questions about
            creating and optimizing resumes with Resumate AI.
          </p>

          <button className="rounded-[100px] text-sm md:text-base text-white bg-gradient-to-r  from-primary to-secondary py-3 px-5 mt-5 md:mt-7 lg:mt-8 xl:mt-10">
            Contact Us
          </button>
        </div>

        {/* accrodian part */}
        {/* <div > */}
          <Accordion
            type="single"
            collapsible
            className="my-4 w-full space-y-4 md:space-y-6 xl:space-y-8 flex-2/3 "
          >
            {items.map(({ title, content }, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none bg-[#F7F7F8] rounded-[100px] py-1 md:py-2 px-4 md:px-8"
              >
                <AccordionTrigger className="text-base md:text-xl lg:text-2xl xl:text-[26px] flex items-center font-normal">{title}</AccordionTrigger>
                <AccordionContent className="text-sm md:text-base lg:text-lg">{content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        {/* </div> */}
      </div>
    </section>
  );
}
