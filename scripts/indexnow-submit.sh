#!/usr/bin/env bash
# Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver pick these up;
# Bing's index feeds ChatGPT search). Run AFTER a deploy so the key
# file at https://marketcenterrealty.com/<key>.txt is live.
#
# Usage:
#   ./scripts/indexnow-submit.sh                     # submits the default set
#   ./scripts/indexnow-submit.sh https://... https://...   # submits given URLs
set -euo pipefail

HOST="marketcenterrealty.com"
KEY="5a6325ac0a73f7381db6a6b768c94d7b"

if [ "$#" -gt 0 ]; then
  URLS=("$@")
else
  URLS=(
    "https://marketcenterrealty.com/"
    "https://marketcenterrealty.com/best-metro-detroit-suburbs"
    "https://marketcenterrealty.com/best-school-districts-metro-detroit"
    "https://marketcenterrealty.com/troy-vs-rochester-hills"
    "https://marketcenterrealty.com/birmingham-vs-bloomfield-hills"
    "https://marketcenterrealty.com/sterling-heights-vs-warren"
    "https://marketcenterrealty.com/how-much-home-metro-detroit-budget"
    "https://marketcenterrealty.com/first-time-home-buyer-programs-michigan"
    "https://marketcenterrealty.com/troy-real-estate-agent"
    "https://marketcenterrealty.com/rochester-hills-real-estate-agent"
    "https://marketcenterrealty.com/birmingham-real-estate-agent"
    "https://marketcenterrealty.com/bloomfield-hills-real-estate-agent"
    "https://marketcenterrealty.com/west-bloomfield-real-estate-agent"
    "https://marketcenterrealty.com/sterling-heights-real-estate-agent"
    "https://marketcenterrealty.com/warren-real-estate-agent"
  )
fi

URL_LIST=$(printf '"%s",' "${URLS[@]}")
URL_LIST="[${URL_LIST%,}]"

curl -s -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEY.txt\",\"urlList\":$URL_LIST}" \
  -w "\nHTTP %{http_code}\n"
