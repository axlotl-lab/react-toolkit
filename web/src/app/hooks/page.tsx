import { CodeBlock } from "@/components/code-block";

export default function Hooks() {
  return (
    <main className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
      <div className="mt-6">
        <div className="font-mono bg-slate-200 text-black py-2 pl-2">
          useIdle()
        </div>

        <div className="text-sm mt-4">
          <p>
            The `useIdle` hook is a custom React hook that detects user inactivity. It returns a boolean value indicating whether the user has been idle for the specified amount of time.
          </p>
          <p>
            Works with any valid React content.
          </p>
        </div>

        <div className="font-semibold mt-4">Props</div>

        <table className="min-w-full bg-gray-800 border border-gray-700 text-sm mt-2">
          <thead>
            <tr className="bg-gray-900">
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Prop</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Type</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Required</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700 text-gray-300">secondsToIdle</td>
              <td className="py-2 px-4 border-b border-gray-700 text-gray-300">number</td>
              <td className="py-2 px-4 border-b border-gray-700 text-gray-300">Yes</td>
              <td className="py-2 px-4 border-b border-gray-700 text-gray-300">The number of seconds of inactivity before considering the user idle</td>
            </tr>
          </tbody>
        </table>

        <div className="font-semibold mt-4">Return Value</div>

        <table className="min-w-full bg-gray-800 border border-gray-700 text-sm mt-2">
          <thead>
            <tr className="bg-gray-900">
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Type</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700 text-gray-300">boolean</td>
              <td className="py-2 px-4 border-b border-gray-700 text-gray-300">true if the user is idle, false if the user is active</td>
            </tr>
          </tbody>
        </table>

        <div className="font-semibold mt-4">Usage</div>

        <CodeBlock>
          {
            `import { useIdle } from "@axlotl-lab/react-toolkit/hooks";

function MyComponent() {
  const isIdle = useIdle(300); // 5 minutes

  return (
    <div>
      {isIdle ? "User is idle" : "User is active"}
    </div>
  );
}`}
        </CodeBlock>

      </div>

    </main>
  );
}
