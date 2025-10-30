// Eigen Trails page functionality
document.addEventListener('DOMContentLoaded', function() {
    checkChallengeAvailability();
    setupFormSubmission();
    setupFileUpload();
});

// Contest start time: October 28, 2025 at 6:00 PM
const CONTEST_START_TIME = new Date('2025-10-28T18:00:00').getTime();

function checkChallengeAvailability() {
    const now = Date.now();
    const countdownSection = document.getElementById('challenge-countdown');
    const leaderboardSection = document.getElementById('leaderboard-section');
    const submissionSection = document.getElementById('challenge-submission');
    
    if (now < CONTEST_START_TIME) {
        // Contest hasn't started yet - show countdown, hide leaderboard and submission
        countdownSection.style.display = 'block';
        leaderboardSection.style.display = 'none';
        submissionSection.style.display = 'none';
        
        // Start countdown timer
        startCountdownTimer();
    } else {
        // Contest has started - show leaderboard and submission, hide countdown
        countdownSection.style.display = 'none';
        leaderboardSection.style.display = 'block';
        submissionSection.style.display = 'block';
        
        // Load leaderboard
        loadLeaderboard();
    }
}

function startCountdownTimer() {
    function updateTimer() {
        const now = Date.now();
        const timeLeft = CONTEST_START_TIME - now;
        
        if (timeLeft <= 0) {
            // Contest has started, reload page to show challenges
            location.reload();
            return;
        }
        
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('hours-left').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes-left').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds-left').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// API endpoints
const API_BASE_URL = 'https://us-central1-exalted-tempo-322013.cloudfunctions.net';
const SUBMIT_ENDPOINT = `${API_BASE_URL}/submit-challenge`;
const LEADERBOARD_ENDPOINT = `${API_BASE_URL}/get-leaderboard`;

function loadLeaderboard() {
    const loadingElement = document.getElementById('leaderboard-loading');
    const tableElement = document.getElementById('leaderboard-table');
    const bodyElement = document.getElementById('leaderboard-body');

    // Fetch leaderboard from API
    fetch(LEADERBOARD_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            loadingElement.style.display = 'none';
            tableElement.style.display = 'block';
            
            const leaderboardData = data.leaderboard || [];
            
            bodyElement.innerHTML = '';
            
            leaderboardData.forEach((participant, index) => {
                const row = document.createElement('tr');
                
                const rank = index + 1;
                
                // Get rank class for styling
                let rankClass = 'rank-cell';
                if (rank === 1) rankClass += ' gold';
                else if (rank === 2) rankClass += ' silver';
                else if (rank === 3) rankClass += ' bronze';
                
                // Get scores and times for all trails
                const ringTheBell = Number(participant.ringTheBell) || 0;
                const ringTheBellTime = participant.ringTheBellTime || '--';
                const entanglementHeist = Number(participant.entanglementHeist) || 0;
                const entanglementHeistTime = participant.entanglementHeistTime || '--';
                const beADicke = Number(participant.beADicke) || 0;
                const beADickeTime = participant.beADickeTime || '--';
                const cookMeGhz = Number(participant.cookMeGhz) || 0;
                const cookMeGhzTime = participant.cookMeGhzTime || '--';
                const willOfW = Number(participant.willOfW) || 0;
                const willOfWTime = participant.willOfWTime || '--';
                const matrixReloaded = Number(participant.matrixReloaded) || 0;
                const matrixReloadedTime = participant.matrixReloadedTime || '--';
                const energyHunter = Number(participant.energyHunter) || 0;
                const energyHunterTime = participant.energyHunterTime || '--';
                const pauliChronicles = Number(participant.pauliChronicles) || 0;
                const pauliChroniclesTime = participant.pauliChroniclesTime || '--';
                const parityTime = Number(participant.parityTime) || 0;
                const parityTimeTime = participant.parityTimeTime || '--';
                
                // Calculate total score from all individual challenge scores
                const totalScore = ringTheBell + entanglementHeist + beADicke + cookMeGhz + willOfW + matrixReloaded + energyHunter + pauliChronicles + parityTime;
                
                // Debug logging (remove after testing)
                if (index === 0) {
                    console.log('Participant data:', {
                        ringTheBell, ringTheBellTime,
                        entanglementHeist, entanglementHeistTime,
                        beADicke, beADickeTime,
                        cookMeGhz, cookMeGhzTime,
                        willOfW, willOfWTime,
                        matrixReloaded, matrixReloadedTime,
                        energyHunter, energyHunterTime,
                        pauliChronicles, pauliChroniclesTime,
                        parityTime, parityTimeTime,
                        calculatedTotal: totalScore,
                        backendScore: participant.score
                    });
                }
                
                // Helper function to format trail cell with score only (no time)
                const formatTrailCell = (score, maxScore, time) => {
                    if (score > 0) {
                        const perfectClass = score === maxScore ? 'perfect-score' : '';
                        return `<div class="trail-info ${perfectClass}">
                                    <div class="trail-score">${score.toFixed(1)}/${maxScore}</div>
                                </div>`;
                    }
                    return '<span class="challenge-unsolved">—</span>';
                };
                
                row.innerHTML = `
                    <td class="${rankClass}">${rank}</td>
                    <td class="name-cell">${participant.name}</td>
                    <td class="challenge-cell">${formatTrailCell(ringTheBell, 5, ringTheBellTime)}</td>
                    <td class="challenge-cell">${formatTrailCell(entanglementHeist, 10, entanglementHeistTime)}</td>
                    <td class="challenge-cell">${formatTrailCell(beADicke, 20, beADickeTime)}</td>
                    <td class="challenge-cell">${formatTrailCell(cookMeGhz, 5, cookMeGhzTime)}</td>
                    <td class="challenge-cell">${formatTrailCell(willOfW, 10, willOfWTime)}</td>
                    <td class="challenge-cell">${formatTrailCell(matrixReloaded, 20, matrixReloadedTime)}</td>
                    <td class="challenge-cell">${formatTrailCell(energyHunter, 10, energyHunterTime)}</td>
                    <td class="challenge-cell">${formatTrailCell(pauliChronicles, 10, pauliChroniclesTime)}</td>
                    <td class="challenge-cell">${formatTrailCell(parityTime, 20, parityTimeTime)}</td>
                    <td class="score-cell">${totalScore.toFixed(1)}/110</td>
                `;
                
                bodyElement.appendChild(row);
            });
            
            if (leaderboardData.length === 0) {
                const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = '<td colspan="12" style="text-align: center; padding: 2rem; color: var(--color-muted);">No submissions yet. Be the first to embark on a trail!</td>';
                bodyElement.appendChild(emptyRow);
            }
        })
        .catch(error => {
            console.error('Error loading leaderboard:', error);
            loadingElement.innerHTML = 'Failed to load leaderboard. Please try again later.';
        });
}

function getRankIcon(rank) {
    const icons = {
        1: '🥇',
        2: '🥈',
        3: '🥉'
    };
    return `<span class="rank-icon">${icons[rank]}</span><span class="rank-number">${rank}</span>`;
}

function getTimeAgo(timestamp) {
    // Contest start time: October 28, 2025 at 6:00 PM (18:00)
    const contestStartTime = new Date('2025-10-28T18:00:00').getTime();
    
    // Calculate elapsed time from contest start to submission
    const elapsedMs = timestamp - contestStartTime;
    
    // If submission was before contest start, show 00:00
    if (elapsedMs < 0) {
        return '00:00';
    }
    
    const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const remainingMinutes = elapsedMinutes % 60;
    
    // Format as HH:MM
    return `${elapsedHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
}

function getFinishTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function getRandomTime() {
    // Generate a random completion time for demonstration
    const minutes = Math.floor(Math.random() * 59);
    const seconds = Math.floor(Math.random() * 59);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function maskEmail(email) {
    const [username, domain] = email.split('@');
    const maskedUsername = username.length > 2 
        ? username.substring(0, 2) + '*'.repeat(username.length - 2)
        : username;
    return `${maskedUsername}@${domain}`;
}

function setupFormSubmission() {
    const form = document.getElementById('challenge-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const resultDiv = document.getElementById('submission-result');
    const challengeSelect = document.getElementById('challenge-select');
    
    // Handle challenge selection changes
    challengeSelect.addEventListener('change', function() {
        const selectedChallenge = this.value;
        const qpyFileGroup = document.getElementById('qpy-file').closest('.form-group');
        const pyFileGroup = document.getElementById('py-file-group');
        const expectationValueGroup = document.getElementById('expectation-value-group');
        const qpyFileInput = document.getElementById('qpy-file');
        const pyFileInput = document.getElementById('py-file');
        const expectationValueInput = document.getElementById('expectation-value');
        
        // Reset all fields (with null checks)
        if (qpyFileGroup) qpyFileGroup.style.display = 'block';
        if (pyFileGroup) pyFileGroup.style.display = 'none';
        if (expectationValueGroup) expectationValueGroup.style.display = 'none';
        if (qpyFileInput) qpyFileInput.required = true;
        if (pyFileInput) pyFileInput.required = false;
        if (expectationValueInput) expectationValueInput.required = false;
        
        // Show appropriate fields based on challenge
        if (selectedChallenge === 'parity-time') {
            if (qpyFileGroup) qpyFileGroup.style.display = 'none';
            if (pyFileGroup) pyFileGroup.style.display = 'block';
            if (qpyFileInput) qpyFileInput.required = false;
            if (pyFileInput) pyFileInput.required = true;
        }
        // Note: pauli-chronicles now only requires .qpy file, no expectation value
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        resultDiv.style.display = 'none';

        // Get form data
        const formData = new FormData(form);
        const challengeSelect = document.getElementById('challenge-select');
        const selectedChallenge = challengeSelect.value;
        const email = document.getElementById('email');
        const qpyFileInput = document.getElementById('qpy-file');
        const pyFileInput = document.getElementById('py-file');
        const expectationValueInput = document.getElementById('expectation-value');

        // Validate file based on challenge type
        if (selectedChallenge === 'parity-time') {
            if (!validatePyFile(pyFileInput.files[0])) {
                showSubmissionResult('error', 'Please upload a valid .py file (max 1MB)');
                resetSubmitButton();
                return;
            }
        } else {
            if (!validateFile(qpyFileInput.files[0])) {
                showSubmissionResult('error', 'Please upload a valid .qpy file (max 10MB)');
                resetSubmitButton();
                return;
            }
        }
        
        // Note: Pauli Chronicles no longer requires expectation value validation

        try {
            // Submit to API
            const response = await simulateSubmission(formData);
            
            const maxScore = response.max_score || 100;
            let successMessage = `Trail solution submitted successfully! Your submission for "${challengeSelect.options[challengeSelect.selectedIndex].text}" has been received. Score: ${response.score?.toFixed(1) || 'N/A'}/${maxScore}`;
            
            // Add test cases info for parity-time challenge
            if (selectedChallenge === 'parity-time' && response.analysis) {
                const casesPassed = response.analysis.cases_passed || 0;
                const totalCases = response.analysis.total_cases || 50;
                successMessage += `\n\nTest Cases Passed: ${casesPassed}/${totalCases}`;
            }
            
            showSubmissionResult('success', successMessage);
            
            // Reset form
            form.reset();
            
            // Reset field visibility (with null checks)
            const qpyFileGroup = document.getElementById('qpy-file')?.closest('.form-group');
            const pyFileGroup = document.getElementById('py-file-group');
            const expectationValueGroup = document.getElementById('expectation-value-group');
            
            if (qpyFileGroup) qpyFileGroup.style.display = 'block';
            if (pyFileGroup) pyFileGroup.style.display = 'none';
            if (expectationValueGroup) expectationValueGroup.style.display = 'none';
            
            // Reload leaderboard after successful submission
            setTimeout(loadLeaderboard, 1000);
            
        } catch (error) {
            const errorMessage = error.error || error.message || 'Failed to submit solution. Please try again.';
            showSubmissionResult('error', errorMessage);
        } finally {
            resetSubmitButton();
        }
    });

    function resetSubmitButton() {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

function validateFile(file) {
    if (!file) return false;
    
    // Check file extension
    if (!file.name.toLowerCase().endsWith('.qpy')) {
        return false;
    }
    
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
        return false;
    }
    
    return true;
}

function validatePyFile(file) {
    if (!file) return false;
    
    // Check file extension
    if (!file.name.toLowerCase().endsWith('.py')) {
        return false;
    }
    
    // Check file size (1MB limit for .py files)
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
    if (file.size > maxSize) {
        return false;
    }
    
    return true;
}

function setupFileUpload() {
    const qpyFileInput = document.getElementById('qpy-file');
    const pyFileInput = document.getElementById('py-file');
    const qpyContainer = qpyFileInput.closest('.file-upload-container');
    const pyContainer = pyFileInput.closest('.file-upload-container');
    
    // Setup QPY file upload
    qpyFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        // Remove any existing file info
        const existingInfo = qpyContainer.querySelector('.file-selected-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        
        if (file) {
            const fileInfo = document.createElement('div');
            fileInfo.className = 'file-selected-info';
            fileInfo.innerHTML = `
                <p><strong>Selected:</strong> ${file.name}</p>
                <p><strong>Size:</strong> ${formatFileSize(file.size)}</p>
                <p class="${validateFile(file) ? 'valid' : 'invalid'}">
                    ${validateFile(file) ? '✓ Valid .qpy file' : '✗ Invalid file or too large'}
                </p>
            `;
            qpyContainer.appendChild(fileInfo);
        }
    });
    
    // Setup Python file upload
    pyFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        // Remove any existing file info
        const existingInfo = pyContainer.querySelector('.file-selected-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        
        if (file) {
            const fileInfo = document.createElement('div');
            fileInfo.className = 'file-selected-info';
            fileInfo.innerHTML = `
                <p><strong>Selected:</strong> ${file.name}</p>
                <p><strong>Size:</strong> ${formatFileSize(file.size)}</p>
                <p class="${validatePyFile(file) ? 'valid' : 'invalid'}">
                    ${validatePyFile(file) ? '✓ Valid .py file' : '✗ Invalid file or too large'}
                </p>
            `;
            pyContainer.appendChild(fileInfo);
        }
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function simulateSubmission(formData) {
    return new Promise((resolve, reject) => {
        // Make actual API call to submit trail solution
        fetch(SUBMIT_ENDPOINT, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            console.error('Submission error:', error);
            reject(error);
        });
    });
}

function showSubmissionResult(type, message) {
    const resultDiv = document.getElementById('submission-result');
    resultDiv.className = `submission-result ${type}`;
    resultDiv.innerHTML = `
        <div class="result-icon">
            ${type === 'success' ? '✓' : '✗'}
        </div>
        <div class="result-message">
            ${message}
        </div>
    `;
    resultDiv.style.display = 'block';
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}