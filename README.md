# GamerWWH

Gamer What Where and How.

This is the second project under General Assembly, making a simple app deployment focusing on CRUD and Heroku.

The idea for this app comes from an issue me and my friends have on our own "adventures" in a space exploration game. We would explore different planets and need somewhere to store our discovery so we can come back to it later. So I thought of having some sort of game databse where anyone can store simple guides/tips/tricks because lets face it, we have TONS of full guides out there.

Basically this app should encompass the 7 aspects of REST which are;

1. app.get('/') => Rendering the pages in views
2. app.get('/new') => Rendering a form to submit information
3. app.post('/info') => Storing the information
4. app.get('/info/:id') => Retrieve the information stored through id
5. app.get('/info/:id/edit') => Return the information through id to edit
6. app.put('/info/:id')=> Update the information into database
7. app.delete('/info/:id')=> delete the information

###########################################################################################################################

Technologies/Modules Applied;

1. NodeJS
2. ExpressJS
3. Mongoose
4. Heroku
5. Express-session
6. Method-override
7. EJS
8. Dotenv
9. Multer
10. Fs
11. Path
12. Bcrypt

###########################################################################################################################

Website Functionalities + Approach To Formation

1. Index
   I wanted to have the base ready before I start anything, kinda like breaking ground. So I started with the index page to have something tangible. I made minimal index page and routed it.

2. Schema for games

3. EJS files for index, details, and forms for adding/editing games + delete info.
   Most of the time I have was spend here. Due to some routing issues, I was stuck here for quite a long time.

4. Cloud upload through multer
   This is something new that I discovered. Instead of linking image, I can upload it instead.

5. Adding Sessions > creating user, login and logout

6. Bootstrap on app + partials
   This is a little tricky for me, I cant get some aspects of it to work. I'm especially disatisfied with the index page layout, I want the image to be in grids but the bootstrap I tried wouldnt take. I suppose its because I'm printing the list through a loop. Will look more into this.

###########################################################################################################################

Missing features/Unsolved Issues

1. Text box formating. I want to be able to post it more article like, but input='text' removes spacing and makes everything single lined.

2. Layout of index page, I want to make it a grid.

3. Work more on the authorisation flow

4. Be able to add a search bar to find game

5. Categorise the index into games

6. More on beautification of site
