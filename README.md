# onkeypress
onKeyPress platform for cooperative arcade/retro games

A future platform where you can play retro games like Snake, Simon, Tetris, Pacman and others with a little difference.
Each player inside the game has a team of 2, 4 or more people behind. To move the Snake you need 4 people, one for each direction and so on with the other games.

### Getting Started
```
npm install
npm start
```
That will start the application. Keep in mind that it uses a redis database, so you will have to install that in the first place. You can take a look at [this post](https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298)

If you don't want to use redis, you can start the application using a dummy localStorage with:
```
NODE_ENV=test npm start
```

### Testing

#### Unit

You can run all the unit tests with:
```
npm test
```


### Technologies

Node, Express, socket.io, Redis, ES6, React, Redux, Webpack, PostCSS
