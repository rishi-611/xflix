mongo xflix --eval "db.dropDatabase()"
mongoimport --db xflix --collection videos --file data/videos.json