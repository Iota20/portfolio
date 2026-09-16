import { useEffect, useRef, type PointerEvent } from 'react';
import { ABOUT_DATA } from '../data/AboutData';
import './Hero.css';

function Hero ()
{
    const heroRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cursorRef = useRef({ x: 0.5, y: 0.5, active: false });

    useEffect(() => {
        const hero = heroRef.current;
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!hero || !canvas || !context) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const particleCount = Math.min(
            window.innerWidth < 768 ? 48 : 80,
            Math.max(32, Math.floor(window.innerWidth / 18)),
        );
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random(),
            y: Math.random(),
            velocityX: (Math.random() - 0.5) * 0.00018,
            velocityY: (Math.random() - 0.5) * 0.00018,
            radius: Math.random() * 1.4 + 1.2,
        }));
        let animationFrame = 0;

        const resizeCanvas = () => {
            const bounds = hero.getBoundingClientRect();
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

            canvas.width = bounds.width * pixelRatio;
            canvas.height = bounds.height * pixelRatio;
            canvas.style.width = `${bounds.width}px`;
            canvas.style.height = `${bounds.height}px`;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        };

        const draw = () => {
            const bounds = hero.getBoundingClientRect();
            const width = bounds.width;
            const height = bounds.height;
            const cursor = cursorRef.current;
            const cursorX = cursor.x * width;
            const cursorY = cursor.y * height;
            const cursorRadius = Math.min(width, height) * 0.32;
            const baseConnectionDistance = Math.min(width, height) * 0.16;

            context.clearRect(0, 0, width, height);

            particles.forEach((particle) => {
                if (!reducedMotion) {
                    particle.x += particle.velocityX;
                    particle.y += particle.velocityY;

                    if (particle.x < 0 || particle.x > 1) particle.velocityX *= -1;
                    if (particle.y < 0 || particle.y > 1) particle.velocityY *= -1;
                    particle.x = Math.max(0, Math.min(1, particle.x));
                    particle.y = Math.max(0, Math.min(1, particle.y));
                }
            });

            const points = particles.map((particle) => ({
                ...particle,
                screenX: particle.x * width,
                screenY: particle.y * height,
            }));

            points.forEach((point, index) => {
                const neighbors = points
                    .map((otherPoint, otherIndex) => ({
                        point: otherPoint,
                        index: otherIndex,
                        distance: Math.hypot(point.screenX - otherPoint.screenX, point.screenY - otherPoint.screenY),
                    }))
                    .filter(({ index: otherIndex, distance }) => otherIndex !== index && distance < baseConnectionDistance * 2.4)
                    .sort((first, second) => first.distance - second.distance)
                    .slice(0, 5);

                neighbors.forEach((firstNeighbor, neighborIndex) => {
                    neighbors.slice(neighborIndex + 1).forEach((secondNeighbor) => {
                        const neighborDistance = Math.hypot(
                            firstNeighbor.point.screenX - secondNeighbor.point.screenX,
                            firstNeighbor.point.screenY - secondNeighbor.point.screenY,
                        );
                        if (neighborDistance > baseConnectionDistance * 1.5 || firstNeighbor.index < index) return;

                        const triangleDistance = Math.min(firstNeighbor.distance, secondNeighbor.distance, neighborDistance);
                        const opacity = 0.025 + Math.max(0, 1 - triangleDistance / (baseConnectionDistance * 1.5)) * 0.09;

                        context.beginPath();
                        context.moveTo(point.screenX, point.screenY);
                        context.lineTo(firstNeighbor.point.screenX, firstNeighbor.point.screenY);
                        context.lineTo(secondNeighbor.point.screenX, secondNeighbor.point.screenY);
                        context.closePath();
                        context.fillStyle = `rgba(34, 211, 238, ${opacity})`;
                        context.fill();
                    });
                });
            });

            points.forEach((point, index) => {
                const distanceToCursor = Math.hypot(point.screenX - cursorX, point.screenY - cursorY);
                const cursorInfluence = cursor.active
                    ? Math.max(0, 1 - distanceToCursor / cursorRadius)
                    : 0;
                const connectionDistance = baseConnectionDistance * (1 + cursorInfluence * 1.8);

                points.slice(index + 1).forEach((otherPoint) => {
                    const distance = Math.hypot(point.screenX - otherPoint.screenX, point.screenY - otherPoint.screenY);
                    if (distance > connectionDistance) return;

                    const otherDistanceToCursor = Math.hypot(otherPoint.screenX - cursorX, otherPoint.screenY - cursorY);
                    const connectionInfluence = cursor.active
                        ? Math.max(0, 1 - Math.min(distanceToCursor, otherDistanceToCursor) / cursorRadius)
                        : 0;
                    const opacity = 0.08 + (1 - distance / connectionDistance) * (0.16 + connectionInfluence * 0.34);

                    context.beginPath();
                    context.moveTo(point.screenX, point.screenY);
                    context.lineTo(otherPoint.screenX, otherPoint.screenY);
                    context.strokeStyle = `rgba(103, 232, 249, ${opacity})`;
                    context.lineWidth = 0.7 + connectionInfluence * 0.5;
                    context.stroke();
                });
            });

            points.forEach((point) => {
                const distanceToCursor = Math.hypot(point.screenX - cursorX, point.screenY - cursorY);
                const cursorInfluence = cursor.active
                    ? Math.max(0, 1 - distanceToCursor / cursorRadius)
                    : 0;

                context.beginPath();
                context.arc(point.screenX, point.screenY, point.radius + cursorInfluence * 1.2, 0, Math.PI * 2);
                context.fillStyle = `rgba(165, 243, 252, ${0.45 + cursorInfluence * 0.5})`;
                context.fill();
            });

            if (!reducedMotion) animationFrame = requestAnimationFrame(draw);
        };

        resizeCanvas();
        draw();
        window.addEventListener('resize', resizeCanvas);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === 'touch') return;

        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;

        cursorRef.current = {
            x: x / 100,
            y: y / 100,
            active: true,
        };

        event.currentTarget.style.setProperty('--cursor-x', `${x}%`);
        event.currentTarget.style.setProperty('--cursor-y', `${y}%`);
    };

    const resetCursor = () => {
        cursorRef.current.active = false;
        heroRef.current?.style.setProperty('--cursor-x', '50%');
        heroRef.current?.style.setProperty('--cursor-y', '50%');
    };

    return (
        <section
            ref={heroRef}
            id="Hero"
            className="hero relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 text-center text-slate-100"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetCursor}
        >
            <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />
            <div className="hero-content">
                <h2 className="text-2xl text-slate-200">Hello!</h2>
                <h1 className="hero-name mt-3 font-semibold text-white">I am {ABOUT_DATA.name}</h1>
                <p className="mt-4 max-w-2xl text-lg text-slate-300 md:text-xl">{ABOUT_DATA.intro}</p>
            </div>
        </section>       
    );
}

export default Hero