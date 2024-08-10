let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3);
    if (computerChoice === 0) {
        return 'rock';
    } else if (computerChoice === 1) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

function playRound(humanSelection, computerSelection) {
    let resultMessage = `You chose: ${humanSelection}. Computer chose: ${computerSelection}. `;

    if (humanSelection === computerSelection) {
        resultMessage += 'Round Tied';
    } else if (
        (humanSelection === 'rock' && computerSelection === 'scissors') ||
        (humanSelection === 'paper' && computerSelection === 'rock') ||
        (humanSelection === 'scissors' && computerSelection === 'paper')
    ) {
        humanScore++;
        resultMessage += `You Win! ${humanSelection.charAt(0).toUpperCase() + humanSelection.slice(1)} beats ${computerSelection}`;
    } else {
        computerScore++;
        resultMessage += `You Lose! ${computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)} beats ${humanSelection}`;
    }
    resultMessage += `<br>Your Score: ${humanScore} - Computer Score: ${computerScore}`;
    return resultMessage;
}

function playGame(humanSelection) {
    const computerSelection = getComputerChoice();
    const result = playRound(humanSelection, computerSelection);

    document.getElementById("result").innerHTML = result;
    document.getElementById("result").classList.remove("hidden");

    if (humanScore === 5) {
        document.getElementById("result").innerHTML += `<br>🎉 Congratulations! You won the game with a score of 5. Final Score: You ${humanScore} - Computer ${computerScore}`;
        document.getElementById("gameForm").style.display = 'none';
    } else if (computerScore === 5) {
        document.getElementById("result").innerHTML += `<br>😢 You lost the game. The computer reached a score of 5. Final Score: You ${humanScore} - Computer ${computerScore}`;
        document.getElementById("gameForm").style.display = 'none';
    }
}

document.getElementById("gameForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const humanSelection = form.choice.value;
    playGame(humanSelection);
});
