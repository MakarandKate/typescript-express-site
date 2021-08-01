date=$(date '+%y%m%d.%H.%M.%S')

rm src/views/partials/version.hbs

touch src/views/partials/version.hbs
echo "$date" > src/views/partials/version.hbs
