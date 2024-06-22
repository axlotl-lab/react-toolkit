export const CodeBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full mt-6">
      <div className="bg-gray-900 text-white p-4 rounded-md">
        <div className="overflow-x-auto">
          <pre id="code" className="text-gray-300 py-2">
            <code>
              {children}
            </code>
          </pre>
        </div>
      </div>
    </div>

  )
}