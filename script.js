class PomodoroTimer {
    constructor() {
        this.workTime = 25;
        this.breakTime = 5;
        this.isWorking = true;
        this.isRunning = false;
        this.interval = null;

        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.timerDisplay = document.getElementById('timer-display');
        this.startButton = document.getElementById('start-btn');
        this.resetButton = document.getElementById('reset-btn');
        this.workTimeInput = document.getElementById('work-time');
        this.breakTimeInput = document.getElementById('break-time');
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.toggleTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());
        this.workTimeInput.addEventListener('change', () => this.updateWorkTime());
        this.breakTimeInput.addEventListener('change', () => this.updateBreakTime());
    }

    toggleTimer() {
        if (!this.isRunning) {
            this.startButton.textContent = '停止';
            this.isRunning = true;
            this.startTimer();
        } else {
            this.startButton.textContent = '開始';
            this.isRunning = false;
            this.stopTimer();
        }
    }

    resetTimer() {
        this.stopTimer();
        this.isWorking = true;
        this.updateDisplay();
        this.startButton.textContent = '開始';
        this.isRunning = false;
    }

    startTimer() {
        this.interval = setInterval(() => {
            if (this.isWorking) {
                if (this.workTime > 0) {
                    this.workTime--;
                    this.updateDisplay();
                } else {
                    // 作業時間が終了
                    this.isWorking = false;
                    this.workTime = parseInt(this.workTimeInput.value);
                    this.breakTime = parseInt(this.breakTimeInput.value);
                    this.updateDisplay();
                }
            } else {
                if (this.breakTime > 0) {
                    this.breakTime--;
                    this.updateDisplay();
                } else {
                    // 休憩時間が終了
                    this.isWorking = true;
                    this.workTime = parseInt(this.workTimeInput.value);
                    this.breakTime = parseInt(this.breakTimeInput.value);
                    this.updateDisplay();
                }
            }
        }, 60000); // 1分ごとに更新
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    updateDisplay() {
        const minutes = this.isWorking ? this.workTime : this.breakTime;
        const formattedTime = this.formatTime(minutes);
        this.timerDisplay.textContent = formattedTime;
    }

    formatTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}:${remainingMinutes.toString().padStart(2, '0')}`;
    }

    updateWorkTime() {
        this.workTime = parseInt(this.workTimeInput.value);
        if (!this.isRunning) {
            this.updateDisplay();
        }
    }

    updateBreakTime() {
        this.breakTime = parseInt(this.breakTimeInput.value);
        if (!this.isRunning) {
            this.updateDisplay();
        }
    }
}

// タイマーの初期化
const timer = new PomodoroTimer();
