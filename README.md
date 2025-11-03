# Limn Systems Help Center

**Domain:** help.limn.us.com
**Framework:** Next.js 13 + Nextra 3
**Status:** Production Ready

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Structure

- **22 Main Categories** covering all Limn Systems features
- **Comprehensive Documentation** with detailed guides and tutorials
- **Nextra 3** for stable, production-ready documentation
- **Limn Branding** with light/dark mode logos

## Content Organization

### Main Categories
1. **Getting Started** - Introduction, authentication, user roles, navigation
2. **User Guides** - Role-specific guides (admin, designer, customer, factory, QC, sales, finance, production)
3. **Dashboards** - Overview of all 10 specialized dashboards
4. **Tasks** - Task management features
5. **CRM** - Customer relationship management
6. **Design** - Design management tools
7. **Products** - Product catalog and materials
8. **Orders** - Order processing and tracking
9. **Production** - Manufacturing management
10. **Shipping** - Logistics and tracking
11. **Finance** - Invoicing and payments
12. **Documents** - Document management
13. **Marketing** - Email campaigns and marketing tools
14. **Portals** - Customer, designer, factory, and QC portals
15. **Partners** - Partner management
16. **RBAC** - Role-based access control
17. **Automation** - Workflow automation
18. **Integrations** - Third-party integrations
19. **Admin** - System administration
20. **Architecture** - System architecture
21. **Troubleshooting** - Common issues and solutions
22. **FAQ** - Frequently asked questions

## Deployment

Deployed on Vercel at help.limn.us.com

### Vercel Configuration
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## Development

- Homepage: http://localhost:3000
- Edit content in `pages/` directory
- Navigation configured in `_meta.json` files
- Theme settings in `theme.config.tsx`

### Adding New Pages

1. Create an MDX file in the appropriate `pages/` subdirectory
2. Add entry to corresponding `_meta.json` file
3. Write content using MDX format
4. Preview locally before committing

### MDX Format

Pages use MDX (Markdown + JSX) format:

```mdx
# Page Title

Regular markdown content...

## Section

- List items
- More items

### Subsection

Code blocks with syntax highlighting:

\`\`\`typescript
const example = "code";
\`\`\`
```

## Theme Customization

Edit `theme.config.tsx` to customize:
- Site logo and title
- Navigation links
- Footer content
- Search functionality
- Theme colors

## Project Structure

```
limn-systems-enterprise-help/
├── pages/                    # Documentation pages
│   ├── getting-started/      # Getting started guides
│   ├── user-guides/          # Role-specific guides
│   ├── dashboards/           # Dashboard documentation
│   ├── tasks/                # Task management
│   ├── crm/                  # CRM features
│   ├── design/               # Design tools
│   ├── products/             # Product catalog
│   ├── orders/               # Order management
│   ├── production/           # Manufacturing
│   ├── shipping/             # Logistics
│   ├── finance/              # Financial tools
│   ├── documents/            # Document management
│   ├── marketing/            # Marketing features
│   ├── portals/              # External portals
│   ├── partners/             # Partner management
│   ├── rbac/                 # Access control
│   ├── automation/           # Workflow automation
│   ├── integrations/         # Third-party integrations
│   ├── admin/                # Administration
│   ├── architecture/         # System architecture
│   ├── troubleshooting/      # Help and support
│   ├── faq/                  # FAQ
│   └── _meta.json            # Root navigation
├── public/                   # Static assets
│   └── images/               # Logos and images
├── theme.config.tsx          # Nextra theme configuration
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## Contributing

When adding new documentation:

1. Follow the existing structure and naming conventions
2. Use clear, concise language
3. Include code examples where applicable
4. Add screenshots for UI features (place in `public/images/`)
5. Update `_meta.json` files for navigation
6. Test locally before committing

## Support

For help with the documentation site:
- **Internal:** #docs Slack channel
- **Technical Issues:** dev-support@limn.us.com
- **Content Questions:** documentation@limn.us.com

## License

Copyright © 2025 Limn Systems. All rights reserved.
