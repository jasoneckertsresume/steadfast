#!/bin/bash

# 1. Add all changes
git add .

# 2. Commit with a timestamp
git commit -m "Update: $(date)"

# 3. Push to GitHub
git push origin main

echo "✅ Changes synced to GitHub! The deployment workflow will now run automatically."
