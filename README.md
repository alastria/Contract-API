# Tokenization Contract API

This repository has 2 ExpressJS API projects, one for ERC20 and the other for ERC721.

# ERC20
This project allows talking to all the OpenZeppelin core implentations of ERC20, as well as the Alastria implementation of ERC20 (which uses OpenZeppelin). The Alastria implementation simply allows to construct an ERC20 token, and exposes the mint and burn methods, but only allows the account that deployed the contract to execute them.

Before running the project, please modify `.env` to connect to the right node.  
If you have an API Key for our Besu Node, then please place it in this file.

You can start this project locally with either of the following options.

### Node
```sh
npm i
npm start
```

### Docker
```sh
docker build . -t ERC20API
docker run -d -p 3000:3000 ERC20API
```

# ERC721
This project allows talking to all the OpenZeppelin core implementations of ERC721, as well as the Alastria implementation of ERC721 (which uses OpenZeppelin). The Alastria implementation simply allows to construct an ERC721 token, and exposes the mint and burn methods, but only allows the account that deployed the contract to execute them.

Before running the project, please modify `.env` to connect to the right node.  
If you have an API Key for our Besu Node, then please place it in this file.

You can start this project locally with either of the following options.

### Node
```sh
npm i
npm start
```

### Docker
```sh
docker build . -t ERC721API
docker run -d -p 3000:3000 ERC721API
```

Once you have started your project, you can then call any of the documented endpoints at `http://localhost:3000`

The documentation for all of the endpoints in this project is included in [/ERC721/docs](https://github.com/alastria/Contract-API/blob/main/ERC721/docs)