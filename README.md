# Tokenization Contract API

This repository has 2 ExpressJS API projects, one for ERC20 and the other for ERC721.

# ERC20


# ERC721
This project allows talking to all the OpenZeppelin core implementations of ERC721, as well as the Alastria implementation of ERC721 (which uses OpenZeppelin).

Before running the project, please modify `.env` to connect to the right node.  
If you have an API Key for our Besu Node, then please place it in this file.

You can start this project locally with either of the following options.

### Node
```sh
npm i
npm start
```

### Docker
```
docker build . -t ERC721API
docker run -d -p 3000:3000 ERC721API
```

Once you have started your project, you can then call any of the documented endpoints at `http://localhost:3000`