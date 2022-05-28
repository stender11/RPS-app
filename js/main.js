document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const userChoice = document.querySelector("#choice").value;
  const res = await fetch(`/api?choice=${userChoice}`);
  const data = await res.json();

  console.log(data);
  document.querySelector("#rpsResult").textContent = `Winner: ${data.winner}`;
  document.querySelector("#computerChoice").textContent = `Computer Choice: ${data.computerChoice}`
}
