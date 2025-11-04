#!/bin/bash

# Script to flatten Nextra structure by moving index.mdx files up one level
# This removes the nested "Overview > Overview" structure

PAGES_DIR="/Users/eko3/limn-systems-enterprise-help/pages"

# List of sections to flatten (only contain index.mdx)
SECTIONS=(
  "admin"
  "architecture"
  "automation"
  "crm"
  "dashboards"
  "design"
  "documents"
  "faq"
  "finance"
  "global-features"
  "integrations"
  "marketing"
  "orders"
  "partners"
  "portals"
  "production"
  "products"
  "rbac"
  "shipping"
  "tasks"
  "troubleshooting"
)

echo "🚀 Flattening documentation structure..."
echo ""

for section in "${SECTIONS[@]}"; do
  FOLDER="$PAGES_DIR/$section"
  INDEX_FILE="$FOLDER/index.mdx"
  META_FILE="$FOLDER/_meta.json"
  NEW_FILE="$PAGES_DIR/$section.mdx"

  if [ -f "$INDEX_FILE" ]; then
    echo "✅ Processing: $section"

    # Move index.mdx up one level
    mv "$INDEX_FILE" "$NEW_FILE"
    echo "   Moved: $section/index.mdx → $section.mdx"

    # Remove _meta.json if it exists
    if [ -f "$META_FILE" ]; then
      rm "$META_FILE"
      echo "   Removed: $section/_meta.json"
    fi

    # Remove the now-empty folder
    if [ -d "$FOLDER" ]; then
      rmdir "$FOLDER" 2>/dev/null && echo "   Removed: $section/ folder" || echo "   Kept: $section/ folder (not empty)"
    fi

    echo ""
  else
    echo "⚠️  Skipping: $section (no index.mdx found)"
    echo ""
  fi
done

echo "✨ Done! Structure flattened."
echo ""
echo "Result:"
echo "  ❌ Before: Dashboards > Overview > Overview > Common Features"
echo "  ✅ After:  Dashboards > Common Features, Executive Dashboard, etc."
