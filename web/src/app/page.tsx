import { CodeBlock } from "@/components/code-block";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          @axlotl-lab/react-toolkit
        </p>
      </div>

      <div className="mt-6">
        <div className="font-mono bg-slate-200 text-black py-2 pl-2">{"<Repeater />"}</div>

        <div className="text-sm mt-4">
          <p>
            The Repeater component allows you to repeat any content a specified number of times.
            To use the Repeater component, simply wrap the content you want to repeat and specify the number of repetitions using the `count` prop.
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
              <td className="py-2 px-4 border-b border-gray-700 text-gray-300">count</td>
              <td className="py-2 px-4 border-b border-gray-700 text-gray-300">number</td>
              <td className="py-2 px-4 border-b border-gray-700 text-gray-300">Yes</td>
              <td className="py-2 px-4 border-b border-gray-700 text-gray-300">The number of times the content will be repeated</td>
            </tr>
          </tbody>
        </table>

        <CodeBlock>
          {
            `import { Repeater } from "@axlotl-lab/react-toolkit/repeater";

<Repeater count={5}>
  <p>Winter is coming</p>
</Repeater>`}
        </CodeBlock>

        <div className="font-semibold mt-4">Example</div>

      </div>

    </main>
  );
}
