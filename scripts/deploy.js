
async function deployVoting(position, candidates, duration) {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(candidates, duration);
  await voting.deployed();
  console.log(`${position} Voting contract deployed at: ${voting.address}`);
}

async function main() {
  // Define positions and their candidates
  const elections = {
    President: ["Alice", "Bob", "Charlie"],
    VicePresident: ["Dave", "Eve"],
    Secretary: ["Frank", "Grace"]
  };

  const duration = 90; // in minutes

  for (const [position, candidates] of Object.entries(elections)) {
    await deployVoting(position, candidates, duration);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
