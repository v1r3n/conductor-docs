import subprocess
import os

# Change to docs parent directory
os.chdir("/vercel/share/v0-project")

print(f"Working directory: {os.getcwd()}")
print(f"mkdocs.yml exists: {os.path.exists('mkdocs.yml')}")

# Install dependencies first
print("Installing MkDocs and dependencies...")
subprocess.run(["pip", "install", "mkdocs", "mkdocs-material", "mkdocs-macros-plugin"], check=True)

# Serve the docs on port 8000
print("Starting MkDocs server on port 8000...")
subprocess.run(["mkdocs", "serve", "-a", "0.0.0.0:8000"])
