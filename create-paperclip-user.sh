#!/usr/bin/env bash
set -euo pipefail

# 1) Create the user with its own home directory
sudo adduser --home /home/company-ai --shell /bin/bash company-ai

# 2) Ensure ownership is correct
sudo chown -R company-ai:company-ai /home/company-ai

# 3) Lock down the home dir so only company-ai (and root) can access it
sudo chmod 700 /home/company-ai

# (Optional but recommended) Ensure the default umask is private for new files
# This makes newly-created files 600 and dirs 700 by default (unless apps override).
if ! sudo grep -q '^umask 077' /home/company-ai/.profile 2>/dev/null; then
  echo 'umask 077' | sudo tee -a /home/company-ai/.profile >/dev/null
  sudo chown company-ai:company-ai /home/company-ai/.profile
fi

# (Optional) Verify
sudo ls -ld /home/company-ai
sudo -u company-ai -H bash -lc 'pwd; umask; touch testfile; ls -l testfile'