package main

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
	"net/http"
	"time"
)


type Fruit struct {
	gorm.Model
	Name string
}

var db *gorm.DB
var err error;

func main() {
	start := time.Now()
	db, err = gorm.Open("postgres", "sslmode=disable host=postgres port=5432 user=admin dbname=postgresdb password=adminS3cret")
	if err != nil {
		panic(err)
	}
	//defer db.Close()

	db.AutoMigrate(&Fruit{})

	db.Delete(&Fruit{})
	db.Create(&Fruit{Name: "Cherry"})
	db.Create(&Fruit{Name: "Apple"})
	db.Create(&Fruit{Name: "Banana"})


	router := mux.NewRouter()

	router.Path("/").Handler(http.FileServer(http.Dir(".")))


	router.HandleFunc("/api/fruits", ListFruit).Methods("GET")
	router.HandleFunc("/api/fruits", CreateFruit).Methods("POST")
	router.HandleFunc("/api/fruits/{id:[0-9]+}", EditFruit).Methods("PUT")
	router.HandleFunc("/api/fruits/{id:[0-9]+}", DeleteFruit).Methods("DELETE")

	log.Println("Server starting. Start time:")
	log.Println(time.Since(start))
	log.Fatal(http.ListenAndServe(":8080", router))
}

func ListFruit(w http.ResponseWriter, r *http.Request) {
	var fruit []Fruit
	db.Find(&fruit)
	json.NewEncoder(w).Encode(fruit)
}

func CreateFruit(w http.ResponseWriter, r *http.Request) {
	var fruit Fruit
	json.NewDecoder(r.Body).Decode(&fruit)
	db.Create(&fruit)
	w.WriteHeader(204)
}

func EditFruit(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	fruitId := vars["id"]

	var fruit Fruit
	db.Where("id = ?", fruitId).First(&fruit)
	json.NewDecoder(r.Body).Decode(&fruit)

	db.Save(&fruit)
}

func DeleteFruit(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	fruitId := vars["id"]
	db.Where("id = ?", fruitId).Delete(&Fruit{})
}
