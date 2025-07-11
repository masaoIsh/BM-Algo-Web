// Fair Assignment System - Bogomolnaia-Moulin Algorithm Implementation

class FairAssignmentSystem {
    constructor() {
        this.items = [];
        this.participants = [];
        this.rankings = {};
        this.probabilities = {};
        this.finalAssignments = {};
        this.currentStep = 'setup';
        
        this.initializeEventListeners();
        this.updateStatus();
    }

    initializeEventListeners() {
        // Start session button
        document.getElementById('start-session-btn').addEventListener('click', () => {
            this.startSession();
        });

        // Add participant button
        document.getElementById('add-participant-btn').addEventListener('click', () => {
            this.addParticipant();
        });

        // Make assignments button
        document.getElementById('make-assignments-btn').addEventListener('click', () => {
            this.makeFinalAssignments();
        });

        // New session button
        document.getElementById('new-session-btn').addEventListener('click', () => {
            this.resetSession();
        });

        // Help button (may not exist if UI simplified)
        const helpBtn = document.getElementById('help-btn');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => this.showInstructions());
        }

        // Modal close button (may not exist)
        const modalClose = document.querySelector('.close');
        if (modalClose) {
            modalClose.addEventListener('click', () => this.hideInstructions());
        }

        // Close modal when clicking outside
        if (document.getElementById('instructions-modal')) {
            window.addEventListener('click', (event) => {
                const modal = document.getElementById('instructions-modal');
                if (event.target === modal) {
                    this.hideInstructions();
                }
            });
        }

        // Enter key for participant input
        document.getElementById('participant-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addParticipant();
            }
        });
    }

    startSession() {
        const itemsInput = document.getElementById('items-input').value.trim();
        if (!itemsInput) {
            alert('Please enter items to assign.');
            return;
        }

        this.items = itemsInput.split(',').map(item => item.trim()).filter(item => item);
        if (this.items.length < 2) {
            alert('Please enter at least 2 items to assign.');
            return;
        }

        this.currentStep = 'participants';
        this.showSection('participants-section');
        this.updateStatus();
    }

    addParticipant() {
        const nameInput = document.getElementById('participant-name');
        const name = nameInput.value.trim();
        
        if (!name) {
            alert('Please enter a participant name.');
            return;
        }

        if (this.participants.includes(name)) {
            alert('A participant with this name already exists.');
            return;
        }

        this.participants.push(name);
        this.rankings[name] = null;
        nameInput.value = '';
        
        this.updateParticipantsList();
        this.updateRankingsSection();
        this.updateStatus();

        if (this.participants.length === 1) {
            // first participant added – move to rankings step
            this.currentStep = 'rankings';
            this.updateStatus();
        }
    }

    removeParticipant(name) {
        this.participants = this.participants.filter(p => p !== name);
        delete this.rankings[name];
        
        this.updateParticipantsList();
        this.updateRankingsSection();
        this.updateStatus();
    }

    updateParticipantsList() {
        const participantsList = document.getElementById('participants-list');
        participantsList.innerHTML = '';

        this.participants.forEach(name => {
            const participantItem = document.createElement('div');
            participantItem.className = 'participant-item';
            participantItem.innerHTML = `
                <span class="participant-name">${name}</span>
                <button class="remove-participant" onclick="fairAssignmentSystem.removeParticipant('${name}')">
                    <i class="fas fa-times"></i> Remove
                </button>
            `;
            participantsList.appendChild(participantItem);
        });
    }

    confirmRanking(participant) {
        const inputEl = document.querySelector(`input[data-participant='${participant}']`);
        if (!inputEl) return;
        const ranking = inputEl.value;
        const rankingArray = ranking.split(',').map(r => r.trim()).filter(r => r);

        if (this.items.length === 0) {
            alert('Please start an assignment session and define the items before submitting rankings.');
            return;
        }
        if (rankingArray.length !== this.items.length) {
            alert(`Please provide exactly ${this.items.length} rankings.`);
            return;
        }
        const numbers = rankingArray.map(r => parseInt(r));
        const validNumbers = numbers.filter(n => !isNaN(n) && n >= 1 && n <= this.items.length);
        if (validNumbers.length !== this.items.length) {
            alert(`Please provide valid numbers from 1 to ${this.items.length}.`);
            return;
        }
        const uniqueNumbers = [...new Set(validNumbers)];
        if (uniqueNumbers.length !== this.items.length) {
            alert('Please provide unique rankings for each item.');
            return;
        }

        // Save ranking and lock input
        this.rankings[participant] = ranking;
        inputEl.disabled = true;
        const btnEl = document.querySelector(`button[data-confirm='${participant}']`);
        if (btnEl) btnEl.disabled = true;

        this.updateRankingsSection();
        this.updateStatus();
        this.checkAllRankingsComplete();
    }

    updateRankingsSection() {
        if (this.participants.length === 0) {
            this.hideSection('rankings-section');
            return;
        }

        this.showSection('rankings-section');
        const rankingsContainer = document.getElementById('rankings-container');
        rankingsContainer.innerHTML = '';

        this.participants.forEach(name => {
            const rankingItem = document.createElement('div');
            rankingItem.className = 'ranking-item';
            const itemsList = this.items.map((item, index) => `${index + 1}. ${item}`).join('<br>');
            const confirmed = this.rankings[name] !== null;
            rankingItem.innerHTML = `
                <h3>${name}</h3>
                <p><strong>Items to rank:</strong></p>
                <p>${itemsList}</p>
                <div class="ranking-input">
                    <input type="text" 
                           placeholder="e.g., 3,1,2" 
                           data-participant="${name}"
                           value="${this.rankings[name] || ''}"
                           ${confirmed ? 'disabled' : ''}>
                    <button data-confirm="${name}" onclick="fairAssignmentSystem.confirmRanking('${name}')" ${confirmed ? 'disabled' : ''}>Confirm</button>
                </div>
            `;
            rankingsContainer.appendChild(rankingItem);
        });
    }

    checkAllRankingsComplete() {
        const allComplete = this.participants.every(p => this.rankings[p] !== null);
        if (allComplete && this.currentStep !== 'results' && this.currentStep !== 'assignments') {
            this.runAlgorithm();
        }
    }

    runAlgorithm() {
        if (this.participants.length === 0) {
            alert('Please add at least one participant.');
            return;
        }

        if (!this.participants.every(p => this.rankings[p] !== null)) {
            alert('Please complete all rankings before running the algorithm.');
            return;
        }

        this.probabilities = this.bogomolnaiaMoulinAlgorithm();
        this.displayResults();
        this.currentStep = 'results';
        this.showSection('results-section');
        this.updateStatus();
    }

    bogomolnaiaMoulinAlgorithm() {
        // Correct implementation of the Probabilistic Serial (Bogomolnaia-Moulin) algorithm
        // Reference: Bogomolnaia & Moulin, 2001

        // Initialise remaining capacities for each item (all equal to 1)
        const remainingCapacity = {};
        this.items.forEach(item => {
            remainingCapacity[item] = 1;
        });

        // Initialise allocation probabilities for every participant / item pair to 0
        const probabilities = {};
        this.participants.forEach(p => {
            probabilities[p] = {};
            this.items.forEach(item => {
                probabilities[p][item] = 0;
            });
        });

        // Convert rankings (e.g. "3,1,2") to explicit preference lists of item names
        const preferences = {};
        this.participants.forEach(p => {
            const rankingNumbers = this.rankings[p].split(',').map(r => parseInt(r.trim(), 10));
            preferences[p] = rankingNumbers.map(num => this.items[num - 1]);
        });

        // Pointer to the current position in each participant's preference list
        const prefPointer = {};
        this.participants.forEach(p => {
            prefPointer[p] = 0;
        });

        // Continue eating until every item is fully consumed
        while (Object.keys(remainingCapacity).length > 0) {
            // Determine which item each participant is currently eating
            const currentItem = {};
            this.participants.forEach(p => {
                // Move pointer forward until it points at an item that still has capacity
                while (
                    prefPointer[p] < preferences[p].length &&
                    !(preferences[p][prefPointer[p]] in remainingCapacity)
                ) {
                    prefPointer[p] += 1;
                }
                if (prefPointer[p] < preferences[p].length) {
                    currentItem[p] = preferences[p][prefPointer[p]];
                }
            });

            // Aggregate total consumption rate for each item
            const ratePerItem = {};
            Object.values(currentItem).forEach(item => {
                ratePerItem[item] = (ratePerItem[item] || 0) + 1; // all participants eat at unit speed
            });

            // Compute the minimum time until some item is exhausted
            let minTime = Infinity;
            Object.entries(ratePerItem).forEach(([item, rate]) => {
                const timeToExhaust = remainingCapacity[item] / rate;
                if (timeToExhaust < minTime) {
                    minTime = timeToExhaust;
                }
            });

            if (minTime === Infinity) break; // safety guard (should not happen)

            // Allocate fractions and decrease remaining capacities
            this.participants.forEach(p => {
                const item = currentItem[p];
                if (!item) return; // participant already satisfied

                probabilities[p][item] += minTime; // rate is 1
                remainingCapacity[item] -= minTime;

                // Remove an item once its capacity is (numerically) zero
                if (remainingCapacity[item] <= 1e-10) {
                    delete remainingCapacity[item];
                }
            });
        }

        return probabilities;
    }

    displayResults() {
        const resultsContainer = document.getElementById('probability-results');
        resultsContainer.innerHTML = '';

        this.participants.forEach(participant => {
            const participantResult = document.createElement('div');
            participantResult.className = 'participant-result';
            
            let resultHTML = `<h3>${participant}</h3>`;
            
            this.items.forEach(item => {
                const probability = this.probabilities[participant][item];
                const percentage = (probability * 100).toFixed(1);
                
                resultHTML += `
                    <div class="probability-item">
                        <span>${item}</span>
                        <div class="probability-bar">
                            <div class="probability-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span>${percentage}%</span>
                    </div>
                `;
            });
            
            participantResult.innerHTML = resultHTML;
            resultsContainer.appendChild(participantResult);
        });
    }

    makeFinalAssignments() {
        this.finalAssignments = this.randomizedRounding();
        this.displayFinalAssignments();
        this.currentStep = 'assignments';
        this.showSection('assignments-section');
        this.updateStatus();
    }

    randomizedRounding() {
        // Produce a discrete assignment using the fractional probabilities.
        // The method repeatedly samples participants for each item proportionally
        // to their probabilities, ensuring every participant receives at most one item.
        const assignments = {};
        const assignedParticipants = new Set();

        // Iterate through items in a random order to avoid bias
        const itemsShuffled = [...this.items].sort(() => Math.random() - 0.5);

        itemsShuffled.forEach(item => {
            // Build the probability mass for available participants on this item
            const cumulative = [];
            let totalMass = 0;
            this.participants.forEach(p => {
                if (assignedParticipants.has(p)) return; // already assigned
                const prob = this.probabilities[p][item];
                if (prob > 0) {
                    totalMass += prob;
                    cumulative.push({ participant: p, threshold: totalMass });
                }
            });

            let chosenParticipant = null;
            if (totalMass > 0) {
                const r = Math.random() * totalMass;
                chosenParticipant = cumulative.find(c => r <= c.threshold).participant;
            } else {
                // If nobody has positive probability (edge-case), pick any unassigned participant
                const available = this.participants.filter(p => !assignedParticipants.has(p));
                if (available.length > 0) {
                    chosenParticipant = available[Math.floor(Math.random() * available.length)];
                }
            }

            if (chosenParticipant) {
                assignments[chosenParticipant] = item;
                assignedParticipants.add(chosenParticipant);
            }
        });

        return assignments;
    }

    displayFinalAssignments() {
        const assignmentsContainer = document.getElementById('final-assignments');
        assignmentsContainer.innerHTML = '';

        Object.entries(this.finalAssignments).forEach(([participant, item]) => {
            const assignmentItem = document.createElement('div');
            assignmentItem.className = 'assignment-item';
            assignmentItem.innerHTML = `
                <i class="fas fa-user"></i> ${participant} → <i class="fas fa-arrow-right"></i> ${item}
            `;
            assignmentsContainer.appendChild(assignmentItem);
        });
    }

    resetSession() {
        this.items = [];
        this.participants = [];
        this.rankings = {};
        this.probabilities = {};
        this.finalAssignments = {};
        this.currentStep = 'setup';

        // Reset UI
        this.hideSection('participants-section');
        this.hideSection('rankings-section');
        this.hideSection('results-section');
        this.hideSection('assignments-section');
        
        document.getElementById('items-input').value = '';
        document.getElementById('participant-name').value = '';
        
        // Clear HTML containers
        document.getElementById('participants-list').innerHTML = '';
        document.getElementById('rankings-container').innerHTML = '';
        const probRes = document.getElementById('probability-results');
        if (probRes) probRes.innerHTML = '';
        const finalAssign = document.getElementById('final-assignments');
        if (finalAssign) finalAssign.innerHTML = '';
        
        // Ensure status section is hidden until session restarts
        this.hideSection('status-section');
    }

    updateStatus() {
        const statusContent = document.getElementById('status-content');
        let statusHTML = '';

        switch (this.currentStep) {
            case 'setup':
                statusHTML = `
                    <p><strong>Current Status:</strong> Ready to start</p>
                    <p>Enter items to assign and click "Start Assignment Session" to begin.</p>
                `;
                break;
            case 'participants':
                statusHTML = `
                    <p><strong>Current Status:</strong> Adding participants</p>
                    <p>Items to assign: ${this.items.join(', ')}</p>
                    <p>Participants added: ${this.participants.length}</p>
                    <p>Add all participants who will be ranking the items.</p>
                `;
                break;
            case 'rankings':
                const completedRankings = this.participants.filter(p => this.rankings[p] !== null).length;
                statusHTML = `
                    <p><strong>Current Status:</strong> Collecting rankings</p>
                    <p>Items to assign: ${this.items.join(', ')}</p>
                    <p>Participants: ${this.participants.join(', ')}</p>
                    <p>Rankings completed: ${completedRankings}/${this.participants.length}</p>
                    <p>Complete all rankings to run the algorithm.</p>
                `;
                break;
            case 'results':
                statusHTML = `
                    <p><strong>Current Status:</strong> Algorithm completed</p>
                    <p>Items to assign: ${this.items.join(', ')}</p>
                    <p>Participants: ${this.participants.join(', ')}</p>
                    <p>Fair probability distributions calculated using Bogomolnaia-Moulin algorithm.</p>
                    <p>Click "Make Final Assignments" to get randomized results.</p>
                `;
                break;
            case 'assignments':
                statusHTML = `
                    <p><strong>Current Status:</strong> Assignments complete</p>
                    <p>Items to assign: ${this.items.join(', ')}</p>
                    <p>Participants: ${this.participants.join(', ')}</p>
                    <p>Final assignments have been made using randomized rounding.</p>
                    <p>Click "Start New Session" to begin a new assignment process.</p>
                `;
                break;
        }

        statusContent.innerHTML = statusHTML;
    }

    showSection(sectionId) {
        const el = document.getElementById(sectionId);
        if (!el) return;
        el.style.display = 'block';
    }

    hideSection(sectionId) {
        const el = document.getElementById(sectionId);
        if (!el) return;
        el.style.display = 'none';
    }

    showInstructions() {
        document.getElementById('instructions-modal').style.display = 'block';
    }

    hideInstructions() {
        document.getElementById('instructions-modal').style.display = 'none';
    }
}

// Initialize the system when the page loads
let fairAssignmentSystem;
document.addEventListener('DOMContentLoaded', () => {
    fairAssignmentSystem = new FairAssignmentSystem();
}); 