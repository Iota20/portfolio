import { SKILLS } from '../../data/SkillsData.ts'
import { skillIconMap } from '../../data/skillIconMap.ts'

function Skills() {
  return (
    <div id="skills">
      <h3 className="mb-4 text-3xl text-slate-100">Skills</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(SKILLS).map(([category, technologies]) => (
          <article key={category} className="rounded-xl border border-gray-700 bg-gray-800 p-3">
            <h4 className="mb-2 text-lg font-semibold text-slate-200">{category}</h4>
            <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
              {technologies.map((tech) => {
                const iconSrc = skillIconMap[tech]

                return (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-700 px-2 py-1 text-sm text-slate-100"
                  >
                    {iconSrc ? (
                      <img src={iconSrc} alt={tech} className="block h-4 w-4 object-contain" />
                    ) : (
                      <span
                        className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-500 text-[0.5rem] font-bold text-slate-100"
                        aria-hidden="true"
                      >
                        {tech.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <span>{tech}</span>
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Skills
