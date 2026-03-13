import os
import subprocess

print("Current working directory:", os.getcwd())
print("Directory contents:", os.listdir("."))
print("Looking for mkdocs.yml...")

# Try to find mkdocs.yml
for root, dirs, files in os.walk("."):
    if "mkdocs.yml" in files:
        print(f"Found mkdocs.yml at: {os.path.join(root, 'mkdocs.yml')}")
        break
