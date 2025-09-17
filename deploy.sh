#!/bin/bash

# Configuration
PROJECT_ID="your-project-id"  # Replace with your Google Cloud Project ID
SERVICE_NAME="matcanban-app"
REGION="asia-southeast1"  # Singapore region
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🚀 Deploying to Google Cloud Run..."

# Set the project
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "📋 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build and push the Docker image
echo "🔨 Building and pushing Docker image..."
gcloud builds submit --tag $IMAGE_NAME

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --max-instances 10 \
  --port 8080

echo "✅ Deployment complete!"
echo "🌐 Your app is available at:"
gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)'
