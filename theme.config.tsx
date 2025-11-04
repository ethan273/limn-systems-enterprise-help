import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Image from 'next/image'

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* CORRECT: Use Light_Mode.png for dark theme, Dark_Mode.png for light theme */}
      {/* Dark background needs light logo, light background needs dark logo */}
      {/* See /Users/eko3/limn-systems-enterprise/.claude/patterns/ui-patterns.md */}
      <Image
        src="/images/Limn_Logo_Light_Mode.png"
        alt="Limn Systems"
        width={120}
        height={40}
        className="nx-hidden dark:nx-block"
      />
      <Image
        src="/images/Limn_Logo_Dark_Mode.png"
        alt="Limn Systems"
        width={120}
        height={40}
        className="dark:nx-hidden"
      />
      <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>
        Help Center
      </span>
    </div>
  ),
  project: {
    link: 'https://limn.us.com',
  },
  docsRepositoryBase: 'https://github.com/limn-systems/help',
  footer: {
    text: `© ${new Date().getFullYear()} Limn®. All rights reserved.`,
  },
  useNextSeoProps: () => ({
    titleTemplate: '%s – Limn Systems Help Center'
  }),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Limn Systems Help Center" />
      <meta property="og:description" content="Complete documentation for Limn Systems Enterprise" />
      <link rel="icon" href="/images/Limn_Logo_Light_Mode.png" />
      <style>{`
        /* Fix anchor link scroll offset for fixed header */
        html {
          scroll-padding-top: 80px;
        }

        /* Ensure headings have proper scroll margin */
        h1, h2, h3, h4, h5, h6 {
          scroll-margin-top: 80px;
        }

        /* Smooth scrolling for anchor links */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          function handleAnchorClick(e) {
            var target = e.target;
            while (target && target.tagName !== 'A') {
              target = target.parentElement;
            }

            if (!target || !target.href) return;

            var href = target.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();
            e.stopPropagation();

            var targetId = href.substring(1);
            var targetElement = document.getElementById(targetId);

            if (!targetElement) return;

            var headerOffset = 80;
            var elementPosition = targetElement.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            history.pushState(null, '', href);
          }

          function handleHashOnLoad() {
            var hash = window.location.hash;
            if (!hash) return;

            var targetElement = document.getElementById(hash.substring(1));
            if (!targetElement) return;

            setTimeout(function() {
              var headerOffset = 80;
              var elementPosition = targetElement.getBoundingClientRect().top;
              var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }, 100);
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
              document.addEventListener('click', handleAnchorClick, true);
              window.addEventListener('hashchange', handleHashOnLoad);
              handleHashOnLoad();
            });
          } else {
            document.addEventListener('click', handleAnchorClick, true);
            window.addEventListener('hashchange', handleHashOnLoad);
            handleHashOnLoad();
          }
        })();
      `}} />
    </>
  ),
  primaryHue: 210,
  darkMode: true,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
  editLink: {
    component: null,
  },
  feedback: {
    content: null,
  }
}

export default config
