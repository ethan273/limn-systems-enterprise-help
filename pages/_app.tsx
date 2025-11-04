import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Handle anchor link clicks with proper offset for fixed header
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')

      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('#')) return

      // Prevent default anchor behavior
      e.preventDefault()

      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (!targetElement) return

      // Calculate position with 80px offset for fixed header
      const headerOffset = 80
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // Smooth scroll to the calculated position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Update URL hash without jumping
      history.pushState(null, '', href)
    }

    // Add click listener to document
    document.addEventListener('click', handleAnchorClick)

    // Handle direct navigation to hash URLs on page load
    const handleHashOnLoad = () => {
      const hash = window.location.hash
      if (!hash) return

      const targetElement = document.getElementById(hash.substring(1))
      if (!targetElement) return

      // Small delay to ensure page is fully rendered
      setTimeout(() => {
        const headerOffset = 80
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }, 100)
    }

    // Handle hash on initial load
    handleHashOnLoad()

    // Handle hash changes (back/forward navigation)
    window.addEventListener('hashchange', handleHashOnLoad)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('hashchange', handleHashOnLoad)
    }
  }, [])

  return <Component {...pageProps} />
}
