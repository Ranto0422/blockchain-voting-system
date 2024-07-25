<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 267ce34 (update)
async function main() {
  const Voting = await ethers.getContractFactory("Voting");

  // Start deployment, returning a promise that resolves to a contract object
  const Voting_ = await Voting.deploy(["Ratnesh Kumar", "Rajnish", "Chandan", "Pushpendra"], 90);
  console.log("Contract address:", Voting_.address);


}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });
<<<<<<< HEAD
=======
async function main() {
  const Voting = await ethers.getContractFactory("Voting");

  // Start deployment, returning a promise that resolves to a contract object
  const Voting_ = await Voting.deploy(["Ratnesh Kumar", "Rajnish", "Chandan", "Pushpendra"], 90);
  console.log("Contract address:", Voting_.address);


}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });
>>>>>>> 1cdef9560d9b11d3a086b4f27d87ba1a74e5fc14
=======
>>>>>>> parent of 267ce34 (update)
