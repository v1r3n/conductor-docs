import subprocess
import os

# Change to docs parent directory
os.chdir("/vercel/share/v0-project")

# Serve the docs on port 8000
print("Starting MkDocs server...")
subprocess.run(["python", "-m", "mkdocs", "serve", "-a", "0.0.0.0:8000"])
