# FloridaShidduch
Dating site for singles that live or grew up in Florida, from the Yiddish for Matchmaker.

### A very rough version of the site is live. If you'd like to contribute by testing and submitting issues, please visit: [Florida Jewish Match](https://jewishmatch.azurewebsites.net/) (please bear with the slowness, it's on the azure free plan so time-to-first-byte is _sloooow_).

## A matchmaking site?
In the Jewish Orthdox world, dating happens a little differently. If we're frank, the orthdox Jew doesn't look for a spouse. There's a whole network that helps with that. Critical to that network is the matchmaker, the _shodchan_. In the world of the matchmaker, information is everything. Knowning who is single and the vitals on this person are how matches are made. 

Several major cities have databases that keep a current list of singles. Florida does not. Our site hopes to remedy that.

## Stack
The front is a clean JS implementation using Backbone.Marionette. Backbone.Stickit is used for 2-way binding and Backbone.Validation for model validation. Teh backend is .NET C#, basically a Web API v2 implementation. Authentication is done using .NET Identity 2.0. 

## Phase I
The first phase is about getting the app out to the singles and populating the database. That phase is ready to go live.

## Phase II
The sexond phase consists of creating an administration site for the matchmakers. This will consists of a database search feature, a message feature to contact singles, the ability to edit certain single information and a backend service that will suggest matches to registered matchmakers. 
