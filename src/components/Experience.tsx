import { ABOUT_DATA } from "../data/AboutData";

function Experience () {
    const educationTimeline = [...ABOUT_DATA.education].reverse()

    return (
        <section id="Experience" className="min-h-screen border-t-[20px] border-gray-500 pt-16 shadow-[0_10px_24px_rgba(0,0,0,0.65)]">
            <h2 className="section-heading">Education</h2>
            <div className="mx-auto max-h-[70vh] max-w-3xl overflow-y-auto px-6 text-left">
                <div className="relative">
                    {educationTimeline.map((education, index) => (
                        <article className="relative pb-10 pl-8 last:pb-0" key={`${education.school}-${education.program}`}>
                            {index < educationTimeline.length - 1 && (
                                <span className="absolute bottom-0 left-[-1px] top-4 w-0.5 bg-gray-600" aria-hidden="true" />
                            )}
                            <span className="absolute left-[-9px] top-1 h-4 w-4 rounded-full border-2 border-gray-900 bg-cyan-300" aria-hidden="true" />
                            <h5 className="m-0 text-lg font-semibold text-white">{education.school}</h5>
                            <div className="pl-4">
                                <p className="mt-2 text-slate-200">{education.program}</p>
                                <p className="m-0 text-sm text-slate-400">{education.location}</p>
                                <p className="m-0 text-sm text-cyan-200">{education.timeline}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience