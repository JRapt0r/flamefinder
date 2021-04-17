import React from "react";
import ContactForm from "../Components/ContactForm";
import Summary from "../Components/Summary";


function About() {
  return (
    <div className="grid grid-cols-3">

      <div className="flex flex-col col-span-3 px-8 py-4 m-2 bg-white border rounded-md shadow-md md:my-4 md:ml-4 lg:col-span-2 faq">

        {/* About */}
        <h1 className="mt-4 text-3xl font-brand">FlameFinder</h1>
        <div className="mt-4 space-y-2 text-lg leading-8">
          <p>FlameFinder is an <a target="_blank" rel="noreferrer" href="https://github.com/JRapt0r/flamefinder">open-source</a> web application for browsing grade distribution data for the University of Illinois at Chicago.
             FlameFinder enables students to make informed decisions about their schedules by providing an easy to use interface and intuitive visualizations.</p>
          <p>FlameFinder is not associated with UIC or the University of Illinois system.</p>
        </div>

        {/* FAQ */}
        <div className="flex flex-col my-8">
          <h2 className="mb-4 text-xl font-semibold tracking-wide">FAQ</h2>

          <div className="space-y-5">
            <Summary title="Where did the grade data come from?">
              <p>
                All grade data comes from publicly available, FERPA compliant, <a href="https://oir.uic.edu/data/student-data/grade-distribution/" target="_blank" rel="noreferrer">information provided by UIC</a>.
                Course information comes from <a href="https://catalog.uic.edu/all-course-descriptions/" target="_blank" rel="noreferrer">UIC's official course catalog.</a>
              </p>

              <p className="pt-4">
                <b>Note:</b> Due to FERPA restrictions, only courses with 10 or more students are reported by the university.
              </p>
            </Summary>

            <Summary title="How is GPA calculated?">
              GPA calculations follow <a href='https://registrar.uic.edu/student-records/grading-system/' target="_blank" rel="noreferrer">official university guidelines</a>
            </Summary>

            <Summary title="I can't find a class that I'm looking for">
              Currently, FlameFinder only contains information on classes administered from fall 2017 to fall 2020.
              Additionally, due to FERPA restrictions, only courses with 10 or more students are reported by the university.
            </Summary>

            <Summary title="Who created FlameFinder?">
              <a target="_blank" rel="noreferrer" href="https://github.com/JRapt0r">
                Jonathon Repta
              </a>
            </Summary>
          </div>
        </div>

      </div>

      {/* Contact */}
      <div className="col-span-3 lg:col-span-1">
        <ContactForm />
      </div>

    </div>
  );
}

export default About;