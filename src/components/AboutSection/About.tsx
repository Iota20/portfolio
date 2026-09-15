import { ABOUT_DATA } from '../../data/AboutData'
import webdevBackground from '../../assets/bg/webdev_bg.jpg'
import Skills from './Skills'

function About() {
	return (
		<section id="about"
			className="relative ml-[calc(50%_-_50vw)] min-h-screen w-screen border-t-[20px] border-gray-500 bg-fixed bg-cover bg-center shadow-[0_10px_24px_rgba(0,0,0,0.65)]"
			style={{ backgroundImage: `url(${webdevBackground})` }}
		>
			<div className="absolute inset-x-0 bottom-0 top-0 bg-black/60" aria-hidden="true" />
			<div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 text-slate-200">
				<h2 className="section-heading text-3xl font-semibold text-white">About Me</h2>
				<div className="grid gap-16 md:grid-cols-2 md:items-start">
					<div>
						<p className="max-w-xl px-14 py-20 text-xl leading-9 tracking-wide text-slate-300">{ABOUT_DATA.about_me}</p>
					</div>

					<Skills />
				</div>
			</div>
		</section>
	)
}

export default About
