const About = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About</h1>
        
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Frontend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• React 18 with TypeScript</li>
                <li>• Vite for fast development</li>
                <li>• Apollo Client for GraphQL</li>
                <li>• Tailwind CSS for styling</li>
                <li>• React Router for navigation</li>
                <li>• Jest & Testing Library</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Backend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Node.js with Express</li>
                <li>• Apollo Server for GraphQL</li>
                <li>• PostgreSQL database</li>
                <li>• Prisma ORM</li>
                <li>• Redis for caching</li>
                <li>• Jest & Supertest</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Modern React 18 with concurrent features
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Type-safe GraphQL API with Apollo
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Relational database with Prisma ORM
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Redis caching for performance
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Comprehensive testing setup
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              Modern development tooling
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About 