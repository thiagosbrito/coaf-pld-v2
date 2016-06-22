#!/bin/bash

echo "Copiando script para container docker"
docker cp /tmp/do-deploy.sh erp-portal:/tmp

echo "Executando script dentro do container"
docker exec erp-portal /tmp/do-deploy.sh

echo "Reiniciando serviço"
docker restart erp-portal

echo "Apagando script"
docker exec erp-portal rm /tmp/do-deploy.sh
rm /tmp/do-deploy.sh
