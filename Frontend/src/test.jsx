export default function App() {
  return (
    <div className="bg-brand text-text min-h-screen flex flex-col items-center justify-center transition-colors duration-500">
      <h1 className="text-4xl font-bold text-brand-primary">Hello Tailwind + OKLCH 🎨</h1>
      <p className="mt-2 text-text-muted">
        This should auto-switch with system light/dark mode 🌗
      </p>
      <button className="mt-6 px-6 py-2 bg-brand-secondary text-brand-light rounded-lg border border-brand hover:text-brand-highlight transition">
        Test Button
      </button>
    </div>
  );
}
