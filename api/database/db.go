package database

import (
	"log"
	"os"
	"proevilz/blog-api/models"

	"github.com/joho/godotenv"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	DB_PORT := os.Getenv("DB_PORT")
	DB_USER := os.Getenv("DB_USER")
	DB_PASSWORD := os.Getenv("DB_PASS")
	DB_TABLE := os.Getenv("DB_TABLE")
	DB_HOST := os.Getenv("DB_HOST")

	dsn := "host=" +
		DB_HOST +
		" user=" + DB_USER +
		" password=" + DB_PASSWORD +
		" dbname=" + DB_TABLE +
		" port=" + DB_PORT +
		" sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Println("failed to connect database")
	}
	db.AutoMigrate(&models.User{}, &models.Post{}, &models.Reactions{}, &models.Settings{})

	DB = db
}
