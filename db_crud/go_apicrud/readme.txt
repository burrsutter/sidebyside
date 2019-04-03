go version go1.10.3 darwin/amd64

go get github.com/gorilla/mux
go get github.com/jinzhu/gorm
go get github.com/lib/pq

go build main.go

./main

localhost:8080
