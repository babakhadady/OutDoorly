# OutDoorly

## A tool for exploring national parks in the US


### Project Description: 

https://outdoorly.onrender.com/

OutDoorly empowers hiking enthusiasts to effortlessly discover the diverse beauty of the US wilderness. Through tailoring search results to individual preferences such as activities and location, the app encourages users to both interact with nature in a way that resonates with their interests and connect with other adventurers through sharing reviews and photos.


### Project task requirements: 
#### 3-5 minimal requirements (will definitely complete) 
- User can select preferences (activities, state) ✅
- Users can add their reviews ✅
- Users can submit photos from their visit to the park ✅
- Users can view and click into a list of national park suggestions based on their preferences ✅


#### 3-7 "standard" requirements (will most likely complete) 
- Ability to filter/sort search results ✅
- Show map location of selected park ✅
- Ability to see more detailed info (e.g. fees, hours) regarding each national park ✅
- Ability to locate parks by amenities offered ✅


#### 2-3 stretch requirements (plan to complete at least 1!) 
- Ability to locate parks by proximity ✅
- User login ✅
- Alert users if the park they are in experiences an emergency situation ❌
- Popular pictures get shown ahead of others ❌
- Find national parks that are having events in the next month ❌

### Description on how tech from Units 1-5 are used in the project

Unit 1 – HTML/CSS/JS 

JavaScript is the foundation of OutDoorly, as it enables both the back-end and the front-end. Throughout our codebase, we make use of Jsx to specify the relevant HTML tags we wish to render, such as  `<img>, <form>, <h2> and <div> `, and their attributes to create structure and emphasize content. For styling, aligning, space distribution and responsive design considerations, we applied various CSS selectors, including our own customized versions, and defined rules (e.g. setting max and min height/width to 100%, displaying Flex and the appropriate direction). 

Unit 2 – React/Redux 

All of our front-end components (e.g. PhotosModal, ReviewsTable, ResultsListing, and SearchForm) are written in React, which gives us the flexibility to pass in props and call hooks like useState (e.g. for uploading files) and useEffect (e.g. for initializing our parks details page). In addition, we imported a number of React components from Material UI to ensure a consistent look and feel. Redux is essential for persisting state across the various pages of our application, which is required to support our park querying and park details workflows as they’re dependent on data from previous screens (e.g. the search results rely on the data entered by the user in the parks form). We also access the Redux store to dispatch actions such as a “searchForParks” thunk, reducers for setting search distance and submitting user reviews, and tracking pagination.

Unit 3 – Node & Express

Our backend is built using Node and Express, which involves defining routes that map to specified endpoints and attaching corresponding logic to handle data processing and retrieval. This involves interaction with our database in MongoDB and generating responses in JSON. The asynchronous nature of Node allows for efficient handling of multiple requests concurrently, which results in a scalable and efficient backend system. 

Unit 4 – MongoDB 

Our database utilizes MongoDB, which holds data of national parks initially sourced from the US National Parks API. Since the data for each park was already in a JSON format, it was suitable for a 'Parks' collection in our MongoDB database. Using the Mongoose library, we created a schema reflecting the existing structure, then added in new fields for user reviews and photos. A script was used to populate the JSON data for parks into our collection, and additional scripts used to clean and structure the data as needed. Initially run as a local database, we migrated our data to MongoDB Atlas a few weeks before deployment. 

Unit 5 – Builds and Deployment 

Render was leveraged to deploy our backend as a web service and our front end as a static site. Render was chosen as our hosting platform of choice since it checked all our boxes of being reliable, accessible, and its ease of use. We also chose Render (as opposed to other web services) because it integrates well with github and allows us to set up automatic builds and deployments effortlessly. Building a production level full stack application necessitates the use of unit 5 technologies since users will expect it to be accessible at virtually all times.

### Description of ‘Above and Beyond’ functionality.

We went above and beyond the requirements by creating a coherent application that adheres to many UX principles (e.g. clear navigation, form validation, feedback messages, visual consistency, responsiveness), and leveraging resources from our own research to achieve our standard and stretch goals. For example:   

- [National Parks Service API](https://www.nps.gov/subjects/developer/api-documentation.htm): We used this API to populate our database with parks information and our activities and amenities list for our search form.
- S3 buckets for image storage: S3 Buckets were leveraged to allow users to quickly and easily share images of their park experience on our application. When users have visited a national park, they can upload their own images of the park which can then be viewed by other users. By allowing user uploaded images, the application can provide a more personal experience to readers allowing them to make accurate choices in which parks they would like to visit. To achieve this functionality, the front end passes the user uploaded image (as form data) to the backend using a dedicated images endpoint. The backend then uses middleware libraries such as Multer to programmatically upload the image to a dedicated bucket hosted by AWS. Upon successful upload, a URL link of the image is then returned to the front end where it can be viewed by all other users to supplement their reviews of the parks.

- Authentication with Google OAuth: The Google OAuth 2.0 API is employed to enable a secure and streamlined authentication flow. When a user logs in via Google, the OAuth 2.0 protocol facilitates the exchange of user credentials for an access token. Upon successful authentication, the backend retrieves the user's profile name and email from Google's API using the obtained access token. Subsequently, the backend creates a JSON Web Token (JWT) containing the user's profile name and email, signs it using a secret key, and sends it to the frontend as part of the response. The frontend then stores this JWT securely in the local storage. To maintain the user's session and facilitate personalized experiences, the frontend can decode the JWT, extracting the user information. By locally storing this information, the frontend avoids the need to make repeated requests to the backend for user data, thus optimizing performance and enhancing user experience.

- Places Autocomplete from Google Maps Platform: This integration was chosen as we needed to provide state codes to our distance search, while also ensuring users could efficiently find and select their desired location from suggestions, instead of typing the location of their city manually and accidentally making typos. By combining Places Autocomplete with a MUI slider for selecting their preferred distance to travel, users could easily and conveniently provide their input. 

- Proximity search and distance algorithm: This code uses an innovative geographic lookup system for finding parks by proximity. It begins by fetching the coordinates of all parks from a database and then awaits user queries containing a city and state. Upon receiving a query, it converts the location into latitude and longitude using an external geocoding API. Then, it utilizes a specialized function that employs the Haversine formula to calculate the precise distance between the user's location and each park, considering Earth's radius and expressing the result in kilometers. By identifying parks within a specified radius, sorting them by distance, fetching detailed information, and paginating the result, the code offers users a tailored list of nearby parks. This digital compass not only links nature enthusiasts with their next outdoor adventure but does so with mathematical elegance, embarking on a mini-globe-trotting journey across the surface of Earth with each query, making the process smooth and user-friendly.

### Description of Next Steps
To further improve our app, we definitely would like to implement a better user workflow, where users would be able to view their liked parks, posted reviews and images and also be able to view parks based off of aggregated reviews. Additionally, we would implement a way for users to be able to login from any page and have state be maintained after login completion.

- Enhancing Search Functionality: Implementation of more sophisticated search algorithms that allow users to filter parks based on different criteria like rating, popularity, or seasonal attractions. Integration with weather APIs could provide real-time weather forecasts for parks 

- Social Integration: Users could share reviews or favorite parks with friends or social media directly from the app. Additionally, creating community forums or groups for enthusiasts to connect and plan outings together.  

- Real-time Updates: Implementing real-time notifications for events like park closures, emergency alerts, or community gatherings 

### List of contributions
- Has: My contributions to the codebase included the setup and implementation of MongoDB connections, User authentication/authorization, and pagination. I also helped with the system design of the backend, determining the flow and structure of the backend system.  

- Syed: My contributions to the code included creating the MongoDB schema, scraping data from the National Parks API. I then created Controllers, Endpoints, DAOS, and implementing Pagination and Sorting for the 'Searching by Distance' and 'User Reviews' features. In preparation for deployment, I migrated the database from a local server to MongoDB Atlas.
  
- Tendy: My contributions include building the initial skeleton of the frontend and the initial Redux implementation and assisting with expanding and refining both. I handled integrations with the backend, such as retrieving park details from our own database, pagination, sorting, Google OAuth and user sessions with local storage. I also integrated the National Parks Service API (external) to populate the list of amenities and activities for our search form, as well as set up Places Autocomplete from the Google Maps Platform to complement our distance search.
  
- Michael: My contributions to the project ranged from testing, development, to deployment. I am responsible for creating many of the endpoints utilized by the front end such as parks, amenities, and images. I also utilized the National Parks API to populate our database and created a lot of documentation for our endpoints. In addition I was also responsible for the building and deployment of the application to Render.
  
- Babak: I designed both modals for reviews and photos, and I also implemented the functionality of reviews integrated into users. Additionally, I was responsible for the integration of both the photos and reviews endpoints which includes posting, deleting and retrieving photos and reviews. I worked on the homepage search flow and separating the two different search styles. I also integrated openstreetmap on park details, aggregated the reviews and worked on the entire applications general styling.



### Rough sketch prototypes of key tasks

![Screen 1](https://github.com/tendy-s/parksAndRec/assets/51394856/4079ae30-f59a-4fab-b860-57dcd5365dc0)
![Screen 2](https://github.com/tendy-s/parksAndRec/assets/51394856/f599f704-d102-4ce7-aed1-4e425adec820)
![Screen 3](https://github.com/tendy-s/parksAndRec/assets/51394856/c03f64d3-defb-4d9a-b05c-e908c82b6205)
![Screen 4](https://github.com/tendy-s/parksAndRec/assets/51394856/bb06d2fb-1a9e-468a-a296-161b858a44f0)
![Screen 5](https://github.com/tendy-s/parksAndRec/assets/51394856/167c36fd-05cc-4776-8972-2e75b561c99a)

