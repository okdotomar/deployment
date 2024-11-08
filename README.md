# My Kitter Project

## Resource

**Posts**

Attributes:

* username (string)
* meow (string)
* cat_name (string)
* cat_color (string)
* date (string)

## Schema

```sql
CREATE TABLE posts (
id INTEGER PRIMARY KEY,
username TEXT,
meow TEXT,
cat_name TEXT,
cat_color TEXT
date TEXT);
```

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve post collection       | GET    | /kitter/posts
Retrieve post member           | GET    | /kitter/posts/*\<id\>*
Create post member             | POST   | /kitter/posts
Update post member             | PUT    | /kitter/posts/*\<id\>*
Delete post member             | DELETE | /kitter/posts/*\<id\>*

## How to Access the App

navigate to http://kitter.zorran.tech/

## How to Deploy All Deployments on Kubernetes

### Prerequisites
1. Ensure you have Docker installed on your machine.
2. Ensure you have Kubernetes installed on your system.
3. Ensure you have `kubectl` installed and configured to interact with your Kubernetes cluster.

### Step-by-Step Instructions

#### Backend Deployment

1. **Build and Push Docker Image for Backend:**
   - Open a terminal (VS Code terminal will work fine).
   - Navigate to the `server` folder where the `Dockerfile` is located.
   - Run the following commands:
     ```sh
     docker login
     docker build -t yourdockerhubusername/kitter-backend-app .
     docker push yourdockerhubusername/kitter-backend-app
     ```

2. **Update Kubernetes Deployment File for Backend:**
   - Navigate to the `deployments` directory.
   - Open `backend-deployment.yaml` in a file editor.
   - Replace `sorenbybee/kitter-backend-app` with `yourdockerhubusername/kitter-backend-app` in the `image` field.
   - Save the file.

3. **Apply Kubernetes Deployment for Backend:**
   - Run the following command:
     ```sh
     kubectl apply -f backend-deployment.yaml
     ```

#### Frontend Deployment

1. **Build and Push Docker Image for Frontend:**
   - Open a terminal (VS Code terminal will work fine).
   - Navigate to the `client` folder where the `Dockerfile` is located.
   - Run the following commands:
     ```sh
     docker login
     docker build -t yourdockerhubusername/kitter-frontend-app .
     docker push yourdockerhubusername/kitter-frontend-app
     ```

2. **Update Kubernetes Deployment File for Frontend:**
   - Navigate to the `deployments` directory.
   - Open `frontend-deployment.yaml` in a file editor.
   - Replace `sorenbybee/kitter-frontend-app` with `yourdockerhubusername/kitter-frontend-app` in the `image` field.
   - Save the file.

3. **Apply Kubernetes Deployment for Frontend:**
   - Run the following command:
     ```sh
     kubectl apply -f frontend-deployment.yaml
     ```

### Deploying the Kitter Backend and Frontend Services

1. **Apply Kubernetes Service for Backend:**
   - Navigate to the `deployments` directory.
   - Run the following command:
     ```sh
     kubectl apply -f kitter-backend-service.yaml
     ```

2. **Apply Kubernetes Service for Frontend:**
   - Navigate to the `deployments` directory.
   - Run the following command:
     ```sh
     kubectl apply -f kitter-frontend-service.yaml
     ```

### Deploying Kitter Ingress

1. **Apply Kubernetes Ingress:**
   - Navigate to the `deployments` directory.
   - Run the following command:
     ```sh
     kubectl apply -f kitter-ingress.yaml
     ```

### Deploying Contour

1. **Apply Contour Configuration:**
   - Navigate to the `deployments` directory.
   - Run the following command:
     ```sh
     kubectl apply -f kitter-contour.yaml
     ```

### Verify Deployments

1. **Check the status of your deployments:**
   - Run the following command to get the status of your deployments:
     ```sh
     kubectl get deployments
     ```

2. **Check the status of your pods:**
   - Run the following command to get the status of your pods:
     ```sh
     kubectl get pods
     ```

By following these steps, you should be able to deploy both the backend and frontend applications, services, ingress, and contour on Kubernetes successfully.