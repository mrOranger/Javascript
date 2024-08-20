#!/bin/bash

role=${ROLE}

echo "Copying production env variables ... ";

if [ "$role" == "production" ]; then
  cp .env.production .env  
elif [ "$role" == "development" ];
  echo "Copying development env variables ... ";
  cp .env.development .env  
fi

node dist/index.js