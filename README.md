
# Live Preview

This project consists of two primary components necessary for the live preview functionality:

-   `live-preview-middleware`: The backend service that handles data processing.
-   `front-end`: The user interface for live interaction and display.

## Getting Started

To set up and run the project locally, follow these steps for each component:

### Live Preview Middleware Setup

1.  **Environment Setup**: Copy the `.env.example` file to create a `.env` file. Adjust the variables to match your local environment settings.
    
2.  **Install Dependencies**:
        
    `npm install` 
    
3.  **Start the Middleware Service**:
   
    `node middleware.js` 
    
### Front-end Setup

1.  **Navigate to the Front-end Directory**:
    
    `cd front-end` 
    
2.  **Environment Setup**: Ensure a `.env` file is set up in the `front-end` directory as per the provided `.env.example`.
    
3.  **Install Dependencies**:
        
    `npm install` 
    
4.  **Start the Front-end Application**:
        
    `npm run start` 
    

## Content Type Creation

Create a content type named `simple_live_preview` that includes the following fields:

-   `title`: A text field for the title of the preview content.
-   `description`: A text area for a detailed description of the content.

Ensure that your system is configured to utilize this content type appropriately within both the middleware and front-end components.