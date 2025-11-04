# Pre-Build Check Script

## Purpose

This script validates MDX documentation files before committing and deploying to prevent syntax errors that could cause build failures in production.

## Usage

```bash
# Run from project root
./scripts/pre-build-check.sh
```

## What It Checks

### 1. MDX Syntax Patterns (Warnings)

The script scans for potentially problematic MDX patterns:

- **Angle brackets with numbers** (`<70%`, `>90%`) - May need escaping as `&lt;` or `&gt;`
- **Curly braces in prose** (`{variable}`) - May need escaping as `\{variable\}`
- **Unicode comparison operators** (`≥`, `≤`) - May need converting to `&gt;=` or `&lt;=`

**Note**: These are warnings, not failures. If they're in acceptable contexts (like prose or lists), they won't cause build errors.

### 2. Production Build (Pass/Fail)

The script runs `npm run build` to verify:

- All MDX files compile successfully
- No MDX parser errors
- All pages generate correctly

**This is the definitive check.** If the build succeeds, the check passes.

## Exit Codes

- `0` - All checks passed, ready to deploy
- `1` - Build failed, must fix errors before committing

## Integration

### Pre-Commit Hook (Recommended)

Add to `.husky/pre-commit` or create a simple git hook:

```bash
#!/bin/bash
# .git/hooks/pre-commit
./scripts/pre-build-check.sh
```

### GitHub Actions

Add to `.github/workflows/build-check.yml`:

```yaml
name: Build Check
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: ./scripts/pre-build-check.sh
```

### Manual Workflow

Run before committing:

```bash
# 1. Make changes to MDX files
# 2. Run pre-build check
./scripts/pre-build-check.sh

# 3. If passed, commit
git add .
git commit -m "docs: Update documentation"
git push
```

## Common MDX Fixes

When the script finds issues:

### Angle Brackets

```markdown
# Before
- Red: <70% on-time

# After
- Red: &lt;70% on-time
```

### Curly Braces (in prose)

```markdown
# Before
Format: {BASE_SKU}-{MATERIAL_CODE}

# After
Format: \{BASE_SKU\}-\{MATERIAL_CODE\}
```

### Email Merge Tags

```markdown
# Before
Hello {{first_name}}

# After
Hello \{\{first_name\}\}
```

### Comparison Operators

```markdown
# Before
Target ≥90%

# After
Target &gt;=90%
```

## Why This Script Exists

Previously, MDX syntax errors weren't caught until deployment to Vercel, causing production build failures. This script ensures all issues are found and fixed locally before committing.

## Troubleshooting

**Script fails but build succeeds locally?**
- Ensure you're using the same Node.js version as production
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**False positives in pattern checks?**
- Pattern warnings are informational only
- If the build succeeds, these patterns are acceptable
- The build check is the definitive pass/fail criteria

**Script takes too long?**
- Build time is ~30-45 seconds for full documentation site
- This is expected for production build verification
- Consider running only on staged files for pre-commit hooks
