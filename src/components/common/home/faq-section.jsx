import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetHomepageSection } from "@/hooks/home.hook";
import { Link } from "react-router";

export default function FAQSection() {
  const { data } = useGetHomepageSection("faqs-section");

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 font-poppins">
      <div className="container w-11/12 mx-auto flex flex-col lg:flex-row gap-7 lg:gap-10 xl:gap-20">
        {/* FAQ title */}
        <div className="flex-2/5 ">
          <h2
            className="font-read text-4xl md:text-[44px] lg:text-[52px] xl:text-[64px] leading-10 md:leading-12 lg:leading-14 xl:leading-16 mb-3"
            data-aos="zoom-out-down"
          >
            {data?.title}
          </h2>
          <p className="text-[#61656B] text-sm md:text-base lg:text-lg leading-5 md:leading-6 lg:leading-8">
            {data?.description}
          </p>

          {/* <Link to="/coming">
            <button
              className="rounded-[100px] text-sm md:text-base text-white bg-gradient-to-r  from-primary to-secondary py-3 px-5 mt-5 md:mt-7 lg:mt-8 xl:mt-10 font-read"
              data-aos="zoom-in"
            >
              {data?.button_text}
            </button>
          </Link> */}
        </div>

        {/* accrodian part */}
        {/* <div > */}
        <Accordion
          type="single"
          collapsible
          className="my-4 w-full space-y-4 md:space-y-6 xl:space-y-8 flex-2/3 "
        >
          {data?.faqs.map((content, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-none bg-[#F7F7F8] rounded-lg py-3 md:py-2 px-6 md:px-8"
            >
              <AccordionTrigger className="text-sm md:text-xl lg:text-2xl xl:text-[26px] flex items-center font-normal">
                {content?.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-base lg:text-lg">
                {content?.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {/* </div> */}
      </div>
    </section>
  );
}
