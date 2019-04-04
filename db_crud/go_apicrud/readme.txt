go version go1.10.3 darwin/amd64

go get github.com/gorilla/mux
go get github.com/jinzhu/gorm
go get github.com/lib/pq

go build main.go

./main

localhost:8080

switch connection string to
db, err = gorm.Open("postgres", "sslmode=disable host=postgres port=5432 user=admin dbname=postgresdb password=adminS3cret")

env GOOS=linux GOARCH=amd64 go build main.go

./dockerbuild.sh
