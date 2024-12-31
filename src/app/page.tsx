import SuperButtons from "./SuperButtons";

export default async function Home() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-bold  text-gray-900">Hello, World!</h1>
      <p className="text-lg  text-gray-700">
        This is a Next.js app with Tailwind CSS.
      </p>
      <SuperButtons />
    </div>
  );
}
