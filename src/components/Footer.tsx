import {Github, Twitter, Linkedin} from 'lucide-react'
const Footer = () => {
  return (
          <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
            {[
              { icon: Github, href: 'https://github.com', name: 'GitHub' },
              { icon: Twitter, href: 'https://twitter.com', name: 'Twitter' },
              { icon: Linkedin, href: 'https://linkedin.com', name: 'LinkedIn' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-300"
              >
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-base text-gray-400">
              &copy; 2024 RocketApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer