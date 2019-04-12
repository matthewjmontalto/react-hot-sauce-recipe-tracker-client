#!/bin/bash

curl "http://localhost:4741/recipes" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "recipe": {
      "name": "'"${NAME}"'",
      "date": "'"${DATE}"'",
      "rating": "'"${RATING}"'",
      "fermented": "'"${FERMENTED}"'",
      "ingredients": "'"${INGREDIENTS}"'",
      "notes": "'"${NOTES}"'"
    }
  }'

echo
