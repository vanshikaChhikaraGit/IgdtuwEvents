package db

import (
	"fmt"
	"os"
	"log"

	"github.com/go-pg/migrations/v8"
	"github.com/go-pg/pg/v10"
)

func StartDB()(*pg.DB, error){
	var(
		opts *pg.Options
		err error
	)
	// Use the DATABASE_URL from the environment variable for both dev and prod
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("DATABASE_URL is not set")
		return nil, fmt.Errorf("DATABASE_URL is not set")
	}

	// Parse the DATABASE_URL to get connection options
	opts, err = pg.ParseURL(dbURL)
	if err != nil {
		log.Printf("couldn't connect to database: %v", err)
		return nil, err
	}

	db:=pg.Connect(opts)
	collection:=migrations.NewCollection()
	err = collection.DiscoverSQLMigrations("migrations")
	if err!=nil{
		fmt.Print("error found in migration files")
		return nil,err
	}
	_,_,err = collection.Run(db,"init")
	if err != nil {
		fmt.Print("couldn't run the migrations")
        return nil, err
    }
	oldVersion,newVersion,err:= collection.Run(db,"up")

	if oldVersion!=newVersion{
		log.Printf("migrated from version %d to %d\n", oldVersion, newVersion)
	}else {
			log.Printf("version is %d\n", oldVersion)
		}
	 //return the db connection
	 return db, err
	

}