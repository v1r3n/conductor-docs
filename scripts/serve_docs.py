import subprocess
import os
from pathlib import Path

# Get the project root from the script's location
script_dir = Path(__file__).parent.resolve()
project_root = script_dir.parent

print(f"Script directory: {script_dir}")
print(f"Project root: {project_root}")

# Change to project root
os.chdir(project_root)

print(f"Working directory: {os.getcwd()}")
print(f"mkdocs.yml exists: {os.path.exists('mkdocs.yml')}")
print(f"docs folder exists: {os.path.exists('docs')}")

# Install dependencies first
print("Installing MkDocs and dependencies...")
subprocess.run(["pip", "install", "mkdocs", "mkdocs-material", "mkdocs-macros-plugin"], check=True)

# Serve the docs on port 8000
print("Starting MkDocs server on port 8000...")
subprocess.run(["mkdocs", "serve", "-a", "0.0.0.0:8000"])
