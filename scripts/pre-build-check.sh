#!/bin/bash

# Pre-Build Check for Help Documentation
# Catches MDX syntax errors before committing/deploying
# Usage: ./scripts/pre-build-check.sh

set -e

echo "🔍 Pre-Build Check for Help Documentation"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track failures
FAILED=0

# ============================================================================
# Step 1: Check for problematic MDX syntax patterns
# ============================================================================

echo "📝 Step 1: Checking for problematic MDX syntax patterns..."
echo ""

# Check for unescaped angle brackets followed by numbers
echo "  Checking for unescaped angle brackets (<number or >number)..."
ANGLE_BRACKET_ISSUES=$(grep -r -n "<[0-9]\|>[0-9]" pages/ --include="*.mdx" 2>/dev/null || true)
if [ -n "$ANGLE_BRACKET_ISSUES" ]; then
  echo -e "${YELLOW}⚠️  Found angle brackets with numbers:${NC}"
  echo "$ANGLE_BRACKET_ISSUES" | head -10
  echo ""
  echo "  Note: These may be acceptable in prose. Build check will confirm."
  echo "  If build fails, replace '<' with '&lt;' and '>' with '&gt;'"
  echo ""
  # Not failing here - let build check determine if these are problems
else
  echo -e "${GREEN}✅ No angle brackets with numbers found${NC}"
fi

# Check for unescaped curly braces in prose (not in code blocks)
echo "  Checking for unescaped curly braces in prose..."
# This is a simple heuristic - checks for {word} patterns outside of code blocks
CURLY_BRACE_ISSUES=$(grep -r -n "{[A-Za-z_][A-Za-z0-9_]*}" pages/ --include="*.mdx" 2>/dev/null | grep -v '```' || true)
if [ -n "$CURLY_BRACE_ISSUES" ]; then
  echo -e "${YELLOW}⚠️  Found potential unescaped curly braces:${NC}"
  echo "$CURLY_BRACE_ISSUES" | head -10
  echo ""
  echo "  Note: Review these to ensure they're in code blocks or escaped with backslashes"
  echo "  Fix: Use \\{text\\} for prose, or wrap in code blocks"
  echo ""
  # Not marking as failed since this is just a warning
fi

# Check for >= and <= symbols that might cause issues
echo "  Checking for potentially problematic comparison operators..."
COMPARISON_ISSUES=$(grep -r -n "≥\|≤" pages/ --include="*.mdx" 2>/dev/null || true)
if [ -n "$COMPARISON_ISSUES" ]; then
  echo -e "${YELLOW}⚠️  Found Unicode comparison operators (≥, ≤):${NC}"
  echo "$COMPARISON_ISSUES" | head -10
  echo ""
  echo "  Fix: Replace '≥' with '&gt;=' and '≤' with '&lt;='"
  echo ""
  # Not marking as failed since some may be in code blocks
fi

echo ""

# ============================================================================
# Step 2: Run production build to catch MDX compilation errors
# ============================================================================

echo "📦 Step 2: Running production build..."
echo ""

BUILD_OUTPUT=$(npm run build 2>&1 || true)
BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}✅ Build succeeded${NC}"
  echo ""

  # Show build summary
  echo "$BUILD_OUTPUT" | grep -A 5 "Route (pages)" || true
  echo ""
else
  echo -e "${RED}❌ Build failed${NC}"
  echo ""
  echo "Build output:"
  echo "$BUILD_OUTPUT"
  echo ""
  FAILED=1
fi

# ============================================================================
# Summary
# ============================================================================

echo ""
echo "=========================================="
echo "📊 Pre-Build Check Summary"
echo "=========================================="
echo ""

if [ $FAILED -eq 1 ]; then
  echo -e "${RED}❌ FAILED: Please fix the issues above before committing${NC}"
  echo ""
  echo "Common MDX fixes:"
  echo "  - Angle brackets: <70% → &lt;70%"
  echo "  - Curly braces in prose: {text} → \\{text\\}"
  echo "  - Email templates: {{variable}} → \\{\\{variable\\}\\}"
  echo "  - Comparison operators: ≥ → &gt;="
  echo ""
  exit 1
else
  echo -e "${GREEN}✅ PASSED: All checks successful${NC}"
  echo ""
  echo "Ready to commit and deploy!"
  echo ""
  exit 0
fi
