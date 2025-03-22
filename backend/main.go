package main

import (
	"FeaturePlus/database"
	"FeaturePlus/handlers"
	"FeaturePlus/models"
	"FeaturePlus/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize DB
	db, err := database.InitDB()
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema (Add Project model)
	if err := db.Migrate(&models.User{}, &models.Project{}); err != nil {
		panic("failed to migrate database")
	}

	// Create repositories
	userRepo := repositories.NewUserRepository(db.DB)
	projectRepo := repositories.NewProjectRepository(db.DB) // New project repo

	// Create handlers
	userHandler := handlers.NewUserHandler(userRepo)
	projectHandler := handlers.NewProjectHandler(projectRepo) // New project handler

	router := gin.Default()

	// CORS middleware (existing)
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	})

	// User routes (existing)
	userRoutes := router.Group("/users")
	{
		userRoutes.GET("", userHandler.GetAllUsers)
		userRoutes.GET("/:id", userHandler.GetUser)
		userRoutes.POST("", userHandler.CreateUser)
		userRoutes.PUT("/:id", userHandler.UpdateUser)
		userRoutes.DELETE("/:id", userHandler.DeleteUser)
	}

	// New Project routes
	projectRoutes := router.Group("/projects")
	{
		projectRoutes.POST("", projectHandler.CreateProject)
		projectRoutes.GET("", projectHandler.GetAllProjects)
		projectRoutes.GET("/:id", projectHandler.GetProject)
		projectRoutes.PUT("/:id", projectHandler.UpdateProject)
		projectRoutes.DELETE("/:id", projectHandler.DeleteProject)
		projectRoutes.GET("/user/:user_id", projectHandler.GetProjectsByUser)
	}

	router.Run(":8080")
}
