        // DOM elements
        const userScore_span = document.getElementById("user-score");
        const computerScore_span = document.getElementById("computer-score");
        const result_div = document.getElementById("result");
        const rock_button = document.getElementById("rock");
        const paper_button = document.getElementById("paper");
        const scissors_button = document.getElementById("scissors");
        const reset_button = document.getElementById("reset");
        const userChoice_span = document.getElementById("user-choice");
        const computerChoice_span = document.getElementById("computer-choice");
        const historyList_div = document.getElementById("history-list");
        
        // Game variables
        let userScore = 0;
        let computerScore = 0;
        
        // Choice symbols
        const choiceSymbols = {
            'rock': '👊',
            'paper': '✋',
            'scissors': '✌️'
        };
        
        // Get computer choice
        function getComputerChoice() {
            const choices = ['rock', 'paper', 'scissors'];
            const randomNumber = Math.floor(Math.random() * 3);
            return choices[randomNumber];
        }
        
        // Add animation to selection displays
        function animateSelection(element, symbol) {
            // First make it disappear
            element.style.transform = "scale(0)";
            element.style.opacity = "0";
            
            // Set a timeout to change the content and bring it back
            setTimeout(() => {
                element.textContent = symbol;
                element.style.transform = "scale(1)";
                element.style.opacity = "1";
            }, 300);
        }
        
        // Update display
        function updateDisplay(userChoice, computerChoice, result) {
            // Animate the selection displays
            animateSelection(userChoice_span, choiceSymbols[userChoice]);
            animateSelection(computerChoice_span, choiceSymbols[computerChoice]);
            
            // Update score display with animation
            userScore_span.textContent = userScore;
            userScore_span.style.animation = "pulse 0.5s ease";
            setTimeout(() => {
                userScore_span.style.animation = "";
            }, 500);
            
            computerScore_span.textContent = computerScore;
            computerScore_span.style.animation = "pulse 0.5s ease";
            setTimeout(() => {
                computerScore_span.style.animation = "";
            }, 500);
            
            // Update history
            const timestamp = new Date().toLocaleTimeString();
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            
            // Add a result class for color coding
            if (result === 'You win') {
                historyItem.style.borderLeft = "4px solid #4ade80";
            } else if (result === 'You lose') {
                historyItem.style.borderLeft = "4px solid #f87171";
            } else {
                historyItem.style.borderLeft = "4px solid #fbbf24";
            }
            
            historyItem.textContent = `${timestamp}: ${choiceSymbols[userChoice]} vs ${choiceSymbols[computerChoice]} - ${result}`;
            historyList_div.prepend(historyItem);
            
            // Limit history items
            if (historyList_div.children.length > 10) {
                historyList_div.removeChild(historyList_div.lastChild);
            }
        }
        
        // Game result handler
        function win(userChoice, computerChoice) {
            userScore++;
            result_div.textContent = `You win! ${userChoice} beats ${computerChoice}`;
            result_div.className = 'result win';
            updateDisplay(userChoice, computerChoice, 'You win');
        }
        
        function lose(userChoice, computerChoice) {
            computerScore++;
            result_div.textContent = `You lose! ${computerChoice} beats ${userChoice}`;
            result_div.className = 'result lose';
            updateDisplay(userChoice, computerChoice, 'You lose');
        }
        
        function draw(userChoice, computerChoice) {
            result_div.textContent = "It's a draw!";
            result_div.className = 'result draw';
            updateDisplay(userChoice, computerChoice, 'Draw');
        }
        
        // Game logic
        function game(userChoice) {
            // Add a small delay to simulate "thinking"
            userChoice_span.textContent = "?";
            computerChoice_span.textContent = "?";
            
            setTimeout(() => {
                const computerChoice = getComputerChoice();
                
                switch(userChoice + computerChoice) {
                    case "rockscissors":
                    case "paperrock":
                    case "scissorspaper":
                        win(userChoice, computerChoice);
                        break;
                    case "rockpaper":
                    case "paperscissors":
                    case "scissorsrock":
                        lose(userChoice, computerChoice);
                        break;
                    case "rockrock":
                    case "paperpaper":
                    case "scissorsscissors":
                        draw(userChoice, computerChoice);
                        break;
                }
            }, 500);
        }
        
        // Reset game
        function resetGame() {
            userScore = 0;
            computerScore = 0;
            userScore_span.textContent = userScore;
            computerScore_span.textContent = computerScore;
            result_div.textContent = "";
            result_div.className = "result";
            userChoice_span.textContent = "-";
            computerChoice_span.textContent = "-";
            historyList_div.innerHTML = "";
            
            // Add a reset animation to the buttons
            const choices = document.querySelectorAll('.choice');
            choices.forEach(choice => {
                choice.style.animation = "shake 0.5s ease";
                setTimeout(() => {
                    choice.style.animation = choice.id === "rock" ? "float 5s ease-in-out infinite" : 
                                            choice.id === "paper" ? "float 5s ease-in-out 1s infinite" : 
                                            "float 5s ease-in-out 2s infinite";
                }, 500);
            });
        }
        
        // Event listeners
        function main() {
            rock_button.addEventListener('click', () => {
                rock_button.style.animation = "pulse 0.3s ease";
                setTimeout(() => {
                    rock_button.style.animation = "float 5s ease-in-out infinite";
                }, 300);
                game("rock");
            });
            
            paper_button.addEventListener('click', () => {
                paper_button.style.animation = "pulse 0.3s ease";
                setTimeout(() => {
                    paper_button.style.animation = "float 5s ease-in-out 1s infinite";
                }, 300);
                game("paper");
            });
            
            scissors_button.addEventListener('click', () => {
                scissors_button.style.animation = "pulse 0.3s ease";
                setTimeout(() => {
                    scissors_button.style.animation = "float 5s ease-in-out 2s infinite";
                }, 300);
                game("scissors");
            });
            
            reset_button.addEventListener('click', resetGame);
        }
        
        main();