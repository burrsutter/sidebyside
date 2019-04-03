package main

import (
	"fmt"
	"net/http"
	"os"
//	"time"
)

var cnt int = 0

func main() {		
	http.HandleFunc("/", HelloHandler)
	http.HandleFunc("/healthz", HealthzHandler)
    
	fmt.Println("Listening on localhost:8080")
	http.ListenAndServe(":8080", nil)
}

func HelloHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	hostname, err := os.Hostname()
	if err != nil {
		fmt.Println("unable to get hostname")
	}
    cnt++
	fmt.Fprintf(w, "Go Hello on %s:%d\n", hostname, cnt)
}

func HealthzHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "OK")
}	
