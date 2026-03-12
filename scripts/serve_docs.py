import subprocess
import os

os.chdir("/vercel/share/v0-project")

# Install dependencies
subprocess.run(["pip", "install", "mkdocs", "mkdocs-material", "mkdocs-macros-plugin"], check=True)

# Serve the docs
subprocess.run(["mkdocs", "serve", "-a", "0.0.0.0:8000"], check=True)
