<p align="center">
	<img width="500" height="200" src="https://github.com/ankit-pn/nits-bscm-blockchain/blob/main/image/photo_2022-10-22_09-28-14.jpg" />
	</p>

<p align="center">
	<h2 align="left"> BSCM - BlockChain Based SupplyChain Management System </h2>
</p>

---

## Functionalities
- [ ]  User SignUp functioanlity with the help of ethereum blockchain. 
- [ ]  All account are registerd in ethereum blockchain ( in goerli testnet), and there 
  authentication is handled with the help of smart contract which is deployed in blockchain itself.
- [ ]  Users can add required items with itemName with their respective quantity
- [ ]  User can connect its account to ethereum blockchain network with the help of connect account button (via Metamask Wallet)
- [ ]  If item is available then it automatically go into pending list, where user can approve the   transaction. 
- [ ]  User can link their account to ethereum blockchain with the help of the metamask.
- [ ]  User can see transaction history of account.

------------

## Tech Stack
- [ ]  ReactJS
- [ ]  Blockchain - Ethereum
- [ ]  Web3.JS
- [ ]  MetaMask
- [ ]  Truffle
- [ ]  Replit
- [ ]  NodeJS
- [ ]  Goerli TestNet
- [ ]  Infura.io
- [ ]  Solidity
- [ ]  Polygon

-------------

## How this DApp works ?
- [ ] All Authentication is handled by ETH by our deployed Smart Contracts written in Solidity
- [ ] Protection against Unauthenticated users is implemented on all routes 
#### ENTRIES
- [ ] User Can Add Entries on this page.
- [ ] This Data is stored on MongoDB cluster
- [ ] All such entries will be checked automatically against the vendor data every 10 seconds
- [ ] Duplicate items are not allowed and thus quantities are stacked upon finding conflicting item names
#### Pending
- [ ] This Data is again Stored on MongoDB cluster
- [ ] All automated transactions , that satisfied criteria are displayed here
- [ ] Transactions can be approved by clicking "Approve" button
- [ ] A Metamask popup will notify user of all details , post confirmation money is sent to vendor

#### History
- [ ] This data is also stored on MongoDB cluster
- [ ] It contains record of all transactions approved by user



## Instructions to use DApp 
- [ ] Install MetaMask extension (used as wallet and Goerli TestNet is used)
- [ ] Register yourself.
- [ ] Login into your account to automate your requests.
#### Entries
- [ ] This page will display data about the requests you have made to marketplace.
- [ ] Upon finding appropriate vendor , the entry from this list will be automatically moved to Pending
- [ ] Add Entries to automate your transactions
- [ ] Currently the only item supported is "xxx" with quantity available by vendor as 20 , lesser request than 20 will be automated 
- [ ] You can [add](https://vendor-backend-nits.herokuapp.com/addVendorItems) items sold by vendors with parameters {'itemID' : "your item id" , "quantity" : quantity sold by vendor , "price" : price of each item} 
- [ ] All items added by above mentioned API will be automated.
#### Transactions
- [ ] You can Approve of Pending transactions from here
- [ ] We will (via Metamask) ensure to supply appropriate funds to the proper vendor
- [ ] You can also view Transaction History here

## Deploys
- [ ] *Replit* -> [View](https://boilerplate.sonkusaremayur0.repl.co/)



## Contributors
* [Ankit Kumar](https://github.com/ankit-pn)
* [Mayur Sonkusare](https://github.com/mayur-ud)
* [Shubham Armo](https://github.com/space584)

---
## Video Link
For the video demonstration, [click here](###)
---

