import image from "../../../assets/images/abouthero.png";

const AboutUsHero = () => {
  return (
    <section className="bg-[#F1F4FF]">
      {/* Text Section */}
      <div className="max-w-6xl mx-auto text-center text-black px-4 pt-16 pb-5 md:pb-56 lg:pb-64">
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-4"
          data-aos="fade-up"
        >
          You shouldn't have to figure out your career on your own.
        </h1>
        <p
          className="text-[#6C6C6C] text-base sm:text-lg max-w-4xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Karially gives you structure, strategy, and support so you always know
          what to do next and why it matters.
        </p>
      </div>

      {/* Image on black background */}
      <div className="bg-black hidden md:block py-12 px-4">
        <div
          className="container mx-auto -mt-[250px]"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <img
            src={image}
            alt="Career support meeting"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;
