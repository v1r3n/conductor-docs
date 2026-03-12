#!/bin/bash
cd /vercel/share/v0-project
pip install -q mkdocs mkdocs-material mkdocs-macros-plugin
mkdocs serve -a 0.0.0.0:8000
