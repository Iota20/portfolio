import { ABOUT_DATA } from '../data/AboutData';

function Hero ()
{
    return (
        <section id="Hero" className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-12 text-center text-slate-100">
            <h2 className="text-2xl text-slate-200">Hello!</h2>
            <h1 className="mt-3 text-4xl font-semibold text-white md:text-6xl">I am {ABOUT_DATA.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300 md:text-xl">{ABOUT_DATA.intro}</p>
        </section>       
    );
}

export default Hero