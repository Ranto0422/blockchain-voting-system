import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { VOTING_ABI, VOTING_CONTRACTS } from "../Constant/constant";

function Connected() {
  const [selectedPosition, setSelectedPosition] = useState("President");
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [number, setNumber] = useState('');
  const [canVote, setCanVote] = useState(true);
  const [account, setAccount] = useState(null);
  const totalVotes = candidates.reduce((sum, c) => sum + Number(c.voteCount), 0);


  useEffect(() => {
    if (window.ethereum && selectedPosition) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = VOTING_CONTRACTS[selectedPosition];
      const votingContract = new ethers.Contract(contractAddress, VOTING_ABI, provider);
      setContract(votingContract);
      provider.send("eth_requestAccounts", []).then(accounts => setAccount(accounts[0]));
    }
  }, [selectedPosition]);

  useEffect(() => {
    if (contract) {
      contract.getAllVotesOfCandiates().then(setCandidates);
      contract.getRemainingTime().then(time => setRemainingTime(time.toNumber()));
      checkCanVote();
    }
    // eslint-disable-next-line
  }, [contract]);

  async function vote() {
    if (!contract) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    try {
      const tx = await contractWithSigner.vote(number);
      await tx.wait();
      contract.getAllVotesOfCandiates().then(setCandidates);
      checkCanVote();
      alert("Vote cast successfully!");
    } catch (err) {
      alert(err.reason || "Voting failed.");
    }
  }

  async function checkCanVote() {
    if (!contract || !account) return;
    const voted = await contract.voters(account);
    setCanVote(!voted);
  }

  function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  function handlePositionChange(e) {
    setSelectedPosition(e.target.value);
    setNumber('');
    setCandidates([]);
    setRemainingTime(0);
    setCanVote(true);
  }

  return (
    <div>
      <h1>Blockchain Voting System</h1>
      <label>
        Select Position:{" "}
        <select value={selectedPosition} onChange={handlePositionChange}>
          {Object.keys(VOTING_CONTRACTS).map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
      </label>
      <div>
        <h2>{selectedPosition} Candidates</h2>
        <ul>
          {candidates.map((c, idx) => (
            <li key={idx}>{idx}: {c.name} - Votes: {c.voteCount.toString()}</li>
          ))}
        </ul>
        <div><strong>Total Votes: {totalVotes}</strong></div>
        <div>Remaining Time: {remainingTime} seconds</div>
      </div>
      <div style={{ marginTop: 20 }}>
        <label>
          Candidate Index:{" "}
          <input
            type="number"
            value={number}
            onChange={handleNumberChange}
            min="0"
            max={candidates.length - 1}
            disabled={!canVote}
          />
        </label>
        <button onClick={vote} disabled={!canVote || number === ""}>
          Vote
        </button>
        {!canVote && <div style={{ color: "red" }}>You have already voted for this position.</div>}
      </div>
    </div>
  );
}

export default Connected;