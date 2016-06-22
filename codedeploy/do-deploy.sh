#!/bin/bash
cd /opt/wba-gestao-portal

echo "Realizando pull no repositório"
git pull

echo "Instalando dependencias novas"
npm install
bower install --allow-root
