import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">About ODLMSlab</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              ODLMSlab is a comprehensive laboratory management system designed to streamline operations, manage
              samples, track inventory, and facilitate reporting for laboratories of all sizes.
            </p>
            <p className="text-lg mb-4">
              Our system helps laboratory professionals focus on their scientific work by automating administrative
              tasks and providing a centralized platform for all laboratory data.
            </p>
            <p className="text-lg">
              Whether you're running a small research lab or managing a large-scale testing facility, ODLMSlab provides
              the tools you need to increase efficiency and maintain compliance.
            </p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                  ✓
                </span>
                <span>Sample tracking and management</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                  ✓
                </span>
                <span>Inventory control and reagent management</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                  ✓
                </span>
                <span>Equipment maintenance scheduling</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                  ✓
                </span>
                <span>Comprehensive reporting and analytics</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                  ✓
                </span>
                <span>User management with role-based access</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                  ✓
                </span>
                <span>Compliance with industry regulations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
