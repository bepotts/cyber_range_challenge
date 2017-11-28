Cyber Range Challenge 
========================

## Design Discussion

##### Production Design 

For normal usage, the core functionality of the application is provided by Express.js. I chose Express because the project
didn't require anything more than a webserver with basic routing, and Express does this and it's easy to test. 

Aside from the standard routes (like error pages and root route), the only route is /locations/{zipcode}. The app 
accepts the zipcode parameter (and checks for the scale query), and builds a URL to Yahoo's Weather API. This URL 
generation/retrieval of weather data was by far the most time consuming part of my project. 

Yahoo's documentation is (in my opinion) poor; and leads readers through many corridors that leads to dead ends. 
Some parts said I needed to use OAuth2 and so I prepared for OAuth validation; but then some parts said I just needed
to use a Node package and then I spent a bit of time looking for the appropriate package, but then found nothing. I 
then found out I could just use a URL and make a simple request, and then went that route. 

The URL generation part is bit "hacky". There isn't some explicit note saying "hey do this", but there's a test console
that Yahoo allowed developers to try their queries on, and those queries generated URLs. I essentially tested which 
query I needed, then deconstructed that URL and plugged it into a function. That function accepted a zipcode, which would
then dynamically generate the URL. Like I said, it's "hacky", but hey, it works. 

I also do the celsius conversion manually. I searched for a way to get the queries returned in celsius but didn't 
turn up anything. 

Once I generate a URL, I then make a request that returns a Promise. I then handle that Promise, build a JSON file
containing the temperature and scale, and serve that JSON. 

Each request follows this cycle. 

##### Testing Design 

The testing is pretty standard: some HTTP request testing, unit testing, and JSON validation. I also generated 
line coverage. 

##### Tools used

* Babel
* Flow (static type checker. I love type checkers even though I realize not everyone does)
* Webpack
* ESLint

##### Test Libraries

* Mocha
* Supertest
* Istanbul

### Extra Notes

* If you run "npm run lint", you'll still see some lint errors in server.js. I couldn't figure out how to handle
some of them, and flat out disagreed with other concerns it raised, so I intentionally left those lint errors unhandled.
