#!/bin/sh
echo "Sending POST request"
curl --data "name=jee&description=jaa&quantity=12" http://localhost:8000/storageitem

